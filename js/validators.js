// js/validators.js — Validadores de formulario
(function () {
    'use strict';
    window.CvApp = window.CvApp || {};

    const validators = {
        email: (value) => (value === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) ? '' : 'Formato inválido. Ej: nombre@dominio.com',
        phone: (value) => (value === '' || /^[\d\s+()-]*$/.test(value)) ? '' : 'Formato inválido. Ej: +54 9 11 1234-5678',
        website: (value) => {
            if (value === '') return '';
            // Permite valores sin protocolo para conveniencia del usuario
            const urlToTest = (!value.startsWith('http://') && !value.startsWith('https://')) ? `https://${value}` : value;
            try {
                new URL(urlToTest);
                return '';
            } catch (_) {
                return 'Formato inválido. Ej: linkedin.com/in/usuario';
            }
        },
        initials: (value) => (value.length <= 3) ? '' : 'Máximo 3 caracteres.',
        dateRange: (itemEl) => {
            const startDateInput = itemEl.querySelector('input[name="startDate"]');
            const endDateInput = itemEl.querySelector('input[name="endDate"]');
            if (startDateInput.value && endDateInput.value && startDateInput.value > endDateInput.value) {
                return 'La fecha de fin no puede ser anterior a la de inicio.';
            }
            return '';
        }
    };

    const validateInput = (target) => {
        const parentGroup = target.closest('.form-group');
        if (!parentGroup) return;

        // Limpia el mensaje de error anterior
        let messageEl = parentGroup.querySelector('.validation-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'validation-message';
            parentGroup.appendChild(messageEl);
        }
        messageEl.textContent = '';

        const validationType = target.name || target.id.replace('-input', '');
        const validator = validators[validationType];

        if (validator) {
            const errorMessage = validator(target.value);
            if (errorMessage) {
                target.classList.add('invalid');
                messageEl.textContent = errorMessage;
            } else {
                target.classList.remove('invalid');
            }
        }
    };

    const validateDateRange = (itemEl) => {
        const messageEl = itemEl.querySelector('[data-validation-for="dateRange"]');
        const endDateInput = itemEl.querySelector('input[name="endDate"]');
        const errorMessage = validators.dateRange(itemEl);
        if (errorMessage) {
            messageEl.textContent = errorMessage;
            endDateInput.classList.add('invalid');
        } else {
            messageEl.textContent = '';
            endDateInput.classList.remove('invalid');
        }
    };

    // --- Exponer API pública ---
    CvApp.validators = validators;
    CvApp.validateInput = validateInput;
    CvApp.validateDateRange = validateDateRange;
})();
