---
description: Reglas de arquitectura, estructura del proyecto y directrices de modificación para Tu-CV-Pro-Edition.
---

# Guía de Arquitectura (Tu-CV-Pro-Edition)

Este proyecto es un generador/editor de currículums (CV). Está construido con HTML, CSS vainilla y JavaScript modular, optimizado para rendimiento.

## 📂 Estructura de Directorios y Archivos

### 📄 Raíz
- `index.html`: Punto de entrada principal. Estructura base de la UI.

### 🎨 `css/` (Estilos Modulares)
- `base.css`: Variables CSS, reseteos.
- `layout.css`: Estructura general (grid, flexbox).
- `forms.css`: Estilos de formularios.
- `inline-editor.css`: Estilos para la edición en vista previa.
- `modals-toasts.css`: Modales y notificaciones.
- `preview.css`: Previsualización del CV.
- `dark-theme.css`: Modo oscuro.

### ⚙️ `js/` (Lógica Modular)
- `main.js`: Orquestador principal e inicialización.
- `state.js`: Estado global (datos del CV).
- `history.js`: Deshacer/Rehacer (Undo/Redo).
- `formRenderers.js`: Renderizado dinámico de formularios.
- `inlineEditor.js`: Edición directa en la vista previa.
- `typst-compiler.js`: Compilación/renderizado Typst.
- `previewNavigation.js`: Control de la vista previa (zoom, páginas).
- `templateHelpers.js`: Helpers para inyectar datos en plantillas.
- `uiUtils.js`: Utilidades UI (modales, toasts).
- `validators.js`: Validación de datos.

### 🗂️ `data/` (Datos y Plantillas)
- `html/` y `typst/`: Plantillas base para los CVs.
- `icon.json` / `svg-cache.json`: Iconos vectoriales.
- `gradients/`: Gradientes UI/plantillas.

### 🖼️ `assets/`
- Recursos estáticos (imágenes, logos).

## 🛠️ Reglas de Modificación (CRÍTICO)
1. **Separación de Intereses**: Mantén la lógica UI en `uiUtils.js`, el estado en `state.js`, y el renderizado en `formRenderers.js`.
2. **CSS Modulares**: No mezcles estilos ni crees estilos globales fuera de `base.css`. Usa siempre las variables definidas en `base.css`.
3. **Eficiencia**: Mantén el código limpio, optimizado para tokens y no repitas código.
4. **Mantenimiento de esta regla**: Si modificas la estructura principal de carpetas o archivos, DEBES actualizar este archivo de reglas (`.agents/rules/architecture.md`) inmediatamente.
