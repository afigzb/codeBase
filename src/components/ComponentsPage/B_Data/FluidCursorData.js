/**
 * FluidCursor 组件数据
 * 流体光标效果组件，提供动态的鼠标跟随拖尾效果
 */

export async function getFluidCursorData() {
  try {
    return {
      id: 'fluid-cursor',
      name: '流体光标',
      title: '流体光标',
      icon: '/ComponentControlSystem/Component/FluidCursor/resource/img/彗星拖尾.png',
      category: 'cursor',
      categoryName: '鼠标特效',
      tags: ['鼠标跟随', '动画特效', '流体效果'],
      
      // 功能描述
      description: '流体光标效果组件，为页面添加动态的鼠标跟随拖尾效果。支持多层渲染、颜色渐变、脉动光标等丰富的视觉效果配置。',
      
      // 核心功能列表
      features: [
        {
          icon: '🌊',
          title: '流体拖尾',
          description: '平滑的彩色线条跟随鼠标移动，支持多层渲染和颜色渐变效果'
        },
        {
          icon: '✨',
          title: '动态光标',
          description: '带有脉动效果的光标核心，包含光晕和核心双层结构设计'
        },
        {
          icon: '🎨',
          title: '灵活配置',
          description: '支持自定义颜色、线条宽度、拖尾长度等多种参数设置'
        },
        {
          icon: '⚡',
          title: '高性能',
          description: '基于Canvas和requestAnimationFrame，提供流畅的动画体验'
        }
      ],
      
      // 实现方式
      implementation: [
        {
          icon: '🎮',
          title: 'Canvas渲染',
          description: '使用HTML5 Canvas API进行高性能图形渲染'
        },
        {
          icon: '🔄',
          title: '实时动画',
          description: '基于requestAnimationFrame实现流畅的60FPS动画'
        },
        {
          icon: '🎯',
          title: '事件监听',
          description: '精确捕获鼠标移动事件，实时更新轨迹数据'
        }
      ],
      
      // 具体展示项目
      demonstrations: [
        {
          id: 'fluid-cursor-full-demo',
          title: '完整流体光标演示',
          description: '体验完整的FluidCursor组件功能，包括多种预设效果、实时配置调整、动态光标等所有特性。',
          features: [
            '流体拖尾效果展示',
            '多种预设样式切换',
            '脉动光标核心',
            '实时参数调整',
            '高性能渲染',
            '响应式适配'
          ],
          icon: '🌊',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/FluidCursor/FluidCursorDemo/FluidCursor.html'
        }
      ],
      
      // 预设效果说明
      presets: [
        {
          name: 'default',
          title: '默认效果',
          description: '平衡的视觉效果，适合大多数应用场景'
        },
        {
          name: 'subtle',
          title: '柔和效果',
          description: '低调的拖尾效果，不会过分抢夺注意力'
        },
        {
          name: 'intense',
          title: '强烈效果',
          description: '丰富的层次和鲜明的色彩，视觉冲击力强'
        },
        {
          name: 'neon',
          title: '霓虹效果',
          description: '高饱和度的霓虹色彩，适合科技感主题'
        },
        {
          name: 'minimal',
          title: '极简效果',
          description: '简洁的线条效果，适合专业应用场景'
        }
      ],
      
      // 配置参数说明
      configOptions: [
        {
          category: '线条配置',
          options: [
            { key: 'layerCount', name: '线条数量', type: 'number', range: '3-8', default: '6' },
            { key: 'maxLineWidth', name: '最大线条宽度', type: 'number', range: '1-5', default: '2' },
            { key: 'maxTrailLength', name: '轨迹最大长度', type: 'number', range: '5-50', default: '30' }
          ]
        },
        {
          category: '颜色配置',
          options: [
            { key: 'hueSpeed', name: '色相变化速度', type: 'number', range: '10-100', default: '30' },
            { key: 'saturation', name: '饱和度', type: 'number', range: '0-100', default: '60' },
            { key: 'baseLightness', name: '基础亮度', type: 'number', range: '20-80', default: '60' }
          ]
        },
        {
          category: '动画配置',
          options: [
            { key: 'smoothness', name: '曲线平滑度', type: 'number', range: '0-1', default: '0.5' },
            { key: 'trailLifetime', name: '线条收束时间', type: 'number', range: '0.1-2', default: '0.8' },
            { key: 'pulseSpeed', name: '脉动速度', type: 'number', range: '1-10', default: '6' }
          ]
        }
      ],
      
      // 使用提示
      usageTips: [
        {
          title: '初始化',
          content: 'new FluidCursor().init() 创建并启动光标效果'
        },
        {
          title: '预设切换',
          content: 'fluidCursor.applyPreset("neon") 应用预设效果'
        },
        {
          title: '自定义配置',
          content: 'updateConfig({...}) 实时调整各项参数'
        },
        {
          title: '资源清理',
          content: 'destroy() 方法清理资源和事件监听器'
        }
      ],
      
      // API方法说明
      apiMethods: [
        {
          name: 'init()',
          description: '初始化光标效果，创建Canvas并开始动画',
          returns: 'FluidCursor实例，支持链式调用'
        },
        {
          name: 'applyPreset(presetName)',
          description: '应用预定义的效果预设',
          params: 'presetName: string - 预设名称（subtle/intense/neon/minimal）',
          returns: 'FluidCursor实例，支持链式调用'
        },
        {
          name: 'updateConfig(config)',
          description: '更新配置参数，支持部分更新',
          params: 'config: object - 配置对象',
          returns: 'FluidCursor实例，支持链式调用'
        },
        {
          name: 'destroy()',
          description: '销毁光标效果，清理资源和事件监听器'
        },
        {
          name: 'getConfig()',
          description: '获取当前配置的深拷贝',
          returns: 'object - 当前配置对象'
        }
      ],
      
      // 在线体验说明
      onlineExperience: {
        title: '在线体验',
        description: '直接体验FluidCursor组件的流体光标效果，包括多种预设样式和实时配置调整。',
        htmlPath: '/ComponentControlSystem/Component/FluidCursor/FluidCursorDemo/FluidCursor.html',
        instructions: `FluidCursor 在线体验

这是一个流体光标效果组件，你可以：

• 移动鼠标观察流体拖尾效果
• 点击不同预设按钮体验各种风格
• 使用销毁/重新初始化按钮测试生命周期
• 观察光标核心的脉动效果
• 体验不同预设的色彩和动画变化

移动鼠标，感受流体般的光标拖尾魅力！`
      }
    };
  } catch (error) {
    console.error('加载FluidCursor数据失败:', error);
    throw error; // 让上层处理错误
  }
}
