document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. STATE MANAGEMENT ---
    let cvData = {
        layout: 'classic', 
        themeColor: '#dc3545',
        backgroundGradient: '', // Almacenará el gradiente seleccionado
        // Nuevas propiedades para los colores del texto
        textColorDark: '#212529', // Para texto principal sobre fondos claros
        textColorLight: '#ffffff', // Para texto sobre fondos oscuros/de color
        textColorMuted: '#6c757d', // Para subtítulos, fechas, etc.
        sectionOrder: ['summary', 'experience', 'education', 'skills', 'impacts', 'portfolio'], // Orden personalizable
        avatar: { type: 'initials', value: 'HD' }, 
        personalInfo: { 
            firstName: 'Hector Daniel', 
            lastName: 'Ayarachi Fuentes', 
            title: 'Desarrollador de Software', 
            email: 'mp4o@yahoo.com', 
            phone: '2995056200', 
            address: 'Neuquen, Argentina', 
            website: 'linkedin.com/in/hector-daniel-ayarachi-fuentes/', 
            summary: 'Soy un desarrollador de software con una sólida experiencia en la creación de aplicaciones web escalables y eficientes. Mi enfoque principal se centra en el desarrollo backend, donde tengo un profundo conocimiento de Python y el ecosistema de AWS. Además, he trabajado en proyectos de DevOps para mejorar la eficiencia y la automatización de los procesos de desarrollo.' 
        },
        experience: [{ id: Date.now() + 1, position: 'Desarrollador Backend Senior', company: 'Tech Solutions Inc.', startDate: '2020-02', endDate: '', current: true, description: '- Lideré el desarrollo del microservicio de pagos.\n- Optimicé consultas a la base de datos, mejorando el rendimiento en un 40%.\n- Implementé pipelines de CI/CD con Jenkins y Docker.' }],
        education: [{ id: Date.now() + 2, degree: 'Ingeniería en Sistemas de Información', institution: 'Universidad Tecnológica Nacional', startDate: '2014-04', endDate: '2020-01', current: false, description: 'Proyecto final sobre optimización de redes neuronales.' }],
        skills: [{ id: Date.now() + 3, name: 'Python', level: 'expert' }, { id: Date.now() + 4, name: 'AWS', level: 'advanced' }, { id: Date.now() + 5, name: 'Docker', level: 'advanced' }, { id: Date.now() + 6, name: 'JavaScript', level: 'intermediate' }],
        impacts: [
            { id: Date.now() + 13, description: 'Optimicé consultas a la base de datos, mejorando el rendimiento en un 40%.' },
            { id: Date.now() + 14, description: 'Reduje los costos de infraestructura en AWS en un 25% mediante la optimización de instancias EC2.' }
        ],
        footer: [
            { id: Date.now() + 7, type: 'email', label: '', value: 'mp4o@yahoo.com'},
            { id: Date.now() + 8, type: 'linkedin', label: 'LinkedIn', value: 'in/hector-daniel-ayarachi-fuentes/'},
            { id: Date.now() + 9, type: 'text', label: '', value: 'Referencias disponibles a petición.'}
        ],
        portfolio: [
            { id: Date.now() + 10, img: 'https://github.com/HectorDanielAyarachiFuentes/Tu-CV-Pro/blob/main/img/portafolio-img.jpeg?raw=true', title: 'Diseño de App Móvil' },
            { id: Date.now() + 11, img: 'https://github.com/HectorDanielAyarachiFuentes/Tu-CV-Pro/blob/main/img/portafolio-4.png?raw=true', title: 'Branding Corporativo' },
            { id: Date.now() + 12, img: 'https://github.com/HectorDanielAyarachiFuentes/Tu-CV-Pro/blob/main/img/portafolio-3.jpeg?raw=true', title: 'Ilustración Digital' }
        ]
    };

    // Objeto para almacenar los gradientes cargados por categoría
    let loadedGradients = {
        raya: [],
        simple: []
    };

    // Paletas de colores predefinidas
    const colorPalettes = [
        { name: 'Clásico Rojo', accent: '#dc3545', dark: '#212529', light: '#ffffff', muted: '#6c757d' },
        { name: 'Océano Azul', accent: '#0d6efd', dark: '#032a5c', light: '#ffffff', muted: '#5a7a9c' },
        { name: 'Bosque Verde', accent: '#198754', dark: '#0a3622', light: '#ffffff', muted: '#5c806f' },
        { name: 'Púrpura Real', accent: '#6f42c1', dark: '#2c1a4d', light: '#ffffff', muted: '#7d6b99' },
        { name: 'Gris Corporativo', accent: '#525f7f', dark: '#212529', light: '#ffffff', muted: '#8898aa' },
        { name: 'Atardecer Coral', accent: '#fd7e14', dark: '#422105', light: '#ffffff', muted: '#a17a58' },
        { name: 'Menta Fresca', accent: '#20c997', dark: '#0c4e3b', light: '#ffffff', muted: '#669487' },
        { name: 'Cielo Despejado', accent: '#0dcaf0', dark: '#054f5e', light: '#212529', muted: '#568b96' },
        { name: 'Rosa Encendido', accent: '#d63384', dark: '#571435', light: '#ffffff', muted: '#a36685' },
        { name: 'Dorado Lujoso', accent: '#ffc107', dark: '#664d03', light: '#212529', muted: '#a18a4a' },
        { name: 'Medianoche', accent: '#495057', dark: '#111315', light: '#e9ecef', muted: '#adb5bd' },
        { name: 'Tierra', accent: '#8B4513', dark: '#3D1F0C', light: '#F5F5DC', muted: '#A0522D' },
        { name: 'Lavanda', accent: '#967bb6', dark: '#483263', light: '#ffffff', muted: '#b1a1c9' },
        { name: 'Grafito', accent: '#343a40', dark: '#000000', light: '#f8f9fa', muted: '#adb5bd' },
        { name: 'Vino Tinto', accent: '#800020', dark: '#33000d', light: '#ffffff', muted: '#a64059' },
        { name: 'Oliva', accent: '#556B2F', dark: '#222b13', light: '#FFFFF0', muted: '#8F9779' },
        { name: 'Cereza', accent: '#d2042d', dark: '#4f0111', light: '#ffffff', muted: '#d16078' },
        { name: 'Acero', accent: '#4682B4', dark: '#1c3447', light: '#ffffff', muted: '#7da7c9' },
        { name: 'Café', accent: '#6f4e37', dark: '#3a291d', light: '#f5f5f5', muted: '#9b8678' },
        { name: 'Primavera', accent: '#7CFC00', dark: '#316400', light: '#000000', muted: '#548324' }
    ];

    // --- 2. DOM ELEMENTS & CONFIG ---
    const formWrapper = document.getElementById('form-section-wrapper');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const cvPreviewWrapper = document.getElementById('cv-preview-wrapper');


    
    const iconOptions = {
        code: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
        briefcase: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
        pen: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`,
        chart: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
        lightbulb: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7c0-2.2-1.8-4-4-4S9.8 3.5 8.5 5.1"/><path d="M9 18c-1.3 0-2.5-.5-3.5-1.4C3.8 15 3 13.1 3 11c0-2.5 2-4.5 4.5-4.5"/><path d="M15 22v-4.5C15 15.4 13.9 14 12 14s-3 .3-3 3.5V22"/><path d="M12 14h0"/></svg>`,
        target: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
        "graduation-cap": `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.838l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12v5c0 3 2.5 5 5 5s5-2 5-5v-5"/></svg>`,
        cog: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 2v2M12 22v-2M20 12h2M2 12h-2M19.78 4.22l-1.42 1.42M5.64 18.36l-1.42-1.42M19.78 19.78l-1.42-1.42M5.64 5.64L4.22 4.22"/></svg>`
    };
    
    // --- 3. TEMPLATE & FORM FUNCTIONS ---
    let templates = {}; 
    const formRenderers = {};
    
    // --- HELPERS PARA PLANTILLAS ---
    // Agrupamos las funciones auxiliares para pasarlas a las plantillas
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
            if (!avatar || avatar.type === 'none') return ''; 
            switch (avatar.type) {
                case 'photo': case 'url': return `<img src="${avatar.value}" style="width:100%; height:100%; object-fit:cover;">`;
                case 'initials': return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background-color:rgba(0,0,0,0.2); font-size:3rem; font-weight:bold; color: white;">${avatar.value || templateHelpers.getInitials(data.personalInfo)}</div>`;
                case 'icon': case 'svg': return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background-color:rgba(0,0,0,0.2); padding: 20px; color: white;">${avatar.value || ''}</div>`;
                case 'quote': return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; padding: 1rem; text-align:center; background-color:rgba(0,0,0,0.1); color:white; font-family: var(--font-serif); font-style:italic;">“${avatar.value || 'Tu cita profesional aquí...'}”</div>`;
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
        renderExperienceItem: (e, data) => `<div style="margin-bottom:1.2rem"><div style="display:flex;justify-content:space-between;align-items:baseline"><h4 style="font-size:.9rem;font-weight:600; color:${data.textColorDark};">${e.position||''}</h4><p style="font-size:.75rem;font-weight:500;color:${data.textColorMuted};white-space:nowrap;margin-left:1rem">${templateHelpers.formatExperienceDate(e.startDate,e.endDate,e.current)}</p></div><p style="font-size:.85rem;font-style:italic;margin-bottom:.3rem; color:${data.textColorDark};">${e.company||''}</p><p style="font-size:.8rem;white-space:pre-wrap;line-height:1.5; color:${data.textColorDark};">${e.description||''}</p></div>`,
        renderEducationItem: (e, data) => `<div style="margin-bottom:1rem"><div style="display:flex;justify-content:space-between;align-items:baseline"><h4 style="font-size:.9rem;font-weight:600; color:${data.textColorDark};">${e.degree||''}</h4><p style="font-size:.75rem;font-weight:500;color:${data.textColorMuted};white-space:nowrap;margin-left:1rem">${templateHelpers.formatExperienceDate(e.startDate,e.endDate,e.current)}</p></div><p style="font-size:.85rem;font-style:italic;margin-bottom:.3rem; color:${data.textColorDark};">${e.institution||''}</p><p style="font-size:.8rem;white-space:pre-wrap;line-height:1.5; color:${data.textColorDark};">${e.description||''}</p></div>`,
        
        // --- Funciones de renderizado de secciones ---
        renderGenericSection: (title, items, renderItemFn, color, style = '') => {
            if (!items || items.length === 0) return '';
            return `<div style="margin-top:1.5rem; ${style}"><h3 style="font-family: var(--font-heading); font-size:1rem; font-weight:600; color:${color}; border-bottom:2px solid ${color}; padding-bottom:.25rem; margin-bottom:1rem; display:inline-block; text-transform: uppercase;">${title}</h3>${items.map(renderItemFn).join('')}</div>`;
        },
        renderOrderedSections: (data, layoutName = '') => {
            const sectionRenderers = {
                summary: (opts = {}) => templateHelpers.renderGenericSection(opts.title || 'Resumen', data.personalInfo.summary ? [{text: data.personalInfo.summary}] : [], item => `<p style="font-size:.85rem;line-height:1.6;white-space:pre-wrap; color:${data.textColorDark};">${item.text}</p>`, opts.color || data.themeColor, opts.style),
                experience: (opts = {}) => templateHelpers.renderGenericSection(opts.title || 'Experiencia', data.experience, e => templateHelpers.renderExperienceItem(e, data), opts.color || data.themeColor, opts.style),
                education: (opts = {}) => templateHelpers.renderGenericSection(opts.title || 'Educación', data.education, e => templateHelpers.renderEducationItem(e, data), opts.color || data.themeColor, opts.style),
                skills: (opts = {}) => {
                    let content;
                    if (layoutName === 'academic') {
                        content = templateHelpers.renderGenericSection(opts.title || 'Habilidades Clave', data.skills, s => `<li>${s.name} (${templateHelpers.levelLabels[s.level]})</li>`, opts.color || data.textColorDark).replace('<div','<ul').replace('</div>','</ul>');
                    } else if (layoutName === 'executive' || layoutName === 'creative') {
                        content = templateHelpers.renderGenericSection(opts.title || 'Habilidades', data.skills, s => `<span style="display:inline-block; background-color:#f1f1f1; color:${data.textColorDark}; padding: 0.3rem 0.8rem; border-radius: 4px; margin: 0.2rem; font-size:0.85rem;">${s.name}</span>`, opts.color || data.themeColor);
                    } else if (layoutName === 'technical') {
                        content = templateHelpers.renderGenericSection(opts.title || '// SKILLS', data.skills, s => `<span style="display:inline-block; border:1px solid ${data.themeColor}; color:${data.themeColor}; padding: 0.2rem 0.6rem; border-radius: 4px; margin: 0.2rem; font-size:0.8rem;">${s.name}</span>`, opts.color || data.themeColor);
                    } else {
                        content = templateHelpers.renderGenericSection(opts.title || 'Habilidades', data.skills, s => `<p style="font-size:0.8rem;margin-bottom:.4rem; color:${data.textColorDark};">${s.name}<span style="font-size:.7rem;opacity:.8"> (${templateHelpers.levelLabels[s.level]})</span></p>`, opts.color || data.themeColor);
                    }
                    return content;
                },
                impacts: (opts = {}) => templateHelpers.renderGenericSection(opts.title || 'Impacto Clave', data.impacts, item => `<div style="background:#f4f4f4; padding:0.8rem; border-left:4px solid ${data.themeColor}; margin-bottom:0.8rem; font-size:0.85rem; color:${data.textColorDark};">${item.description}</div>`, opts.color || data.themeColor, opts.style),
                portfolio: (opts = {}) => templateHelpers.renderGenericSection(opts.title || 'Portafolio', data.portfolio, item => `<div style="break-inside: avoid; margin-bottom: 1rem;"><img src="${item.img || 'https://via.placeholder.com/300x200/e9ecef/6c757d?text=Imagen'}" style="width:100%; height:auto; display:block; border-radius:4px; border: 1px solid #eee;"/><p style="font-size:0.8rem; text-align:center; margin-top:0.5rem; font-weight:500; color:${data.textColorDark};">${item.title}</p></div>`, opts.color || data.themeColor, opts.style || 'column-count:3; column-gap:1rem;')
            };
    
            return data.sectionOrder
                .map(key => sectionRenderers[key] ? sectionRenderers[key]() : '')
                .join('');
        }
    };


    const buildTemplateAndFormFunctions = () => {
        // Esta función ahora solo construye los renderizadores de formularios.
        // Las funciones de plantilla se manejan en `templateHelpers`.
        formRenderers.welcome = () => renderForm(`<div class="form-section" data-section="welcome"><h2 class="section-title">¡Bienvenido al Generador de CV Pro!</h2><p class="section-subtitle">Sigue estos sencillos pasos para crear tu currículum profesional.</p><div style="margin-top:2rem; display:flex; flex-direction:column; gap:1.5rem;"><div style="display:flex; gap:1rem;"><div style="flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--primary-accent); color:white; display:grid; place-items:center; font-weight:bold;">1</div><div><h3 style="margin:0 0 0.2rem 0;">Personaliza el Diseño</h3><p style="color:var(--color-muted-text);">Ve a la sección "Diseño" para elegir una plantilla y tu color favorito.</p></div></div><div style="display:flex; gap:1rem;"><div style="flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--primary-accent); color:white; display:grid; place-items:center; font-weight:bold;">2</div><div><h3 style="margin:0 0 0.2rem 0;">Completa las Secciones</h3><p style="color:var(--color-muted-text);">Usa la navegación para rellenar tu avatar, experiencia, educación y habilidades.</p></div></div><div style="display:flex; gap:1rem;"><div style="flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--primary-accent); color:white; display:grid; place-items:center; font-weight:bold;">3</div><div><h3 style="margin:0 0 0.2rem 0;">Descarga y Triunfa</h3><p style="color:var(--color-muted-text);">Cuando estés listo, presiona "Descargar PDF" para obtener tu CV profesional.</p></div></div></div></div>`);

        formRenderers.design = () => { 
            const hexColor = cvData.themeColor.startsWith('#') ? cvData.themeColor : '#dc3545';
            renderForm(`<div class="form-section" data-section="design">
                <h2 class="section-title">Diseño y Apariencia</h2>
                <p class="section-subtitle">Personaliza cómo se ve tu currículum.</p>

                <div class="design-tabs">
                    <div class="design-tab active" data-tab="templates">Plantillas</div>
                    <div class="design-tab" data-tab="colors">Colores</div>
                    <div class="design-tab" data-tab="backgrounds">Fondos</div>
                </div>

                <div class="design-content active" data-content="templates">
                    <div class="layout-selector">
                        ${Object.keys(templates).map(layout => `
                            <div class="layout-card ${cvData.layout === layout ? 'active' : ''}" data-layout="${layout}">
                                <div class="mini-preview-container"></div>
                                <p style="text-transform: capitalize;">${layout.replace('_', ' ')}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="design-content" data-content="colors">
                    <div class="subsection-title" style="margin-top:0;">Color de Acento</div>
                    <div class="colors">
                        <div class="color-dot ${cvData.themeColor==='#0d6efd'?'active':''}" data-color-value="#0d6efd" style="background:#0d6efd"></div>
                        <div class="color-dot ${cvData.themeColor==='#198754'?'active':''}" data-color-value="#198754" style="background:#198754"></div>
                        <div class="color-dot ${cvData.themeColor==='#6f42c1'?'active':''}" data-color-value="#6f42c1" style="background:#6f42c1"></div>
                        <div class="color-dot ${cvData.themeColor==='#dc3545'?'active':''}" data-color-value="#dc3545" style="background:#dc3545"></div>
                        <div class="color-dot ${cvData.themeColor==='#525f7f'?'active':''}" data-color-value="#525f7f" style="background:#525f7f"></div>
                        <div class="color-dot ${cvData.themeColor==='#e83e8c'?'active':''}" data-color-value="#e83e8c" style="background:#e83e8c"></div>
                        <input type="color" id="custom-color-picker" value="${hexColor}">
                    </div>
                    <div class="subsection-title-flex">
                        <div class="subsection-title">Colores del Texto</div>
                        <button id="reset-colors-btn" class="btn btn-sm" title="Restablecer colores por defecto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                            Restablecer
                        </button>
                    </div>
                    <div class="text-color-pickers">
                        <div class="form-group"><label for="text-color-dark">Texto Principal</label><input type="color" id="text-color-dark" data-color-type="textColorDark" value="${cvData.textColorDark}"></div>
                        <div class="form-group"><label for="text-color-light">Texto Claro</label><input type="color" id="text-color-light" data-color-type="textColorLight" value="${cvData.textColorLight}"></div>
                        <div class="form-group"><label for="text-color-muted">Texto Tenue</label><input type="color" id="text-color-muted" data-color-type="textColorMuted" value="${cvData.textColorMuted}"></div>
                    </div>
                    <div class="subsection-title">Paletas Predeterminadas</div>
                    <div class="palette-selector">
                        ${colorPalettes.map((p, index) => `
                            <div class="palette-swatch" data-palette-index="${index}" title="${p.name}">
                                <div style="background-color:${p.accent}"></div><div style="background-color:${p.dark}"></div><div style="background-color:${p.light}; border:1px solid #ddd;"></div><div style="background-color:${p.muted}"></div>
                            </div>`).join('')}
                    </div>
                </div>

                <div class="design-content" data-content="backgrounds">
                    <div class="gradient-tabs">
                        <div class="gradient-tab active" data-tab="raya">Rayados (${loadedGradients.raya.length})</div>
                        <div class="gradient-tab" data-tab="simple">Gradientes (${loadedGradients.simple.length})</div>
                    </div>
                    <div class="gradient-content active" data-content="raya"><div class="gradient-selector">${loadedGradients.raya.map(grad => `<div class="gradient-swatch ${cvData.backgroundGradient === grad ? 'active' : ''}" style="background: ${grad};" data-gradient-value="${grad}"></div>`).join('')}</div></div>
                    <div class="gradient-content" data-content="simple"><div class="gradient-selector">${loadedGradients.simple.map(grad => `<div class="gradient-swatch ${cvData.backgroundGradient === grad ? 'active' : ''}" style="background: ${grad};" data-gradient-value="${grad}"></div>`).join('')}</div></div>
                    <div class="form-group" style="margin-top: 1.5rem;">
                        <label for="background-gradient-input">Fondo Personalizado</label>
                        <p style="color:var(--color-muted-text); margin-bottom: 0.5rem; font-size: 0.85rem;">Pega un gradiente de <a href="https://www.gradientmagic.com/" target="_blank">Gradient Magic</a> o pídele uno nuevo a ChatGPT.</p>
                        <textarea id="background-gradient-input" rows="3" placeholder="Pega el código CSS de un 'linear-gradient' o 'radial-gradient' aquí...">${cvData.backgroundGradient || ''}</textarea>
                    </div>
                </div>
            </div>`);
        };
        formRenderers.avatar = () => {
            const { type, value } = cvData.avatar || {type:'initials', value:''};
            renderForm(`<div class="form-section" data-section="avatar"><h2 class="section-title">Tu Avatar Profesional</h2><p class="section-subtitle">Elige cómo quieres presentarte.</p><div class="avatar-tabs"><div class="avatar-tab ${type==='none'?'active':''}" data-type="none">Nada</div><div class="avatar-tab ${type==='photo'?'active':''}" data-type="photo">Foto</div><div class="avatar-tab ${type==='url'?'active':''}" data-type="url">URL Imagen</div><div class="avatar-tab ${type==='initials'?'active':''}" data-type="initials">Iniciales</div><div class="avatar-tab ${type==='icon'?'active':''}" data-type="icon">Icono</div><div class="avatar-tab ${type==='svg'?'active':''}" data-type="svg">Código SVG</div><div class="avatar-tab ${type==='quote'?'active':''}" data-type="quote">Cita</div><div class="avatar-tab ${type==='qr'?'active':''}" data-type="qr">Código QR</div></div><div class="avatar-content ${type==='none'?'active':''}" data-content="none"><p style="color:var(--color-muted-text);">Se eliminará el avatar para un diseño más minimalista.</p></div><div class="avatar-content ${type==='photo'?'active':''}" data-content="photo"><div style="display:flex;align-items:center;gap:1rem;"><img id="photo-preview" src="${type==='photo'&&value?value:'https://via.placeholder.com/120/e9ecef/6c757d?text=Foto'}"><div style="display:flex;flex-direction:column;gap:0.5rem;"><label for="photo-input" class="btn btn-secondary">Seleccionar Archivo</label><input type="file" id="photo-input" style="display:none;" accept="image/*">${type==='photo'&&value?'<button id="remove-photo-btn" class="btn">Eliminar Foto</button>':''}</div></div></div><div class="avatar-content ${type==='url'?'active':''}" data-content="url"><div class="form-group"><label for="image-url-input">URL de la imagen</label><input type="text" id="image-url-input" value="${type==='url'?value:''}" placeholder="https://ejemplo.com/foto.jpg"></div></div><div class="avatar-content ${type==='initials'?'active':''}" data-content="initials"><div class="form-group"><label for="initials-input">Tus Iniciales (1-3 caracteres)</label><input type="text" id="initials-input" maxlength="3" value="${type==='initials'?value:''}" placeholder="HD"></div></div><div class="avatar-content ${type==='icon'?'active':''}" data-content="icon"><p>Elige un ícono:</p><div class="icon-selector">${Object.entries(iconOptions).map(([key,svg])=>`<div class="icon-option ${type==='icon' && value===svg ? 'active' : ''}" data-icon-key="${key}">${svg}</div>`).join('')}</div></div><div class="avatar-content ${type==='svg'?'active':''}" data-content="svg"><div class="form-group"><label for="svg-code-input">Código SVG</label><textarea id="svg-code-input" placeholder='<svg width="24" ...></svg>' rows="5">${type==='svg'?value:''}</textarea></div></div><div class="avatar-content ${type==='quote'?'active':''}" data-content="quote"><div class="form-group"><label for="quote-input">Cita o Lema Profesional</label><textarea id="quote-input" placeholder="Ej: Pasión por crear soluciones eficientes..." rows="3">${type==='quote'?value:''}</textarea></div></div><div class="avatar-content ${type==='qr'?'active':''}" data-content="qr"><div class="form-group"><label for="qr-url-input">URL para el Código QR</label><input type="text" id="qr-url-input" value="${type==='qr'?value:''}" placeholder="https://linkedin.com/in/tu-usuario"></div></div></div>`);
        };
        formRenderers.personal = () => {const p=cvData.personalInfo;renderForm(`<div class="form-section" data-section="personal"><h2 class="section-title">Información Personal</h2><p class="section-subtitle">Los datos básicos para que puedan contactarte.</p><div class="form-grid"><div class="form-group"><label>Nombre(s)</label><input type="text" name="firstName" value="${p.firstName||''}"></div><div class="form-group"><label>Apellidos</label><input type="text" name="lastName" value="${p.lastName||''}"></div></div><div class="form-group"><label>Profesión</label><input type="text" name="title" value="${p.title||''}"></div><div class="form-grid"><div class="form-group"><label>Email</label><input type="email" name="email" value="${p.email||''}"></div><div class="form-group"><label>Teléfono</label><input type="tel" name="phone" value="${p.phone||''}"></div></div><div class="form-group"><label>Dirección</label><input type="text" name="address" value="${p.address||''}"></div><div class="form-group"><label>Web (sin https://)</label><input type="text" name="website" value="${p.website||''}"></div><div class="form-group"><label>Resumen</label><textarea name="summary" rows="5">${p.summary||''}</textarea></div></div>`)};
        formRenderers.skills = () => {renderForm(`<div class="form-section" data-section="skills"><h2 class="section-title">Habilidades</h2><p class="section-subtitle">Añade las tecnologías y competencias que dominas.</p><form id="skills-form" style="display:flex; gap:1rem; align-items:flex-end; margin-bottom:1.5rem;"><div class="form-group" style="flex-grow:1; margin-bottom:0;"><label for="skillName">Habilidad</label><input id="skillName" placeholder="Python..."></div><div class="form-group" style="margin-bottom:0;"><label for="skillLevel">Nivel</label><select id="skillLevel"><option value="expert">Experto</option><option value="advanced">Avanzado</option><option value="intermediate">Intermedio</option><option value="beginner">Principiante</option></select></div><button type="submit" class="btn btn-secondary" style="height:fit-content;">+ Añadir</button></form><hr style="margin:1.5rem 0;border:none;border-top:1px solid var(--color-border);"><div class="skills-list">${cvData.skills.map(s=>`<div class="skill-badge" data-id="${s.id}">${s.name}<button class="btn-delete" data-action="delete" data-section="skills" data-id="${s.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div>`).join('')}</div></div>`)};
        const dynamicListRenderer = (section, config) => {renderForm(`<div class="form-section" data-section="${section}"><h2 class="section-title">${config.title}</h2><p class="section-subtitle">${config.subtitle}</p><div class="add-item-container"><button class="btn btn-secondary" data-action="add" data-section="${section}">+ Añadir ${config.singularTitle}</button></div><div class="dynamic-list">${(cvData[section] || []).map(item=>`<div class="item" data-id="${item.id}"><div class="item-header"><h4>${item.position||item.degree||'Nuevo Elemento'}</h4><button class="btn-delete" data-action="delete" data-section="${section}" data-id="${item.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div><div class="form-grid"><div class="form-group"><label>${config.field1}</label><input type="text" name="${config.name1}" value="${item[config.name1]||''}"></div><div class="form-group"><label>${config.field2}</label><input type="text" name="${config.name2}" value="${item[config.name2]||''}"></div></div><div class="form-grid"><div class="form-group"><label>Fecha Inicio</label><input type="month" name="startDate" value="${item.startDate||''}"></div><div class="form-group"><label>Fecha Fin</label><input type="month" name="endDate" value="${item.endDate||''}" ${item.current?'disabled':''}></div></div><div class="form-group" style="font-size:.9rem;"><label style="display:flex;align-items:center;gap:.5rem;"><input type="checkbox" name="current" ${item.current?'checked':''}> Actualmente aquí</label></div><div class="form-group"><label>Descripción</label><textarea name="description" rows="4">${item.description||''}</textarea></div></div>`).join('')}</div></div>`);}
        formRenderers.experience = () => dynamicListRenderer('experience', {title:'Experiencia Laboral', singularTitle: 'Experiencia', subtitle:'Describe tus roles anteriores.', field1:'Cargo', name1:'position', field2:'Empresa', name2:'company'});
        formRenderers.education = () => dynamicListRenderer('education', {title:'Educación', singularTitle: 'Formación', subtitle:'Tu formación académica.', field1:'Título', name1:'degree', field2:'Institución', name2:'institution'});
        formRenderers.footer = () => {renderForm(`<div class="form-section" data-section="footer"><h2 class="section-title">Pie de Página</h2><p class="section-subtitle">Añade enlaces o texto final.</p><form id="footer-form" style="display:flex; flex-direction:column; gap:1rem; margin-bottom:1.5rem;"><div class="form-grid"><div class="form-group" style="margin:0;"><label for="footer-item-type">Tipo</label><select id="footer-item-type">${Object.keys(footerIcons).map(k => `<option value="${k}">${k.charAt(0).toUpperCase() + k.slice(1)}</option>`).join('')}</select></div><div class="form-group" style="margin:0;"><label for="footer-item-label">Etiqueta (opcional)</label><input id="footer-item-label" placeholder="LinkedIn"></div></div><div class="form-group" style="margin:0;"><label for="footer-item-value">Valor</label><input id="footer-item-value" placeholder="tu-usuario"></div><button type="button" class="btn btn-secondary" data-action="add" data-section="footer" style="align-self: flex-start;">+ Añadir Elemento</button></form><hr style="margin:1.5rem 0;border:none;border-top:1px solid var(--color-border);"><div class="footer-list" style="display:flex;flex-direction:column; gap:0.5rem;">${cvData.footer.map(f=>`<div class="footer-item" style="background:#f8f9fa; border:1px solid #eee;" data-id="${f.id}"> ${footerIcons[f.type]} <span>${f.label||''}</span> <p>${f.value}</p> <button class="btn-delete" style="margin-left:auto;" data-action="delete" data-section="footer" data-id="${f.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div>`).join('')}</div></div>`)};
        formRenderers.impacts = () => {renderForm(`<div class="form-section" data-section="impacts"><h2 class="section-title">Impacto Clave</h2><p class="section-subtitle">Añade tus logros más importantes y cuantificables.</p><div class="add-item-container"><button class="btn btn-secondary" data-action="add" data-section="impacts">+ Añadir Logro</button></div><div class="dynamic-list">${(cvData.impacts || []).map(item => `<div class="item" data-id="${item.id}"><div class="item-header"><h4>Logro Clave</h4><button class="btn-delete" data-action="delete" data-section="impacts" data-id="${item.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div><div class="form-group"><label>Descripción del logro</label><textarea name="description" rows="3">${item.description || ''}</textarea></div></div>`).join('')}</div></div>`);};
        formRenderers.portfolio = () => {renderForm(`<div class="form-section" data-section="portfolio"><h2 class="section-title">Portafolio</h2><p class="section-subtitle">Muestra tus mejores trabajos visuales.</p><div class="add-item-container"><button class="btn btn-secondary" data-action="add" data-section="portfolio">+ Añadir Proyecto</button></div><div class="dynamic-list">${cvData.portfolio.map(item => `<div class="item" data-id="${item.id}"><div class="item-header"><h4>${item.title || 'Nuevo Proyecto'}</h4><button class="btn-delete" data-action="delete" data-section="portfolio" data-id="${item.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div><div style="display: flex; gap: 1rem; align-items: flex-start;"><img src="${item.img || 'https://via.placeholder.com/100x75/e9ecef/6c757d?text=Vista'}" style="width: 100px; height: 75px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--color-border);" class="portfolio-preview"><div style="flex-grow: 1;"><div class="form-group"><label>Título del Proyecto</label><input type="text" name="title" value="${item.title || ''}"></div><div class="form-group" style="margin-bottom:0;"><label>URL de la Imagen</label><input type="text" name="img" value="${item.img || ''}" placeholder="https://ejemplo.com/imagen.png"></div></div></div></div>`).join('')}</div></div>`);};
        formRenderers.structure = () => {
            const sectionLabels = { summary: 'Resumen', experience: 'Experiencia', education: 'Educación', skills: 'Habilidades', impacts: 'Impacto Clave', portfolio: 'Portafolio' };
            renderForm(`<div class="form-section" data-section="structure"><h2 class="section-title">Organizar Secciones</h2><p class="section-subtitle">Arrastra y suelta las secciones para cambiar su orden en el CV.</p><div id="section-order-list">${cvData.sectionOrder.map(sectionKey => `<div class="draggable-item" draggable="true" data-section-key="${sectionKey}"><svg class="drag-handle" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg><span>${sectionLabels[sectionKey]}</span></div>`).join('')}</div></div>`);
        };
    };

    // --- NUEVA FUNCIÓN PARA CARGAR PLANTILLAS ---
    const loadTemplates = async () => {
        try {
            const response = await fetch('json-html/html.json');
            const templateStrings = await response.json();
            
            // Convertir las cadenas de texto de vuelta a funciones
            for (const key in templateStrings) {
                // Usamos el constructor de Function para evaluar la cadena de texto.
                // Esto es seguro aquí porque estamos cargando nuestro propio código de confianza.
                templates[key] = new Function('data', 'helpers', 'return ((' + templateStrings[key] + ')(data, helpers))');
            }
            
            // Construimos las funciones del formulario DESPUÉS de cargar las plantillas
            buildTemplateAndFormFunctions();

        } catch (error) {
            console.error("Error al cargar las plantillas de CV:", error);
            // Podríamos tener una plantilla de respaldo o mostrar un error
        }
    };

    // --- NUEVA FUNCIÓN PARA CARGAR GRADIENTES ---
    const loadGradientPresets = async () => {
        try {
            const [responseRaya, responseGradients] = await Promise.all([
                fetch('json-gradientes/gradientesraya.json'),
                fetch('json-gradientes/gradients.json')
            ]);

            loadedGradients.raya = await responseRaya.json();
            const gradientsJson = await responseGradients.json();

            loadedGradients.simple = gradientsJson.map(g => 
                `linear-gradient(45deg, ${g.colors.join(', ')})`
            );

        } catch (error) {
            console.error("Error al cargar los presets de gradientes:", error);
            loadedGradients.raya = [];
            loadedGradients.simple = [];
        }
    };

    // --- 4. CORE FUNCTIONS ---
    const renderForm = (html) => {
        formWrapper.innerHTML = html;
        requestAnimationFrame(() => formWrapper.querySelector('.form-section')?.classList.add('active'));
    };
    const renderCVPreview = () => {
        const themeColor = cvData.themeColor || '#525f7f';
        document.documentElement.style.setProperty('--primary-accent', themeColor);
        const layout = cvData.layout || 'classic';
        cvPreviewWrapper.dataset.layout = layout;
        const templateFn = templates[layout];
        if(typeof templateFn !== 'function') {
            console.error(`La plantilla "${layout}" no existe o no es una función.`);
            cvPreviewWrapper.innerHTML = `<div style="padding:2rem; text-align:center; color:red;">Error: La plantilla seleccionada no se pudo cargar.</div>`;
            return;
        }
        // Pasamos tanto los datos del CV como las funciones auxiliares a la plantilla
        cvPreviewWrapper.innerHTML = templateFn(cvData, templateHelpers);
    };
    
    const setActiveSection = (sectionName) => {
        if (!sectionName) return;
        document.querySelectorAll('.editor-nav .nav-item').forEach(item => item.classList.toggle('active', item.getAttribute('href') === `#${sectionName}`));
        
        const renderer = formRenderers[sectionName];
        if (typeof renderer === 'function') {
            renderer(); 

            if (sectionName === 'design') {
                document.querySelectorAll('.layout-selector .mini-preview-container').forEach(container => {
                    const layoutCard = container.closest('.layout-card');
                    if (layoutCard) {
                        const layoutName = layoutCard.dataset.layout;
                        const templateFn = templates[layoutName];
                        if (templateFn) {
                            container.innerHTML = templateFn(cvData, templateHelpers);
                        }
                    }
                });
            }

            // Si la sección es 'structure', inicializamos el drag and drop
            if (sectionName === 'structure') {
                setupDragAndDrop();
            }
        } else {
            console.error(`No se encontró un renderer para la sección: "${sectionName}"`);
            formWrapper.innerHTML = `<div class="form-section active"><h2 class="section-title">Error</h2><p>No se pudo cargar esta sección.</p></div>`;
        }
    };

    // --- DRAG & DROP LOGIC ---
    const setupDragAndDrop = () => {
        const list = document.getElementById('section-order-list');
        if (!list) return;

        let draggedItem = null;

        list.addEventListener('dragstart', e => {
            draggedItem = e.target;
            setTimeout(() => e.target.classList.add('dragging'), 0);
        });

        list.addEventListener('dragend', e => {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
            const newOrder = [...list.querySelectorAll('.draggable-item')].map(item => item.dataset.sectionKey);
            cvData.sectionOrder = newOrder;
            renderCVPreview();
        });

        list.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = [...list.querySelectorAll('.draggable-item:not(.dragging)')].reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = e.clientY - box.top - box.height / 2;
                return (offset < 0 && offset > closest.offset) ? { offset: offset, element: child } : closest;
            }, { offset: Number.NEGATIVE_INFINITY }).element;
            
            if (afterElement == null) { list.appendChild(draggedItem); } 
            else { list.insertBefore(draggedItem, afterElement); }
        });
    };

    // --- 5. INITIALIZATION & EVENT LISTENERS ---
    async function init() {
        await Promise.all([
            loadTemplates(),
            loadGradientPresets()
        ]);

        downloadPdfBtn.addEventListener('click', () => window.print());
        document.querySelectorAll('.editor-nav .nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                setActiveSection(item.getAttribute('href').substring(1));
            });
        });



        formWrapper.addEventListener('input', (e) => {
            const { target } = e; 
            const section = target.closest('.form-section')?.dataset.section; 
            if (!section) return;

            if (section === 'personal') {
                cvData.personalInfo[target.name] = target.value;
            } else if (['experience', 'education', 'impacts', 'portfolio'].includes(section)) {
                const itemEl = target.closest('.item');
                if(!itemEl) return;
                const itemId = itemEl.dataset.id;
                const item = cvData[section].find(i => i.id == itemId);
                if (item) {
                    item[target.name] = target.type === 'checkbox' ? target.checked : target.value;
                    if (target.name === 'current') {
                        const endDateInput = itemEl.querySelector('input[name="endDate"]');
                        if (endDateInput) endDateInput.disabled = target.checked;
                        if (target.checked) item.endDate = '';
                    }
                    if (section === 'portfolio') {
                         if(target.name === 'img') {
                            const previewImg = itemEl.querySelector('.portfolio-preview');
                            previewImg.src = target.value || 'https://via.placeholder.com/100x75/e9ecef/6c757d?text=Vista';
                        }
                         if(target.name === 'title') {
                            itemEl.querySelector('.item-header h4').textContent = target.value || 'Nuevo Proyecto';
                        }
                    }
                }
            } else if (target.id === 'background-gradient-input') {
                cvData.backgroundGradient = target.value;
                document.querySelectorAll('.gradient-swatch.active').forEach(swatch => swatch.classList.remove('active'));
            } else if (section === 'design' && target.id === 'custom-color-picker') {
                cvData.themeColor = target.value;
            } else if (section === 'design' && target.dataset.colorType) {
                const colorType = target.dataset.colorType;
                cvData[colorType] = target.value;
            } else if (section === 'avatar') {
                if (target.id === 'initials-input') cvData.avatar = { type: 'initials', value: target.value.toUpperCase() };
                if (target.id === 'image-url-input') cvData.avatar = { type: 'url', value: target.value };
                if (target.id === 'svg-code-input') cvData.avatar = { type: 'svg', value: target.value };
                if (target.id === 'quote-input') cvData.avatar = { type: 'quote', value: target.value };
                if (target.id === 'qr-url-input') cvData.avatar = { type: 'qr', value: target.value };
            }
            renderCVPreview();
        });

        formWrapper.addEventListener('click', (e) => {
            const button = e.target.closest('button, .avatar-tab, .icon-option, .layout-card, .color-dot, .gradient-swatch, .gradient-tab, .design-tab, .palette-swatch');
            if (!button) return;

            const section = button.dataset.section || button.closest('.form-section')?.dataset.section;
            let action = button.dataset.action || 
                           (button.classList.contains('avatar-tab') && 'switchTab') || 
                           (button.classList.contains('icon-option') && 'selectIcon') || 
                           (button.id === 'reset-colors-btn' && 'resetColors') ||
                           (button.id === 'remove-photo-btn' && 'removePhoto') || 
                           (button.classList.contains('layout-card') && 'selectLayout') || 
                           (button.classList.contains('color-dot') && 'selectColor') ||
                           (button.classList.contains('gradient-swatch') && 'selectGradient');
            
            if (!action) {
                if (button.classList.contains('gradient-tab')) action = 'switchGradientTab';
                else if (button.classList.contains('design-tab')) action = 'switchDesignTab';
                else if (button.classList.contains('palette-swatch')) action = 'selectPalette';
            }

            if (action) {
                 if (section === 'footer' && action === 'add') {
                    const typeInput = document.getElementById('footer-item-type');
                    const labelInput = document.getElementById('footer-item-label');
                    const valueInput = document.getElementById('footer-item-value');
                    if (valueInput.value.trim()) {
                        cvData.footer.push({ id: Date.now(), type: typeInput.value, label: labelInput.value.trim(), value: valueInput.value.trim() });
                        labelInput.value = ''; valueInput.value = '';
                    }
                } else if (action === 'add') {
                    let newItem;
                    if (section === 'impacts') newItem = { id: Date.now(), description: '' };
                    else if (section === 'portfolio') newItem = { id: Date.now(), title: 'Nuevo Proyecto', img: '' };
                    else if (['experience', 'education'].includes(section)) newItem = { id: Date.now(), description: '' };
                    else newItem = { id: Date.now() };
                    
                    if(cvData[section]) cvData[section].push(newItem);
                } else if (action === 'delete') {
                    if(cvData[section]) cvData[section] = cvData[section].filter(i => i.id != button.dataset.id);
                } else if (action === 'switchTab') {
                    const newType = button.dataset.type;
                    if (cvData.avatar.type !== newType) { 
                        cvData.avatar.type = newType;
                        if (!['url', 'initials', 'svg', 'quote', 'qr'].includes(newType)) {
                           cvData.avatar.value = cvData.avatar.value || '';
                        }
                    }
                } else if (action === 'selectIcon') {
                    cvData.avatar = { type: 'icon', value: iconOptions[button.dataset.iconKey] };
                } else if (action === 'removePhoto') {
                    cvData.avatar = { type: 'photo', value: '' };
                } else if (action === 'selectLayout') {
                    cvData.layout = button.dataset.layout;
                } else if (action === 'selectColor') {
                    cvData.themeColor = button.dataset.colorValue;
                } else if (action === 'selectPalette') {
                    const palette = colorPalettes[button.dataset.paletteIndex];
                    if (palette) {
                        cvData.themeColor = palette.accent;
                        cvData.textColorDark = palette.dark;
                        cvData.textColorLight = palette.light;
                        cvData.textColorMuted = palette.muted;
                    }
                } else if (action === 'resetColors') {
                    const defaultPalette = colorPalettes[0];
                    cvData.themeColor = defaultPalette.accent; cvData.textColorDark = defaultPalette.dark; cvData.textColorLight = defaultPalette.light; cvData.textColorMuted = defaultPalette.muted;
                } else if (action === 'selectGradient') {
                    cvData.backgroundGradient = button.dataset.gradientValue;
                } else if (action === 'switchGradientTab') {
                    const tabName = button.dataset.tab;
                    document.querySelectorAll('.gradient-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
                    document.querySelectorAll('.gradient-content').forEach(c => c.classList.toggle('active', c.dataset.content === tabName));
                    // No es necesario renderizar el CV aquí, solo cambiar de pestaña
                    return; 
                } else if (action === 'switchDesignTab') {
                    const tabName = button.dataset.tab;
                    document.querySelectorAll('.design-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
                    document.querySelectorAll('.design-content').forEach(c => c.classList.toggle('active', c.dataset.content === tabName));
                    return; 
                }
                
                if(section) setActiveSection(section);
                renderCVPreview();
            }
        });

        formWrapper.addEventListener('submit', (e) => {
            if (e.target.id === 'skills-form') {
                e.preventDefault();
                const nameInput = e.target.querySelector('#skillName');
                const level = e.target.querySelector('#skillLevel').value;
                if (nameInput.value.trim()) {
                    cvData.skills.push({ id: Date.now(), name: nameInput.value.trim(), level });
                    setActiveSection('skills');
                    renderCVPreview();
                }
            }
        });

        formWrapper.addEventListener('change', (e) => {
            if (e.target.id === 'photo-input' && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    cvData.avatar = { type: 'photo', value: event.target.result };
                    setActiveSection('avatar');
                    renderCVPreview();
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
        
        setActiveSection('welcome');
        renderCVPreview();
    }

    init();
});