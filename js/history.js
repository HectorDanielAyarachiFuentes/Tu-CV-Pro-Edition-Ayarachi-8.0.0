// js/history.js — Historial Undo/Redo
(function () {
    'use strict';
    window.CvApp = window.CvApp || {};

    const MAX_HISTORY = 50;

    // Historial del editor de formulario (cvData snapshots)
    let historyStack = [];
    let redoStack = [];
    let _isApplyingHistory = false;
    let _prevSnapshot = null;

    // Historial del editor fullscreen (DOM innerHTML snapshots)
    let fsHistoryStack = [];
    let fsRedoStack = [];
    let _fsPrevHtml = null;
    let _isApplyingFsHistory = false;

    // Debounce state para agrupar keystrokes en un solo undo-step
    let _historyDebounceTimer = null;
    let _historyBurstStartSnapshot = null;

    // --- Funciones del historial ---
    const updateHistoryBtns = () => {
        const undoBtn = document.getElementById('undo-btn');
        const redoBtn = document.getElementById('redo-btn');
        const inFs = document.body.classList.contains('fullscreen-preview');
        const canUndo = inFs ? (fsHistoryStack.length > 0 || historyStack.length > 0) : historyStack.length > 0;
        const canRedo = inFs ? (fsRedoStack.length > 0 || redoStack.length > 0) : redoStack.length > 0;
        if (undoBtn) undoBtn.disabled = !canUndo;
        if (redoBtn) redoBtn.disabled = !canRedo;
    };

    const applyUndo = () => {
        const cvPreviewWrapper = document.getElementById('cv-preview-wrapper');
        const cvData = CvApp.state.cvData;

        if (document.body.classList.contains('fullscreen-preview')) {
            if (fsHistoryStack.length > 0) {
                _isApplyingFsHistory = true;
                fsRedoStack.push(cvPreviewWrapper.innerHTML);
                cvPreviewWrapper.innerHTML = fsHistoryStack.pop();
                _fsPrevHtml = cvPreviewWrapper.innerHTML;
                updateHistoryBtns();
                _isApplyingFsHistory = false;
            } else if (historyStack.length > 0) {
                _isApplyingHistory = true;
                redoStack.push(JSON.stringify(cvData));
                const snapshot = historyStack.pop();
                Object.assign(cvData, JSON.parse(snapshot));
                _prevSnapshot = JSON.stringify(cvData);
                CvApp.renderCVPreview();
                CvApp.saveState();
                _fsPrevHtml = cvPreviewWrapper.innerHTML;
                updateHistoryBtns();
                _isApplyingHistory = false;
            }
            return;
        }
        // Modo panel normal
        if (historyStack.length === 0) return;
        _isApplyingHistory = true;
        redoStack.push(JSON.stringify(cvData));
        const snapshot = historyStack.pop();
        Object.assign(cvData, JSON.parse(snapshot));
        _prevSnapshot = JSON.stringify(cvData);
        CvApp.renderCVPreview();
        CvApp.saveState();
        const lastSection = localStorage.getItem('cvProLastSection');
        if (lastSection) CvApp.setActiveSection(lastSection);
        updateHistoryBtns();
        _isApplyingHistory = false;
    };

    const applyRedo = () => {
        const cvPreviewWrapper = document.getElementById('cv-preview-wrapper');
        const cvData = CvApp.state.cvData;

        if (document.body.classList.contains('fullscreen-preview')) {
            if (fsRedoStack.length > 0) {
                _isApplyingFsHistory = true;
                fsHistoryStack.push(cvPreviewWrapper.innerHTML);
                cvPreviewWrapper.innerHTML = fsRedoStack.pop();
                _fsPrevHtml = cvPreviewWrapper.innerHTML;
                updateHistoryBtns();
                _isApplyingFsHistory = false;
            } else if (redoStack.length > 0) {
                _isApplyingHistory = true;
                historyStack.push(JSON.stringify(cvData));
                const snapshot = redoStack.pop();
                Object.assign(cvData, JSON.parse(snapshot));
                _prevSnapshot = JSON.stringify(cvData);
                CvApp.renderCVPreview();
                CvApp.saveState();
                _fsPrevHtml = cvPreviewWrapper.innerHTML;
                updateHistoryBtns();
                _isApplyingHistory = false;
            }
            return;
        }
        // Modo panel normal
        if (redoStack.length === 0) return;
        _isApplyingHistory = true;
        historyStack.push(JSON.stringify(cvData));
        const snapshot = redoStack.pop();
        Object.assign(cvData, JSON.parse(snapshot));
        _prevSnapshot = JSON.stringify(cvData);
        CvApp.renderCVPreview();
        CvApp.saveState();
        const lastSection = localStorage.getItem('cvProLastSection');
        if (lastSection) CvApp.setActiveSection(lastSection);
        updateHistoryBtns();
        _isApplyingHistory = false;
    };

    // Función central: guarda el estado PREVIO en el stack y renderiza.
    // immediate=true → push al historial ahora mismo (para clicks/acciones)
    // immediate=false (default) → debounce de 600ms (para teclas en campos de texto)
    const updateAndRender = (immediate = false) => {
        const cvData = CvApp.state.cvData;
        if (!_isApplyingHistory && _prevSnapshot !== null) {
            if (immediate) {
                clearTimeout(_historyDebounceTimer);
                _historyBurstStartSnapshot = null;
                historyStack.push(_prevSnapshot);
                if (historyStack.length > MAX_HISTORY) historyStack.shift();
                redoStack = [];
                updateHistoryBtns();
            } else {
                if (_historyBurstStartSnapshot === null) {
                    _historyBurstStartSnapshot = _prevSnapshot;
                }
                clearTimeout(_historyDebounceTimer);
                _historyDebounceTimer = setTimeout(() => {
                    if (_historyBurstStartSnapshot !== null) {
                        historyStack.push(_historyBurstStartSnapshot);
                        if (historyStack.length > MAX_HISTORY) historyStack.shift();
                        redoStack = [];
                        updateHistoryBtns();
                        _historyBurstStartSnapshot = null;
                    }
                }, 600);
            }
        }
        CvApp.renderCVPreview();
        CvApp.saveState();
        _prevSnapshot = JSON.stringify(cvData);
    };

    const initBaseline = () => {
        _prevSnapshot = JSON.stringify(CvApp.state.cvData);
    };

    const resetHistory = () => {
        _prevSnapshot = JSON.stringify(CvApp.state.cvData);
        historyStack = [];
        redoStack = [];
        updateHistoryBtns();
    };

    // --- Exponer API pública ---
    CvApp.history = {
        get MAX_HISTORY() { return MAX_HISTORY; },
        get historyStack() { return historyStack; },
        get fsHistoryStack() { return fsHistoryStack; },
        get fsRedoStack() { return fsRedoStack; },
        get isApplyingFsHistory() { return _isApplyingFsHistory; },
        set isApplyingFsHistory(v) { _isApplyingFsHistory = v; },
        get fsPrevHtml() { return _fsPrevHtml; },
        set fsPrevHtml(v) { _fsPrevHtml = v; },
        initFsHistory: () => {
            fsHistoryStack = [];
            fsRedoStack = [];
            _fsPrevHtml = document.getElementById('cv-preview-wrapper').innerHTML;
            updateHistoryBtns();
        },
        clearFsHistory: () => {
            _fsPrevHtml = null;
            updateHistoryBtns();
        },
        pushFsSnapshot: (html) => {
            fsHistoryStack.push(html);
            if (fsHistoryStack.length > MAX_HISTORY) fsHistoryStack.shift();
            fsRedoStack = [];
        },
    };
    CvApp.updateHistoryBtns = updateHistoryBtns;
    CvApp.applyUndo = applyUndo;
    CvApp.applyRedo = applyRedo;
    CvApp.updateAndRender = updateAndRender;
    CvApp.initBaseline = initBaseline;
    CvApp.resetHistory = resetHistory;
})();
