/**
 * 代码编辑预览器控制模块
 * 负责数据处理和核心功能实现，遵循数据驱动原则
 */

import { CodeDisplay } from './CodeDisplay/CodeDisplay.js';
import { CodePreview } from './CodePreview/CodePreview.js';
import { ContentLoader } from './Utils/ContentLoader.js';

export class CodeEditorPreviewController {
    constructor(options = {}) {
        // 提取回调函数
        this.callbacks = {
            onCodeChange: options.callbacks?.onCodeChange || options.onCodeChange || null,
            onStateChange: options.callbacks?.onStateChange || options.onStateChange || null
        };

        // 初始配置
        this.options = {
            displayContainer: options.displayContainer || '#codeEditor',
            previewContainer: options.previewContainer || '#codePreview',
            displayOptions: {
                theme: 'prism',
                editable: true,
                maxHeight: '500px',
                ...options.displayOptions
            },
            previewOptions: {
                width: '100%',
                height: '400px',
                ...options.previewOptions
            },
            debounceDelay: 300,
            defaultLanguage: 'html',
            autoPreview: true,
            ...options
        };

        // UI元素引用
        this.uiElements = options.uiElements || {};
        this.componentRef = options.componentRef || null;
        
        // 状态管理
        this.state = {
            currentCode: '',
            currentLanguage: this.options.defaultLanguage,
            theme: this.options.displayOptions.theme,
            editable: this.options.displayOptions.editable,
            showToolbar: true,
            currentView: 'editor',
            instructions: options.instructions || '',
            originalCode: ''
        };

        // 核心组件
        this.codeDisplay = null;
        this.codePreview = null;
        this.updateTimeout = null;
        this.isInitialized = false;
    }

    // 初始化
    async initialize() {
        await this.initializeComponents();
        this.isInitialized = true;
        
        if (this.options.defaultCode) {
            const actualCode = await ContentLoader.loadContent(this.options.defaultCode);
            await this.setCode(actualCode, this.options.defaultLanguage);
            this.updateState({ originalCode: actualCode });
        }
        
        return true;
    }

    async initializeComponents() {
        this.codeDisplay = new CodeDisplay(this.options.displayContainer, {
            ...this.options.displayOptions,
            onChange: (code, language) => this.handleCodeChange(code, language)
        });
        
        this.codePreview = new CodePreview(this.options.previewContainer, this.options.previewOptions);
        
        if (this.options.defaultCode) {
            const actualCode = await ContentLoader.loadContent(this.options.defaultCode);
            await this.codeDisplay.render(actualCode, this.options.defaultLanguage);
            this.state.currentCode = actualCode;
            this.state.originalCode = actualCode;
        }
    }

    // 状态管理
    updateState(newState) {
        const oldState = {...this.state};
        this.state = {...this.state, ...newState};
        
        if (this.callbacks.onStateChange) {
            this.callbacks.onStateChange(this.state, oldState);
        }
        
        return this.state;
    }

    getState() {
        return {...this.state};
    }

    // 核心功能方法
    async setCode(code, language) {
        if (!this.codeDisplay) return false;
        
        await this.codeDisplay.setCode(code, language || this.state.currentLanguage);
        this.updateState({
            currentCode: code,
            currentLanguage: language || this.state.currentLanguage
        });

        if (this.options.autoPreview) {
            this.updatePreviewDebounced();
        }
        return true;
    }

    getCode() { return this.state.currentCode; }
    getLanguage() { return this.state.currentLanguage; }

    async setLanguage(language) {
        if (!this.codeDisplay) return false;
        
        this.codeDisplay.setLanguage(language);
        this.updateState({ currentLanguage: language });
        
        if (this.options.autoPreview) {
            this.updatePreviewDebounced();
        }
        return true;
    }

    // 预览控制
    updatePreviewDebounced() {
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(() => {
            this.updatePreview();
        }, this.options.debounceDelay);
    }

    async updatePreview() {
        if (!this.codePreview) return;

        const code = this.getCode();
        await this.codePreview.render(code);
    }

    // 配置管理
    updateDisplayConfig(config) {
        if (!this.codeDisplay) return false;

        const newState = {};
        
        if (config.theme !== undefined) {
            this.codeDisplay.changeTheme(config.theme);
            newState.theme = config.theme;
        }
        
        if (config.editable !== undefined) {
            this.codeDisplay.setEditable(config.editable);
            newState.editable = config.editable;
        }
        
        this.updateState(newState);
        return true;
    }

