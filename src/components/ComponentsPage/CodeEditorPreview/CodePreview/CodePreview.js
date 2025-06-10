/**
 * CodePreview - 代码预览组件
 * 职责：代码预览渲染、iframe管理、全屏预览
 * 专注于预览功能，内容获取和iframe处理委托给专门的工具类
 * 
 * 使用方法:
 * const codePreview = new CodePreview(container, options);
 * codePreview.render(contentOrPath);
 */

import { ContentLoader } from '../Utils/ContentLoader.js';
import { IframeProcessor } from '../Utils/IframeProcessor.js';

export class CodePreview {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.options = {
            width: '100%',
            height: '400px',
            sandbox: 'allow-scripts allow-same-origin allow-forms allow-modals',
            onLoad: null,
            ...options
        };
        
        this.currentCode = '';
        this.iframe = null;
        this.isLoading = true;
        this.isPreviewMode = false;
        
        this.init();
    }

    // 初始化组件
    init() {
        this.createStyles();
        this.createPreviewContainer();
    }

    // 创建自定义样式
    createStyles() {
        if (document.querySelector('#code-preview-styles')) return;

        const style = document.createElement('style');
        style.id = 'code-preview-styles';
        style.textContent = `
            .code-preview-container {
                position: relative;
                width: 100%;
                background: #f8f9fa;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }

            .code-preview-iframe {
                width: 100%;
                border: none;
                background: white;
                display: block;
                transition: opacity 0.3s ease;
            }

            .code-preview-loading {
                opacity: 0.6;
                pointer-events: none;
            }

            .code-preview-iframe-container {
                position: relative;
                overflow: hidden;
            }

            /* 悬停预览按钮 */
            .code-preview-hover-btn {
                position: absolute;
                top: 10px;
                right: 20px;
                background: rgba(59, 130, 246, 0.9);
                color: white;
                border: none;
                border-radius: 6px;
                padding: 8px 12px;
                font-size: 12px;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.2s ease;
                z-index: 10;
                display: flex;
                align-items: center;
                gap: 4px;
                backdrop-filter: blur(4px);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }

            .code-preview-container:hover .code-preview-hover-btn {
                opacity: 1;
                visibility: visible;
            }

            .code-preview-hover-btn:hover {
                background: rgba(59, 130, 246, 1);
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }

            .code-preview-hover-btn:active {
                transform: translateY(0);
            }

            /* 预览模式样式 */
            .code-preview-container.preview-mode {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw !important;
                height: 100vh !important;
                z-index: 9999;
                border-radius: 0;
                background: #000;
                box-shadow: none;
            }

            .code-preview-container.preview-mode .code-preview-iframe {
                width: 100%;
                height: 100%;
            }

            .code-preview-container.preview-mode .code-preview-hover-btn {
                opacity: 1;
                visibility: visible;
                background: rgba(255, 255, 255, 0.9);
                color: #333;
            }

            .code-preview-container.preview-mode .code-preview-hover-btn:hover {
                background: rgba(255, 255, 255, 1);
            }
        `;
        document.head.appendChild(style);
    }

    // 创建预览容器
    createPreviewContainer() {
        const container = document.createElement('div');
        container.className = 'code-preview-container';
        container.style.width = this.options.width;
        container.style.height = this.options.height;

        const iframeContainer = document.createElement('div');
        iframeContainer.className = 'code-preview-iframe-container';
        iframeContainer.style.height = '100%';

        this.iframe = document.createElement('iframe');
        this.iframe.className = 'code-preview-iframe';
        this.iframe.style.height = '100%';
        this.iframe.sandbox = this.options.sandbox;

        const previewBtn = document.createElement('button');
        previewBtn.className = 'code-preview-hover-btn';
        previewBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11H7v3h2v-3zm4 0h-2v3h2v-3zm4 0h-2v3h2v-3zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            </svg>
            <span class="preview-btn-text">预览</span>
        `;

        this.setupIframeEvents();
        this.setupPreviewButton(previewBtn, container);

        iframeContainer.appendChild(this.iframe);
        container.appendChild(iframeContainer);
        container.appendChild(previewBtn);

        this.container.innerHTML = '';
        this.container.appendChild(container);

        return container;
    }

    // 设置iframe事件
    setupIframeEvents() {
        this.iframe.addEventListener('load', () => {
            this.isLoading = false;
            this.iframe.classList.remove('code-preview-loading');
            
            if (this.options.onLoad) {
                this.options.onLoad();
            }
        });
    }

    // 设置预览按钮事件
    setupPreviewButton(button, container) {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePreviewMode(container, button);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isPreviewMode) {
                this.exitPreviewMode(container, button);
            }
        });
    }

    // 切换预览模式
    togglePreviewMode(container, button) {
        this.isPreviewMode ? this.exitPreviewMode(container, button) : this.enterPreviewMode(container, button);
    }

    // 进入预览模式
    enterPreviewMode(container, button) {
        this.isPreviewMode = true;
        container.classList.add('preview-mode');
        
        button.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
            <span class="preview-btn-text">退出</span>
        `;

        document.body.style.overflow = 'hidden';
        
        if (this.options.onPreviewEnter) {
            this.options.onPreviewEnter();
        }
    }

    // 退出预览模式
    exitPreviewMode(container, button) {
        this.isPreviewMode = false;
        container.classList.remove('preview-mode');
        
        button.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11H7v3h2v-3zm4 0h-2v3h2v-3zm4 0h-2v3h2v-3zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            </svg>
            <span class="preview-btn-text">预览</span>
        `;

        document.body.style.overflow = '';
        
        if (this.options.onPreviewExit) {
            this.options.onPreviewExit();
        }
    }

    /**
     * 渲染代码预览 - 统一入口
     */
    async render(contentOrPath) {
        this.isLoading = true;
        this.iframe.classList.add('code-preview-loading');

        try {
            const content = await ContentLoader.loadContent(contentOrPath || '');
            
            if (ContentLoader.isFilePath(contentOrPath)) {
                this.renderFromPath(contentOrPath);
            } else {
                this.renderFromContent(content);
            }
            
            this.currentCode = contentOrPath;
        } catch (error) {
            console.error('渲染预览失败:', error);
            this.renderFromContent('<!-- 渲染失败 -->');
        }
    }

    /**
     * 从文件路径渲染
     */
    renderFromPath(filePath) {
        this.iframe.removeAttribute('srcdoc');
        this.iframe.src = filePath;
    }

    /**
     * 从HTML内容渲染  
     */
    renderFromContent(content) {
        this.iframe.removeAttribute('src');
        const processedHtml = content ? IframeProcessor.processForIframe(content) : IframeProcessor.createEmptyPage();
        this.iframe.srcdoc = processedHtml;
    }

    // 工具方法
    getCode() { return this.currentCode; }
    isLoadingState() { return this.isLoading; }
    getPreviewMode() { return this.isPreviewMode; }

    // 设置预览尺寸
    setSize(width, height) {
        const container = this.container.querySelector('.code-preview-container');
        if (width && container) {
            this.options.width = width;
            container.style.width = width;
        }
        
        if (height && container) {
            this.options.height = height;
            container.style.height = height;
            if (this.iframe) this.iframe.style.height = height;
        }
    }

    // 销毁组件
    destroy() {
        if (this.isPreviewMode) {
            const container = this.container.querySelector('.code-preview-container');
            const button = this.container.querySelector('.code-preview-hover-btn');
            if (container && button) {
                this.exitPreviewMode(container, button);
            }
        }
        
        if (this.iframe) {
            this.iframe.src = 'about:blank';
        }
        
        if (this.container) {
            this.container.innerHTML = '';
        }
        
        this.iframe = null;
    }

    // 静态方法：快速创建预览组件
    static async create(container, code = '', options = {}) {
        const preview = new CodePreview(container, options);
        if (code) preview.render(code);
        return preview;
    }
} 