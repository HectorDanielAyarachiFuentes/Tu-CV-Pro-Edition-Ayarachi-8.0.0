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

    // Hacemos una copia profunda del estado inicial para poder restaurarlo.
    const defaultCvData = JSON.parse(JSON.stringify(cvData));

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
    const downloadHtmlBtn = document.getElementById('download-html-btn');
    const resetCvBtn = document.getElementById('reset-cv-btn');
    const cvPreviewWrapper = document.getElementById('cv-preview-wrapper');
    const saveNotificationEl = document.getElementById('save-notification');

    let loadedIcons = [];
    let svgCache = {};
    
    // --- 3. TEMPLATE & FORM FUNCTIONS ---
    let templates = {}; 
    const formRenderers = {};
    
    // --- 3a. FORM RENDERER HELPERS ---
    // Funciones que generan el HTML para cada sección del formulario.
    // Esto hace que la función `buildFormRenderers` sea más limpia.
    const renderWelcomeFormHTML = () => `<div class="form-section" data-section="welcome"><h2 class="section-title">¡Bienvenido al Generador de CV Pro!</h2><p class="section-subtitle">Sigue estos sencillos pasos para crear tu currículum profesional.</p><div style="margin-top:2rem; display:flex; flex-direction:column; gap:1.5rem;"><div style="display:flex; gap:1rem;"><div style="flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--primary-accent); color:white; display:grid; place-items:center; font-weight:bold;">1</div><div><h3 style="margin:0 0 0.2rem 0;">Personaliza el Diseño</h3><p style="color:var(--color-muted-text);">Ve a la sección "Diseño" para elegir una plantilla y tu color favorito.</p></div></div><div style="display:flex; gap:1rem;"><div style="flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--primary-accent); color:white; display:grid; place-items:center; font-weight:bold;">2</div><div><h3 style="margin:0 0 0.2rem 0;">Completa las Secciones</h3><p style="color:var(--color-muted-text);">Usa la navegación para rellenar tu avatar, experiencia, educación y habilidades.</p></div></div><div style="display:flex; gap:1rem;"><div style="flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--primary-accent); color:white; display:grid; place-items:center; font-weight:bold;">3</div><div><h3 style="margin:0 0 0.2rem 0;">Descarga y Triunfa</h3><p style="color:var(--color-muted-text);">Cuando estés listo, presiona "Descargar PDF" para obtener tu CV profesional.</p></div></div></div></div>`;
    const renderDesignFormHTML = () => {
        const hexColor = cvData.themeColor.startsWith('#') ? cvData.themeColor : '#dc3545';
        return `<div class="form-section" data-section="design"><h2 class="section-title">Diseño y Apariencia</h2><p class="section-subtitle">Personaliza cómo se ve tu currículum.</p><div class="design-tabs"><div class="design-tab active" data-tab="templates">Plantillas</div><div class="design-tab" data-tab="colors">Colores</div><div class="design-tab" data-tab="backgrounds">Fondos</div></div><div class="design-content active" data-content="templates"><div class="layout-selector">${Object.keys(templates).map(layout => `<div class="layout-card ${cvData.layout === layout ? 'active' : ''}" data-layout="${layout}"><div class="mini-preview-container"></div><p style="text-transform: capitalize;">${layout.replace('_', ' ')}</p></div>`).join('')}</div></div><div class="design-content" data-content="colors"><div class="subsection-title" style="margin-top:0;">Color de Acento</div><div class="colors"><div class="color-dot ${cvData.themeColor==='#0d6efd'?'active':''}" data-color-value="#0d6efd" style="background:#0d6efd"></div><div class="color-dot ${cvData.themeColor==='#198754'?'active':''}" data-color-value="#198754" style="background:#198754"></div><div class="color-dot ${cvData.themeColor==='#6f42c1'?'active':''}" data-color-value="#6f42c1" style="background:#6f42c1"></div><div class="color-dot ${cvData.themeColor==='#dc3545'?'active':''}" data-color-value="#dc3545" style="background:#dc3545"></div><div class="color-dot ${cvData.themeColor==='#525f7f'?'active':''}" data-color-value="#525f7f" style="background:#525f7f"></div><div class="color-dot ${cvData.themeColor==='#e83e8c'?'active':''}" data-color-value="#e83e8c" style="background:#e83e8c"></div><input type="color" id="custom-color-picker" value="${hexColor}"></div><div class="subsection-title-flex"><div class="subsection-title">Colores del Texto</div><button id="reset-colors-btn" class="btn btn-sm" title="Restablecer colores por defecto"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Restablecer</button></div><div class="text-color-pickers"><div class="form-group"><label for="text-color-dark">Texto Principal</label><input type="color" id="text-color-dark" data-color-type="textColorDark" value="${cvData.textColorDark}"></div><div class="form-group"><label for="text-color-light">Texto Claro</label><input type="color" id="text-color-light" data-color-type="textColorLight" value="${cvData.textColorLight}"></div><div class="form-group"><label for="text-color-muted">Texto Tenue</label><input type="color" id="text-color-muted" data-color-type="textColorMuted" value="${cvData.textColorMuted}"></div></div><div class="subsection-title">Paletas Predeterminadas</div><div class="palette-selector">${colorPalettes.map((p, index) => `<div class="palette-swatch" data-palette-index="${index}" title="${p.name}"><div style="background-color:${p.accent}"></div><div style="background-color:${p.dark}"></div><div style="background-color:${p.light}; border:1px solid #ddd;"></div><div style="background-color:${p.muted}"></div></div>`).join('')}</div></div><div class="design-content" data-content="backgrounds"><div class="gradient-tabs"><div class="gradient-tab active" data-tab="raya">Rayados (${loadedGradients.raya.length})</div><div class="gradient-tab" data-tab="simple">Gradientes (${loadedGradients.simple.length})</div></div><div class="gradient-content active" data-content="raya"><div class="gradient-selector">${loadedGradients.raya.map(grad => `<div class="gradient-swatch ${cvData.backgroundGradient === grad ? 'active' : ''}" style="background: ${grad};" data-gradient-value="${grad}"></div>`).join('')}</div></div><div class="gradient-content" data-content="simple"><div class="gradient-selector">${loadedGradients.simple.map(grad => `<div class="gradient-swatch ${cvData.backgroundGradient === grad ? 'active' : ''}" style="background: ${grad};" data-gradient-value="${grad}"></div>`).join('')}</div></div><div class="form-group" style="margin-top: 1.5rem;"><label for="background-gradient-input">Fondo Personalizado</label><p style="color:var(--color-muted-text); margin-bottom: 0.5rem; font-size: 0.85rem;">Pega un gradiente de <a href="https://www.gradientmagic.com/" target="_blank">Gradient Magic</a> o pídele uno nuevo a ChatGPT.</p><textarea id="background-gradient-input" rows="3" placeholder="Pega el código CSS de un 'linear-gradient' o 'radial-gradient' aquí...">${cvData.backgroundGradient || ''}</textarea></div></div></div>`;
    };
    const renderAvatarFormHTML = () => {
        const { type, value } = cvData.avatar || {type:'initials', value:''};
        return `<div class="form-section" data-section="avatar"><h2 class="section-title">Tu Avatar Profesional</h2><p class="section-subtitle">Elige cómo quieres presentarte.</p><div class="avatar-tabs"><div class="avatar-tab ${type==='none'?'active':''}" data-type="none">Nada</div><div class="avatar-tab ${type==='photo'?'active':''}" data-type="photo">Foto</div><div class="avatar-tab ${type==='url'?'active':''}" data-type="url">URL Imagen</div><div class="avatar-tab ${type==='initials'?'active':''}" data-type="initials">Iniciales</div><div class="avatar-tab ${type==='icon'?'active':''}" data-type="icon">Icono</div><div class="avatar-tab ${type==='svg'?'active':''}" data-type="svg">Código SVG</div><div class="avatar-tab ${type==='quote'?'active':''}" data-type="quote">Cita</div><div class="avatar-tab ${type==='qr'?'active':''}" data-type="qr">Código QR</div></div><div class="avatar-content ${type==='none'?'active':''}" data-content="none"><p style="color:var(--color-muted-text);">Se eliminará el avatar para un diseño más minimalista.</p></div><div class="avatar-content ${type==='photo'?'active':''}" data-content="photo"><div style="display:flex;align-items:center;gap:1rem;"><img id="photo-preview" src="${type==='photo'&&value?value:'https://via.placeholder.com/120/e9ecef/6c757d?text=Foto'}"><div style="display:flex;flex-direction:column;gap:0.5rem;"><label for="photo-input" class="btn btn-secondary">Seleccionar Archivo</label><input type="file" id="photo-input" style="display:none;" accept="image/*">${type==='photo'&&value?'<button id="remove-photo-btn" class="btn">Eliminar Foto</button>':''}</div></div></div><div class="avatar-content ${type==='url'?'active':''}" data-content="url"><div class="form-group"><label for="image-url-input">URL de la imagen</label><input type="text" id="image-url-input" value="${type==='url'?value:''}" placeholder="https://ejemplo.com/foto.jpg"></div></div><div class="avatar-content ${type==='initials'?'active':''}" data-content="initials"><div class="form-group"><label for="initials-input">Tus Iniciales (1-3 caracteres)</label><input type="text" id="initials-input" maxlength="3" value="${type==='initials'?value:''}" placeholder="HD"></div></div><div class="avatar-content ${type==='icon'?'active':''}" data-content="icon"><p>Elige un ícono:</p><div class="icon-selector">${loadedIcons.map(iconPath =>`<div class="icon-option ${type==='icon' && value===iconPath ? 'active' : ''}" data-icon-path="${iconPath}"><img src="${iconPath}" alt="icon" style="width:36px; height:36px;"/></div>`).join('')}</div></div><div class="avatar-content ${type==='svg'?'active':''}" data-content="svg"><div class="form-group"><label for="svg-code-input">Código SVG</label><textarea id="svg-code-input" placeholder='<svg width="24" ...></svg>' rows="5">${type==='svg'?value:''}</textarea></div></div><div class="avatar-content ${type==='quote'?'active':''}" data-content="quote"><div class="form-group"><label for="quote-input">Cita o Lema Profesional</label><textarea id="quote-input" placeholder="Ej: Pasión por crear soluciones eficientes..." rows="3">${type==='quote'?value:''}</textarea></div></div><div class="avatar-content ${type==='qr'?'active':''}" data-content="qr"><div class="form-group"><label for="qr-url-input">URL para el Código QR</label><input type="text" id="qr-url-input" value="${type==='qr'?value:''}" placeholder="https://linkedin.com/in/tu-usuario"></div></div></div>`;
    };
    const renderPersonalFormHTML = () => { const p=cvData.personalInfo; return `<div class="form-section" data-section="personal"><h2 class="section-title">Información Personal</h2><p class="section-subtitle">Los datos básicos para que puedan contactarte.</p><div class="form-grid"><div class="form-group"><label>Nombre(s)</label><input type="text" name="firstName" value="${p.firstName||''}"></div><div class="form-group"><label>Apellidos</label><input type="text" name="lastName" value="${p.lastName||''}"></div></div><div class="form-group"><label>Profesión</label><input type="text" name="title" value="${p.title||''}"></div><div class="form-grid"><div class="form-group"><label>Email</label><input type="email" name="email" value="${p.email||''}"></div><div class="form-group"><label>Teléfono</label><input type="tel" name="phone" value="${p.phone||''}"></div></div><div class="form-group"><label>Dirección</label><input type="text" name="address" value="${p.address||''}"></div><div class="form-group"><label>Web (sin https://)</label><input type="text" name="website" value="${p.website||''}"></div><div class="form-group"><label>Resumen</label><textarea name="summary" rows="5">${p.summary||''}</textarea></div></div>`; };
    const renderSkillsFormHTML = () => `<div class="form-section" data-section="skills"><h2 class="section-title">Habilidades</h2><p class="section-subtitle">Añade las tecnologías y competencias que dominas.</p><form id="skills-form" style="display:flex; gap:1rem; align-items:flex-end; margin-bottom:1.5rem;"><div class="form-group" style="flex-grow:1; margin-bottom:0;"><label for="skillName">Habilidad</label><input id="skillName" placeholder="Python..."></div><div class="form-group" style="margin-bottom:0;"><label for="skillLevel">Nivel</label><select id="skillLevel"><option value="expert">Experto</option><option value="advanced">Avanzado</option><option value="intermediate">Intermedio</option><option value="beginner">Principiante</option></select></div><button type="submit" class="btn btn-secondary" style="height:fit-content;">+ Añadir</button></form><hr style="margin:1.5rem 0;border:none;border-top:1px solid var(--color-border);"><div class="skills-list">${cvData.skills.map(s=>`<div class="skill-badge" data-id="${s.id}">${s.name}<button class="btn-delete" data-action="delete" data-section="skills" data-id="${s.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div>`).join('')}</div></div>`;
    const renderDynamicListFormHTML = (section, config) => `<div class="form-section" data-section="${section}"><h2 class="section-title">${config.title}</h2><p class="section-subtitle">${config.subtitle}</p><div class="add-item-container"><button class="btn btn-secondary" data-action="add" data-section="${section}">+ Añadir ${config.singularTitle}</button></div><div class="dynamic-list">${(cvData[section] || []).map(item=>`<div class="item" data-id="${item.id}"><div class="item-header"><h4>${item.position||item.degree||'Nuevo Elemento'}</h4><button class="btn-delete" data-action="delete" data-section="${section}" data-id="${item.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div><div class="form-grid"><div class="form-group"><label>${config.field1}</label><input type="text" name="${config.name1}" value="${item[config.name1]||''}"></div><div class="form-group"><label>${config.field2}</label><input type="text" name="${config.name2}" value="${item[config.name2]||''}"></div></div><div class="form-grid"><div class="form-group"><label>Fecha Inicio</label><input type="month" name="startDate" value="${item.startDate||''}"></div><div class="form-group"><label>Fecha Fin</label><input type="month" name="endDate" value="${item.endDate||''}" ${item.current?'disabled':''}></div></div><div class="form-group" style="font-size:.9rem;"><label style="display:flex;align-items:center;gap:.5rem;"><input type="checkbox" name="current" ${item.current?'checked':''}> Actualmente aquí</label></div><div class="form-group"><label>Descripción</label><textarea name="description" rows="4">${item.description||''}</textarea></div></div>`).join('')}</div></div>`;
    const renderImpactsFormHTML = () => `<div class="form-section" data-section="impacts"><h2 class="section-title">Impacto Clave</h2><p class="section-subtitle">Añade tus logros más importantes y cuantificables.</p><div class="add-item-container"><button class="btn btn-secondary" data-action="add" data-section="impacts">+ Añadir Logro</button></div><div class="dynamic-list">${(cvData.impacts || []).map(item => `<div class="item" data-id="${item.id}"><div class="item-header"><h4>Logro Clave</h4><button class="btn-delete" data-action="delete" data-section="impacts" data-id="${item.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div><div class="form-group"><label>Descripción del logro</label><textarea name="description" rows="3">${item.description || ''}</textarea></div></div>`).join('')}</div></div>`;
    const renderPortfolioFormHTML = () => `<div class="form-section" data-section="portfolio"><h2 class="section-title">Portafolio</h2><p class="section-subtitle">Muestra tus mejores trabajos visuales.</p><div class="add-item-container"><button class="btn btn-secondary" data-action="add" data-section="portfolio">+ Añadir Proyecto</button></div><div class="dynamic-list">${cvData.portfolio.map(item => `<div class="item" data-id="${item.id}"><div class="item-header"><h4>${item.title || 'Nuevo Proyecto'}</h4><button class="btn-delete" data-action="delete" data-section="portfolio" data-id="${item.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div><div style="display: flex; gap: 1rem; align-items: flex-start;"><img src="${item.img || 'https://via.placeholder.com/100x75/e9ecef/6c757d?text=Vista'}" style="width: 100px; height: 75px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--color-border);" class="portfolio-preview"><div style="flex-grow: 1;"><div class="form-group"><label>Título del Proyecto</label><input type="text" name="title" value="${item.title || ''}"></div><div class="form-group" style="margin-bottom:0;"><label>URL de la Imagen</label><input type="text" name="img" value="${item.img || ''}" placeholder="https://ejemplo.com/imagen.png"></div></div></div></div>`).join('')}</div></div>`;
    const renderFooterFormHTML = () => `<div class="form-section" data-section="footer"><h2 class="section-title">Pie de Página</h2><p class="section-subtitle">Añade enlaces o texto final.</p><form id="footer-form" style="display:flex; flex-direction:column; gap:1rem; margin-bottom:1.5rem;"><div class="form-grid"><div class="form-group" style="margin:0;"><label for="footer-item-type">Tipo</label><select id="footer-item-type">${Object.keys(templateHelpers.footerIcons).map(k => `<option value="${k}">${k.charAt(0).toUpperCase() + k.slice(1)}</option>`).join('')}</select></div><div class="form-group" style="margin:0;"><label for="footer-item-label">Etiqueta (opcional)</label><input id="footer-item-label" placeholder="LinkedIn"></div></div><div class="form-group" style="margin:0;"><label for="footer-item-value">Valor</label><input id="footer-item-value" placeholder="tu-usuario"></div><button type="button" class="btn btn-secondary" data-action="add" data-section="footer" style="align-self: flex-start;">+ Añadir Elemento</button></form><hr style="margin:1.5rem 0;border:none;border-top:1px solid var(--color-border);"><div class="footer-list" style="display:flex;flex-direction:column; gap:0.5rem;">${cvData.footer.map(f=>`<div class="footer-item" style="background:#f8f9fa; border:1px solid #eee;" data-id="${f.id}"> ${templateHelpers.footerIcons[f.type]} <span>${f.label||''}</span> <p>${f.value}</p> <button class="btn-delete" style="margin-left:auto;" data-action="delete" data-section="footer" data-id="${f.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div>`).join('')}</div></div>`;
    const renderStructureFormHTML = () => {
        const sectionLabels = { summary: 'Resumen', experience: 'Experiencia', education: 'Educación', skills: 'Habilidades', impacts: 'Impacto Clave', portfolio: 'Portafolio' };
        return `<div class="form-section" data-section="structure"><h2 class="section-title">Organizar Secciones</h2><p class="section-subtitle">Arrastra y suelta las secciones para cambiar su orden en el CV.</p><div id="section-order-list">${cvData.sectionOrder.map(sectionKey => `<div class="draggable-item" draggable="true" data-section-key="${sectionKey}"><svg class="drag-handle" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg><span>${sectionLabels[sectionKey]}</span></div>`).join('')}</div></div>`;
    };

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
                case 'icon':
                    if (avatar.value && svgCache && svgCache[avatar.value]) {
                        // Inserta el SVG directamente y aplica el color blanco con 'fill'.
                        return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background-color:rgba(0,0,0,0.2); padding: 20px; color: white;">${svgCache[avatar.value].replace('<svg', '<svg style="width:100%; height:100%; fill: #fff;"')}</div>`;
                    }
                    return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background-color:rgba(0,0,0,0.2); padding: 20px; color: white;">...</div>`;
                case 'svg': return `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background-color:rgba(0,0,0,0.2); padding: 20px; color: white;">${avatar.value || ''}</div>`;
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


    const buildFormRenderers = () => {
        formRenderers.welcome = () => renderForm(renderWelcomeFormHTML());
        formRenderers.design = () => renderForm(renderDesignFormHTML());
        formRenderers.avatar = () => renderForm(renderAvatarFormHTML());
        formRenderers.personal = () => renderForm(renderPersonalFormHTML());
        formRenderers.skills = () => renderForm(renderSkillsFormHTML());
        formRenderers.experience = () => renderForm(renderDynamicListFormHTML('experience', {title:'Experiencia Laboral', singularTitle: 'Experiencia', subtitle:'Describe tus roles anteriores.', field1:'Cargo', name1:'position', field2:'Empresa', name2:'company'}));
        formRenderers.education = () => renderForm(renderDynamicListFormHTML('education', {title:'Educación', singularTitle: 'Formación', subtitle:'Tu formación académica.', field1:'Título', name1:'degree', field2:'Institución', name2:'institution'}));
        formRenderers.impacts = () => renderForm(renderImpactsFormHTML());
        formRenderers.portfolio = () => renderForm(renderPortfolioFormHTML());
        formRenderers.footer = () => renderForm(renderFooterFormHTML());
        formRenderers.structure = () => renderForm(renderStructureFormHTML());
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
            buildFormRenderers();

        } catch (error) {
            console.error("Error al cargar las plantillas de CV:", error);
            // Podríamos tener una plantilla de respaldo o mostrar un error
        }
    };

    const loadIcons = async () => {
        try {
            const [iconListResponse, cacheResponse] = await Promise.all([
                fetch('icon.json'),
                fetch('svg-cache.json')
            ]);
            const iconNames = await iconListResponse.json();
            svgCache = await cacheResponse.json();

            loadedIcons = iconNames.map(name => `icon-svg/${name}.svg`);

            // Cargar SVGs que no están en la caché
            const iconsToFetch = loadedIcons.filter(path => !svgCache[path]);
            const fetchPromises = iconsToFetch.map(async (path) => {
                const svgResponse = await fetch(path);
                const svgText = await svgResponse.text();
                svgCache[path] = svgText;
            });
            await Promise.all(fetchPromises);
        } catch (error) {
            console.error("Error al cargar los iconos:", error);
            loadedIcons = [];
            svgCache = {};
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
    let saveTimeout;
    const showSaveNotification = () => {
        if (saveTimeout) clearTimeout(saveTimeout);
        saveNotificationEl.classList.add('show');
        saveTimeout = setTimeout(() => {
            saveNotificationEl.classList.remove('show');
        }, 2000); // La notificación se ocultará después de 2 segundos
    };

    const saveState = () => {
        try {
            localStorage.setItem('cvProData', JSON.stringify(cvData));
            showSaveNotification();
        } catch (error) {
            console.error("Error al guardar el estado en localStorage:", error);
        }
    };

    const loadState = () => {
        const savedData = localStorage.getItem('cvProData');
        if (savedData) {
            Object.assign(cvData, JSON.parse(savedData));
        }
    };

    const resetCvData = () => {
        const confirmed = confirm("¿Estás seguro de que quieres limpiar todo el formulario? Se perderán todos los cambios y se volverá a los datos de ejemplo.");
        if (confirmed) {
            // Restauramos cvData al estado por defecto
            cvData = JSON.parse(JSON.stringify(defaultCvData));
            // Guardamos el estado reseteado
            saveState();
            // Volvemos a la pantalla de bienvenida
            setActiveSection('welcome');
            renderCVPreview();
        }
    };
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
            updateAndRender();
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

    // --- NUEVA FUNCIÓN PARA DESCARGAR HTML ---
    const downloadHtml = async () => {
        try {
            // 1. Obtener el CSS de la hoja de estilos principal
            const cssResponse = await fetch('style.css');
            let cssText = await cssResponse.text();

            // 2. Obtener el CSS de las fuentes de Google
            const fontUrl = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@400;600&family=Source+Code+Pro:wght@400;600&display=swap";
            const fontCssResponse = await fetch(fontUrl);
            const fontCssText = await fontCssResponse.text();

            // 3. Combinar todo el CSS
            const fullCss = fontCssText + '\n' + cssText;

            // 4. Obtener el HTML del CV
            const cvHtml = cvPreviewWrapper.innerHTML;

            // 5. Añadir CSS para la responsividad del archivo HTML
            const responsiveAndPrintCss = `
                /* Solución: Anula el overflow:hidden del body para permitir el scroll */
                body {
                    overflow: auto !important;
                }

                /* Estilos base para el contenedor del CV */
                .cv-container {
                    width: 100%;
                    max-width: 900px; /* Ancho cómodo para escritorio */
                    margin: 2rem auto;
                    background-color: white;
                    /* Corrección para permitir el crecimiento y el scroll */
                    height: auto; 
                    min-height: 297mm; /* Mantiene una altura mínima de A4 */
                    display: block !important; /* Sobrescribe display:grid del wrapper original */
                    aspect-ratio: unset !important; /* Anula la relación de aspecto fija */
                    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
                    border-radius: 0.5rem;
                }
                /* Botón de descarga flotante */
                .download-floater {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: var(--primary-accent, #dc3545);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s ease;
                    z-index: 1000;
                }
                .download-floater:hover { transform: scale(1.1); }

                /* Media Query para pantallas pequeñas (móviles) */
                @media (max-width: 768px) {
                    body { padding: 0; }
                    .cv-container {
                        margin: 0;
                        box-shadow: none;
                        border-radius: 0;
                        min-height: 100vh;
                    }
                }

                /* Estilos de impresión para formato A4 */
                @media print {
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: none !important; padding: 0; margin: 0; }
                    .download-floater { display: none !important; }
                    .cv-container {
                        width: 210mm;
                        height: 297mm;
                        margin: 0;
                        padding: 0;
                        box-shadow: none !important;
                        border-radius: 0 !important;
                        max-width: none !important;
                        min-height: unset;
                }
                /* 
                * ¡IMPORTANTE! Anula la altura fija de las plantillas.
                * Esto permite que el contenido crezca y el scroll funcione.
                */
                #cv-template {
                    height: auto !important;
                    }
                }
            `;

            // 6. Crear el documento HTML completo
            const fullHtml = `<!DOCTYPE html>
<html lang="es" style="--primary-accent: ${cvData.themeColor};">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV de ${templateHelpers.getFullName(cvData.personalInfo)}</title>
    <style>${fullCss}\n${responsiveAndPrintCss}</style>
</head>
<body style="background-color: #e9ecef; margin: 0;">
    <div class="cv-container">${cvHtml}</div>
    
    <button class="download-floater" onclick="selfDownload()" title="Descargar este archivo HTML">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </button>

    <script>
        function selfDownload() {
            // Clona el documento para no modificar el original
            const docClone = document.cloneNode(true);
            // Elimina el botón y el script del clon para que no aparezcan en el archivo descargado
            docClone.querySelector('.download-floater').remove();
            docClone.querySelector('script').remove();
            
            const htmlContent = docClone.documentElement.outerHTML;
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = document.title.replace(/ /g, '_') + '.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    </script>
</body>
</html>`;
            // 7. Crear y disparar la descarga
            const blob = new Blob([fullHtml], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `CV_${cvData.personalInfo.lastName || 'Pro'}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error al generar el archivo HTML:", error);
            alert("Hubo un error al intentar generar el archivo HTML. Por favor, revisa la consola para más detalles.");
        }
    };

    // --- 4a. EVENT HANDLERS (REFACTORIZADO) ---

    // Manejadores para el evento 'input'
    const handleFormInput = (e) => {
        const { target } = e;
        const section = target.closest('.form-section')?.dataset.section;
        if (!section) return;

        const inputHandlers = {
            personal: () => { cvData.personalInfo[target.name] = target.value; },
            experience: () => handleDynamicListInput(target, 'experience'),
            education: () => handleDynamicListInput(target, 'education'),
            impacts: () => handleDynamicListInput(target, 'impacts'),
            portfolio: () => handleDynamicListInput(target, 'portfolio'),
            design: () => {
                if (target.id === 'custom-color-picker') cvData.themeColor = target.value;
                else if (target.dataset.colorType) cvData[target.dataset.colorType] = target.value;
            },
            avatar: () => {
                const handler = {
                    'initials-input': () => cvData.avatar = { type: 'initials', value: target.value.toUpperCase() },
                    'image-url-input': () => cvData.avatar = { type: 'url', value: target.value },
                    'svg-code-input': () => cvData.avatar = { type: 'svg', value: target.value },
                    'quote-input': () => cvData.avatar = { type: 'quote', value: target.value },
                    'qr-url-input': () => cvData.avatar = { type: 'qr', value: target.value },
                }[target.id];
                handler?.();
            },
            'background-gradient-input': () => {
                cvData.backgroundGradient = target.value;
                document.querySelectorAll('.gradient-swatch.active').forEach(swatch => swatch.classList.remove('active'));
            }
        };

        (inputHandlers[section] || inputHandlers[target.id])?.();
        updateAndRender();
    };

    // Nueva función central para renderizar y guardar
    const updateAndRender = () => {
        renderCVPreview();
        saveState();
    };

    const handleDynamicListInput = (target, section) => {
        const itemEl = target.closest('.item');
        if (!itemEl) return;
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
                if (target.name === 'img') {
                    const previewImg = itemEl.querySelector('.portfolio-preview');
                    previewImg.src = target.value || 'https://via.placeholder.com/100x75/e9ecef/6c757d?text=Vista';
                }
                if (target.name === 'title') {
                    itemEl.querySelector('.item-header h4').textContent = target.value || 'Nuevo Proyecto';
                }
            }
        }
    };

    // Manejadores para el evento 'click'
    const handleFormClick = (e) => {
        const button = e.target.closest('button, .avatar-tab, .icon-option, .layout-card, .color-dot, .gradient-swatch, .gradient-tab, .design-tab, .palette-swatch');
        if (!button) return;

        const section = button.dataset.section || button.closest('.form-section')?.dataset.section;
        const action = getActionFromElement(button);

        const actionHandlers = {
            switchAvatarTab: (btn) => {
                const parent = btn.closest('.form-section');
                if (!parent) return;

                // Actualizar estado
                cvData.avatar.type = btn.dataset.type;

                // Actualizar UI
                parent.querySelectorAll('.avatar-tab').forEach(tab => tab.classList.remove('active'));
                btn.classList.add('active');
                parent.querySelectorAll('.avatar-content').forEach(content => content.classList.toggle('active', content.dataset.content === btn.dataset.type));
            },
            add: () => handleAddItem(section),
            delete: () => { cvData[section] = cvData[section].filter(i => i.id != button.dataset.id); },
            switchTab: () => { 
                cvData.avatar.type = button.dataset.type; 
                if (button.dataset.type === 'icon' && loadedIcons.length > 0) {
                    cvData.avatar.value = loadedIcons[0]; // Selecciona el primer ícono por defecto
                }
            },
            selectIcon: () => { cvData.avatar = { type: 'icon', value: button.dataset.iconPath }; },
            removePhoto: () => { cvData.avatar = { type: 'photo', value: '' }; },
            selectLayout: () => { cvData.layout = button.dataset.layout; },
            selectColor: () => { cvData.themeColor = button.dataset.colorValue; },
            selectPalette: () => Object.assign(cvData, colorPalettes[button.dataset.paletteIndex]),
            resetColors: () => Object.assign(cvData, colorPalettes[0]),
            selectGradient: () => { cvData.backgroundGradient = button.dataset.gradientValue; },
            switchGradientTab: () => switchTab(button, '.gradient-tab', '.gradient-content'),
            switchDesignTab: () => switchTab(button, '.design-tab', '.design-content'),
        };

        if (actionHandlers[action]) {
            actionHandlers[action](button); // Pasamos el botón al manejador

            // Un cambio de pestaña es solo una modificación de la UI; no se debe volver a renderizar todo el formulario.
            const isTabSwitchAction = action.toLowerCase().includes('tab');

            // Solo se vuelve a renderizar el formulario si la acción NO fue un cambio de pestaña (ej. para 'delete').
            if (section && !isTabSwitchAction) {
                setActiveSection(section);
            }

            updateAndRender();
        }
    };

    const getActionFromElement = (el) => {
        if (el.dataset.action) return el.dataset.action;
        const classMap = { 'avatar-tab': 'switchAvatarTab', 'icon-option': 'selectIcon', 'layout-card': 'selectLayout', 'color-dot': 'selectColor', 'gradient-swatch': 'selectGradient', 'gradient-tab': 'switchGradientTab', 'design-tab': 'switchDesignTab', 'palette-swatch': 'selectPalette' };
        for (const className in classMap) {
            if (el.classList.contains(className)) return classMap[className];
        }
        if (el.id === 'reset-colors-btn') return 'resetColors';
        if (el.id === 'remove-photo-btn') return 'removePhoto';
        return null;
    };

    const handleAddItem = (section) => {
        if (section === 'footer') {
            const typeInput = document.getElementById('footer-item-type');
            const labelInput = document.getElementById('footer-item-label');
            const valueInput = document.getElementById('footer-item-value');
            if (valueInput.value.trim()) {
                cvData.footer.push({ id: Date.now(), type: typeInput.value, label: labelInput.value.trim(), value: valueInput.value.trim() });
                labelInput.value = ''; valueInput.value = '';
            }
            return;
        }
        const newItem = {
            impacts: { id: Date.now(), description: '' },
            portfolio: { id: Date.now(), title: 'Nuevo Proyecto', img: '' },
            experience: { id: Date.now(), description: '' },
            education: { id: Date.now(), description: '' },
        }[section] || { id: Date.now() };
        
        if (cvData[section]) cvData[section].push(newItem);
    };

    const switchTab = (tabElement, tabSelector, contentSelector) => {
        const parent = tabElement.closest('.form-section, .design-content');
        if (!parent) return;

        const tabName = tabElement.dataset.tab;

        parent.querySelectorAll(tabSelector).forEach(tab => {
            tab.classList.remove('active');
        });
        tabElement.classList.add('active');

        parent.querySelectorAll(contentSelector).forEach(content => content.classList.remove('active'));
        parent.querySelector(`${contentSelector}[data-content="${tabName}"]`)?.classList.add('active');
    };

    // --- 5. INITIALIZATION & EVENT LISTENERS ---
    async function init() {
        loadState(); // Cargar datos guardados al inicio

        await Promise.all([
            loadTemplates(),
            loadGradientPresets(),
            loadIcons()
        ]);

        downloadPdfBtn.addEventListener('click', () => window.print());
        downloadHtmlBtn.addEventListener('click', downloadHtml);
        resetCvBtn.addEventListener('click', resetCvData);
        document.querySelectorAll('.editor-nav .nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                setActiveSection(item.getAttribute('href').substring(1));
            });
        });

        // --- Event Listeners Refactorizados ---
        formWrapper.addEventListener('input', handleFormInput);
        formWrapper.addEventListener('click', handleFormClick);

        formWrapper.addEventListener('submit', (e) => {
            if (e.target.id === 'skills-form') {
                e.preventDefault();
                const nameInput = e.target.querySelector('#skillName');
                const level = e.target.querySelector('#skillLevel').value;
                if (nameInput.value.trim()) {
                    cvData.skills.push({ id: Date.now(), name: nameInput.value.trim(), level });
                    updateAndRender(); // Guardamos el nuevo skill
                    setActiveSection('skills'); // Recargamos el formulario para mostrarlo
                }
            }
        });

        formWrapper.addEventListener('change', (e) => {
            if (e.target.id === 'photo-input' && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    cvData.avatar = { type: 'photo', value: event.target.result };
                    updateAndRender(); // Guardamos la nueva foto
                    setActiveSection('avatar'); // Recargamos el formulario para mostrarla
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
        
        setActiveSection('welcome');
        renderCVPreview();
    }

    init();
});