    updatePreviewConfig(config) {
        if (!this.codePreview) return false;

        if (config.width !== undefined || config.height !== undefined) {
            this.codePreview.setSize(config.width, config.height);
        }
        return true;
    }

    setShowToolbar(show) {
        this.updateState({ showToolbar: show });
        return true;
    }

    // 事件处理
    handleCodeChange(code, language) {
        this.updateState({
            currentCode: code,
            currentLanguage: language
        });
        
        if (this.options.autoPreview) {
            this.updatePreviewDebounced();
        }
        
        if (this.callbacks.onCodeChange) {
            this.callbacks.onCodeChange(code, language);
        }
    }

    // 处理来自组件的用户操作
    async handleAction(action, params = {}) {
        switch (action) {
            case 'copy': return this.copyCode();
            case 'reset': return this.resetCode();
            case 'clear': return this.clearCode();
            case 'switch-to-editor': return this.switchToEditor();
            case 'switch-to-instructions': return this.switchToInstructions();
            default:
                return false;
        }
    }

    // 处理组件属性变更
    handleAttributeChange(key, newValue, oldValue) {
        const displayConfigAttrs = ['theme', 'editable'];
        
        if (displayConfigAttrs.includes(key)) {
            const parsedValue = key === 'editable' ? (newValue === 'true' || newValue === '') : newValue;
            this.updateDisplayConfig({ [key]: parsedValue });
        } 
        else if (key === 'language') {
            this.setLanguage(newValue);
        }
        else if (key === 'autoPreview') {
            const autoPreview = newValue === 'true' || newValue === '';
            this.options.autoPreview = autoPreview;
            if (autoPreview) this.updatePreviewDebounced();
        }
        else if (key === 'showToolbar') {
            const show = newValue === 'true' || newValue === '';
            this.setShowToolbar(show);
            
            if (this.componentRef?.render) {
                const config = {
                    ...this.state,
                    width: this.componentRef.getAttribute('width') || '100%',
                    height: this.componentRef.getAttribute('height') || 'auto'
                };
                this.componentRef.render(config);
            }
        }
        else if (key === 'debounceDelay') {
            this.options.debounceDelay = parseInt(newValue) || 300;
        }
        else if (key === 'instructions') {
            this.updateState({ instructions: newValue || '' });
        }
    }

    // 视图切换方法
    switchToEditor() {
        this.updateState({ currentView: 'editor' });
        return true;
    }

    switchToInstructions() {
        this.updateState({ currentView: 'instructions' });
        return true;
    }

    // 使用说明管理
    setInstructions(instructions) {
        this.updateState({ instructions: instructions || '' });
        return true;
    }

    setDefaultCode(code, language) {
        if (code) {
            this.options.defaultCode = code;
            if (language) this.options.defaultLanguage = language;
            return true;
        }
        return false;
    }

    getInstructions() { return this.state.instructions; }

    // 工具方法
    async copyCode() {
        try {
            await navigator.clipboard.writeText(this.getCode());
            return true;
        } catch (error) {
            console.warn('复制失败:', error);
            return false;
        }
    }

    resetCode() {
        const resetCode = this.state.originalCode || '';
        return this.setCode(resetCode, this.options.defaultLanguage);
    }

    clearCode() {
        return this.setCode('', this.getLanguage());
    }

    // 生命周期
    destroy() {
        if (this.updateTimeout) {
            clearTimeout(this.updateTimeout);
        }
        
        if (this.codeDisplay) {
            this.codeDisplay.destroy();
        }
        if (this.codePreview) {
            this.codePreview.destroy();
        }
        
        this.isInitialized = false;
    }

    // 静态工厂方法
    static async create(options) {
        const controller = new CodeEditorPreviewController(options);
        await controller.initialize();
        return controller;
    }
}

// 模块化支持
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CodeEditorPreviewController };
}

if (typeof define === 'function' && define.amd) {
    define([], () => ({ CodeEditorPreviewController }));
}

if (typeof window !== 'undefined') {
    window.CodeEditorPreviewController = CodeEditorPreviewController;
}