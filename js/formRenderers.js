// js/formRenderers.js — HTML de los formularios del editor
(function () {
    'use strict';
    window.CvApp = window.CvApp || {};

    // --- FORM RENDERER HELPERS ---
    // Funciones que generan el HTML para cada sección del formulario.

    const renderWelcomeFormHTML = () => `<div class="form-section" data-section="welcome"><h2 class="section-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>¡Bienvenido al Generador de CV Pro!</h2><p class="section-subtitle">Sigue estos sencillos pasos para crear tu currículum profesional.</p><div style="margin-top:2rem; display:flex; flex-direction:column; gap:1.5rem;"><div style="display:flex; gap:1rem;"><div style="flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--primary-accent); color:white; display:grid; place-items:center; font-weight:bold;">1</div><div><h3 style="margin:0 0 0.2rem 0;">Personaliza el Diseño</h3><p style="color:var(--color-muted-text);">Ve a la sección "Diseño" para elegir una plantilla y tu color favorito.</p></div></div><div style="display:flex; gap:1rem;"><div style="flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--primary-accent); color:white; display:grid; place-items:center; font-weight:bold;">2</div><div><h3 style="margin:0 0 0.2rem 0;">Completa las Secciones</h3><p style="color:var(--color-muted-text);">Usa la navegación para rellenar tu avatar, experiencia, educación y habilidades.</p></div></div><div style="display:flex; gap:1rem;"><div style="flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--primary-accent); color:white; display:grid; place-items:center; font-weight:bold;">3</div><div><h3 style="margin:0 0 0.2rem 0;">Descarga y Triunfa</h3><p style="color:var(--color-muted-text);">Cuando estés listo, presiona "Descargar PDF" para obtener tu CV profesional.</p></div></div></div></div>`;

    const renderDesignFormHTML = () => {
        const cvData = CvApp.state.cvData;
        const loadedGradients = CvApp.state.loadedGradients;
        const templates = CvApp.state.templates;

        const renderTextColorPicker = (id, colorType, label, description) => `
            <div class="text-color-picker" data-highlight-selector="[data-cv-color='${colorType}']">
                <div class="form-group">
                    <label for="${id}">${label}</label>
                    <input type="color" id="${id}" data-color-type="${colorType}" value="${cvData[colorType] || (colorType === 'sectionTitleColor' ? cvData.themeColor : '#000000')}">
                </div>
                <div class="color-picker-info">
                    <p class="color-picker-description">${description}</p>
                    <div class="color-picker-previews">
                        <div class="preview-box" style="background-color: #fff; color: ${cvData[colorType] || (colorType === 'sectionTitleColor' ? cvData.themeColor : cvData.textColorDark)};">Aa</div>
                        <div class="preview-box" style="background-color: #343a40; color: ${cvData[colorType] || (colorType === 'sectionTitleColor' ? cvData.themeColor : cvData.textColorLight)};">Aa</div>
                    </div>
                </div>
            </div>`;

        const renderBackgroundSelector = (targetType, label) => `
            <div class="background-target-selector ${targetType === 'main' ? 'active' : ''}" data-bg-target="${targetType}" data-highlight-selector="[data-cv-background='${targetType}']">
                <div class="subsection-title">${label}</div>
                <div class="gradient-preview" style="background: ${targetType === 'main' ? cvData.backgroundMain : cvData.backgroundSidebar || 'transparent'};">
                    ${!(targetType === 'main' ? cvData.backgroundMain : cvData.backgroundSidebar) ? '<span>Ninguno</span>' : ''}
                </div>
            </div>
        `;

        const renderGradientSelectors = (targetType) => `
            <div class="gradient-content-wrapper" data-bg-type-target="${targetType}">
                <div class="gradient-tabs"><div class="gradient-tab active" data-tab="raya">Rayados (${loadedGradients.raya.length})</div><div class="gradient-tab" data-tab="simple">Gradientes (${loadedGradients.simple.length})</div></div>
                <div class="gradient-content active" data-content="raya"><div class="gradient-selector">${loadedGradients.raya.map(grad => `<div class="gradient-swatch ${cvData[`background${targetType.charAt(0).toUpperCase() + targetType.slice(1)}`] === grad ? 'active' : ''}" style="background: ${grad};" data-gradient-value="${grad}"></div>`).join('')}</div></div>
                <div class="gradient-content" data-content="simple"><div class="gradient-selector">${loadedGradients.simple.map(grad => `<div class="gradient-swatch ${cvData[`background${targetType.charAt(0).toUpperCase() + targetType.slice(1)}`] === grad ? 'active' : ''}" style="background: ${grad};" data-gradient-value="${grad}"></div>`).join('')}</div></div>
                <div class="form-group" style="margin-top: 1.5rem;"><label for="background-gradient-input-${targetType}">Fondo Personalizado</label><p style="color:var(--color-muted-text); margin-bottom: 0.5rem; font-size: 0.85rem;">Pega un gradiente de <a href="https://www.gradientmagic.com/" target="_blank">Gradient Magic</a> o pídele uno nuevo a ChatGPT.</p><textarea id="background-gradient-input-${targetType}" data-bg-input-target="${targetType}" rows="3" placeholder="Pega el código CSS de un 'linear-gradient' o 'radial-gradient' aquí...">${cvData[`background${targetType.charAt(0).toUpperCase() + targetType.slice(1)}`] || ''}</textarea></div>
            </div>
        `;

        const colorPalettes = CvApp.state.colorPalettes;

        const html = `<div class="form-section" data-section="design">
            <h2 class="section-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6.4 6.4 0 0 0-6.4 6.4c0 2.2 1.8 4 4 4h4.8a4 4 0 0 1 4 4c0 2.2-1.8 4-4 4a6.4 6.4 0 0 1-6.4-6.4m12.8 0a6.4 6.4 0 0 0-6.4-6.4c-2.2 0-4 1.8-4 4v4.8a4 4 0 0 1-4 4c-2.2 0-4-1.8-4-4a6.4 6.4 0 0 1 6.4-6.4"/></svg>Diseño y Apariencia</h2>
            <p class="section-subtitle">Personaliza cómo se ve tu currículum.</p>
            <div class="design-tabs"><div class="design-tab active" data-tab="templates">Plantillas</div><div class="design-tab" data-tab="colors">Colores</div><div class="design-tab" data-tab="backgrounds">Fondos</div></div>
            <div class="design-content active" data-content="templates"><div class="layout-selector">${Object.keys(templates).map(layout => `<div class="layout-card ${cvData.layout === layout ? 'active' : ''}" data-layout="${layout}"><div class="mini-preview-container"></div><p style="text-transform: capitalize;">${layout.replace('_', ' ')}</p></div>`).join('')}</div></div>
            <div class="design-content" data-content="colors">
                <div class="subsection-title" style="margin-top:0;">Color de Acento</div>
                <p class="subsection-description">Elige el color principal para encabezados, íconos y otros detalles destacados de tu CV.</p>
                <div class="colors"><div class="color-dot ${cvData.themeColor === '#0d6efd' ? 'active' : ''}" data-color-value="#0d6efd" style="background:#0d6efd"></div><div class="color-dot ${cvData.themeColor === '#198754' ? 'active' : ''}" data-color-value="#198754" style="background:#198754"></div><div class="color-dot ${cvData.themeColor === '#6f42c1' ? 'active' : ''}" data-color-value="#6f42c1" style="background:#6f42c1"></div><div class="color-dot ${cvData.themeColor === '#dc3545' ? 'active' : ''}" data-color-value="#dc3545" style="background:#dc3545"></div><div class="color-dot ${cvData.themeColor === '#525f7f' ? 'active' : ''}" data-color-value="#525f7f" style="background:#525f7f"></div><div class="color-dot ${cvData.themeColor === '#e83e8c' ? 'active' : ''}" data-color-value="#e83e8c" style="background:#e83e8c"></div><input type="color" id="custom-color-picker" value="${cvData.themeColor}"></div>
                
                <div class="subsection-title">Paletas Predeterminadas</div>
                <p class="subsection-description">Acelera tu diseño seleccionando un esquema de color completo (acento, textos, etc.) con un solo clic.</p>
                <div class="palette-selector">${colorPalettes.map((p, index) => `<div class="palette-swatch" data-palette-index="${index}" title="${p.name}"><div style="background-color:${p.accent}"></div><div style="background-color:${p.dark}"></div><div style="background-color:${p.light}; border:1px solid #ddd;"></div><div style="background-color:${p.muted}"></div></div>`).join('')}</div>

                <div class="subsection-title-flex"><div class="subsection-title">Ajuste Fino de Colores</div><button id="reset-colors-btn" class="btn btn-sm" title="Restablecer colores por defecto"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Restablecer</button></div>
                <p class="subsection-description">Controla el color de cada tipo de texto. Pasa el ratón sobre cada opción para ver qué elementos afecta en el CV.</p>
                <div class="text-color-pickers-grid">
                    ${renderTextColorPicker('text-color-dark', 'textColorDark', 'Texto Principal', 'Para párrafos y texto general sobre fondos claros.')}
                    ${renderTextColorPicker('text-color-light', 'textColorLight', 'Texto Claro', 'Para texto sobre fondos oscuros o de color (ej. barras laterales).')}
                    ${renderTextColorPicker('text-color-muted', 'textColorMuted', 'Texto Tenue', 'Para subtítulos, fechas y detalles secundarios.')}
                    ${renderTextColorPicker('section-title-color', 'sectionTitleColor', 'Títulos de Sección', 'Color para los títulos como "Experiencia". Por defecto, usa el color de acento.')}
                </div>
            </div>
            <div class="design-content" data-content="backgrounds">
                <p class="subsection-description" style="margin-top:0;">Selecciona qué área del CV quieres editar y elige un fondo. No todas las plantillas tienen barra lateral.</p>
                <div class="background-target-container">
                    ${renderBackgroundSelector('main', 'Fondo Principal')}
                    ${renderBackgroundSelector('sidebar', 'Fondo de Barra Lateral')}
                </div>
                <div id="background-selectors-wrapper">
                    ${renderGradientSelectors('main')}
                    ${renderGradientSelectors('sidebar')}
                </div>
            </div>
        </div>`;

        return html;
    };

    const renderAvatarFormHTML = () => {
        const cvData = CvApp.state.cvData;
        const loadedIcons = CvApp.state.loadedIcons;
        const { type, value } = cvData.avatar || { type: 'initials', value: '' };
        return `<div class="form-section" data-section="avatar"><h2 class="section-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 11a4 4 0 1 0 0-8a4 4 0 0 0 0 8"/><path d="M18.5 22a7.1 7.1 0 0 0-13 0"/></svg>Tu Avatar Profesional</h2><p class="section-subtitle">Elige cómo quieres presentarte visualmente en tu CV.</p><div class="avatar-tabs"><div class="avatar-tab ${type === 'none' ? 'active' : ''}" data-type="none">Nada</div><div class="avatar-tab ${type === 'photo' ? 'active' : ''}" data-type="photo">Foto</div><div class="avatar-tab ${type === 'url' ? 'active' : ''}" data-type="url">URL Imagen</div><div class="avatar-tab ${type === 'initials' ? 'active' : ''}" data-type="initials">Iniciales</div><div class="avatar-tab ${type === 'icon' ? 'active' : ''}" data-type="icon">Icono</div><div class="avatar-tab ${type === 'svg' ? 'active' : ''}" data-type="svg">Código SVG</div><div class="avatar-tab ${type === 'quote' ? 'active' : ''}" data-type="quote">Cita</div><div class="avatar-tab ${type === 'qr' ? 'active' : ''}" data-type="qr">Código QR</div></div><div class="avatar-content ${type === 'none' ? 'active' : ''}" data-content="none"><p style="color:var(--color-muted-text);">Se eliminará el avatar para un diseño más minimalista.</p></div><div class="avatar-content ${type === 'photo' ? 'active' : ''}" data-content="photo"><div style="display:flex;align-items:center;gap:1rem;"><img id="photo-preview" src="${type === 'photo' && value ? value : 'https://via.placeholder.com/120/e9ecef/6c757d?text=Foto'}"><div style="display:flex;flex-direction:column;gap:0.5rem;"><label for="photo-input" class="btn btn-secondary">Seleccionar Archivo</label><input type="file" id="photo-input" style="display:none;" accept="image/*">${type === 'photo' && value ? '<button id="remove-photo-btn" class="btn">Eliminar Foto</button>' : ''}</div></div></div><div class="avatar-content ${type === 'url' ? 'active' : ''}" data-content="url"><div class="form-group"><label for="image-url-input">URL de la imagen</label><input type="text" id="image-url-input" value="${type === 'url' ? value : ''}" placeholder="https://ejemplo.com/foto.jpg"></div></div><div class="avatar-content ${type === 'initials' ? 'active' : ''}" data-content="initials"><div class="form-group"><label for="initials-input">Tus Iniciales (1-3 caracteres)</label><input type="text" id="initials-input" maxlength="3" value="${type === 'initials' ? value : ''}" placeholder="Ej: AF"></div></div><div class="avatar-content ${type === 'icon' ? 'active' : ''}" data-content="icon"><p>Elige un ícono:</p><div class="icon-selector">${loadedIcons.map(iconPath => `<div class="icon-option ${type === 'icon' && value === iconPath ? 'active' : ''}" data-icon-path="${iconPath}"><img src="${iconPath}" alt="icon" style="width:36px; height:36px;"/></div>`).join('')}</div></div><div class="avatar-content ${type === 'svg' ? 'active' : ''}" data-content="svg"><div class="form-group"><label for="svg-code-input">Código SVG</label><textarea id="svg-code-input" placeholder='<svg width="24" ...></svg>' rows="5">${type === 'svg' ? value : ''}</textarea></div></div><div class="avatar-content ${type === 'quote' ? 'active' : ''}" data-content="quote"><div class="form-group"><label for="quote-input">Cita o Lema Profesional</label><textarea id="quote-input" placeholder="Ej: Pasión por crear soluciones eficientes..." rows="3">${type === 'quote' ? value : ''}</textarea></div></div><div class="avatar-content ${type === 'qr' ? 'active' : ''}" data-content="qr"><div class="form-group"><label for="qr-url-input">URL para el Código QR</label><input type="text" id="qr-url-input" value="${type === 'qr' ? value : ''}" placeholder="https://linkedin.com/in/tu-usuario"></div></div></div>`;
    };

    const renderPersonalFormHTML = () => {
        const p = CvApp.state.cvData.personalInfo;
        return `<div class="form-section" data-section="personal"><h2 class="section-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>Información Personal</h2><p class="section-subtitle">Los datos básicos para que puedan contactarte.</p><div class="form-grid"><div class="form-group"><label>Nombre(s)</label><input type="text" name="firstName" value="${p.firstName || ''}" placeholder="Ej: Ana"></div><div class="form-group"><label>Apellidos</label><input type="text" name="lastName" value="${p.lastName || ''}" placeholder="Ej: García"></div></div><div class="form-group"><label>Profesión</label><input type="text" name="title" value="${p.title || ''}" placeholder="Ej: Desarrolladora de Software"></div><div class="form-grid"><div class="form-group"><label>Email</label><input type="email" name="email" value="${p.email || ''}" placeholder="ej: ana.garcia@email.com"></div><div class="form-group"><label>Teléfono</label><input type="tel" name="phone" value="${p.phone || ''}" placeholder="Ej: +54 9 11 1234-5678"></div></div><div class="form-group"><label>Dirección</label><input type="text" name="address" value="${p.address || ''}" placeholder="Ej: Buenos Aires, Argentina"></div><div class="form-group"><label>Web (sin https://)</label><input type="text" name="website" value="${p.website || ''}" placeholder="linkedin.com/in/anagarcia"></div><div class="form-group"><label>Resumen</label><p class="subsection-description" style="margin-top:0; margin-bottom:0.5rem;">Un párrafo breve y potente que destaque tu experiencia clave, tus habilidades más fuertes y tus objetivos profesionales.</p><textarea name="summary" rows="5" placeholder="Ej: Desarrollador de Software con 5 años de experiencia en aplicaciones web de alto rendimiento. Experto en Python y AWS. Busco aplicar mis habilidades en un entorno desafiante para crear soluciones innovadoras.">${p.summary || ''}</textarea></div></div>`;
    };

    const renderSkillsFormHTML = () => {
        const cvData = CvApp.state.cvData;
        return `<div class="form-section" data-section="skills"><h2 class="section-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.97 3.23c.304-.76.99-.958 1.488-.523c.498.435.418 1.18-.184 1.577l-4.242 2.76A2 2 0 0 0 9 8.718V13a2 2 0 1 0 4 0V9m2-5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2zM8 21a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2z"/></svg>Habilidades</h2><p class="section-subtitle">Añade las tecnologías y competencias que dominas.</p><form id="skills-form" style="display:flex; gap:1rem; align-items:flex-end; margin-bottom:1.5rem;"><div class="form-group" style="flex-grow:1; margin-bottom:0;"><label for="skillName">Habilidad</label><input id="skillName" placeholder="Ej: Python"></div><div class="form-group" style="margin-bottom:0;"><label for="skillLevel">Nivel</label><select id="skillLevel"><option value="expert">Experto</option><option value="advanced">Avanzado</option><option value="intermediate">Intermedio</option><option value="beginner">Principiante</option></select></div><button type="submit" class="btn btn-secondary" style="height:fit-content;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Añadir</button></form><hr style="margin:1.5rem 0;border:none;border-top:1px solid var(--color-border);"><div class="skills-list">${cvData.skills.map(s => `<div class="skill-badge" data-id="${s.id}">${s.name}<button class="btn-delete" data-action="delete" data-section="skills" data-id="${s.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div>`).join('')}</div></div>`;
    };

    const renderDynamicListFormHTML = (section, config) => {
        const cvData = CvApp.state.cvData;
        const descriptionPlaceholder = section === 'experience'
            ? 'Usa guiones (-) para listar tus logros. Cuantifica tus resultados siempre que sea posible.\n\nEj:\n- Lideré el desarrollo del nuevo módulo de reportes, resultando en un aumento del 20% en la satisfacción del cliente.\n- Optimicé las consultas a la base de datos, mejorando el rendimiento en un 40%.\n- Implementé un pipeline de CI/CD con GitHub Actions, reduciendo el tiempo de despliegue en un 75%.'
            : 'Menciona logros o proyectos destacados durante tu formación.\n\nEj:\n- Proyecto final sobre análisis de datos con Python para predecir la demanda de productos.\n- Mención honorífica por promedio académico sobresaliente (Top 5% de la promoción).';

        return `<div class="form-section" data-section="${section}">
            <h2 class="section-title">${config.icon} ${config.title}</h2>
            <p class="section-subtitle">${config.subtitle}</p>
            <div class="add-item-container">
                <button class="btn btn-secondary" data-action="add" data-section="${section}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Añadir ${config.singularTitle}</button>
            </div><div class="validation-message" data-validation-for="dateRange"></div>
            <div class="dynamic-list">${(cvData[section] || []).map(item => `
                <div class="item" data-id="${item.id}">
                    <div class="item-header">
                        <h4>${item.position || item.degree || 'Nuevo Elemento'}</h4>
                        <button class="btn-delete" data-action="delete" data-section="${section}" data-id="${item.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                    </div>
                    <div class="form-group"><label>${config.field1}</label><input type="text" name="${config.name1}" value="${item[config.name1] || ''}" placeholder="${config.placeholder1 || ''}"></div>
                    <div class="form-group"><label>${config.field2}</label><input type="text" name="${config.name2}" value="${item[config.name2] || ''}" placeholder="${config.placeholder2 || ''}"></div>
                    <div class="form-group"><label>Fecha Inicio</label><input type="month" name="startDate" value="${item.startDate || ''}"></div>
                    <div class="form-group"><label>Fecha Fin</label><input type="month" name="endDate" value="${item.endDate || ''}" ${item.current ? 'disabled' : ''}></div>
                    <div class="form-group" style="font-size:.9rem;"><label style="display:flex;align-items:center;gap:.5rem;"><input type="checkbox" name="current" ${item.current ? 'checked' : ''}> Actualmente aquí</label><div class="validation-message" data-validation-for="dateRange"></div></div>
                    <div class="form-group"><label>Descripción y Logros</label><textarea name="description" rows="4" placeholder="${descriptionPlaceholder}">${item.description || ''}</textarea></div>
                </div>`).join('')}
            </div>
        </div>`;
    };

    const renderImpactsFormHTML = () => {
        const cvData = CvApp.state.cvData;
        return `<div class="form-section" data-section="impacts"><h2 class="section-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>Impacto Clave</h2><p class="section-subtitle">Añade tus logros más importantes y cuantificables.</p><div class="add-item-container"><button class="btn btn-secondary" data-action="add" data-section="impacts"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Añadir Logro</button></div><div class="dynamic-list">${(cvData.impacts || []).map(item => `<div class="item" data-id="${item.id}"><div class="item-header"><h4>Logro Clave</h4><button class="btn-delete" data-action="delete" data-section="impacts" data-id="${item.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div><div class="form-group"><label>Descripción del logro</label><textarea name="description" rows="3" placeholder="Ej: Reduje los costos de infraestructura en un 20% optimizando instancias EC2.">${item.description || ''}</textarea></div></div>`).join('')}</div></div>`;
    };

    const renderPortfolioFormHTML = () => {
        const cvData = CvApp.state.cvData;
        return `<div class="form-section" data-section="portfolio"><h2 class="section-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>Portafolio</h2><p class="section-subtitle">Muestra tus mejores trabajos visuales.</p><div class="add-item-container"><button class="btn btn-secondary" data-action="add" data-section="portfolio"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Añadir Proyecto</button></div><div class="dynamic-list">${cvData.portfolio.map(item => `<div class="item" data-id="${item.id}"><div class="item-header"><h4>${item.title || 'Nuevo Proyecto'}</h4><button class="btn-delete" data-action="delete" data-section="portfolio" data-id="${item.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div><div style="display: flex; gap: 1rem; align-items: flex-start;"><img src="${item.img || 'https://via.placeholder.com/100x75/e9ecef/6c757d?text=Vista'}" style="width: 100px; height: 75px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--color-border);" class="portfolio-preview"><div style="flex-grow: 1;"><div class="form-group"><label>Título del Proyecto</label><input type="text" name="title" value="${item.title || ''}" placeholder="Ej: Diseño de App Móvil"></div><div class="form-group" style="margin-bottom:0;"><label>URL de la Imagen</label><input type="text" name="img" value="${item.img || ''}" placeholder="https://ejemplo.com/imagen.png"></div></div></div></div>`).join('')}</div></div>`;
    };

    const renderFooterFormHTML = () => {
        const cvData = CvApp.state.cvData;
        const templateHelpers = CvApp.templateHelpers;
        return `<div class="form-section" data-section="footer"><h2 class="section-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg>Pie de Página</h2><p class="section-subtitle">Añade enlaces o texto final para tu CV.</p><form id="footer-form" style="display:flex; flex-direction:column; gap:1rem; margin-bottom:1.5rem;"><div class="form-grid"><div class="form-group" style="margin:0;"><label for="footer-item-type">Tipo</label><select id="footer-item-type">${Object.keys(templateHelpers.footerIcons).map(k => `<option value="${k}">${k.charAt(0).toUpperCase() + k.slice(1)}</option>`).join('')}</select></div><div class="form-group" style="margin:0;"><label for="footer-item-label">Etiqueta (opcional)</label><input id="footer-item-label" placeholder="LinkedIn"></div></div><div class="form-group" style="margin:0;"><label for="footer-item-value">Valor</label><input id="footer-item-value" placeholder="tu-usuario"></div><button type="button" class="btn btn-secondary" data-action="add" data-section="footer" style="align-self: flex-start;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Añadir Elemento</button></form><hr style="margin:1.5rem 0;border:none;border-top:1px solid var(--color-border);"><div class="footer-list">${cvData.footer.map(f => `<div class="footer-item" data-id="${f.id}"> ${templateHelpers.footerIcons[f.type]} <span>${f.label || ''}</span> <p>${f.value}</p> <button class="btn-delete" data-action="delete" data-section="footer" data-id="${f.id}"><svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></div>`).join('')}</div></div>`;
    };

    const renderStructureFormHTML = () => {
        const cvData = CvApp.state.cvData;
        const sectionLabels = { summary: 'Resumen', experience: 'Experiencia', education: 'Educación', skills: 'Habilidades', impacts: 'Impacto Clave', portfolio: 'Portafolio' };
        return `<div class="form-section" data-section="structure"><h2 class="section-title"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>Organizar Secciones</h2><p class="section-subtitle">Arrastra y suelta las secciones para cambiar su orden en el CV.</p><div id="section-order-list">${cvData.sectionOrder.map(sectionKey => `<div class="draggable-item" draggable="true" data-section-key="${sectionKey}"><svg class="drag-handle" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg><span>${sectionLabels[sectionKey]}</span></div>`).join('')}</div></div>`;
    };

    // --- BUILD FORM RENDERERS ---
    const buildFormRenderers = (renderForm) => {
        const formRenderers = {};
        formRenderers.welcome = () => renderForm(renderWelcomeFormHTML());
        formRenderers.design = () => renderForm(renderDesignFormHTML());
        formRenderers.avatar = () => renderForm(renderAvatarFormHTML());
        formRenderers.personal = () => renderForm(renderPersonalFormHTML());
        formRenderers.skills = () => renderForm(renderSkillsFormHTML());
        formRenderers.experience = () => renderForm(renderDynamicListFormHTML('experience', { title: 'Experiencia Laboral', singularTitle: 'Experiencia', subtitle: 'Detalla tus roles previos. ¡Enfócate en logros cuantificables para demostrar tu impacto!', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="6" rx="2"/><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>', field1: 'Cargo', name1: 'position', placeholder1: 'Ej: Desarrollador Backend', field2: 'Empresa', name2: 'company', placeholder2: 'Ej: Tech Solutions Inc.' }));
        formRenderers.education = () => renderForm(renderDynamicListFormHTML('education', { title: 'Educación', singularTitle: 'Formación', subtitle: 'Incluye tus títulos, certificaciones y cursos más relevantes.', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7z"/><path d="m12 22-6-3v-5l6 4 6-4v5z"/><path d="M12 11V2"/></svg>', field1: 'Título', name1: 'degree', placeholder1: 'Ej: Ingeniería en Sistemas', field2: 'Institución', name2: 'institution', placeholder2: 'Ej: Universidad de Buenos Aires' }));
        formRenderers.impacts = () => renderForm(renderImpactsFormHTML());
        formRenderers.portfolio = () => renderForm(renderPortfolioFormHTML());
        formRenderers.footer = () => renderForm(renderFooterFormHTML());
        formRenderers.structure = () => renderForm(renderStructureFormHTML());
        return formRenderers;
    };

    // --- Exponer API pública ---
    CvApp.buildFormRenderers = buildFormRenderers;
})();
