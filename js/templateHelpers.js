// js/templateHelpers.js — Helpers de renderizado de plantillas CV
(function () {
    'use strict';
    window.CvApp = window.CvApp || {};

    const templateHelpers = {
        // --- Funciones básicas ---
        getFullName: (p) => `${p.firstName || ''} ${p.lastName || ''}`.trim(),
        getInitials: (p) => `${p.firstName ? p.firstName[0] : ''}${p.lastName ? p.lastName[0] : ''}`,
        formatDate: (dateStr) => {
            if (!dateStr) return '';
            const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            const [year, month] = dateStr.split('-');
            return `${months[parseInt(month, 10) - 1]} ${year}`;
        },
        formatExperienceDate: (startDate, endDate, isCurrent) => {
            const start = templateHelpers.formatDate(startDate);
            const end = isCurrent ? 'Actual' : templateHelpers.formatDate(endDate);
            if (!start) return '';
            return `${start} - ${end}`;
        },
        levelLabels: { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado', expert: 'Experto' },
        footerIcons: {
            email: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5l-8-5h16z"/></svg>`,
            phone: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`,
            web: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM11 19.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-2v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41c0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
            linkedin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m-1.39 9.94v-8.37H8.27v8.37H5.49z"/></svg>`,
            github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.89 1.53 2.34 1.09 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.95c0-1.09.39-1.98 1.03-2.68c-.1-.25-.45-1.27.1-2.64c0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.7.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.37.2 2.39.1 2.64c.64.7 1.03 1.59 1.03 2.68c0 3.85-2.34 4.7-4.57 4.94c.36.31.68.92.68 1.85v2.73c0 .27.18.58.69.48A10 10 0 0 0 22 12A10 10 0 0 0 12 2Z"/></svg>`,
            text: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>`
        },

        // --- Funciones de renderizado de componentes ---
        renderAvatar: (data) => {
            const { avatar } = data;
            const svgCache = CvApp.state.svgCache;
            if (!avatar || avatar.type === 'none') return '';
            switch (avatar.type) {
                case 'photo': case 'url': return `<img src="${avatar.value}" style="width:100%; height:100%; object-fit:cover;">`;
                case 'initials': return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background-color:rgba(0,0,0,0.2); font-size:3rem; font-weight:bold; color: white;">${avatar.value || templateHelpers.getInitials(data.personalInfo)}</div>`;
                case 'icon':
                    if (avatar.value && svgCache && svgCache[avatar.value]) {
                        // Inserta el SVG directamente y aplica el color blanco con 'fill'.
                        return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background-color:rgba(0,0,0,0.2); padding: 20px; color: white;">${svgCache[avatar.value].replace('<svg', '<svg style="width:100%; height:100%; fill: #fff;"')}</div>`;
                    }
                    return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background-color:rgba(0,0,0,0.2); padding: 20px; color: white;">...</div>`;
                case 'svg': return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background-color:rgba(0,0,0,0.2); padding: 20px; color: white;">${avatar.value || ''}</div>`;
                case 'quote': return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; padding: 1rem; text-align:center; background-color:rgba(0,0,0,0.1); color:white; font-family: var(--font-serif); font-style:italic;">"${avatar.value || 'Tu cita profesional aquí...'}"</div>`;
                case 'qr':
                    const qrUrl = avatar.value ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(avatar.value)}` : 'https://via.placeholder.com/150/ffffff/cccccc?text=QR';
                    return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:white; padding:10px;"><img src="${qrUrl}" style="width:100%; height:100%; object-fit:contain;"></div>`;
                default: return `<div style="width:100%; height:100%; background-color:#e0e0e0; display:flex; align-items:center; justify-content:center;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" stroke-width="1"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`;
            }
        },
        renderAvatarContainer: (data, innerHTML) => {
            if (data.avatar && data.avatar.type === 'none') {
                return '';
            }
            return innerHTML.replace(/{{textColorLight}}/g, data.textColorLight);
        },
        renderFooter: (data, options = {}) => {
            const defaultOptions = { color: '#555', borderColor: '#eee', bgColor: 'transparent', padding: '1.5rem' };
            const finalOptions = { ...defaultOptions, ...options };
            if (!data.footer || data.footer.length === 0) return '';
            const renderItem = (item) => {
                const icon = templateHelpers.footerIcons[item.type] || ''; let link = `https://${(item.value || '').replace(/^https?:\/\//, '')}`;
                if (item.type === 'email') link = `mailto:${item.value}`;
                const content = ['text'].includes(item.type) ? `<span>${item.value}</span>` : `<a href="${link}" target="_blank" style="color: inherit; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">${icon} <span>${item.label || item.value}</span></a>`;
                return `<div>${content}</div>`;
            };
            return `<footer style="font-size:0.85rem; text-align:center; color:${finalOptions.color || data.textColorMuted}; background-color:${finalOptions.bgColor}; border-top:1px solid ${finalOptions.borderColor}; padding:${finalOptions.padding}; margin-top:auto; display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap: 1.5rem;">${data.footer.map(renderItem).join('')}</footer>`;
        },
        renderExperienceItem: (e, data, textColorOverride = null, mutedColorOverride = null) => {
            const textColor = textColorOverride || data.textColorDark || '#212529';
            const mutedColor = mutedColorOverride || data.textColorMuted || '#6c757d';
            return `<div data-section-key="experience" data-id="${e.id || ''}" style="margin-bottom:1.2rem"><div style="display:flex;justify-content:space-between;align-items:baseline"><h4 data-field="position" style="font-size:.95rem;font-weight:600; color:${textColor};">${e.position || ''}</h4><p data-field="startDate" style="font-size:.75rem;font-weight:500;color:${mutedColor};white-space:nowrap;margin-left:1rem">${templateHelpers.formatExperienceDate(e.startDate, e.endDate, e.current)}</p></div><p data-field="company" style="font-size:.85rem;font-style:italic;margin-bottom:.3rem; color:${textColor}; opacity:0.9;">${e.company || ''}</p><p data-field="description" style="font-size:.8rem;white-space:pre-wrap;line-height:1.55; color:${textColor}; opacity:0.85;">${e.description || ''}</p></div>`;
        },
        renderEducationItem: (e, data, textColorOverride = null, mutedColorOverride = null) => {
            const textColor = textColorOverride || data.textColorDark || '#212529';
            const mutedColor = mutedColorOverride || data.textColorMuted || '#6c757d';
            return `<div data-section-key="education" data-id="${e.id || ''}" style="margin-bottom:1rem"><div style="display:flex;justify-content:space-between;align-items:baseline"><h4 data-field="degree" style="font-size:.95rem;font-weight:600; color:${textColor};">${e.degree || ''}</h4><p data-field="startDate" style="font-size:.75rem;font-weight:500;color:${mutedColor};white-space:nowrap;margin-left:1rem">${templateHelpers.formatExperienceDate(e.startDate, e.endDate, e.current)}</p></div><p data-field="institution" style="font-size:.85rem;font-style:italic;margin-bottom:.3rem; color:${textColor}; opacity:0.9;">${e.institution || ''}</p><p data-field="description" style="font-size:.8rem;white-space:pre-wrap;line-height:1.55; color:${textColor}; opacity:0.85;">${e.description || ''}</p></div>`;
        },

        // --- Funciones de renderizado de secciones ---
        renderGenericSection: (title, items, renderItemFn, color, style = '', sectionKey = '') => {
            const cvData = CvApp.state.cvData;
            const titleColor = cvData.sectionTitleColor || color;
            if (!items || items.length === 0) return '';
            const keyAttr = sectionKey ? `data-section-key="${sectionKey}"` : '';
            return `<div ${keyAttr} style="margin-top:1.5rem; ${style}"><h3 data-cv-color="sectionTitleColor" style="font-family: var(--font-heading); font-size:1rem; font-weight:600; color:${titleColor}; border-bottom:2px solid ${titleColor}; padding-bottom:.25rem; margin-bottom:1rem; display:inline-block; text-transform: uppercase;">${title}</h3>${items.map(renderItemFn).join('')}</div>`;
        },
        renderOrderedSections: (data, layoutName = '') => {
            const darkLayouts = ['minimalist-dark', 'midnight', 'tech-lead', 'visionary'];
            const isDark = darkLayouts.includes(layoutName);
            const textColor = isDark ? (data.textColorLight || '#ffffff') : (data.textColorDark || '#212529');
            const mutedColor = isDark ? '#adb5bd' : (data.textColorMuted || '#6c757d');
            const titleColor = data.sectionTitleColor || (isDark ? '#ff5f56' : data.themeColor);

            const sectionRenderers = {
                summary: (opts = {}) => templateHelpers.renderGenericSection(opts.title || 'Resumen', data.personalInfo.summary ? [{ text: data.personalInfo.summary }] : [], item => `<p data-cv-color="textColorDark" style="font-size:.85rem;line-height:1.6;white-space:pre-wrap; color:${textColor};">${item.text}</p>`, opts.color || titleColor, opts.style, 'summary'),
                experience: (opts = {}) => templateHelpers.renderGenericSection(opts.title || 'Experiencia', data.experience, e => templateHelpers.renderExperienceItem(e, data, textColor, mutedColor), opts.color || titleColor, opts.style, 'experience'),
                education: (opts = {}) => templateHelpers.renderGenericSection(opts.title || 'Educación', data.education, e => templateHelpers.renderEducationItem(e, data, textColor, mutedColor), opts.color || titleColor, opts.style, 'education'),
                skills: (opts = {}) => {
                    let content;
                    if (layoutName === 'academic') {
                        content = templateHelpers.renderGenericSection(opts.title || 'Habilidades Clave', data.skills, s => `<li data-section-key="skills" data-id="${s.id || ''}" style="color:${textColor}; cursor:pointer;">${s.name} (${templateHelpers.levelLabels[s.level]})</li>`, opts.color || titleColor, opts.style, 'skills').replace('<div', '<ul').replace('</div>', '</ul>');
                    } else if (layoutName === 'executive' || layoutName === 'creative') {
                        content = templateHelpers.renderGenericSection(opts.title || 'Habilidades', data.skills, s => `<span data-section-key="skills" data-id="${s.id || ''}" style="display:inline-block; background-color:${isDark ? '#222' : '#f1f1f1'}; color:${textColor}; padding: 0.3rem 0.8rem; border-radius: 4px; margin: 0.2rem; font-size:0.85rem; cursor:pointer;">${s.name}</span>`, opts.color || titleColor, opts.style, 'skills');
                    } else if (layoutName === 'technical' || layoutName === 'tech-lead') {
                        content = templateHelpers.renderGenericSection(opts.title || '// SKILLS', data.skills, s => `<span data-section-key="skills" data-id="${s.id || ''}" style="display:inline-block; border:1px solid ${data.themeColor}; color:${data.themeColor}; padding: 0.2rem 0.6rem; border-radius: 4px; margin: 0.2rem; font-size:0.8rem; cursor:pointer;">${s.name}</span>`, opts.color || titleColor, opts.style, 'skills');
                    } else {
                        content = templateHelpers.renderGenericSection(opts.title || 'Habilidades', data.skills, s => `<p data-section-key="skills" data-id="${s.id || ''}" style="font-size:0.8rem;margin-bottom:.4rem; color:${textColor}; cursor:pointer;">${s.name}<span data-cv-color="textColorMuted" style="font-size:.7rem;opacity:.8; color:${mutedColor};"> (${templateHelpers.levelLabels[s.level]})</span></p>`, opts.color || titleColor, opts.style, 'skills');
                    }
                    return content;
                },
                impacts: (opts = {}) => templateHelpers.renderGenericSection(opts.title || 'Impacto Clave', data.impacts, item => `<div data-section-key="impacts" data-id="${item.id || ''}" data-field="description" data-cv-color="textColorDark" style="background:${isDark ? '#222' : '#f4f4f4'}; padding:0.8rem; border-left:4px solid ${data.themeColor}; margin-bottom:0.8rem; font-size:0.85rem; color:${textColor}; cursor:pointer;">${item.description}</div>`, opts.color || titleColor, opts.style, 'impacts'),
                portfolio: (opts = {}) => templateHelpers.renderGenericSection(opts.title || 'Portafolio', data.portfolio, item => `<div data-section-key="portfolio" data-id="${item.id || ''}" style="break-inside: avoid; margin-bottom: 1rem; cursor:pointer;"><img data-field="img" src="${item.img || 'https://via.placeholder.com/300x200/e9ecef/6c757d?text=Imagen'}" style="width:100%; height:auto; display:block; border-radius:4px; border: 1px solid ${isDark ? '#333' : '#eee'};"/><p data-field="title" style="font-size:0.8rem; text-align:center; margin-top:0.5rem; font-weight:500; color:${textColor};">${item.title}</p></div>`, opts.color || titleColor, opts.style || 'column-count:3; column-gap:1rem;', 'portfolio')
            };

            return [
                ...data.sectionOrder
                    .map(key => sectionRenderers[key] ? sectionRenderers[key]() : ''),
                ...(data.customSections || []).map(cs =>
                    templateHelpers.renderGenericSection(
                        cs.title || 'NUEVA SECCIÓN',
                        [{ text: cs.content || '' }],
                        item => `<p style="font-size:.85rem; line-height:1.65; color:${textColor}; white-space:pre-wrap;">${item.text}</p>`,
                        titleColor
                    )
                )
            ].join('');
        }
    };

    // --- Exponer API pública ---
    CvApp.templateHelpers = templateHelpers;
})();
