/**
 * RippCursor 组件数据  
 * 水滴波纹光标效果组件，提供优雅的水波纹跟随效果
 */

export async function getRippCursorData() {
  try {
    return {
      id: 'ripp-cursor',
      name: '水波光标',
      title: '水波光标',
      icon: '/ComponentControlSystem/Component/RippCursor/波纹光标效果.png',
      category: 'cursor',
      categoryName: '鼠标特效',
      tags: ['鼠标跟随', '动画特效', '波纹效果'],
      
      // 功能描述
      description: '水滴波纹光标效果组件，随鼠标移动产生优雅的同心圆波纹扩散效果，模拟水滴落入水面的自然动画，提供沉浸式的交互体验。',
      
      // 核心功能列表
      features: [
        {
          icon: '💧',
          title: '水滴波纹',
          description: '模拟真实水滴效果，产生自然的同心圆波纹扩散'
        },
        {
          icon: '🌊',
          title: '多层波纹',
          description: '支持多层波纹同时存在，创造丰富的视觉层次'
        },
        {
          icon: '🎨',
          title: '经典蓝色',
          description: '采用经典蓝色主题，营造清新水润的视觉感受'
        },
        {
          icon: '⚡',
          title: '智能响应',
          description: '根据鼠标移动速度调整波纹强度和生成频率'
        }
      ],
      
      // 实现方式
      implementation: [
        {
          icon: '🎮',
          title: 'Canvas渲染',
          description: '使用HTML5 Canvas实现高性能的圆形波纹绘制'
        },
        {
          icon: '🔄',
          title: '动画系统',
          description: '流畅的requestAnimationFrame动画循环'
        },
        {
          icon: '🎯',
          title: '事件监听',
          description: '精确的鼠标移动和点击事件响应'
        }
      ],
      
      // 具体展示项目
      demonstrations: [
        {
          id: 'ripp-cursor-full-demo',
          title: '水滴波纹光标演示',
          description: '体验完整的RippCursor组件功能，包括鼠标跟随波纹、点击强化效果、交互演示区域等所有特性。',
          features: [
            '优雅的水滴波纹效果',
            '智能速度响应系统',
            '点击增强波纹效果',
            '多层波纹叠加显示',
            '经典蓝色主题设计',
            '响应式交互演示'
          ],
          icon: '🌊',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/RippCursor/CursorShape.html'
        }
      ],
      
      // 效果特性说明
      effectFeatures: [
        {
          name: '波纹扩散',
          title: '自然扩散效果',
          description: '波纹从鼠标位置开始，以自然的速度向外扩散'
        },
        {
          name: '透明度渐变',
          title: '平滑透明度变化',
          description: '波纹在扩散过程中透明度逐渐降低，模拟真实效果'
        },
        {
          name: '速度响应',
          title: '动态速度调节',
          description: '根据鼠标移动速度调整波纹大小和生成频率'
        },
        {
          name: '点击增强',
          title: '点击特效加强',
          description: '鼠标点击时产生更大更明显的波纹效果'
        },
        {
          name: '运动轨迹',
          title: '轨迹跟踪显示',
          description: '显示鼠标运动轨迹的淡蓝色光点'
        }
      ],
      
      // 配置参数说明
      configOptions: [
        {
          category: '波纹配置',
          options: [
            { key: 'maxRipples', name: '最大波纹数量', type: 'number', range: '10-30', default: '15' },
            { key: 'maxRadius', name: '最大半径', type: 'number', range: '80-200px', default: '120' },
            { key: 'expandSpeed', name: '扩散速度', type: 'number', range: '1-3', default: '1.5' }
          ]
        },
        {
          category: '视觉配置',
          options: [
            { key: 'rippleColors', name: '波纹颜色', type: 'array', range: '蓝色系', default: '3种蓝色变化' },
            { key: 'lineWidth', name: '线条宽度', type: 'number', range: '1-4px', default: '2' },
            { key: 'fadeSpeed', name: '淡出速度', type: 'number', range: '0.005-0.02', default: '0.01' }
          ]
        },
        {
          category: '交互配置',
          options: [
            { key: 'spawnDelay', name: '生成延迟', type: 'number', range: '50-150ms', default: '90' },
            { key: 'minSpawnDistance', name: '最小生成距离', type: 'number', range: '20-80px', default: '50' },
            { key: 'trailLength', name: '轨迹长度', type: 'number', range: '5-20', default: '10' }
          ]
        }
      ],
      
      // 使用提示
      usageTips: [
        {
          title: '初始化',
          content: 'new WaterRippleCursor() 创建水滴波纹光标'
        },
        {
          title: '移动体验',
          content: '缓慢移动鼠标观察波纹的自然扩散效果'
        },
        {
          title: '点击增强',
          content: '点击鼠标产生更大更明显的波纹效果'
        },
        {
          title: '速度响应',
          content: '快速移动鼠标查看动态速度响应效果'
        }
      ],
      
      // API方法说明
      apiMethods: [
        {
          name: 'WaterRippleCursor()',
          description: '创建水滴波纹光标效果实例',
          returns: 'WaterRippleCursor实例'
        },
        {
          name: 'createRipple(x, y, isClick, speedFactor)',
          description: '在指定位置创建波纹',
          params: 'x, y: number - 坐标; isClick: boolean - 是否点击; speedFactor: number - 速度因子'
        },
        {
          name: 'destroy()',
          description: '销毁波纹效果，清理资源和事件监听器'
        }
      ],
      
      // 应用场景
      usageScenarios: [
        {
          title: '官网首页',
          description: '为企业官网添加优雅的交互效果，提升用户体验'
        },
        {
          title: '艺术展示',
          description: '适合艺术、设计类网站的视觉增强'
        },
        {
          title: '产品介绍',
          description: '在产品展示页面创造沉浸式的浏览体验'
        },
        {
          title: '创意项目',
          description: '为创意项目和实验性网站增添动感元素'
        }
      ],
      
      // 在线体验说明
      onlineExperience: {
        title: '在线体验',
        description: '直接体验RippCursor组件的水滴波纹效果，感受优雅的蓝色主题和自然的波纹扩散。',
        htmlPath: '/ComponentControlSystem/Component/RippCursor/CursorShape.html',
        instructions: `RippCursor 在线体验

这是一个水滴波纹光标效果组件，你可以：

• 移动鼠标观察优雅的波纹扩散效果
• 点击鼠标产生增强的大波纹效果
• 快速移动查看智能速度响应
• 在不同演示区域体验交互效果
• 观察波纹的透明度渐变动画

感受水滴落入水面般的自然美感！`
      }
    };
  } catch (error) {
    console.error('加载RippCursor数据失败:', error);
    throw error; // 让上层处理错误
  }
}
