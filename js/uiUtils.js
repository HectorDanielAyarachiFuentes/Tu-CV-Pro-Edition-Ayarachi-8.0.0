// js/uiUtils.js — Utilidades de UI (toasts, modals, resize de imágenes)
(function () {
    'use strict';
    window.CvApp = window.CvApp || {};

    // --- RESIZE DE IMÁGENES ---
    const resizeBase64Image = (base64Str, maxSize = 250) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;
                if (width > height) {
                    if (width > maxSize) { height *= maxSize / width; width = maxSize; }
                } else {
                    if (height > maxSize) { width *= maxSize / height; height = maxSize; }
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.8));
            };
            img.src = base64Str;
        });
    };

    const resizeImageAndGetBase64 = (file, maxSize = 250) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const resized = await resizeBase64Image(e.target.result, maxSize);
                resolve(resized);
            };
            reader.readAsDataURL(file);
        });
    };

    // --- TOASTS ---
    const showToast = (message, type = 'success') => {
        let toastEl = document.getElementById('custom-toast-container');
        if (!toastEl) {
            toastEl = document.createElement('div');
            toastEl.id = 'custom-toast-container';
            document.body.appendChild(toastEl);
        }
        toastEl.className = 'custom-toast ' + type;
        
        let iconHtml = '';
        if (type === 'success') iconHtml = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
        else if (type === 'error') iconHtml = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
        else if (type === 'warning') iconHtml = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';

        toastEl.innerHTML = `${iconHtml}<span>${message}</span>`;
        void toastEl.offsetWidth; // Reflow
        toastEl.classList.add('show');
        
        if (toastEl.timeoutId) clearTimeout(toastEl.timeoutId);
        toastEl.timeoutId = setTimeout(() => toastEl.classList.remove('show'), 4000);
    };

    // --- MODALS ---
    const showModal = (title, message, type = 'alert', onConfirm = null) => {
        let overlay = document.createElement('div');
        overlay.className = 'custom-modal-overlay';
        
        let inputHtml = type === 'prompt' ? `<input type="text" id="custom-modal-input-field" class="custom-modal-input" value="${message.defaultValue || ''}">` : '';
        let msgHtml = type === 'prompt' ? `<p class="custom-modal-message">${message.text}</p>` : `<p class="custom-modal-message">${message}</p>`;

        overlay.innerHTML = `
            <div class="custom-modal">
                <h3 class="custom-modal-title">${title}</h3>
                ${msgHtml}
                ${inputHtml}
                <div class="custom-modal-actions">
                    ${type !== 'alert' ? '<button class="btn btn-secondary" id="custom-modal-cancel">Cancelar</button>' : ''}
                    <button class="btn btn-primary" id="custom-modal-confirm">Aceptar</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        void overlay.offsetWidth;
        overlay.classList.add('show');
        
        const close = () => {
            overlay.classList.remove('show');
            setTimeout(() => { if(overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 300);
        };

        const confirmBtn = overlay.querySelector('#custom-modal-confirm');
        const cancelBtn = overlay.querySelector('#custom-modal-cancel');
        const inputField = overlay.querySelector('#custom-modal-input-field');

        confirmBtn.addEventListener('click', () => {
            close();
            if (onConfirm) {
                if (type === 'prompt') onConfirm(inputField.value);
                else onConfirm(true);
            }
        });

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                close();
                if (onConfirm && type !== 'prompt') onConfirm(false);
            });
        }
    };

    // --- SAVE NOTIFICATION ---
    let saveTimeout;
    const showSaveNotification = () => {
        const saveNotificationEl = document.getElementById('save-notification');
        if (!saveNotificationEl) return;
        if (saveTimeout) clearTimeout(saveTimeout);
        saveNotificationEl.classList.add('show');
        saveTimeout = setTimeout(() => {
            saveNotificationEl.classList.remove('show');
        }, 2000);
    };

    // --- Exponer API pública ---
    CvApp.resizeBase64Image = resizeBase64Image;
    CvApp.resizeImageAndGetBase64 = resizeImageAndGetBase64;
    CvApp.showToast = showToast;
    CvApp.showModal = showModal;
    CvApp.showSaveNotification = showSaveNotification;
})();
