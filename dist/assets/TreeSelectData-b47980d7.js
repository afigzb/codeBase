async function t(){try{return{id:"tree-select",name:"树形选择器",title:"树形选择器",icon:"/ComponentControlSystem/Component/TreeSelect/resource/img/树选择.png",category:"form",categoryName:"表单控件",tags:["树形组件","数据选择","表单控件"],description:"基于LitElement构建的高性能树形选择器组件，支持层级数据展示、多种选择模式和丰富的交互功能。",features:[{icon:"🌳",title:"层级数据展示",description:"支持无限层级的树形数据结构，自动构建父子关系"},{icon:"🎛️",title:"数据驱动控制",description:"通过属性控制搜索、展开、隐藏、选择等所有交互行为"},{icon:"⚡",title:"数据结构性能优化",description:"基于哈希表映射、局部更新机制和Lit自带的性能优化"},{icon:"📡",title:"事件驱动架构",description:"完整的事件系统，支持状态变化监听和组件间通信"}],implementation:[{icon:"⚡",title:"LitElement",description:"基于现代Web Component技术，性能优异"},{icon:"📊",title:"数据驱动",description:"完全数据驱动的渲染机制，状态管理清晰"},{icon:"🔧",title:"高度可配置",description:"丰富的属性配置，满足不同业务需求"}],demonstrations:[{id:"tree-select-default-demo",title:"默认模式演示",description:"展示TreeSelect的默认父节点自动选择模式，当选中所有子节点时父节点自动选中，选中父节点时所有子节点自动选中。",features:["父节点自动选择","子节点联动选择","完整选中状态管理","传统树形选择器体验","层级数据展示","展开收起控制"],icon:"🌲",side:"left",htmlPath:"/ComponentControlSystem/Component/TreeSelect/TreeSelectDemo/Default.html"},{id:"tree-select-independent-demo",title:"独立选择模式演示",description:"展示TreeSelect的独立选择模式，每个节点独立选择互不影响，适合需要精确控制选择范围的场景。",features:["节点独立选择","无父子联动","精确选择控制","灵活的选择策略","所有选中节点返回","适合复杂业务场景"],icon:"🎯",side:"right",htmlPath:"/ComponentControlSystem/Component/TreeSelect/TreeSelectDemo/Independent.html"},{id:"tree-select-advanced-demo",title:"高级功能演示",description:"展示TreeSelect的高级功能，包括动态切换选择模式、复选框显示控制、全部展开收起等功能。",features:["动态模式切换","复选框显示控制","全部展开/收起","实时状态查看","完整功能演示","交互式配置"],icon:"⚙️",side:"left",htmlPath:"/ComponentControlSystem/Component/TreeSelect/TreeSelectDemo/Advanced.html"}],usageTips:[{title:"基本使用",content:"通过data属性传入树形数据，支持平级和层级两种数据格式"},{title:"选择模式",content:"使用auto-select-parent属性控制是否启用父节点自动选择"},{title:"复选框控制",content:"使用show-checkbox属性控制是否显示复选框"},{title:"搜索过滤",content:"通过keyword属性实现搜索过滤功能"},{title:"事件监听",content:"监听selected-nodes-changed事件获取选择变化"},{title:"方法调用",content:"使用getSelectedNodes()、toggleNode()等方法进行编程控制"}],onlineExperience:{title:"性能测试体验",description:"体验TreeSelect组件在大数据量下的高性能表现，测试15级深度树形结构的渲染和交互性能。",htmlPath:"/ComponentControlSystem/Component/TreeSelect/TreeSelectDemo/PerformanceTesting.html",instructions:`TreeSelect 性能测试体验

这是一个高性能的树形选择器组件，在此页面你可以：

• 🚀 测试15级深度、大数据量的树形结构渲染
• ⚡ 体验毫秒级响应的展开/收起操作
• 📊 实时查看渲染时间、更新时间等性能指标
• 🔍 测试大数据量下的搜索过滤性能
• 🎯 批量选择和清空操作的响应速度

性能特点：
- 基于哈希表的O(1)节点查找
- 局部更新机制，避免全量重渲染
- Lit框架的原生性能优化
- 支持数万节点的流畅交互

测试功能：
- 生成随机15级深度测试数据
- 全选/清空的批量操作测试
- 展开/收起的状态切换测试
- 内存使用情况监控

快捷键：
Ctrl+A: 全选 | Ctrl+D: 清空 | Ctrl+E: 展开所有 | Ctrl+C: 收起所有

体验大数据量下的极致性能表现！`},apiDocumentation:{title:"API 文档",properties:[{name:"data",type:"Array",default:"[]",description:"树形数据数组，每个节点包含id、name、parentId等字段"},{name:"selectedNodes",type:"Array",default:"[]",description:"选中的节点数组（只读）"},{name:"show-checkbox",type:"Boolean",default:"true",description:"是否显示复选框"},{name:"auto-select-parent",type:"Boolean",default:"true",description:"是否启用父节点自动选择模式"},{name:"keyword",type:"String",default:"''",description:"搜索关键字，用于过滤节点"}],methods:[{name:"getSelectedNodes()",description:"获取当前选中的节点数组"},{name:"toggleNode(nodeId)",description:"切换指定节点的展开/收起状态"},{name:"updateNodeState(nodeId, checked)",description:"更新指定节点的选中状态"},{name:"toggleCheckboxVisibility()",description:"切换复选框的显示/隐藏状态"},{name:"toggleAutoSelectParent()",description:"切换父节点自动选择模式"}],events:[{name:"selected-nodes-changed",description:"选中节点发生变化时触发，detail包含当前选中的节点数组"},{name:"node-removed",description:"节点被移除时触发，detail包含被移除的节点ID"}],dataStructure:[{name:"节点数据结构",description:"树形数据中每个节点的标准格式",example:`{
  id: 1,                    // 节点唯一标识
  name: "节点名称",          // 显示名称
  parentId: null,           // 父节点ID，根节点为null
  type: "folder",           // 节点类型：folder/file
  icon: "folder",           // 图标名称
  order: 1,                 // 排序权重
  disabled: false,          // 是否禁用
  expanded: true            // 是否展开（可选）
}`}]}}}catch(e){throw console.error("加载TreeSelect数据失败:",e),e}}export{t as getTreeSelectData};
