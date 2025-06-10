async function t(){try{return{id:"focus-div",name:"聚焦容器",title:"聚焦容器",icon:"/ComponentControlSystem/Component/FocusDiv/resource/img/弹性回弹容器.png",category:"interaction",categoryName:"交互特效",tags:["鼠标跟随","动画特效","弹性回弹"],description:"基于LitElement的高性能鼠标跟随回弹组件，采用胡克定律和阻尼力学模拟真实物理弹性效果，提供丝滑的交互体验。",features:[{icon:"🔮",title:"物理级回弹模拟",description:"基于胡克定律(F=-kx)和阻尼力(F=-bv)的真实物理计算"},{icon:"🎯",title:"精准鼠标跟随",description:"高精度鼠标位置感知，支持多层嵌套的复杂跟随效果"},{icon:"⚡",title:"性能优化",description:"节流控制、requestAnimationFrame优化，保证60fps流畅体验"},{icon:"🔧",title:"高度可配置",description:"丰富的物理参数配置，满足不同场景的交互需求"}],implementation:[{icon:"⚡",title:"LitElement",description:"基于现代Web Component技术，高性能渲染"},{icon:"🧮",title:"物理引擎",description:"自研轻量级物理引擎，实现真实的弹性交互"},{icon:"🎮",title:"CSS3 Transform",description:"硬件加速的CSS变换，确保动画流畅性"}],demonstrations:[{id:"focus-div-basic-demo",title:"基础回弹效果演示",description:"展示FocusDiv的基础鼠标跟随和回弹效果，体验物理级的弹性交互。支持自定义弹簧系数、阻尼系数等物理参数。",features:["鼠标悬停跟随效果","离开时平滑回弹","物理参数可调节","弹簧阻尼系统","性能优化处理","响应式设计"],icon:"🎯",side:"left",htmlPath:"/ComponentControlSystem/Component/FocusDiv/FocusDivDamo/BasicUsage.html"},{id:"focus-div-advanced-demo",title:"高级层叠效果演示",description:"展示FocusDiv的高级用法，包括多层嵌套、不同物理参数配置的层叠效果，演示复杂场景下的交互体验。",features:["多层嵌套跟随","不同物理参数配置","透明和非透明层叠","差异化响应速度","复杂交互场景","视觉层次展示"],icon:"🚀",side:"right",htmlPath:"/ComponentControlSystem/Component/FocusDiv/FocusDivDamo/AdvancedUsage%20.html"}],usageTips:[{title:"基本使用",content:"用<drag-follow>包裹内容即可创建跟随回弹效果"},{title:"物理参数",content:"通过springConstant和dampingFactor调节回弹特性"},{title:"跟随范围",content:"使用max-offset控制最大跟随偏移距离"},{title:"响应速度",content:"通过follow-speed调节鼠标跟随的响应速度"},{title:"多层嵌套",content:"支持多层<drag-follow>嵌套实现复杂交互效果"},{title:"性能考虑",content:"组件已内置性能优化，支持大量元素同时使用"}],onlineExperience:{title:"物理回弹体验",description:"体验FocusDiv组件的物理级回弹效果，感受真实的弹性交互和多层嵌套的复杂场景。",htmlPath:"/ComponentControlSystem/Component/FocusDiv/FocusDivDamo/BasicUsage.html",instructions:`FocusDiv 物理回弹体验

这是一个物理级的鼠标跟随回弹组件，你可以：

• 🎯 将鼠标悬停在卡片上，观察精准的跟随效果
• 🔮 移开鼠标，体验基于胡克定律的真实物理回弹
• ⚡ 感受60fps的流畅动画和即时响应
• 🚀 在高级演示中体验多层嵌套的复杂效果
• 🔧 观察不同物理参数带来的差异化体验

物理特性：
- 胡克定律：F = -kx（弹簧恢复力）
- 阻尼力：F = -bv（速度阻尼）
- 真实的物理计算和状态更新
- 支持自定义弹簧和阻尼系数

技术亮点：
- 高性能的requestAnimationFrame动画
- 节流优化的鼠标事件处理
- CSS3硬件加速的transform变换
- 完整的生命周期管理

适用场景：
- 产品展示和交互式卡片
- 游戏界面和创意网站
- 品牌展示和艺术项目
- 需要吸引注意力的关键元素

体验物理级的弹性美学！`},apiDocumentation:{title:"API 文档",properties:[{name:"max-offset",type:"Number",default:"50",description:"最大偏移距离（像素），控制跟随范围"},{name:"follow-speed",type:"Number",default:"0.05",description:"跟随速度系数，值越大响应越快"},{name:"spring-constant",type:"Number",default:"0.8",description:"弹簧系数k，控制回弹力度"},{name:"damping-factor",type:"Number",default:"0.3",description:"阻尼系数b，控制衰减速度"},{name:"max-bounce-times",type:"Number",default:"3",description:"最大回弹次数，防止无限振荡"},{name:"bounce-threshold",type:"Number",default:"0.5",description:"回弹停止阈值，控制停止灵敏度"}],physicsParameters:[{name:"物理参数说明",description:"深入理解组件的物理模拟原理",details:["springConstant (k): 弹簧劲度系数，值越大回弹越强烈","dampingFactor (b): 阻尼系数，值越大衰减越快","maxOffset: 限制跟随范围，防止过度偏移","followSpeed: 鼠标跟随的插值速度","bounceThreshold: 回弹能量阈值，低于此值停止动画"]}],events:[{name:"mousemove",description:"鼠标移动时触发跟随计算（内部事件）"},{name:"mouseleave",description:"鼠标离开时触发回弹动画（内部事件）"}],methods:[{name:"resetToInitialState()",description:"重置组件到初始状态（内部方法）"},{name:"cleanup()",description:"清理事件监听器和动画（内部方法）"}],technicalDetails:[{name:"技术实现细节",description:"了解组件的核心技术架构",details:["LitElement: 现代Web Component框架","CSS3 Transform: 硬件加速的位移变换","requestAnimationFrame: 浏览器优化的动画循环","节流控制: 16ms间隔的鼠标事件优化","物理引擎: 自研的轻量级弹性计算系统"]}]}}}catch(e){throw console.error("加载FocusDiv数据失败:",e),e}}export{t as getFocusDivData};
