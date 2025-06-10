/**
 * CodePreview - 代码预览组件
 * 遵循单一职责原则，只负责代码内容的预览渲染
 * 不包含刷新、全屏、清空、复制等操作功能
 * 
 * 使用方法:
 * const codePreview = new CodePreview(container, options);
 * codePreview.render(code);
 */

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
        this.originalSize = { width: this.options.width, height: this.options.height };
        
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
        // 创建主容器
        const container = document.createElement('div');
        container.className = 'code-preview-container';
        container.style.width = this.options.width;
        container.style.height = this.options.height;

        // 创建iframe容器
        const iframeContainer = document.createElement('div');
        iframeContainer.className = 'code-preview-iframe-container';
        iframeContainer.style.height = '100%';

        // 创建iframe
        this.iframe = document.createElement('iframe');
        this.iframe.className = 'code-preview-iframe';
        this.iframe.style.height = '100%';
        this.iframe.sandbox = this.options.sandbox;

        // 创建悬停预览按钮
        const previewBtn = document.createElement('button');
        previewBtn.className = 'code-preview-hover-btn';
        previewBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11H7v3h2v-3zm4 0h-2v3h2v-3zm4 0h-2v3h2v-3zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            </svg>
            <span class="preview-btn-text">预览</span>
        `;

        // 设置iframe事件
        this.setupIframeEvents();
        
        // 设置预览按钮事件
        this.setupPreviewButton(previewBtn, container);

        iframeContainer.appendChild(this.iframe);
        container.appendChild(iframeContainer);
        container.appendChild(previewBtn);

        // 清空容器并添加新内容
        this.container.innerHTML = '';
        this.container.appendChild(container);

        return container;
    }

    // 设置iframe事件
    setupIframeEvents() {
        // iframe加载完成事件
        this.iframe.addEventListener('load', () => {
            this.isLoading = false;
            this.iframe.classList.remove('code-preview-loading');
            
            if (this.options.onLoad && typeof this.options.onLoad === 'function') {
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

        // 键盘事件支持
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isPreviewMode) {
                this.exitPreviewMode(container, button);
            }
        });
    }

    // 切换预览模式
    togglePreviewMode(container, button) {
        if (this.isPreviewMode) {
            this.exitPreviewMode(container, button);
        } else {
            this.enterPreviewMode(container, button);
        }
    }

    // 进入预览模式
    enterPreviewMode(container, button) {
        this.isPreviewMode = true;
        container.classList.add('preview-mode');
        
        // 更新按钮文本和图标
        button.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
            <span class="preview-btn-text">退出</span>
        `;

        // 禁用页面滚动
        document.body.style.overflow = 'hidden';
        
        // 触发回调
        if (this.options.onPreviewEnter && typeof this.options.onPreviewEnter === 'function') {
            this.options.onPreviewEnter();
        }
    }

    // 退出预览模式
    exitPreviewMode(container, button) {
        this.isPreviewMode = false;
        container.classList.remove('preview-mode');
        
        // 恢复按钮文本和图标
        button.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11H7v3h2v-3zm4 0h-2v3h2v-3zm4 0h-2v3h2v-3zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            </svg>
            <span class="preview-btn-text">预览</span>
        `;

        // 恢复页面滚动
        document.body.style.overflow = '';
        
        // 触发回调
        if (this.options.onPreviewExit && typeof this.options.onPreviewExit === 'function') {
            this.options.onPreviewExit();
        }
    }

    // 渲染代码预览
    render(codeOrPath) {
        if (typeof codeOrPath !== 'string') {
            codeOrPath = '';
        }

        // 💡 判断是文件路径还是HTML内容
        if (this.isFilePath(codeOrPath)) {
            // 直接设置 iframe src 为文件路径
            this.renderFromPath(codeOrPath);
        } else {
            // 原来的HTML内容处理逻辑
            this.renderFromContent(codeOrPath);
        }
    }

    // 💡 新增方法：判断是否为文件路径
    isFilePath(str) {
        return str.startsWith('/') || 
               str.startsWith('./') || 
               str.startsWith('../') ||
               str.startsWith('http') ||
               str.match(/.*\.html$/);
    }

    // 💡 新增方法：从文件路径渲染
    renderFromPath(filePath) {
        this.currentCode = filePath;
        this.isLoading = true;
        this.iframe.classList.add('code-preview-loading');
        
        // 直接设置iframe的src，让浏览器处理相对路径
        this.iframe.src = filePath;
        
        // 清理srcdoc
        this.iframe.removeAttribute('srcdoc');
    }

    // 💡 新增方法：从HTML内容渲染
    renderFromContent(code) {
        this.currentCode = code;
        this.isLoading = true;
        this.iframe.classList.add('code-preview-loading');

        // 清理src属性
        this.iframe.removeAttribute('src');
        
        // 💡 关键改动：动态设置 base URL
        const processedCode = this.injectBaseUrl(code || this.getEmptyPageHtml());
        this.iframe.srcdoc = processedCode;
    }

    // 💡 新增方法：注入正确的 base URL
    injectBaseUrl(code) {
        // 检测是否需要设置 base URL（包含相对路径的情况）
        const needsBaseUrl = code.includes('import \'../') || 
                            code.includes('src="../') || 
                            code.includes('href="../') ||
                            code.includes('from \'../');

        if (!needsBaseUrl) {
            return this.injectScrollbarStyles(code);
        }

        // 💡 智能检测组件类型
        const componentType = this.detectComponentType(code);
        const baseUrl = window.location.origin;
        
        // 根据组件类型设置不同的 base URL
        let componentBaseUrl;
        if (componentType) {
            componentBaseUrl = `${baseUrl}/ComponentControlSystem/Component/${componentType}/`;
        } else {
            // 默认使用 ComponentControlSystem 基础路径
            componentBaseUrl = `${baseUrl}/ComponentControlSystem/Component/`;
        }
        
        // 注入 base 标签
        const baseTag = `<base href="${componentBaseUrl}">`;
        
        // 在 head 中注入 base 标签
        let processedCode = code;
        if (code.includes('<head>')) {
            processedCode = code.replace('<head>', `<head>\n    ${baseTag}`);
        } else {
            // 如果没有 head 标签，添加一个
            processedCode = `<head>${baseTag}</head>\n${code}`;
        }

        return this.injectScrollbarStyles(processedCode);
    }

    // 💡 新增方法：检测组件类型
    detectComponentType(code) {
        // 通过组件标签或特征检测组件类型
        if (code.includes('<audio-player') || code.includes('AudioPlayer')) {
            return 'AudioPlayer';
        }
        if (code.includes('<code-editor-preview') || code.includes('CodeEditorPreview')) {
            return 'CodeEditorPreview';
        }
        if (code.includes('<drag-drop') || code.includes('DragDrop')) {
            return 'DragDropContainer';
        }
        if (code.includes('echarts') || code.includes('ECharts')) {
            return 'Echarts';
        }
        if (code.includes('sliding-damping') || code.includes('SlidingDamping')) {
            return 'SlidingDamping';
        }
        
        // 也可以通过 import 路径检测
        const importMatch = code.match(/import.*['"`]\.\.\/src\/(\w+)/);
        if (importMatch) {
            return importMatch[1];
        }
        
        return null;
    }

    // 获取空页面HTML
    getEmptyPageHtml() {
        return '<div style="padding:20px;color:#666;text-align:center;">暂无预览内容</div>';
    }

    // 注入滚动条样式到代码中
    injectScrollbarStyles(code) {
        const scrollbarStyles = `
            <style>
                /* 滚动条样式 - 与CodeDisplay.js保持一致 */
                * {
                    scrollbar-width: thin;
                    scrollbar-color: #c1c1c1 #f1f1f1;
                }

                *::-webkit-scrollbar {
                    width: 12px;
                    height: 12px;
                }

                *::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 6px;
                }

                *::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 6px;
                    transition: background 0.3s ease;
                }

                *::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
            </style>
        `;

        const webSocketScript = `
            <script>
                // 防止WebSocket连接错误
                window.WebSocket = function(url) {
                    console.log('WebSocket连接已被沙箱环境拦截:', url);
                    return {
                        send: function() {},
                        close: function() {},
                        addEventListener: function() {},
                        removeEventListener: function() {}
                    };
                };
            </script>
        `;

        return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${scrollbarStyles}
    ${webSocketScript}
</head>
<body>
    ${code}
</body>
</html>`;
    }

    // 获取当前代码
    getCode() {
        return this.currentCode;
    }

    // 检查是否正在加载
    isLoadingState() {
        return this.isLoading;
    }

    // 设置预览尺寸
    setSize(width, height) {
        if (width) {
            this.options.width = width;
            const container = this.container.querySelector('.code-preview-container');
            if (container) {
                container.style.width = width;
            }
        }
        
        if (height) {
            this.options.height = height;
            const container = this.container.querySelector('.code-preview-container');
            if (container) {
                container.style.height = height;
            }
            if (this.iframe) {
                this.iframe.style.height = height;
            }
        }
    }

    // 销毁组件
    destroy() {
        // 退出预览模式
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

    // 获取预览模式状态
    getPreviewMode() {
        return this.isPreviewMode;
    }

    // 静态方法：快速创建预览组件
    static async create(container, code = '', options = {}) {
        const preview = new CodePreview(container, options);
        if (code) {
            preview.render(code);
        }
        return preview;
    }
} 