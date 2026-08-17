// js/previewNavigation.js — Navegador inteligente (clic en CV → sección del editor)
(function () {
    'use strict';
    window.CvApp = window.CvApp || {};

    const handlePreviewElementClick = (e) => {
        if (document.body.classList.contains('fullscreen-preview') || document.body.classList.contains('read-only-mode')) return;

        const target = e.target;
        const cvData = CvApp.state.cvData;
        const formWrapper = document.getElementById('form-section-wrapper');
        let sectionName = null;
        let focusFieldName = target.closest('[data-field]')?.dataset.field || null;
        let itemId = target.closest('[data-id]')?.dataset.id || null;

        // 1. Detección Prioritaria por Avatar / Foto
        if (target.closest('.avatar-container, [data-cv-avatar]') || (target.tagName === 'IMG' && !target.closest('[data-section-key="portfolio"]')) || target.closest('svg[viewBox]')) {
            sectionName = 'avatar';
        }
        // 2. Detección por Nombre Completo (H1)
        else if (target.tagName === 'H1' || target.closest('h1')) {
            sectionName = 'personal';
            focusFieldName = 'firstName';
        }
        // 3. Detección por Profesión / Título (H2)
        else if (target.tagName === 'H2' || target.closest('h2')) {
            sectionName = 'personal';
            focusFieldName = 'title';
        }
        // 4. Detección por Pie de página / Contacto Footer
        else if (target.closest('footer')) {
            sectionName = 'footer';
        }
        // 5. Detección por Bloque o Datos de Contacto
        else {
            const text = (target.textContent || '').toLowerCase();
            const parentText = (target.closest('p, div, h3, header, aside, section')?.textContent || '').toLowerCase();

            if (text.includes('teléfono') || text.includes('tel:') || (parentText.includes('contacto') && (text.includes('tel') || /\d{6,}/.test(text)))) {
                sectionName = 'personal';
                focusFieldName = 'phone';
            } else if (text.includes('email') || text.includes('@') || (parentText.includes('contacto') && text.includes('email'))) {
                sectionName = 'personal';
                focusFieldName = 'email';
            } else if (text.includes('dirección') || text.includes('ubicación') || text.includes('neuquen') || text.includes('argentina') || (parentText.includes('contacto') && text.includes('dirección'))) {
                sectionName = 'personal';
                focusFieldName = 'address';
            } else if (text.includes('web') || text.includes('linkedin') || text.includes('github') || text.includes('http') || (parentText.includes('contacto') && text.includes('web'))) {
                sectionName = 'personal';
                focusFieldName = 'website';
            } else if (target.closest('h3')?.textContent.toLowerCase().includes('contacto') || text.includes('contacto')) {
                sectionName = 'personal';
                focusFieldName = 'phone';
            } else {
                const sectionEl = target.closest('[data-section-key]');
                if (sectionEl) {
                    const key = sectionEl.dataset.sectionKey;

                    if (key === 'summary') {
                        sectionName = 'personal';
                        focusFieldName = 'summary';
                    } else {
                        sectionName = key;
                    }
                }
            }
        }

        // 6. Fallback Inteligente por coincidencia con Habilidades o Títulos de Sección
        if (!sectionName) {
            const textTrim = (target.textContent || '').trim().toLowerCase();
            const parentText = (target.closest('div, section, aside, p, li, h3')?.textContent || '').toLowerCase();
            const titleText = (target.closest('h3')?.textContent || (target.tagName === 'H3' ? target.textContent : '')).toLowerCase();

            const matchedSkill = (cvData.skills || []).find(s => s.name && (s.name.toLowerCase() === textTrim || (textTrim.length < 35 && textTrim.includes(s.name.toLowerCase()))));

            if (matchedSkill) {
                sectionName = 'skills';
                itemId = matchedSkill.id;
            } else if (titleText.includes('habilidad') || titleText.includes('skill') || parentText.includes('habilidad')) {
                sectionName = 'skills';
            } else if (titleText.includes('experien')) sectionName = 'experience';
            else if (titleText.includes('educa')) sectionName = 'education';
            else if (titleText.includes('impacto') || titleText.includes('logro')) sectionName = 'impacts';
            else if (titleText.includes('portafolio') || titleText.includes('portfolio')) sectionName = 'portfolio';
            else if (titleText.includes('resumen') || titleText.includes('perfil')) {
                sectionName = 'personal';
                focusFieldName = 'summary';
            } else if (target.closest('header')) {
                sectionName = 'personal';
                focusFieldName = 'firstName';
            }
        }

        if (sectionName) {
            CvApp.setActiveSection(sectionName);
            setTimeout(() => {
                let targetEl = null;
                const clickedText = (target.textContent || '').trim().toLowerCase();

                // 1. Si la sección es Habilidades, buscar la insignia exacta
                if (sectionName === 'skills') {
                    if (itemId) {
                        targetEl = formWrapper.querySelector(`.skill-badge[data-id="${itemId}"]`);
                    }
                    if (!targetEl && clickedText) {
                        targetEl = Array.from(formWrapper.querySelectorAll('.skill-badge'))
                            .find(badge => badge.textContent.toLowerCase().includes(clickedText));
                    }
                }

                // 2. Si el clic fue en un ítem específico
                if (!targetEl && itemId) {
                    const itemEl = formWrapper.querySelector(`[data-id="${itemId}"]`);
                    if (itemEl) {
                        if (focusFieldName) {
                            targetEl = itemEl.querySelector(`[name="${focusFieldName}"]`);
                        }
                        if (!targetEl) {
                            targetEl = itemEl.querySelector('input:not([type="hidden"]), textarea') || itemEl;
                        }
                    }
                }

                // 3. Si no hay ítem dinámico pero sí campo definido
                if (!targetEl && focusFieldName) {
                    targetEl = formWrapper.querySelector(`[name="${focusFieldName}"]`);
                }

                // 4. Fallback al primer input disponible
                if (!targetEl) {
                    targetEl = formWrapper.querySelector('input:not([type="hidden"]), textarea');
                }

                if (targetEl) {
                    if (typeof targetEl.focus === 'function') targetEl.focus();
                    targetEl.classList.add('highlight-pulse');
                    setTimeout(() => targetEl.classList.remove('highlight-pulse'), 1200);
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 50);
            CvApp.showToast(`✏️ Redirigido al editor: ${sectionName.toUpperCase()}`, 'info');
        }
    };

    // --- Exponer API pública ---
    CvApp.handlePreviewElementClick = handlePreviewElementClick;
})();
