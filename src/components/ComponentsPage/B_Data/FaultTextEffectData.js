/**
 * FaultTextEffect 组件数据
 * 基于原生Web Component的文字故障效果组件，支持RGB通道分离和动态故障动画
 */

export async function getFaultTextEffectData() {
  try {
    return {
      id: 'fault-text-effect',
      name: '故障文字',
      title: '故障文字',
      icon: '/ComponentControlSystem/Component/FaultTextEffect/resource/img/故障文字.png',
      category: 'effect',
      categoryName: '视觉特效',
      tags: ['文字特效', '故障效果', '动画特效'],
      
      // 功能描述
      description: '基于原生Web Component技术的文字故障效果组件，实现RGB通道分离、动态裁剪和随机抖动等赛博朋克风格的视觉特效。',
      
      // 核心功能列表
      features: [
        {
          icon: '✨',
          title: 'RGB通道分离',
          description: '实现红蓝色彩分离效果，营造数字故障的视觉冲击'
        },
        {
          icon: '🎭',
          title: '动态裁剪动画',
          description: '基于clip-path的随机裁剪效果，模拟信号干扰'
        },
        {
          icon: '📺',
          title: '多层文本重叠',
          description: '可配置的文本容器数量，创造层次丰富的故障效果'
        },
        {
          icon: '⚡',
          title: '交互式触发',
          description: '点击文字即可触发故障动画，提供良好的用户体验'
        }
      ],
      
      // 实现方式
      implementation: [
        {
          icon: '🌐',
          title: '原生Web Component',
          description: '基于HTML标准，无依赖，兼容性强'
        },
        {
          icon: '🎨',
          title: 'CSS混合模式',
          description: '利用mix-blend-mode实现专业的视觉混合效果'
        },
        {
          icon: '🔧',
          title: 'Shadow DOM',
          description: '完全的样式隔离，避免CSS冲突'
        }
      ],
      
      // 具体展示项目
      demonstrations: [
        {
          id: 'fault-text-basic-demo',
          title: '故障文字效果演示',
          description: '展示FaultTextEffect的完整功能，包括不同参数配置下的故障效果。体验RGB通道分离、动态裁剪和多层重叠的视觉特效。',
          features: [
            '点击触发故障动画',
            'RGB红蓝色彩分离',
            '随机动态裁剪效果',
            '可配置复制体数量',
            '自定义动画持续时间',
            '多种效果组合展示'
          ],
          icon: '💥',
          side: 'center',
          htmlPath: '/ComponentControlSystem/Component/FaultTextEffect/FaultTextEffectDemo/FaultTextEffect.html'
        }
      ],
      
      // 使用提示
      usageTips: [
        {
          title: '基本使用',
          content: '用<fault-text-effect>包裹文字内容即可创建故障效果'
        },
        {
          title: '触发动画',
          content: '点击文字区域触发故障动画效果'
        },
        {
          title: '复制体数量',
          content: '使用container-count属性调整重叠文本数量'
        },
        {
          title: '动画时长',
          content: '使用animation-duration属性设置动画持续时间（毫秒）'
        },
        {
          title: '样式定制',
          content: '通过CSS自定义字体大小、颜色和位置'
        }
      ],
      
      // 在线体验说明
      onlineExperience: {
        title: '故障特效体验',
        description: '体验FaultTextEffect组件的赛博朋克风格文字故障效果，感受RGB通道分离和动态视觉冲击。',
        htmlPath: '/ComponentControlSystem/Component/FaultTextEffect/FaultTextEffectDemo/FaultTextEffect.html',
        instructions: `FaultTextEffect 故障特效体验

这是一个专业的文字故障效果组件，你可以：

• 💥 点击任意文字触发炫酷的故障动画效果
• ✨ 观察RGB红蓝通道分离营造的视觉冲击
• 📺 体验随机裁剪和抖动模拟的信号干扰
• 🎭 查看不同参数配置下的多样化效果
• ⚡ 感受即时响应的交互体验

视觉特效：
- RGB色彩通道分离效果
- 动态随机裁剪动画
- 多层文本重叠渲染
- 平滑的混合模式处理

参数配置：
- container-count: 控制重叠文本层数
- animation-duration: 设置动画持续时间
- 支持CSS样式完全定制

适用场景：
- 游戏界面和科技主题网站
- 赛博朋克风格设计
- 创意展示和艺术项目
- 互动媒体和数字艺术

点击文字，体验未来感十足的故障美学！`
      },
      
      // API 文档
      apiDocumentation: {
        title: 'API 文档',
        properties: [
          {
            name: 'container-count',
            type: 'Number',
            default: '3',
            description: '文本容器的数量，控制重叠效果的层数'
          },
          {
            name: 'animation-duration',
            type: 'Number',
            default: '2000',
            description: '故障动画的持续时间（毫秒）'
          }
        ],
        methods: [
          {
            name: '点击触发',
            description: '点击组件区域自动触发故障动画效果'
          }
        ],
        events: [
          {
            name: 'slotchange',
            description: '当插槽内容发生变化时触发（内部使用）'
          }
        ],
        cssCustomization: [
          {
            name: 'CSS样式定制',
            description: '支持完全的CSS样式定制',
            examples: [
              'font-size: 设置字体大小',
              'color: 设置基础文字颜色（白色推荐）',
              'width/height: 设置容器尺寸',
              'font-family: 设置字体系列',
              'text-align: 设置文字对齐方式'
            ]
          }
        ],
        technicalDetails: [
          {
            name: '技术实现细节',
            description: '了解组件的核心技术原理',
            details: [
              'Shadow DOM: 实现样式完全隔离',
              'CSS clip-path: 创建动态裁剪效果',
              'mix-blend-mode: screen: 实现RGB通道混合',
              'transform: 创建RGB偏移效果',
              '原生事件系统: 处理用户交互'
            ]
          }
        ]
      }
    };
  } catch (error) {
    console.error('加载FaultTextEffect数据失败:', error);
    throw error; // 让上层处理错误
  }
}
