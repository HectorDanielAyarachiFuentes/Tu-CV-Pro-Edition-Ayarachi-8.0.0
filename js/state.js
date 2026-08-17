// js/state.js — Estado central y datos del CV
(function () {
    'use strict';
    window.CvApp = window.CvApp || {};

    // --- STATE MANAGEMENT ---
    const cvData = {
        layout: 'classic',
        themeColor: '#dc3545',
        backgroundMain: '',
        backgroundSidebar: '',
        // Propiedades para los colores del texto y elementos
        textColorDark: '#212529', // Para texto principal sobre fondos claros
        textColorLight: '#ffffff', // Para texto sobre fondos oscuros/de color
        textColorMuted: '#6c757d', // Para subtítulos, fechas, etc.
        sectionTitleColor: '', // Color para los títulos de sección. Si está vacío, usa el themeColor.
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
            { id: Date.now() + 7, type: 'email', label: '', value: 'mp4o@yahoo.com' },
            { id: Date.now() + 8, type: 'linkedin', label: 'LinkedIn', value: 'in/hector-daniel-ayarachi-fuentes/' },
            { id: Date.now() + 9, type: 'text', label: '', value: 'Referencias disponibles a petición.' }
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
    const loadedGradients = {
        raya: [],
        simple: []
    };

    // Paletas de colores predefinidas
    const colorPalettes = [
        // Paletas actualizadas para incluir el color de título de sección (title).
        { name: 'Clásico Rojo', accent: '#dc3545', dark: '#212529', light: '#ffffff', muted: '#6c757d', title: '' },
        { name: 'Océano Azul', accent: '#0d6efd', dark: '#032a5c', light: '#ffffff', muted: '#5a7a9c', title: '' },
        { name: 'Bosque Verde', accent: '#198754', dark: '#0a3622', light: '#ffffff', muted: '#5c806f', title: '' },
        { name: 'Púrpura Real', accent: '#6f42c1', dark: '#2c1a4d', light: '#ffffff', muted: '#7d6b99', title: '' },
        { name: 'Gris Corporativo', accent: '#525f7f', dark: '#212529', light: '#ffffff', muted: '#8898aa', title: '' },
        { name: 'Atardecer Coral', accent: '#fd7e14', dark: '#422105', light: '#ffffff', muted: '#a17a58', title: '' },
        { name: 'Menta Fresca', accent: '#20c997', dark: '#0c4e3b', light: '#ffffff', muted: '#669487', title: '' },
        { name: 'Cielo Despejado', accent: '#0dcaf0', dark: '#054f5e', light: '#212529', muted: '#568b96', title: '' },
        { name: 'Rosa Encendido', accent: '#d63384', dark: '#571435', light: '#ffffff', muted: '#a36685', title: '' },
        { name: 'Dorado Lujoso', accent: '#ffc107', dark: '#664d03', light: '#212529', muted: '#a18a4a', title: '' },
        { name: 'Medianoche', accent: '#495057', dark: '#111315', light: '#e9ecef', muted: '#adb5bd', title: '' },
        { name: 'Tierra', accent: '#8B4513', dark: '#3D1F0C', light: '#F5F5DC', muted: '#A0522D', title: '' },
        { name: 'Lavanda', accent: '#967bb6', dark: '#483263', light: '#ffffff', muted: '#b1a1c9', title: '' },
        { name: 'Grafito', accent: '#343a40', dark: '#000000', light: '#f8f9fa', muted: '#adb5bd', title: '' },
        { name: 'Vino Tinto', accent: '#800020', dark: '#33000d', light: '#ffffff', muted: '#a64059', title: '' },
        { name: 'Oliva', accent: '#556B2F', dark: '#222b13', light: '#FFFFF0', muted: '#8F9779', title: '' },
        { name: 'Cereza', accent: '#d2042d', dark: '#4f0111', light: '#ffffff', muted: '#d16078', title: '' },
        { name: 'Acero', accent: '#4682B4', dark: '#1c3447', light: '#ffffff', muted: '#7da7c9', title: '' },
        { name: 'Café', accent: '#6f4e37', dark: '#3a291d', light: '#f5f5f5', muted: '#9b8678', title: '' },
        { name: 'Primavera', accent: '#7CFC00', dark: '#316400', light: '#000000', muted: '#548324', title: '' }
    ];

    let loadedIcons = [];
    let svgCache = {};
    let templates = {};

    // --- Funciones de persistencia ---
    const saveState = () => {
        try {
            localStorage.setItem('cvProData', JSON.stringify(cvData));
            CvApp.showSaveNotification();
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

    // --- Carga de recursos ---
    const loadIcons = async () => {
        try {
            const [iconsResponse, svgCacheResponse] = await Promise.all([
                fetch('data/icon.json'),
                fetch('data/svg-cache.json')
            ]);
            const iconNames = await iconsResponse.json();
            svgCache = await svgCacheResponse.json();

            loadedIcons = iconNames.map(name => `assets/icons/svg/${name}.svg`);

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

    const loadGradientPresets = async () => {
        try {
            const [stripeResponse, smoothResponse] = await Promise.all([
                fetch('data/gradients/gradientesraya.json'),
                fetch('data/gradients/gradients.json')
            ]);

            loadedGradients.raya = await stripeResponse.json();
            const gradientsJson = await smoothResponse.json();

            loadedGradients.simple = gradientsJson.map(g =>
                `linear-gradient(45deg, ${g.colors.join(', ')})`
            );

        } catch (error) {
            console.error("Error al cargar los presets de gradientes:", error);
            loadedGradients.raya = [];
            loadedGradients.simple = [];
        }
    };

    const loadTemplates = async () => {
        try {
            const [response] = await Promise.all([
                fetch('data/html/html.json'),
                typeof TypstCompiler !== 'undefined' ? TypstCompiler.loadTypstTemplates() : Promise.resolve()
            ]);
            const templateStrings = await response.json();

            // Convertir las cadenas de texto de vuelta a funciones
            for (const key in templateStrings) {
                templates[key] = new Function('data', 'helpers', 'return ((' + templateStrings[key] + ')(data, helpers))');
            }

        } catch (error) {
            console.error("Error al cargar las plantillas de CV:", error);
        }
    };

    // --- Exponer API pública ---
    CvApp.state = {
        get cvData() { return cvData; },
        set cvData(newData) { Object.assign(cvData, newData); },
        replaceCvData: (newData) => {
            // Limpia todas las propiedades existentes y reemplaza con las nuevas
            for (const key in cvData) { delete cvData[key]; }
            Object.assign(cvData, newData);
        },
        get defaultCvData() { return defaultCvData; },
        get loadedGradients() { return loadedGradients; },
        get colorPalettes() { return colorPalettes; },
        get loadedIcons() { return loadedIcons; },
        get svgCache() { return svgCache; },
        get templates() { return templates; },
    };

    CvApp.saveState = saveState;
    CvApp.loadState = loadState;
    CvApp.loadIcons = loadIcons;
    CvApp.loadGradientPresets = loadGradientPresets;
    CvApp.loadTemplates = loadTemplates;
})();
