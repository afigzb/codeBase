async function t(){try{return{id:"sliding-damping",name:"滑动阻尼",title:"滑动阻尼",icon:"/ComponentControlSystem/Component/SlidingDamping/resource/img/滚动阻尼.png",category:"interaction",categoryName:"交互特效",tags:["滚动控制","动画特效","阻尼效果"],description:"基于Web Components的平滑滚动组件，模拟物理世界中的阻尼滚动效果，为网页提供自然流畅的滚动体验。",features:[{icon:"🌊",title:"物理阻尼",description:"基于物理阻尼模型，实现自然流畅的滚动体验"},{icon:"📱",title:"多设备支持",description:"完美支持鼠标滚轮和触摸屏操作，自适应不同设备"},{icon:"⚙️",title:"参数可配",description:"支持阻尼系数、滚动速度等参数的灵活配置"},{icon:"🚀",title:"性能优化",description:"使用requestAnimationFrame和will-change属性优化性能"}],implementation:[{icon:"🔧",title:"Web Components",description:"使用原生Web Components技术，可在任意框架中使用"},{icon:"📊",title:"阻尼算法",description:"采用经典阻尼振动模型，计算平滑的滚动过渡"},{icon:"💡",title:"CSS Transform",description:"使用GPU加速的CSS transform实现高性能渲染"}],demonstrations:[{id:"sliding-damping-full-demo",title:"完整功能演示",description:"体验SlidingDamping组件的完整功能，包括平滑滚动、参数调整、不同设备适配等特性。页面展示了组件的工作原理和使用方法。",features:["平滑阻尼滚动效果","实时参数调整","多设备兼容性测试","滚动性能优化","可视化参数展示","交互式使用指南"],icon:"🌊",side:"center",htmlPath:"/ComponentControlSystem/Component/SlidingDamping/SlidingDampingDemo/SlidingDamping.html"}],usageTips:[{title:"基本使用",content:"用<sliding-damping>包裹内容，即可获得平滑滚动效果"},{title:"阻尼调节",content:"damping值越小滚动越平滑，建议0.01-0.2之间"},{title:"触摸优化",content:"touch-damping专门优化触摸设备的响应速度"},{title:"性能考虑",content:"limit-speed限制最大滚动速度，防止性能问题"}],onlineExperience:{title:"在线体验",description:"体验SlidingDamping组件的平滑滚动效果，实时调整参数感受不同的阻尼特性。",htmlPath:"/ComponentControlSystem/Component/SlidingDamping/SlidingDampingDemo/SlidingDamping.html",instructions:`SlidingDamping 在线体验

这是一个基于物理阻尼模型的平滑滚动组件，你可以：

• 🌊 体验自然流畅的阻尼滚动效果
• ⚙️ 实时调整阻尼参数，感受不同的滚动特性
• 📱 在不同设备上测试滚动体验（鼠标/触摸）
• 🎯 观察滚动速度限制的效果
• 📊 了解组件的工作原理和实现方法

组件特点：
- 基于物理阻尼模型的自然滚动
- 支持鼠标滚轮和触摸操作
- 可配置的阻尼系数和速度限制
- 高性能的GPU加速渲染
- 标准Web Components实现

试试滚动页面并调整参数，感受不同阻尼效果的差异！`},apiDocumentation:{title:"API 文档",properties:[{name:"damping",type:"Number",default:"0.03",description:"鼠标滚轮的阻尼系数，值越小滚动越平滑（建议范围：0.01-0.2）"},{name:"touch-damping",type:"Number",default:"0.15",description:"触摸设备的阻尼系数，值越大响应越快（建议范围：0.05-0.5）"},{name:"limit-speed",type:"Number",default:"100",description:"最大滚动速度限制，防止滚动过快影响性能（建议范围：50-200）"}],methods:[{name:"scrollTo(position)",description:"滚动到指定位置",parameters:[{name:"position",type:"Number",description:"目标滚动位置（像素值）"}]},{name:"getCurrentPosition()",description:"获取当前滚动位置",returns:{type:"Number",description:"当前滚动位置（像素值）"}}],events:[{name:"scroll",description:"滚动位置发生变化时触发",detail:{currentY:"Number - 当前Y位置",targetY:"Number - 目标Y位置"}},{name:"scrollstart",description:"开始滚动时触发"},{name:"scrollend",description:"滚动结束时触发"}]},technicalPrinciple:{title:"技术原理",description:"SlidingDamping组件的核心实现基于经典的阻尼振动物理模型",principles:[{title:"阻尼方程",description:"使用阻尼系数计算当前位置到目标位置的平滑过渡",formula:"currentY += (targetY - currentY) * damping"},{title:"事件捕获",description:"统一处理鼠标滚轮和触摸事件，计算目标滚动位置"},{title:"动画循环",description:"使用requestAnimationFrame在每一帧更新位置，确保60fps的流畅体验"},{title:"GPU加速",description:"使用CSS transform属性实现硬件加速的位置变换"}]},useCases:[{title:"长页面滚动",description:"为长页面提供流畅的滚动体验，减少滚动时的突兀感"},{title:"移动端优化",description:"在移动设备上提供类似原生App的滚动手感"},{title:"展示页面",description:"为产品展示、作品集等页面增加精致的滚动效果"},{title:"游戏界面",description:"为游戏UI提供平滑的滚动交互体验"}]}}catch(i){throw console.error("加载SlidingDamping数据失败:",i),i}}export{t as getSlidingDampingData};
