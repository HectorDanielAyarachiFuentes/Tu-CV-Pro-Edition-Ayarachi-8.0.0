// js/inlineEditor.js — Editor inline fullscreen (estilo Word)
(function () {
    'use strict';
    window.CvApp = window.CvApp || {};

    // --- TOOLBAR DE EDICIÓN INLINE ---
    const showInlineToolbar = (rect) => {
        const inlineEditorToolbar = document.getElementById('inline-editor-toolbar');
        if (!document.body.classList.contains('fullscreen-preview')) return;

        const toolbarHeight = 40;
        const padding = 10;

        const container = inlineEditorToolbar.offsetParent || document.body;
        const parentRect = container.getBoundingClientRect();

        let top = (rect.top - parentRect.top) + container.scrollTop - toolbarHeight - padding;
        let left = (rect.left - parentRect.left) + container.scrollLeft + (rect.width / 2);

        if (top < container.scrollTop) {
            top = (rect.bottom - parentRect.top) + container.scrollTop + padding;
        }

        inlineEditorToolbar.style.top = `${top}px`;
        inlineEditorToolbar.style.left = `${left}px`;

        inlineEditorToolbar.classList.remove('inline-toolbar-hidden');
        inlineEditorToolbar.classList.add('inline-toolbar-visible');
    };

    const hideInlineToolbar = () => {
        const inlineEditorToolbar = document.getElementById('inline-editor-toolbar');
        inlineEditorToolbar.classList.remove('inline-toolbar-visible');
        inlineEditorToolbar.classList.add('inline-toolbar-hidden');
    };

    const handleSelectionChange = () => {
        const cvPreviewWrapper = document.getElementById('cv-preview-wrapper');
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            if (cvPreviewWrapper.contains(range.commonAncestorContainer)) {
                let targetRect = rect;
                if (rect.width === 0 && rect.height === 0) {
                    const span = document.createElement('span');
                    span.appendChild(document.createTextNode('\u200b'));
                    range.insertNode(span);
                    targetRect = span.getBoundingClientRect();
                    span.parentNode.removeChild(span);
                }

                showInlineToolbar(targetRect);
                return;
            }
        }
        hideInlineToolbar();
    };

    // --- AVATAR EDITOR PANEL ---
    const showAvatarPanel = (avatarEl) => {
        const avatarEditorPanel = document.getElementById('avatar-editor-panel');
        if (!avatarEditorPanel) return;

        hideInlineToolbar();

        const cvData = CvApp.state.cvData;
        const avatarPanelTabs = avatarEditorPanel.querySelectorAll('.avatar-panel-tab');
        const avatarPanelContents = avatarEditorPanel.querySelectorAll('.avatar-panel-content');

        const currentType = cvData.avatar?.type || 'none';
        avatarPanelTabs.forEach(t => t.classList.toggle('active', t.dataset.avatarType === currentType));
        avatarPanelContents.forEach(c => c.classList.toggle('active', c.dataset.avatarContent === currentType));

        // Populate current values
        if (cvData.avatar?.type === 'initials') document.getElementById('avatar-panel-initials').value = cvData.avatar.value || '';
        if (cvData.avatar?.type === 'url') document.getElementById('avatar-panel-url').value = cvData.avatar.value || '';
        if (cvData.avatar?.type === 'quote') document.getElementById('avatar-panel-quote').value = cvData.avatar.value || '';
        if (cvData.avatar?.type === 'qr') document.getElementById('avatar-panel-qr').value = cvData.avatar.value || '';
        if (cvData.avatar?.type === 'svg') { const svgEl = document.getElementById('avatar-panel-svg'); if (svgEl) svgEl.value = cvData.avatar.value || ''; }
        if (cvData.avatar?.type === 'photo') {
            const prev = document.getElementById('avatar-panel-photo-preview');
            if (prev) prev.src = cvData.avatar.value || '';
        }

        // Smart positioning near the avatar element
        avatarEditorPanel.style.opacity = '0';
        avatarEditorPanel.style.top = '0';
        avatarEditorPanel.style.left = '0';
        avatarEditorPanel.style.transform = 'none';
        avatarEditorPanel.classList.remove('avatar-panel-hidden');
        avatarEditorPanel.classList.add('avatar-panel-visible');

        const container = avatarEditorPanel.offsetParent || document.body;
        const parentRect = container.getBoundingClientRect();
        const panelW = avatarEditorPanel.offsetWidth || 290;
        const panelH = avatarEditorPanel.offsetHeight || 320;
        const containerW = container.clientWidth;
        const containerH = container.clientHeight;
        const TOOLBAR_CLEARANCE = 64;

        let top = 0;
        let left = 0;

        if (avatarEl) {
            const avatarRect = avatarEl.getBoundingClientRect();
            let desiredLeft = (avatarRect.right - parentRect.left) + container.scrollLeft + 12;
            let desiredTop = (avatarRect.top - parentRect.top) + container.scrollTop;

            if (desiredLeft + panelW > containerW - 8) {
                desiredLeft = (avatarRect.left - parentRect.left) + container.scrollLeft - panelW - 12;
            }
            if (desiredTop + panelH > containerH + container.scrollTop - 8) {
                desiredTop = containerH + container.scrollTop - panelH - 8;
            }
            if (desiredTop < TOOLBAR_CLEARANCE) desiredTop = TOOLBAR_CLEARANCE;
            if (desiredLeft < 4) desiredLeft = 4;

            top = desiredTop;
            left = desiredLeft;
        } else {
            top = TOOLBAR_CLEARANCE;
            left = containerW - panelW - 16;
        }

        avatarEditorPanel.style.top = `${top}px`;
        avatarEditorPanel.style.left = `${left}px`;
        avatarEditorPanel.style.opacity = '';
    };

    const hideAvatarPanel = () => {
        const avatarEditorPanel = document.getElementById('avatar-editor-panel');
        if (!avatarEditorPanel) return;
        avatarEditorPanel.classList.remove('avatar-panel-visible');
        avatarEditorPanel.classList.add('avatar-panel-hidden');
    };

    const markAvatarClickable = () => {
        const cvPreviewWrapper = document.getElementById('cv-preview-wrapper');
        cvPreviewWrapper.querySelectorAll('[data-avatar-container]').forEach(el => {
            el.classList.add('cv-avatar-clickable');
        });
        const avatarContainers = cvPreviewWrapper.querySelectorAll('div[style*="border-radius:50%"], div[style*="border-radius: 50%"]');
        avatarContainers.forEach(el => el.classList.add('cv-avatar-clickable'));
    };

    const setupAvatarEditorPanel = () => {
        const avatarEditorPanel = document.getElementById('avatar-editor-panel');
        if (!avatarEditorPanel) return;

        const cvPreviewWrapper = document.getElementById('cv-preview-wrapper');
        const avatarPanelCloseBtnEl = document.getElementById('avatar-panel-close-btn');
        const avatarPanelApplyBtn = document.getElementById('avatar-panel-apply-btn');
        const avatarPanelTabs = avatarEditorPanel.querySelectorAll('.avatar-panel-tab');
        const avatarPanelContents = avatarEditorPanel.querySelectorAll('.avatar-panel-content');
        const loadedIcons = CvApp.state.loadedIcons;

        avatarPanelCloseBtnEl.addEventListener('click', hideAvatarPanel);

        document.addEventListener('mousedown', (e) => {
            if (avatarEditorPanel.classList.contains('avatar-panel-visible') &&
                !avatarEditorPanel.contains(e.target)) {
                hideAvatarPanel();
            }
        });

        avatarPanelTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                avatarPanelTabs.forEach(t => t.classList.remove('active'));
                avatarPanelContents.forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                const matchingContent = avatarEditorPanel.querySelector(`[data-avatar-content="${tab.dataset.avatarType}"]`);
                if (matchingContent) matchingContent.classList.add('active');

                if (tab.dataset.avatarType === 'icon') {
                    populateAvatarIconGrid();
                }
            });
        });

        const populateAvatarIconGrid = () => {
            const grid = document.getElementById('avatar-panel-icon-grid');
            const cvData = CvApp.state.cvData;
            if (!grid || !loadedIcons.length) return;
            grid.innerHTML = '';
            loadedIcons.forEach(iconPath => {
                const btn = document.createElement('div');
                btn.className = 'avatar-panel-icon-option';
                btn.dataset.iconPath = iconPath;
                if (cvData.avatar?.type === 'icon' && cvData.avatar.value === iconPath) {
                    btn.classList.add('selected');
                }
                const img = document.createElement('img');
                img.src = iconPath;
                img.alt = '';
                btn.appendChild(img);
                btn.addEventListener('click', () => {
                    grid.querySelectorAll('.avatar-panel-icon-option').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                });
                grid.appendChild(btn);
            });
        };

        const photoInput = document.getElementById('avatar-panel-photo-input');
        const photoPreview = document.getElementById('avatar-panel-photo-preview');
        if (photoInput) {
            photoInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const base64 = await CvApp.resizeImageAndGetBase64(file, 250);
                if (photoPreview) photoPreview.src = base64;
                photoInput.dataset.base64 = base64;
            });
        }

        avatarPanelApplyBtn.addEventListener('click', () => {
            const cvData = CvApp.state.cvData;
            const activeTab = avatarEditorPanel.querySelector('.avatar-panel-tab.active');
            if (!activeTab) return;
            const type = activeTab.dataset.avatarType;

            const valueMap = {
                none: () => '',
                initials: () => (document.getElementById('avatar-panel-initials')?.value || '').toUpperCase(),
                photo: () => document.getElementById('avatar-panel-photo-input')?.dataset.base64 || cvData.avatar?.value || '',
                url: () => document.getElementById('avatar-panel-url')?.value || '',
                quote: () => document.getElementById('avatar-panel-quote')?.value || '',
                qr: () => document.getElementById('avatar-panel-qr')?.value || '',
                icon: () => avatarEditorPanel.querySelector('.avatar-panel-icon-option.selected')?.dataset.iconPath || cvData.avatar?.value || '',
                svg: () => document.getElementById('avatar-panel-svg')?.value || '',
            };

            cvData.avatar = { type, value: (valueMap[type] || (() => ''))() };
            CvApp.updateAndRender();
            hideAvatarPanel();
            setTimeout(markAvatarClickable, 100);
        });

        cvPreviewWrapper.addEventListener('click', (e) => {
            if (!document.body.classList.contains('fullscreen-preview')) return;
            const avatarEl = e.target.closest('.cv-avatar-clickable');
            if (avatarEl) {
                e.preventDefault();
                e.stopPropagation();
                showAvatarPanel(avatarEl);
            }
        });
    };

    const setupInlineEditorListeners = () => {
        const cvPreviewWrapper = document.getElementById('cv-preview-wrapper');
        const inlineEditorToolbar = document.getElementById('inline-editor-toolbar');
        const inlineColorInput = document.getElementById('inline-color-input');
        const inlineEditorAddSectionBtn = document.getElementById('inline-editor-add-section-btn');
        const inlineEditorAddSubsectionBtn = document.getElementById('inline-editor-add-subsection-btn');

        cvPreviewWrapper.addEventListener('mouseup', handleSelectionChange);
        cvPreviewWrapper.addEventListener('keyup', handleSelectionChange);

        // Capturar historial de edición directa en fullscreen
        let _fsInputDebounce = null;
        cvPreviewWrapper.addEventListener('input', () => {
            if (!document.body.classList.contains('fullscreen-preview')) return;
            if (CvApp.history.isApplyingFsHistory) return;
            if (CvApp.history.fsPrevHtml !== null) {
                CvApp.history.pushFsSnapshot(CvApp.history.fsPrevHtml);
            }
            clearTimeout(_fsInputDebounce);
            _fsInputDebounce = setTimeout(() => {
                CvApp.history.fsPrevHtml = cvPreviewWrapper.innerHTML;
                CvApp.updateHistoryBtns();
            }, 150);
        });

        document.addEventListener('mousedown', (e) => {
            if (!inlineEditorToolbar.contains(e.target) && !cvPreviewWrapper.contains(e.target)) {
                hideInlineToolbar();
            }
        });

        // Botones de formato
        inlineEditorToolbar.querySelectorAll('.toolbar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const command = btn.dataset.command;
                document.execCommand(command, false, null);
            });
            btn.addEventListener('mousedown', (e) => e.preventDefault());
        });

        // Color picker
        inlineColorInput.addEventListener('input', (e) => {
            document.execCommand('foreColor', false, e.target.value);
        });
        inlineColorInput.addEventListener('mousedown', (e) => e.preventDefault());

        // Add Section Button
        inlineEditorAddSectionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const cvData = CvApp.state.cvData;

            const selection = window.getSelection();
            const anchorNode = selection?.anchorNode;
            const sidebarEl = cvPreviewWrapper.querySelector('[data-cv-background="sidebar"]');
            const anchorEl = anchorNode?.nodeType === 3 ? anchorNode.parentElement : anchorNode;
            const inSidebar = !!(sidebarEl && anchorEl && sidebarEl.contains(anchorEl));

            const columnEl = inSidebar ? sidebarEl : (cvPreviewWrapper.querySelector('[data-cv-background="main"]') || cvPreviewWrapper);
            const liveH3 = columnEl?.querySelector('h3');
            const liveP = columnEl?.querySelector('p');

            let titleStyle = '';
            if (liveH3) {
                const cs = window.getComputedStyle(liveH3);
                const borderW = cs.borderBottomWidth;
                const hasBorder = borderW && borderW !== '0px';
                titleStyle = [
                    `font-family:${cs.fontFamily}`,
                    `font-size:${cs.fontSize}`,
                    `font-weight:${cs.fontWeight}`,
                    `color:${cs.color}`,
                    `letter-spacing:${cs.letterSpacing}`,
                    `text-transform:${cs.textTransform}`,
                    `padding-bottom:${cs.paddingBottom}`,
                    `margin-bottom:${cs.marginBottom}`,
                    `margin-top:0`,
                    `display:block`,
                    hasBorder ? `border-bottom:${borderW} ${cs.borderBottomStyle} ${cs.borderBottomColor}` : ''
                ].filter(Boolean).join(';') + ';';
            } else {
                const c = inSidebar ? (cvData.textColorLight || '#fff') : (cvData.sectionTitleColor || cvData.themeColor || '#c00');
                titleStyle = `font-size:1rem;font-weight:700;color:${c};border-bottom:1px solid ${inSidebar ? 'rgba(255,255,255,0.3)' : c};padding-bottom:.4rem;margin-bottom:.8rem;text-transform:uppercase;display:block;`;
            }

            let bodyStyle = '';
            if (liveP) {
                const cs = window.getComputedStyle(liveP);
                bodyStyle = `font-family:${cs.fontFamily};font-size:${cs.fontSize};color:${cs.color};line-height:${cs.lineHeight};`;
            } else {
                const c = inSidebar ? (cvData.textColorLight || '#fff') : (cvData.textColorDark || '#222');
                bodyStyle = `font-size:.85rem;color:${c};line-height:1.6;`;
            }

            const sectionHtml = `<div style="margin-top:1.4rem;"><div style="${titleStyle}">NUEVA SECCIÓN</div><p style="${bodyStyle}white-space:pre-wrap;margin-top:0;">Escribe aquí tu contenido...</p></div>`;

            document.execCommand('insertHTML', false, sectionHtml);

            if (!cvData.customSections) cvData.customSections = [];
            cvData.customSections.push({
                title: 'NUEVA SECCIÓN',
                content: 'Escribe aquí tu contenido...',
                column: inSidebar ? 'sidebar' : 'main'
            });
        });
        inlineEditorAddSectionBtn.addEventListener('mousedown', (e) => e.preventDefault());

        // Add Subsection Button
        inlineEditorAddSubsectionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const cvData = CvApp.state.cvData;

            const selection = window.getSelection();
            const anchorNode = selection?.anchorNode;
            const sidebarEl = cvPreviewWrapper.querySelector('[data-cv-background="sidebar"]');
            const anchorEl = anchorNode?.nodeType === 3 ? anchorNode.parentElement : anchorNode;
            const inSidebar = !!(sidebarEl && anchorEl && sidebarEl.contains(anchorEl));
            const columnEl = inSidebar ? sidebarEl : (cvPreviewWrapper.querySelector('[data-cv-background="main"]') || cvPreviewWrapper);

            let protoItem = null;
            if (inSidebar) {
                protoItem = [...columnEl.querySelectorAll('div')].find(d => d.textContent.includes('Teléfono') || d.textContent.includes('Email') || d.textContent.includes('Web')) ||
                    columnEl.querySelector('div[style*="margin-bottom"]');
            } else {
                protoItem = columnEl.querySelector('div[style*="margin-bottom"], .experience-item, .education-item') ||
                    columnEl.querySelector('div > h4')?.parentElement;
            }

            let itemHtml = '';

            if (protoItem && protoItem !== columnEl) {
                const cs = window.getComputedStyle(protoItem);
                const titleNode = protoItem.querySelector('h4, strong, b, span[style*="font-weight:700"], span[style*="font-weight:bold"]');
                const textNode = protoItem.querySelector('p, span:not([style*="font-weight"])');

                let subTitleStyle = '';
                if (titleNode) {
                    const tcs = window.getComputedStyle(titleNode);
                    subTitleStyle = `font-family:${tcs.fontFamily};font-size:${tcs.fontSize};font-weight:${tcs.fontWeight};color:${tcs.color};margin:0;display:block;`;
                } else {
                    subTitleStyle = `font-weight:700;font-size:${inSidebar ? '0.85rem' : '0.9rem'};margin:0;display:block;`;
                }

                let subTextStyle = '';
                if (textNode) {
                    const txcs = window.getComputedStyle(textNode);
                    subTextStyle = `font-family:${txcs.fontFamily};font-size:${txcs.fontSize};color:${txcs.color};line-height:${txcs.lineHeight};margin:0;display:block;`;
                } else {
                    subTextStyle = `font-size:${inSidebar ? '0.8rem' : '0.85rem'};opacity:0.9;margin:0;display:block;`;
                }

                itemHtml = `
                    <div style="margin-bottom:${inSidebar ? '0.6rem' : (cs.marginBottom || '1rem')}; margin-top:0; break-inside:avoid;">
                        <div style="${subTitleStyle}">TÍTULO / ETIQUETA</div>
                        <div style="${subTextStyle}">Contenido o descripción corta...</div>
                    </div>
                `;
            } else {
                const themeColor = cvData.themeColor || '#444';
                const textCol = inSidebar ? '#fff' : '#444';
                itemHtml = `
                    <div style="margin-bottom:${inSidebar ? '0.6rem' : '1.5rem'}; break-inside:avoid;">
                        <div style="font-weight:700; font-size:${inSidebar ? '0.85rem' : '0.95rem'}; color:${inSidebar ? textCol : themeColor};">NUEVO ÍTEM</div>
                        <div style="font-size:${inSidebar ? '0.8rem' : '0.85rem'}; color:${textCol}; opacity:0.9;">Descripción...</div>
                    </div>
                `;
            }

            const needsInitialBreak = selection && selection.anchorOffset > 0;
            const prefix = needsInitialBreak ? '<div><br></div>' : '';
            const finalFullHtml = `${prefix}<div style="display:block; width:100%; clear:both;">${itemHtml}</div>`;

            document.execCommand('insertHTML', false, finalFullHtml);
        });
        inlineEditorAddSubsectionBtn.addEventListener('mousedown', (e) => e.preventDefault());
    };

    // --- Exponer API pública ---
    CvApp.showInlineToolbar = showInlineToolbar;
    CvApp.hideInlineToolbar = hideInlineToolbar;
    CvApp.hideAvatarPanel = hideAvatarPanel;
    CvApp.markAvatarClickable = markAvatarClickable;
    CvApp.setupInlineEditorListeners = setupInlineEditorListeners;
    CvApp.setupAvatarEditorPanel = setupAvatarEditorPanel;
})();
