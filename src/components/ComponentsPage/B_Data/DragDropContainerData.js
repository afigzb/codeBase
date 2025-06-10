/**
 * DragDropContainer 组件数据
 * 基于LitElement的可拖拽容器组件，支持平滑拖拽和惯性滑动
 */

export async function getDragDropContainerData() {
  try {
    return {
      id: 'drag-drop-container',
      name: '拖拽容器',
      title: '拖拽容器',
      icon: '/ComponentControlSystem/Component/DragDropContainer/resource/img/拖拽组件.png',
      category: 'interaction',
      categoryName: '交互特效',
      tags: ['拖拽操作', '交互操作', '容器组件'],
      
      // 功能描述
      description: '基于LitElement构建的高性能拖拽容器组件，支持鼠标和触摸设备，提供平滑的拖拽体验和惯性滑动效果。',
      
      // 核心功能列表
      features: [
        {
          icon: '🖱️',
          title: '多设备支持',
          description: '同时支持鼠标和触摸操作，自动适配不同设备'
        },
        {
          icon: '✨',
          title: '平滑动画',
          description: '内置惯性滑动效果，提供自然流畅的拖拽体验'
        },
        {
          icon: '🎯',
          title: '智能边界',
          description: '自动检测边界约束，防止元素超出可视区域'
        },
        {
          icon: '🔧',
          title: '交互保护',
          description: '智能识别内部交互元素，确保按钮等控件正常工作'
        }
      ],
      
      // 实现方式
      implementation: [
        {
          icon: '⚡',
          title: 'LitElement',
          description: '基于现代Web Component技术，轻量高效'
        },
        {
          icon: '📱',
          title: '触摸友好',
          description: '统一的指针事件处理，完美支持移动设备'
        },
        {
          icon: '🎨',
          title: '高度定制',
          description: '灵活的属性配置，支持初始位置和百分比定位'
        }
      ],
      
      // 具体展示项目
      demonstrations: [
        {
          id: 'drag-drop-basic-demo',
          title: '基础拖拽演示',
          description: '展示DragDropContainer的基本拖拽功能，包括平滑拖拽、惯性滑动和边界约束。体验不同风格的可拖拽卡片。',
          features: [
            '流畅的拖拽体验',
            '惯性滑动效果',
            '边界碰撞检测',
            '交互元素保护',
            '百分比定位支持',
            '触摸设备兼容'
          ],
          icon: '🎯',
          side: 'left',
          htmlPath: '/ComponentControlSystem/Component/DragDropContainer/DragDropContainerDemo/DragDropDemo.html'
        },
        {
          id: 'interactive-demo',
          title: '交互式应用演示',
          description: '展示在实际应用场景中的拖拽容器使用，包括工具箱、便签、时钟和媒体控制器等可拖拽小部件。',
          features: [
            '完整的交互式小部件',
            '表单元素正常工作',
            '实时时钟显示',
            '媒体控制功能',
            '便签编辑器',
            '工具栏操作'
          ],
          icon: '🛠️',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/DragDropContainer/DragDropContainerDemo/InteractiveDemo.html'
        }
      ],
      
      // 使用提示
      usageTips: [
        {
          title: '基本使用',
          content: '用<draggable-container>包裹任意内容即可拖拽'
        },
        {
          title: '位置设置',
          content: '支持initial-x/y或initial-x-percent/y-percent属性'
        },
        {
          title: '交互保护',
          content: '给交互元素添加draggable-ignore属性防止拖拽'
        },
        {
          title: '触摸优化',
          content: '自动处理触摸事件，无需额外配置'
        }
      ],
      
      // 在线体验说明
      onlineExperience: {
        title: '在线体验',
        description: '体验DragDropContainer组件的完整功能，包括基础拖拽和复杂交互场景。',
        htmlPath: '/ComponentControlSystem/Component/DragDropContainer/DragDropContainerDemo/DragDropDemo.html',
        instructions: `DragDropContainer 在线体验

这是一个功能强大的拖拽容器组件，你可以：

• 🖱️ 点击并拖拽任意卡片到屏幕上的任何位置
• ✨ 体验平滑的惯性滑动效果，松开鼠标后元素会自然滑行
• 🎯  测试边界约束功能，卡片不会超出屏幕范围
• 🔧  点击卡片内的按钮和输入框，它们不会触发拖拽
• 📱 在触摸设备上也能完美工作

组件特点：
- 基于现代Web Component技术
- 支持鼠标和触摸操作
- 内置惯性滑动算法
- 智能交互元素识别

试试拖拽这些卡片，感受流畅的交互体验！`
      },
      
      // API 文档
      apiDocumentation: {
        title: 'API 文档',
        properties: [
          {
            name: 'initial-x',
            type: 'Number',
            default: '0',
            description: '初始X坐标（像素值）'
          },
          {
            name: 'initial-y',
            type: 'Number',
            default: '0',
            description: '初始Y坐标（像素值）'
          },
          {
            name: 'initial-x-percent',
            type: 'Number',
            default: '0',
            description: '初始X位置百分比（0-100）'
          },
          {
            name: 'initial-y-percent',
            type: 'Number',
            default: '0',
            description: '初始Y位置百分比（0-100）'
          }
        ],
        attributes: [
          {
            name: 'draggable-ignore',
            description: '添加到子元素上，防止该元素触发拖拽行为'
          }
        ],
        events: [
          {
            name: 'dragstart',
            description: '拖拽开始时触发'
          },
          {
            name: 'dragmove',
            description: '拖拽过程中触发'
          },
          {
            name: 'dragend',
            description: '拖拽结束时触发'
          }
        ]
      }
    };
  } catch (error) {
    console.error('加载DragDropContainer数据失败:', error);
    throw error; // 让上层处理错误
  }
}
