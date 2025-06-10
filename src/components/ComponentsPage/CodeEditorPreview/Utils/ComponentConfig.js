/**
 * 组件控制系统 - 统一配置文件
 * 集中管理所有组件的配置信息，包括组件识别模式、路径等
 * 使用静态预设路径，无需动态解析
 */

/**
 * 组件识别配置映射表 - 直接使用完整的静态路径
 * 
 * 【配置说明】
 * 
 * patterns - 组件识别模式数组:
 *   - 用于在HTML代码中识别特定组件类型
 *   - 当CodeEditorPreview检测到HTML代码包含这些模式时，会自动应用对应的baseUrl
 *   - 例如：当HTML中包含 '<audio-player' 标签时，识别为AudioPlayer组件
 *   - 支持多种模式匹配，可以是标签名、类名或其他特征字符串
 * 
 * baseUrl - 组件基础路径:
 *   - 指定组件Demo文件夹的绝对路径
 *   - 用于解决iframe中相对路径导入问题（如 '../../../xxx' 变为绝对路径）
 *   - IframeProcessor会自动注入 <base href="baseUrl"> 标签到HTML中
 *   - 确保组件内部的相对路径导入（CSS、JS等）能正确解析
 * 
 * 【工作流程】
 * 1. IframeProcessor.detectComponentType() 扫描HTML代码
 * 2. 匹配patterns中的任一模式，确定组件类型
 * 3. 获取对应的baseUrl路径
 * 4. 在iframe的HTML head中注入 <base href="baseUrl">
 * 5. 浏览器自动将相对路径解析为绝对路径
 * 
 * 【示例】
 * 原HTML代码: <script src="../../../Dependency/lit-core.min.js"></script>
 * 识别为DragDropContainer组件，能判断相对路径后:
 * 注入: <base href="/ComponentControlSystem/Component/DragDropContainer/DragDropContainerDemo/">
 * 解析为: /ComponentControlSystem/Component/DragDropContainer/DragDropContainerDemo/../../../Dependency/lit-core.min.js
 * 即: /ComponentControlSystem/Dependency/lit-core.min.js
 */
export const COMPONENT_MAP = {
    'AudioPlayer': {
        patterns: ['<audio-player', 'AudioPlayer'],
        baseUrl: '/ComponentControlSystem/Component/AudioPlayer/AudioPlayerDemo/'
    },
    'CodeEditorPreview': {
        patterns: ['<code-editor-preview', 'CodeEditorPreview'],
        baseUrl: '/ComponentControlSystem/Component/CodeEditorPreview/CodeEditorPreviewDemo/'
    },
    'DragDropContainer': {
        patterns: ['<draggable-container', '<drag-drop', 'DragDrop'],
        baseUrl: '/ComponentControlSystem/Component/DragDropContainer/DragDropContainerDemo/'
    },
    'Echarts': {
        patterns: ['echarts', 'ECharts'],
        baseUrl: '/ComponentControlSystem/Component/Echarts/EchartsDemo/'
    },
    'SlidingDamping': {
        patterns: ['sliding-damping', 'SlidingDamping'],
        baseUrl: '/ComponentControlSystem/Component/SlidingDamping/SlidingDampingDemo/'
    },
    'TreeSelect': {
        patterns: ['<tree-select', 'TreeSelect', 'tree-select'],
        baseUrl: '/ComponentControlSystem/Component/TreeSelect/TreeSelectDemo/'
    },
    'FaultTextEffect': {
        patterns: ['<fault-text-effect', 'FaultTextEffect', 'fault-text-effect'],
        baseUrl: '/ComponentControlSystem/Component/FaultTextEffect/FaultTextEffectDemo/'
    },
    'FocusDiv': {
        patterns: ['<drag-follow', 'DragFollow', 'drag-follow', 'FocusDiv'],
        baseUrl: '/ComponentControlSystem/Component/FocusDiv/FocusDivDamo/'
    },
    'FluidCursor': {
        patterns: ['FluidCursor', 'fluid-cursor', 'fluidCursor'],
        baseUrl: '/ComponentControlSystem/Component/FluidCursor/FluidCursorDemo/'
    },
    'StarCursor': {
        patterns: ['StarCursor', 'star-cursor', 'starCursor', 'createStarsTrail'],
        baseUrl: '/ComponentControlSystem/Component/StarCursor/'
    },
    'RippCursor': {
        patterns: ['RippCursor', 'ripp-cursor', 'rippCursor', 'WaterRippleCursor', 'water-ripple'],
        baseUrl: '/ComponentControlSystem/Component/RippCursor/'
    },
    'CircleCursor': {
        patterns: ['CircleCursor', 'circle-cursor', 'circleCursor', '‌CircleCursor‌'],
        baseUrl: '/ComponentControlSystem/Component/‌CircleCursor‌/'
    },
    'SelectCard': {
        patterns: ['<select-card', 'SelectCard', 'select-card'],
        baseUrl: '/ComponentControlSystem/Component/SelectCard/'
    },
};

// 默认基础路径（当无法识别组件类型时使用）
export const DEFAULT_BASE_URL = '/ComponentControlSystem/Component/';

// 组件检测相关配置
export const DETECTION_CONFIG = {
    // 需要base URL处理的模式
    baseUrlPatterns: [
        'import \'../', 
        'import "../', 
        'src="../', 
        'href="../', 
        'from \'../', 
        'from "../'
    ],
    
    // 导入路径检测正则
    importPathRegex: /import.*['"`]\.\.\/src\/(\w+)/
};

// iframe相关配置
export const IFRAME_CONFIG = {
    // 默认样式
    defaultStyles: `
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
    `,
    
    // 默认脚本
    defaultScripts: `
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
    `,
    
    // 空白页面提示文本
    emptyPageText: '暂无预览内容'
}; 