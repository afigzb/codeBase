/**
 * CircleCursor 组件数据
 * 圆形混合模式光标效果组件，提供多种混合模式的圆形跟随光标
 */

export async function getCircleCursorData() {
  try {
    return {
      id: 'circle-cursor',
      name: '圆圈光标',
      title: '圆圈光标',
      icon: '/ComponentControlSystem/Component/‌CircleCursor‌/混合光标效果.png',
      category: 'cursor',
      categoryName: '鼠标特效',
      tags: ['鼠标跟随', '动画特效', '混合模式'],
      
      // 功能描述
      description: '圆形混合模式光标效果组件，提供多种CSS混合模式的圆形跟随光标。支持12种混合模式和9种颜色选择，在不同背景下展现独特的视觉效果。',
      
      // 核心功能列表
      features: [
        {
          icon: '⭕',
          title: '圆形光标',
          description: '平滑跟随的圆形光标，支持多种尺寸配置'
        },
        {
          icon: '🎨',
          title: '混合模式',
          description: '支持12种CSS混合模式，包括difference、multiply、screen等'
        },
        {
          icon: '🌈',
          title: '多色选择',
          description: '提供9种颜色选择，包括基础色和彩色系列'
        },
        {
          icon: '🔧',
          title: '智能推荐',
          description: '根据混合模式自动推荐最佳光标颜色组合'
        }
      ],
      
      // 实现方式
      implementation: [
        {
          icon: '⚡',
          title: 'DOM操作',
          description: '使用原生DOM元素实现，轻量级且高性能'
        },
        {
          icon: '🎯',
          title: '平滑跟随',
          description: '基于requestAnimationFrame的平滑动画跟随'
        },
        {
          icon: '🎨',
          title: 'CSS混合',
          description: '利用CSS mix-blend-mode属性实现丰富的视觉效果'
        }
      ],
      
      // 具体展示项目
      demonstrations: [
        {
          id: 'circle-cursor-full-demo',
          title: '圆形混合光标演示',
          description: '体验完整的CircleCursor组件功能，包括12种混合模式、9种颜色选择、多种背景展示等所有特性。',
          features: [
            '12种CSS混合模式',
            '9种光标颜色选择',
            '12个不同背景展示区',
            '智能颜色推荐系统',
            '实时混合效果预览',
            '响应式展示网格'
          ],
          icon: '⭕',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/‌CircleCursor‌/‌CircleCursor‌.html'
        }
      ],
      
      // 混合模式说明
      blendModes: [
        {
          name: 'difference',
          title: '差值模式',
          description: '产生反色效果，白色光标在深色背景上显示为亮色，在浅色背景上显示为暗色',
          bestColors: ['白色', '黑色'],
          effect: '强烈对比'
        },
        {
          name: 'multiply',
          title: '正片叠底',
          description: '颜色相乘效果，深色光标产生加深效果',
          bestColors: ['白色', '黄色', '青色'],
          effect: '加深背景'
        },
        {
          name: 'screen',
          title: '滤色模式',
          description: '颜色相加效果，浅色光标产生增亮效果',
          bestColors: ['黑色', '红色', '蓝色'],
          effect: '增亮背景'
        },
        {
          name: 'overlay',
          title: '叠加模式',
          description: '结合multiply和screen效果，增强对比度',
          bestColors: ['灰色', '白色', '黑色'],
          effect: '增强对比'
        },
        {
          name: 'hard-light',
          title: '强光模式',
          description: '产生强烈的明暗对比效果',
          bestColors: ['灰色', '红色', '蓝色'],
          effect: '强烈对比'
        },
        {
          name: 'soft-light',
          title: '柔光模式',
          description: '产生柔和的明暗变化',
          bestColors: ['灰色', '白色', '黄色'],
          effect: '柔和变化'
        }
      ],
      
      // 配置参数说明
      configOptions: [
        {
          category: '光标配置',
          options: [
            { key: 'size', name: '光标尺寸', type: 'number', range: '20-100px', default: '50' },
            { key: 'animationSpeed', name: '跟随速度', type: 'number', range: '0.01-0.2', default: '0.05' },
            { key: 'color', name: '光标颜色', type: 'string', range: 'CSS颜色值', default: '#ffffff' }
          ]
        },
        {
          category: '混合模式',
          options: [
            { key: 'mixBlendMode', name: '混合模式', type: 'string', range: 'CSS混合模式', default: 'difference' }
          ]
        },
        {
          category: '光标类型',
          options: [
            { key: 'dual', name: '双光标', type: 'preset', description: '大小两个光标组合' },
            { key: 'single', name: '单光标', type: 'preset', description: '单个中等尺寸光标' },
            { key: 'large', name: '大光标', type: 'preset', description: '单个大尺寸光标' }
          ]
        }
      ],
      
      // 背景展示区域
      backgroundAreas: [
        {
          name: '文本背景',
          description: '渐变背景配合文字内容，展示光标在文本上的混合效果'
        },
        {
          name: '几何图形',
          description: '动态彩色几何图形，观察光标与动画元素的交互'
        },
        {
          name: '图案背景',
          description: '复杂SVG图案，测试混合模式在复杂背景下的表现'
        },
        {
          name: '条纹背景',
          description: '黑白条纹背景，最能体现不同混合模式的差异'
        },
        {
          name: '纯色背景',
          description: '8种不同纯色背景，包括红、蓝、绿、紫、橙、深色、白色、灰色'
        }
      ],
      
      // 使用提示
      usageTips: [
        {
          title: '初始化',
          content: 'new CircleCursor({...config}) 创建圆形光标实例'
        },
        {
          title: '混合模式',
          content: '不同混合模式适合不同的背景和光标颜色组合'
        },
        {
          title: '颜色选择',
          content: '根据混合模式选择合适的光标颜色以获得最佳效果'
        },
        {
          title: '背景测试',
          content: '在不同背景区域移动鼠标，观察混合效果的变化'
        }
      ],
      
      // API方法说明
      apiMethods: [
        {
          name: 'CircleCursor(options)',
          description: '创建圆形光标实例',
          params: 'options: object - 配置选项',
          returns: 'CircleCursor实例'
        },
        {
          name: 'updateConfig(newOptions)',
          description: '更新光标配置',
          params: 'newOptions: object - 新的配置选项',
          returns: 'void'
        },
        {
          name: 'destroy()',
          description: '销毁光标实例，清理DOM和事件监听器'
        }
      ],
      
      // 应用场景
      usageScenarios: [
        {
          title: '艺术网站',
          description: '为艺术作品展示网站添加创意光标效果'
        },
        {
          title: '设计展示',
          description: '在设计作品集中突出交互体验'
        },
        {
          title: '品牌官网',
          description: '为品牌网站增加独特的视觉标识'
        },
        {
          title: '创意项目',
          description: '在实验性和创意性项目中增强用户体验'
        }
      ],
      
      // 在线体验说明
      onlineExperience: {
        title: '在线体验',
        description: '直接体验CircleCursor组件的圆形混合光标效果，测试不同混合模式和颜色在各种背景下的表现。',
        htmlPath: '/ComponentControlSystem/Component/‌CircleCursor‌/‌CircleCursor‌.html',
        instructions: `CircleCursor 在线体验

这是一个圆形混合模式光标效果组件，你可以：

• 选择12种不同的CSS混合模式
• 尝试9种不同的光标颜色
• 在12个不同背景区域观察效果差异
• 参考智能推荐选择最佳颜色组合
• 实时切换光标配置（单/双/大光标）

移动鼠标到不同区域，感受混合模式的神奇魅力！`
      }
    };
  } catch (error) {
    console.error('加载CircleCursor数据失败:', error);
    throw error; // 让上层处理错误
  }
}
