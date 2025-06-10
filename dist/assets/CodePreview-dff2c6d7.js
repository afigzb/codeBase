import{C as n}from"./index-09edac25.js";const s={AudioPlayer:{patterns:["<audio-player","AudioPlayer"],baseUrl:"/ComponentControlSystem/Component/AudioPlayer/AudioPlayerDemo/"},CodeEditorPreview:{patterns:["<code-editor-preview","CodeEditorPreview"],baseUrl:"/ComponentControlSystem/Component/CodeEditorPreview/CodeEditorPreviewDemo/"},DragDropContainer:{patterns:["<draggable-container","<drag-drop","DragDrop"],baseUrl:"/ComponentControlSystem/Component/DragDropContainer/DragDropContainerDemo/"},Echarts:{patterns:["echarts","ECharts"],baseUrl:"/ComponentControlSystem/Component/Echarts/EchartsDemo/"},SlidingDamping:{patterns:["sliding-damping","SlidingDamping"],baseUrl:"/ComponentControlSystem/Component/SlidingDamping/SlidingDampingDemo/"},TreeSelect:{patterns:["<tree-select","TreeSelect","tree-select"],baseUrl:"/ComponentControlSystem/Component/TreeSelect/TreeSelectDemo/"},FaultTextEffect:{patterns:["<fault-text-effect","FaultTextEffect","fault-text-effect"],baseUrl:"/ComponentControlSystem/Component/FaultTextEffect/FaultTextEffectDemo/"},FocusDiv:{patterns:["<drag-follow","DragFollow","drag-follow","FocusDiv"],baseUrl:"/ComponentControlSystem/Component/FocusDiv/FocusDivDamo/"},FluidCursor:{patterns:["FluidCursor","fluid-cursor","fluidCursor"],baseUrl:"/ComponentControlSystem/Component/FluidCursor/FluidCursorDemo/"},StarCursor:{patterns:["StarCursor","star-cursor","starCursor","createStarsTrail"],baseUrl:"/ComponentControlSystem/Component/StarCursor/"},RippCursor:{patterns:["RippCursor","ripp-cursor","rippCursor","WaterRippleCursor","water-ripple"],baseUrl:"/ComponentControlSystem/Component/RippCursor/"},CircleCursor:{patterns:["CircleCursor","circle-cursor","circleCursor","‌CircleCursor‌"],baseUrl:"/ComponentControlSystem/Component/‌CircleCursor‌/"},SelectCard:{patterns:["<select-card","SelectCard","select-card"],baseUrl:"/ComponentControlSystem/Component/SelectCard/"}},p="/ComponentControlSystem/Component/",a={baseUrlPatterns:["import '../",'import "../','src="../','href="../',"from '../",'from "../'],importPathRegex:/import.*['"`]\.\.\/src\/(\w+)/},i={defaultStyles:`
        <style>
            /* 滚动条样式 */
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
    `,defaultScripts:`
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
        <\/script>
    `,emptyPageText:"暂无预览内容"};class c{static detectComponentType(e){for(const[r,o]of Object.entries(s))if(o.patterns.some(l=>e.includes(l)))return r;const t=e.match(a.importPathRegex);return(t==null?void 0:t[1])||null}static needsBaseUrlProcessing(e){return a.baseUrlPatterns.some(t=>e.includes(t))}static buildComponentBaseUrl(e){const t=window.location.origin,r=s[e];return r?`${t}${r.baseUrl}`:`${t}${p}`}static injectBaseUrl(e){if(!this.needsBaseUrlProcessing(e))return e;const t=this.detectComponentType(e),o=`<base href="${this.buildComponentBaseUrl(t)}">`;return e.includes("<head>")?e.replace("<head>",`<head>
    ${o}`):`<head>${o}</head>
${e}`}static processForIframe(e){if(!e||typeof e!="string")return this.createEmptyPage();const t=this.injectBaseUrl(e);return`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${i.defaultStyles}
    ${i.defaultScripts}
</head>
<body>
    ${t}
</body>
</html>`}static createEmptyPage(){return`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${i.defaultStyles}
</head>
<body>
    <div style="padding:20px;color:#666;text-align:center;">${i.emptyPageText}</div>
</body>
</html>`}}class d{constructor(e,t={}){this.container=typeof e=="string"?document.querySelector(e):e,this.options={width:"100%",height:"400px",sandbox:"allow-scripts allow-same-origin allow-forms allow-modals",onLoad:null,...t},this.currentCode="",this.iframe=null,this.isLoading=!0,this.isPreviewMode=!1,this.init()}init(){this.createStyles(),this.createPreviewContainer()}createStyles(){if(document.querySelector("#code-preview-styles"))return;const e=document.createElement("style");e.id="code-preview-styles",e.textContent=`
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
        `,document.head.appendChild(e)}createPreviewContainer(){const e=document.createElement("div");e.className="code-preview-container",e.style.width=this.options.width,e.style.height=this.options.height;const t=document.createElement("div");t.className="code-preview-iframe-container",t.style.height="100%",this.iframe=document.createElement("iframe"),this.iframe.className="code-preview-iframe",this.iframe.style.height="100%",this.iframe.sandbox=this.options.sandbox;const r=document.createElement("button");return r.className="code-preview-hover-btn",r.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11H7v3h2v-3zm4 0h-2v3h2v-3zm4 0h-2v3h2v-3zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            </svg>
            <span class="preview-btn-text">预览</span>
        `,this.setupIframeEvents(),this.setupPreviewButton(r,e),t.appendChild(this.iframe),e.appendChild(t),e.appendChild(r),this.container.innerHTML="",this.container.appendChild(e),e}setupIframeEvents(){this.iframe.addEventListener("load",()=>{this.isLoading=!1,this.iframe.classList.remove("code-preview-loading"),this.options.onLoad&&this.options.onLoad()})}setupPreviewButton(e,t){e.addEventListener("click",r=>{r.stopPropagation(),this.togglePreviewMode(t,e)}),document.addEventListener("keydown",r=>{r.key==="Escape"&&this.isPreviewMode&&this.exitPreviewMode(t,e)})}togglePreviewMode(e,t){this.isPreviewMode?this.exitPreviewMode(e,t):this.enterPreviewMode(e,t)}enterPreviewMode(e,t){this.isPreviewMode=!0,e.classList.add("preview-mode"),t.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
            <span class="preview-btn-text">退出</span>
        `,document.body.style.overflow="hidden",this.options.onPreviewEnter&&this.options.onPreviewEnter()}exitPreviewMode(e,t){this.isPreviewMode=!1,e.classList.remove("preview-mode"),t.innerHTML=`
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11H7v3h2v-3zm4 0h-2v3h2v-3zm4 0h-2v3h2v-3zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            </svg>
            <span class="preview-btn-text">预览</span>
        `,document.body.style.overflow="",this.options.onPreviewExit&&this.options.onPreviewExit()}async render(e){this.isLoading=!0,this.iframe.classList.add("code-preview-loading");try{const t=await n.loadContent(e||"");n.isFilePath(e)?this.renderFromPath(e):this.renderFromContent(t),this.currentCode=e}catch(t){console.error("渲染预览失败:",t),this.renderFromContent("<!-- 渲染失败 -->")}}renderFromPath(e){this.iframe.removeAttribute("srcdoc"),this.iframe.src=e}renderFromContent(e){this.iframe.removeAttribute("src");const t=e?c.processForIframe(e):c.createEmptyPage();this.iframe.srcdoc=t}getCode(){return this.currentCode}isLoadingState(){return this.isLoading}getPreviewMode(){return this.isPreviewMode}setSize(e,t){const r=this.container.querySelector(".code-preview-container");e&&r&&(this.options.width=e,r.style.width=e),t&&r&&(this.options.height=t,r.style.height=t,this.iframe&&(this.iframe.style.height=t))}destroy(){if(this.isPreviewMode){const e=this.container.querySelector(".code-preview-container"),t=this.container.querySelector(".code-preview-hover-btn");e&&t&&this.exitPreviewMode(e,t)}this.iframe&&(this.iframe.src="about:blank"),this.container&&(this.container.innerHTML=""),this.iframe=null}static async create(e,t="",r={}){const o=new d(e,r);return t&&o.render(t),o}}export{d as CodePreview};
