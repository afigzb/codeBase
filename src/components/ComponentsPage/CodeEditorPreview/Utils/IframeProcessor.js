/**
 * IframeProcessor - iframe沙箱环境处理器
 * 专门处理iframe中的HTML代码，解决相对路径、样式注入等问题
 */

import { 
    COMPONENT_MAP, 
    DEFAULT_BASE_URL, 
    DETECTION_CONFIG, 
    IFRAME_CONFIG 
} from './ComponentConfig.js';

export class IframeProcessor {
    
    /**
     * 检测组件类型
     */
    static detectComponentType(code) {
        for (const [componentType, config] of Object.entries(COMPONENT_MAP)) {
            if (config.patterns.some(pattern => code.includes(pattern))) {
                return componentType;
            }
        }
        
        // 通过 import 路径检测
        const importMatch = code.match(DETECTION_CONFIG.importPathRegex);
        return importMatch?.[1] || null;
    }

    /**
     * 检测代码是否需要base URL处理
     */
    static needsBaseUrlProcessing(code) {
        return DETECTION_CONFIG.baseUrlPatterns.some(pattern => code.includes(pattern));
    }

    /**
     * 构建组件对应的base URL
     */
    static buildComponentBaseUrl(componentType) {
        const baseUrl = window.location.origin;
        const config = COMPONENT_MAP[componentType];
        return config ? `${baseUrl}${config.baseUrl}` : `${baseUrl}${DEFAULT_BASE_URL}`;
    }

    /**
     * 注入base URL标签
     */
    static injectBaseUrl(code) {
        if (!this.needsBaseUrlProcessing(code)) return code;

        const componentType = this.detectComponentType(code);
        const baseUrl = this.buildComponentBaseUrl(componentType);
        const baseTag = `<base href="${baseUrl}">`;

        return code.includes('<head>') 
            ? code.replace('<head>', `<head>\n    ${baseTag}`)
            : `<head>${baseTag}</head>\n${code}`;
    }

    /**
     * 为iframe环境处理HTML代码
     */
    static processForIframe(code) {
        if (!code || typeof code !== 'string') {
            return this.createEmptyPage();
        }

        const processedCode = this.injectBaseUrl(code);

        return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${IFRAME_CONFIG.defaultStyles}
    ${IFRAME_CONFIG.defaultScripts}
</head>
<body>
    ${processedCode}
</body>
</html>`;
    }

    /**
     * 创建空白页面
     */
    static createEmptyPage() {
        return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${IFRAME_CONFIG.defaultStyles}
</head>
<body>
    <div style="padding:20px;color:#666;text-align:center;">${IFRAME_CONFIG.emptyPageText}</div>
</body>
</html>`;
    }
} 