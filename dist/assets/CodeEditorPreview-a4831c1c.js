import{CodePreview as h}from"./CodePreview-dff2c6d7.js";import{C as c}from"./index-09edac25.js";class l{constructor(e,t={}){this.container=typeof e=="string"?document.querySelector(e):e,this.options={theme:"prism",autoHighlight:!0,editable:!1,maxHeight:"500px",maxWidth:"100%",wordWrap:!0,onChange:null,...t},this.currentCode="",this.currentLanguage="javascript",this.isEditing=!1,this.editElement=null,this.displayElement=null,this.init()}init(){this.loadPrismResources(),this.createStyles()}loadPrismResources(){const e={css:[{id:"prism-theme-css",href:`https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/${this.options.theme}.min.css`},{href:"https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css"}],js:["https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js","https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js","https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js"]};e.css.forEach(({id:t,href:i})=>{const s=t?`#${t}`:`link[href="${i}"]`;if(!document.querySelector(s)){const n=document.createElement("link");n.rel="stylesheet",n.href=i,t&&(n.id=t),document.head.appendChild(n)}}),window.Prism||this.loadScriptsSequentially(e.js).then(()=>{var t,i;(i=(t=window.Prism)==null?void 0:t.plugins)!=null&&i.autoloader&&(window.Prism.plugins.autoloader.languages_path="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/")})}loadScriptsSequentially(e){return e.reduce((t,i)=>t.then(()=>document.querySelector(`script[src="${i}"]`)?Promise.resolve():new Promise(s=>{const n=document.createElement("script");n.src=i,n.onload=s,document.head.appendChild(n)})),Promise.resolve())}isPrismReady(){return window.Prism&&window.Prism.highlightElement}waitForPrism(e=3e3){return new Promise(t=>{if(this.isPrismReady()){t();return}const i=Date.now(),s=setInterval(()=>{(this.isPrismReady()||Date.now()-i>e)&&(clearInterval(s),t())},100)})}createStyles(){if(document.querySelector("#code-display-styles"))return;const e=document.createElement("style");e.id="code-display-styles",e.textContent=`
            .code-display-container {
                margin: 0;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                background: white;
                max-height: ${this.options.maxHeight};
                max-width: ${this.options.maxWidth};
                position: relative;
                width: 100%;
            }

            .code-display-container pre,
            .code-display-editor {
                margin: 0 !important;
                border: none !important;
                border-radius: 8px !important;
                overflow: auto;
                max-height: ${this.options.maxHeight};
                width: 100%;
                box-sizing: border-box;
                font-size: 14px !important;
                line-height: 1.6 !important;
                font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                padding: 16px;
                scrollbar-width: thin;
                scrollbar-color: #c1c1c1 #f1f1f1;
                height: auto;
            }

            .code-display-container pre::-webkit-scrollbar,
            .code-display-editor::-webkit-scrollbar {
                width: 12px;
                height: 12px;
            }

            .code-display-container pre::-webkit-scrollbar-track,
            .code-display-editor::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 6px;
            }

            .code-display-container pre::-webkit-scrollbar-thumb,
            .code-display-editor::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 6px;
                transition: background 0.3s ease;
            }

            .code-display-container pre::-webkit-scrollbar-thumb:hover,
            .code-display-editor::-webkit-scrollbar-thumb:hover {
                background: #a8a8a8;
            }

            .code-display-container pre code {
                display: block;
                white-space: ${this.options.wordWrap?"pre-wrap":"pre"};
                word-wrap: ${this.options.wordWrap?"break-word":"normal"};
                overflow: visible;
                outline: none;
                width: 100%;
                max-width: 100%;
                box-sizing: border-box;
                padding: 0;
            }

            .code-display-editor {
                resize: none;
                outline: none;
                background: #f8f8f8;
                color: #333;
                white-space: ${this.options.wordWrap?"pre-wrap":"pre"};
                word-wrap: ${this.options.wordWrap?"break-word":"normal"};
                max-width: 100%;
            }

            .code-display-container.editable {
                border: 2px solid transparent;
                transition: border-color 0.3s ease;
                cursor: pointer;
            }

            .code-display-container.editable:hover {
                border-color: #007acc;
                box-shadow: 0 2px 10px rgba(0, 122, 204, 0.2);
            }

            .code-display-container.editing {
                border-color: #007acc;
                box-shadow: 0 2px 10px rgba(0, 122, 204, 0.2);
            }

            .code-display-container.editable::after {
                content: '双击编辑';
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgba(0, 122, 204, 0.8);
                color: white;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 500;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                z-index: 10;
            }

            .code-display-container.editable:hover::after {
                opacity: 1;
            }

            .code-display-container.editing::after {
                content: '';
                opacity: 0;
            }

            .code-display-container.line-numbers pre {
                padding-left: 3.8em;
            }

            .code-display-hidden {
                display: none !important;
            }
        `,document.head.appendChild(e)}async render(e,t="javascript"){e||(e=""),this.currentCode=e,this.currentLanguage=t,await this.waitForPrism();const i=document.createElement("div");return i.className=`code-display-container line-numbers${this.options.editable?" editable":""}`,this.displayElement=this.createDisplayElement(e,t),i.appendChild(this.displayElement),this.options.editable&&(this.editElement=this.createEditElement(e),i.appendChild(this.editElement),this.setupEditableEvents(i)),this.container.innerHTML="",this.container.appendChild(i),i}createDisplayElement(e,t){const i=document.createElement("pre"),s=document.createElement("code");return s.className=`language-${t}`,s.textContent=e,i.appendChild(s),this.options.autoHighlight&&window.Prism&&window.Prism.highlightElement(s),i}createEditElement(e){const t=document.createElement("textarea");t.className="code-display-editor code-display-hidden",t.value=e,t.spellcheck=!1;const i=()=>{t.style.height="auto",t.style.height=Math.max(t.scrollHeight,100)+"px"};return t.addEventListener("input",()=>{this.currentCode=t.value,i(),this.options.onChange&&this.options.onChange(this.currentCode,this.currentLanguage)}),t.addEventListener("keydown",s=>{if(s.key==="Tab"){s.preventDefault();const n=t.selectionStart,o=t.selectionEnd,a=t.value;t.value=a.substring(0,n)+"    "+a.substring(o),t.selectionStart=t.selectionEnd=n+4,t.dispatchEvent(new Event("input"))}}),i(),t}setupEditableEvents(e){this.displayElement.addEventListener("dblclick",()=>{this.isEditing||this.enterEditMode()}),document.addEventListener("click",t=>{this.isEditing&&!e.contains(t.target)&&this.exitEditMode()})}enterEditMode(){if(!this.options.editable||this.isEditing)return;this.isEditing=!0,this.container.querySelector(".code-display-container").classList.add("editing"),this.displayElement.classList.add("code-display-hidden"),this.editElement.classList.remove("code-display-hidden"),this.editElement.value=this.currentCode;const t=this.displayElement.offsetHeight;t>0?this.editElement.style.height=t+"px":(this.editElement.style.height="auto",this.editElement.style.height=Math.max(this.editElement.scrollHeight,100)+"px"),this.editElement.focus()}exitEditMode(){if(!this.isEditing)return;this.isEditing=!1;const e=this.container.querySelector(".code-display-container");this.currentCode=this.editElement.value;const t=this.displayElement.querySelector("code");t&&(t.textContent=this.currentCode,this.options.autoHighlight&&window.Prism&&window.Prism.highlightElement(t)),e.classList.remove("editing"),this.displayElement.classList.remove("code-display-hidden"),this.editElement.classList.add("code-display-hidden")}getCode(){return this.currentCode}getLanguage(){return this.currentLanguage}setCode(e,t){var n;const i=this.currentLanguage,s=this.currentCode;if(t&&t!==i&&(this.currentLanguage=t),e!==s){this.currentCode=e;const o=(n=this.displayElement)==null?void 0:n.querySelector("code");o&&(o.textContent=e,t&&t!==i&&(o.className=o.className.replace(/language-\w+/g,""),o.className+=` language-${t}`),this.options.autoHighlight&&window.Prism&&window.Prism.highlightElement(o)),this.isEditing&&this.editElement&&(this.editElement.value=e)}else t&&t!==i&&this.setLanguage(t)}setLanguage(e){var t;if(e&&e!==this.currentLanguage){this.currentLanguage=e;const i=(t=this.displayElement)==null?void 0:t.querySelector("code");i&&(i.className=i.className.replace(/language-\w+/g,""),i.className+=` language-${e}`,this.options.autoHighlight&&window.Prism&&window.Prism.highlightElement(i))}}setEditable(e){this.options.editable=e,this.isEditing&&!e&&this.exitEditMode();const t=this.container.querySelector(".code-display-container");t?e?(t.classList.add("editable"),this.editElement||(this.editElement=this.createEditElement(this.currentCode),t.appendChild(this.editElement),this.setupEditableEvents(t))):(t.classList.remove("editable"),this.editElement&&(this.editElement.remove(),this.editElement=null)):this.render(this.currentCode,this.currentLanguage)}changeTheme(e){this.options.theme=e;const t=document.querySelector("#prism-theme-css");t?(t.href=`https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/${e}.min.css`,this.rehighlightCode()):(this.loadPrismResources(),this.rehighlightCode())}rehighlightCode(){if(!this.displayElement)return;const e=this.displayElement.querySelector("code");e&&this.options.autoHighlight&&window.Prism&&(e.className=e.className.replace(/language-\w+/g,""),e.className+=` language-${this.currentLanguage}`,window.Prism.highlightElement(e))}destroy(){this.isEditing&&this.exitEditMode(),this.container&&(this.container.innerHTML=""),this.displayElement=null,this.editElement=null}static async create(e,t,i="javascript",s={}){const n=new l(e,s);return await n.render(t,i),n}}class r{constructor(e={}){var t,i;this.callbacks={onCodeChange:((t=e.callbacks)==null?void 0:t.onCodeChange)||e.onCodeChange||null,onStateChange:((i=e.callbacks)==null?void 0:i.onStateChange)||e.onStateChange||null},this.options={displayContainer:e.displayContainer||"#codeEditor",previewContainer:e.previewContainer||"#codePreview",displayOptions:{theme:"prism",editable:!0,maxHeight:"500px",...e.displayOptions},previewOptions:{width:"100%",height:"400px",...e.previewOptions},debounceDelay:300,defaultLanguage:"html",autoPreview:!0,...e},this.uiElements=e.uiElements||{},this.componentRef=e.componentRef||null,this.state={currentCode:"",currentLanguage:this.options.defaultLanguage,theme:this.options.displayOptions.theme,editable:this.options.displayOptions.editable,showToolbar:!0,currentView:"editor",instructions:e.instructions||"",originalCode:""},this.codeDisplay=null,this.codePreview=null,this.updateTimeout=null,this.isInitialized=!1}async initialize(){if(await this.initializeComponents(),this.isInitialized=!0,this.options.defaultCode){const e=await c.loadContent(this.options.defaultCode);await this.setCode(e,this.options.defaultLanguage),this.updateState({originalCode:e})}return!0}async initializeComponents(){if(this.codeDisplay=new l(this.options.displayContainer,{...this.options.displayOptions,onChange:(e,t)=>this.handleCodeChange(e,t)}),this.codePreview=new h(this.options.previewContainer,this.options.previewOptions),this.options.defaultCode){const e=await c.loadContent(this.options.defaultCode);await this.codeDisplay.render(e,this.options.defaultLanguage),this.state.currentCode=e,this.state.originalCode=e}}updateState(e){const t={...this.state};return this.state={...this.state,...e},this.callbacks.onStateChange&&this.callbacks.onStateChange(this.state,t),this.state}getState(){return{...this.state}}async setCode(e,t){return this.codeDisplay?(await this.codeDisplay.setCode(e,t||this.state.currentLanguage),this.updateState({currentCode:e,currentLanguage:t||this.state.currentLanguage}),this.options.autoPreview&&this.updatePreviewDebounced(),!0):!1}getCode(){return this.state.currentCode}getLanguage(){return this.state.currentLanguage}async setLanguage(e){return this.codeDisplay?(this.codeDisplay.setLanguage(e),this.updateState({currentLanguage:e}),this.options.autoPreview&&this.updatePreviewDebounced(),!0):!1}updatePreviewDebounced(){clearTimeout(this.updateTimeout),this.updateTimeout=setTimeout(()=>{this.updatePreview()},this.options.debounceDelay)}async updatePreview(){if(!this.codePreview)return;const e=this.getCode();await this.codePreview.render(e)}updateDisplayConfig(e){if(!this.codeDisplay)return!1;const t={};return e.theme!==void 0&&(this.codeDisplay.changeTheme(e.theme),t.theme=e.theme),e.editable!==void 0&&(this.codeDisplay.setEditable(e.editable),t.editable=e.editable),this.updateState(t),!0}updatePreviewConfig(e){return this.codePreview?((e.width!==void 0||e.height!==void 0)&&this.codePreview.setSize(e.width,e.height),!0):!1}setShowToolbar(e){return this.updateState({showToolbar:e}),!0}handleCodeChange(e,t){this.updateState({currentCode:e,currentLanguage:t}),this.options.autoPreview&&this.updatePreviewDebounced(),this.callbacks.onCodeChange&&this.callbacks.onCodeChange(e,t)}async handleAction(e,t={}){switch(e){case"copy":return this.copyCode();case"reset":return this.resetCode();case"clear":return this.clearCode();case"switch-to-editor":return this.switchToEditor();case"switch-to-instructions":return this.switchToInstructions();default:return!1}}handleAttributeChange(e,t,i){var n;if(["theme","editable"].includes(e)){const o=e==="editable"?t==="true"||t==="":t;this.updateDisplayConfig({[e]:o})}else if(e==="language")this.setLanguage(t);else if(e==="autoPreview"){const o=t==="true"||t==="";this.options.autoPreview=o,o&&this.updatePreviewDebounced()}else if(e==="showToolbar"){const o=t==="true"||t==="";if(this.setShowToolbar(o),(n=this.componentRef)!=null&&n.render){const a={...this.state,width:this.componentRef.getAttribute("width")||"100%",height:this.componentRef.getAttribute("height")||"auto"};this.componentRef.render(a)}}else e==="debounceDelay"?this.options.debounceDelay=parseInt(t)||300:e==="instructions"&&this.updateState({instructions:t||""})}switchToEditor(){return this.updateState({currentView:"editor"}),!0}switchToInstructions(){return this.updateState({currentView:"instructions"}),!0}setInstructions(e){return this.updateState({instructions:e||""}),!0}setDefaultCode(e,t){return e?(this.options.defaultCode=e,t&&(this.options.defaultLanguage=t),!0):!1}getInstructions(){return this.state.instructions}async copyCode(){try{return await navigator.clipboard.writeText(this.getCode()),!0}catch(e){return console.warn("复制失败:",e),!1}}resetCode(){const e=this.state.originalCode||"";return this.setCode(e,this.options.defaultLanguage)}clearCode(){return this.setCode("",this.getLanguage())}destroy(){this.updateTimeout&&clearTimeout(this.updateTimeout),this.codeDisplay&&this.codeDisplay.destroy(),this.codePreview&&this.codePreview.destroy(),this.isInitialized=!1}static async create(e){const t=new r(e);return await t.initialize(),t}}typeof module<"u"&&module.exports&&(module.exports={CodeEditorPreviewController:r});typeof define=="function"&&define.amd&&define([],()=>({CodeEditorPreviewController:r}));typeof window<"u"&&(window.CodeEditorPreviewController=r);class d extends HTMLElement{constructor(){if(super(),this.controller=null,this.isInitialized=!1,this.elements={},!document.querySelector('link[href*="CodeEditorPreview.css"]')){const e=document.createElement("link");e.rel="stylesheet";try{e.href=new URL(""+new URL("CodeEditorPreview-3b5d3bc6.css",import.meta.url).href,self.location).href}catch{console.log("沙箱环境中的URL构造问题: 正在尝试使用相对路径"),e.href="/src/components/ComponentsPage/CodeEditorPreview/CodeEditorPreview.css"}document.head.appendChild(e)}}connectedCallback(){const e=this.parseAttributes();this.render(e),this.initializeController(e)}disconnectedCallback(){this.controller&&(this.controller.destroy(),this.controller=null),this.isInitialized=!1}static get observedAttributes(){return["width","theme","language","editable","auto-preview","show-toolbar","debounce-delay","default-code","default-code-path","instructions"]}attributeChangedCallback(e,t,i){if(t!==i&&this.isInitialized&&this.controller){const s=e.replace(/-([a-z])/g,n=>n[1].toUpperCase());this.controller.handleAttributeChange(s,i,t)}}parseAttributes(){const e=n=>n==="true"||n==="",t=this.getAttribute("default-code-path"),i=this.getAttribute("default-code"),s=t||i||this.getDefaultCode();return{width:this.getAttribute("width")||"100%",theme:this.getAttribute("theme")||"prism",language:this.getAttribute("language")||"html",editable:this.hasAttribute("editable")?e(this.getAttribute("editable")):!0,autoPreview:this.hasAttribute("auto-preview")?e(this.getAttribute("auto-preview")):!0,showToolbar:this.hasAttribute("show-toolbar")?e(this.getAttribute("show-toolbar")):!0,debounceDelay:parseInt(this.getAttribute("debounce-delay"))||300,defaultCode:s,defaultCodePath:t,originalDefaultContent:i,instructions:this.getAttribute("instructions")||""}}render(e){this.innerHTML=`
            <div class="code-editor-preview-wrapper" style="width: ${e.width};">
                ${e.showToolbar?`
                    <div class="code-editor-toolbar">
                        <div class="toolbar-group">
                            <label>主题：</label>
                            <select class="theme-select">
                                <option value="prism">默认</option>
                                <option value="prism-dark">深色</option>
                                <option value="prism-tomorrow">Tomorrow</option>
                                <option value="prism-okaidia">Okaidia</option>
                            </select>
                        </div>
                        <div class="toolbar-group">
                            <label><input type="checkbox" class="enable-editing" ${e.editable?"checked":""}> 允许编辑</label>
                        </div>
                        <div class="toolbar-group">
                            <button class="btn view-switch-btn active" data-action="switch-to-editor">代码编辑器</button>
                            <button class="btn view-switch-btn" data-action="switch-to-instructions">使用说明</button>
                        </div>
                        <div class="toolbar-actions">
                            <button class="btn" data-action="copy">📋 复制代码</button>
                            <button class="btn" data-action="reset">🔄 重置</button>
                            <button class="btn" data-action="clear">🗑️ 清空</button>
                        </div>
                    </div>
                `:""}
                
                <div class="code-editor-preview-main">
                    <div class="code-editor-section">
                        <div class="section-header">
                            <h3>代码编辑器</h3>
                            <div class="editor-controls">
                                <select class="language-select">
                                    <option value="html">HTML</option>
                                    <option value="css">CSS</option>
                                    <option value="javascript">JavaScript</option>
                                    <option value="json">JSON</option>
                                    <option value="xml">XML</option>
                                </select>
                            </div>
                        </div>
                        <div class="code-editor-container" id="codeEditor"></div>
                        
                        <!-- 使用说明覆盖层 -->
                        <div class="instructions-overlay" style="display: none;">
                            <div class="instructions-content">
                                <div class="instructions-text">${e.instructions||"开发者还没有写使用说明哦"}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="code-preview-section">
                        <div class="section-header">
                            <h3>实时预览</h3>
                        </div>
                        <div class="code-preview-container" id="codePreview"></div>
                    </div>
                </div>
            </div>
        `,this.cacheElements(),this.setupEventListeners()}cacheElements(){this.elements={wrapper:this.querySelector(".code-editor-preview-wrapper"),languageSelect:this.querySelector(".language-select"),themeSelect:this.querySelector(".theme-select"),enableEditing:this.querySelector(".enable-editing"),codeEditorContainer:this.querySelector("#codeEditor"),codePreviewContainer:this.querySelector("#codePreview"),instructionsOverlay:this.querySelector(".instructions-overlay"),instructionsText:this.querySelector(".instructions-text"),viewSwitchBtns:this.querySelectorAll(".view-switch-btn")}}setupEventListeners(){this.addEventListener("click",this.handleClick.bind(this)),this.addEventListener("change",this.handleChange.bind(this))}handleClick(e){if(!this.controller)return;const t=e.target.dataset.action;t&&this.controller.handleAction(t).catch(i=>{console.error("处理操作时出错:",i)})}handleChange(e){if(!this.controller)return;const t=e.target;t.classList.contains("language-select")?this.controller.setLanguage(t.value):t.classList.contains("theme-select")?this.controller.updateDisplayConfig({theme:t.value}):t.classList.contains("enable-editing")&&this.controller.updateDisplayConfig({editable:t.checked})}async initializeController(e){const t={displayContainer:this.elements.codeEditorContainer,previewContainer:this.elements.codePreviewContainer,defaultCode:e.defaultCode,defaultLanguage:e.language,autoPreview:e.autoPreview,debounceDelay:e.debounceDelay,instructions:e.instructions,displayOptions:{theme:e.theme,editable:e.editable,maxHeight:"400px",wordWrap:!0},previewOptions:{width:"100%",height:"400px"},uiElements:this.elements,componentRef:this,callbacks:{onCodeChange:(i,s)=>{this.dispatchEvent(new CustomEvent("code-change",{detail:{code:i,language:s}}))},onStateChange:(i,s)=>{this.updateUI(i,s)}}};this.controller=await r.create(t),this.isInitialized=!0}updateUI(e,t={}){e&&(e.currentView!==t.currentView&&this.updateViewDisplay(e.currentView),e.instructions!==t.instructions&&this.elements.instructionsText&&(this.elements.instructionsText.textContent=e.instructions||"开发者还没有写使用说明哦"),e.currentLanguage!==t.currentLanguage&&this.elements.languageSelect&&(this.elements.languageSelect.value=e.currentLanguage),e.theme!==t.theme&&this.elements.themeSelect&&(this.elements.themeSelect.value=e.theme),e.editable!==t.editable&&this.elements.enableEditing&&(this.elements.enableEditing.checked=e.editable))}updateViewDisplay(e){this.elements.instructionsOverlay&&(this.elements.viewSwitchBtns.forEach(t=>{t.classList.remove("active"),(e==="editor"&&t.dataset.action==="switch-to-editor"||e==="instructions"&&t.dataset.action==="switch-to-instructions")&&t.classList.add("active")}),this.elements.instructionsOverlay.style.display=e==="instructions"?"block":"none")}getCode(){var e;return((e=this.controller)==null?void 0:e.getCode())||""}setCode(e,t){var i;return((i=this.controller)==null?void 0:i.setCode(e,t))||!1}getLanguage(){var e;return((e=this.controller)==null?void 0:e.getLanguage())||"html"}setLanguage(e){var t;return((t=this.controller)==null?void 0:t.setLanguage(e))||!1}getInstructions(){var e;return((e=this.controller)==null?void 0:e.getInstructions())||""}setInstructions(e){var t;return((t=this.controller)==null?void 0:t.setInstructions(e))||!1}switchToEditor(){var e;return((e=this.controller)==null?void 0:e.switchToEditor())||!1}switchToInstructions(){var e;return((e=this.controller)==null?void 0:e.switchToInstructions())||!1}getController(){return this.controller}setDefaultCode(e,t){var i;return((i=this.controller)==null?void 0:i.setCode(e,t))||!1}getDefaultCode(){return`<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>代码预览示例</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 { text-align: center; color: #333; }
        .demo { padding: 20px; background: #f5f5f5; border-radius: 8px; margin: 20px 0; }
    </style>
</head>
<body>
    <h1>代码编辑预览器</h1>
    <div class="demo">
        <p>这是一个示例页面，你可以编辑代码并实时预览效果。</p>
    </div>
</body>
</html>`}}customElements.get("code-editor-preview")||customElements.define("code-editor-preview",d);typeof module<"u"&&module.exports&&(module.exports=d);typeof define=="function"&&define.amd&&define([],()=>d);typeof window<"u"&&(window.CodeEditorPreview=d);export{d as CodeEditorPreview};
