/**
 * StarCursor 组件数据
 * 星星拖尾光标效果组件，提供绚烂的星星跟随拖尾效果
 */

export async function getStarCursorData() {
  try {
    return {
      id: 'star-cursor',
      name: '星星光标',
      title: '星星光标',
      icon: '/ComponentControlSystem/Component/StarCursor/星星光标效果.png',
      category: 'cursor',
      categoryName: '鼠标特效',
      tags: ['鼠标跟随', '动画特效', '星星效果'],
      
      // 功能描述
      description: '星星拖尾光标效果组件，随鼠标移动播撒绚烂的五角星粒子，每个星星具有独特的颜色、大小和旋转动画，创造梦幻般的星空体验。',
      
      // 核心功能列表
      features: [
        {
          icon: '⭐',
          title: '五角星粒子',
          description: '精美的五角星形状粒子，支持随机大小和旋转动画'
        },
        {
          icon: '🌈',
          title: '多彩配色',
          description: '支持多种颜色配置，包括彩虹、宇宙、极简等主题'
        },
        {
          icon: '🎨',
          title: '动态效果',
          description: '星星具有扩散轨迹、透明度渐变和旋转动画'
        },
        {
          icon: '⚡',
          title: '性能优化',
          description: '基于Canvas的高效渲染，流畅的60FPS动画体验'
        }
      ],
      
      // 实现方式
      implementation: [
        {
          icon: '🎮',
          title: 'Canvas绘制',
          description: '使用HTML5 Canvas API绘制五角星粒子'
        },
        {
          icon: '🔄',
          title: '粒子系统',
          description: '完整的粒子生命周期管理，包括生成、更新、销毁'
        },
        {
          icon: '🎯',
          title: '轨迹追踪',
          description: '智能的鼠标轨迹检测，根据移动速度调整粒子生成频率'
        }
      ],
      
      // 具体展示项目
      demonstrations: [
        {
          id: 'star-cursor-full-demo',
          title: '星空拖尾光标演示',
          description: '体验完整的StarCursor组件功能，包括多种预设效果、实时配置调整、动态星星生成等所有特性。',
          features: [
            '绚烂星星拖尾效果',
            '5种预设主题风格',
            '实时配置参数显示',
            '动态旋转和透明度',
            '响应式粒子生成',
            '高性能Canvas渲染'
          ],
          icon: '✨',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/StarCursor/StarCursor.html'
        }
      ],
      
      // 预设效果说明
      presets: [
        {
          name: 'default',
          title: '默认星空',
          description: '平衡的星星效果，色彩丰富，适合大多数场景'
        },
        {
          name: 'intense',
          title: '强烈星空',
          description: '密集的星星生成，色彩鲜艳，视觉冲击力强'
        },
        {
          name: 'minimal',
          title: '极简星空',
          description: '稀疏的白色星星，简洁优雅，适合专业场景'
        },
        {
          name: 'rainbow',
          title: '彩虹星空',
          description: '彩虹色彩的星星效果，绚烂多彩'
        },
        {
          name: 'cosmic',
          title: '宇宙星空',
          description: '深紫色系的宇宙主题，神秘而优雅'
        }
      ],
      
      // 配置参数说明
      configOptions: [
        {
          category: '粒子配置',
          options: [
            { key: 'maxStars', name: '最大星星数量', type: 'number', range: '20-100', default: '50' },
            { key: 'baseSizeRange', name: '星星尺寸范围', type: 'array', range: '3-20px', default: '[5, 12]' },
            { key: 'spawnFrequency', name: '生成频率', type: 'number', range: '5-25', default: '10' }
          ]
        },
        {
          category: '动画配置',
          options: [
            { key: 'fadeSpeed', name: '消失速度', type: 'number', range: '0.95-0.99', default: '0.98' },
            { key: 'rotationRange', name: '旋转角度范围', type: 'array', range: '±0-90度', default: '[-35, 35]' },
            { key: 'maxDistance', name: '最大扩散距离', type: 'number', range: '50-150px', default: '100' }
          ]
        },
        {
          category: '颜色配置',
          options: [
            { key: 'colors', name: '颜色数组', type: 'array', range: '自定义', default: '10种预设颜色' },
            { key: 'frequencyVariation', name: '频率变化', type: 'number', range: '0.3-0.8', default: '0.5' }
          ]
        }
      ],
      
      // 使用提示
      usageTips: [
        {
          title: '初始化',
          content: 'createStarsTrail({...config}) 创建星星拖尾效果'
        },
        {
          title: '预设切换',
          content: '使用不同配置对象快速切换视觉风格'
        },
        {
          title: '性能优化',
          content: '合理设置maxStars和spawnFrequency避免性能问题'
        },
        {
          title: '资源清理',
          content: '调用destroy()方法清理Canvas和事件监听器'
        }
      ],
      
      // API方法说明
      apiMethods: [
        {
          name: 'createStarsTrail(config)',
          description: '创建星星拖尾效果实例',
          params: 'config: object - 配置参数对象',
          returns: 'object - 包含destroy方法的实例对象'
        },
        {
          name: 'destroy()',
          description: '销毁星星效果，清理资源',
          returns: 'void'
        }
      ],
      
      // 在线体验说明
      onlineExperience: {
        title: '在线体验',
        description: '直接体验StarCursor组件的星星拖尾效果，包括多种预设风格和实时配置调整。',
        htmlPath: '/ComponentControlSystem/Component/StarCursor/StarCursor.html',
        instructions: `StarCursor 在线体验

这是一个星星拖尾光标效果组件，你可以：

• 移动鼠标观察绚烂的星星拖尾效果
• 点击不同预设按钮体验各种主题风格
• 观察星星的旋转动画和透明度变化
• 快速移动鼠标增强粒子生成效果
• 查看实时配置参数的动态变化

在夜空背景下移动鼠标，感受星辰般的魅力！`
      }
    };
  } catch (error) {
    console.error('加载StarCursor数据失败:', error);
    throw error; // 让上层处理错误
  }
}
