/**
 * SelectCard 组件数据
 * 旋转卡片组件，提供3D旋转效果和交互体验
 */

export async function getSelectCardData() {
  try {
    return {
      id: 'select-card',
      name: '旋转卡片',
      title: '旋转卡片',
      icon: '/ComponentControlSystem/Component/SelectCard/旋转卡片.png',
      category: 'interaction',
      categoryName: '交互特效',
      tags: ['鼠标交互', '3D特效', '卡片组件'],
      
      // 功能描述
      description: '基于Lit的3D旋转卡片组件，通过鼠标移动实现平滑的3D旋转效果，可自定义旋转角度，适用于各种交互场景。',
      
      // 核心功能列表
      features: [
        {
          icon: '🎮',
          title: '鼠标交互',
          description: '鼠标悬停和移动触发3D旋转效果，离开时平滑重置'
        },
        {
          icon: '🔄',
          title: '3D旋转',
          description: '基于CSS3 transform实现的真实3D旋转动画'
        },
        {
          icon: '⚙️',
          title: '角度可配置',
          description: '支持自定义最大旋转角度，适应不同的设计需求'
        },
        {
          icon: '🎯',
          title: '插槽设计',
          description: '采用插槽模式，任何内容都可以作为卡片内容'
        }
      ],
      
      // 实现方式
      implementation: [
        {
          icon: '⚡',
          title: 'Lit Framework',
          description: '基于Lit Web Components框架，现代化的组件开发'
        },
        {
          icon: '📐',
          title: '数学计算',
          description: '精确的鼠标位置计算和角度转换算法'
        },
        {
          icon: '🎨',
          title: 'CSS3 Transform',
          description: '利用perspective和rotate3d实现硬件加速的3D效果'
        }
      ],
      
      // 具体展示项目
      demonstrations: [
        {
          id: 'select-card-full-demo',
          title: '完整组件演示',
          description: '体验SelectCard组件的完整功能，包括不同旋转角度设置、多种卡片样式和实时3D交互效果。',
          features: [
            '多种旋转角度示例',
            '不同卡片样式展示',
            '实时鼠标交互',
            '平滑动画过渡',
            '自定义角度配置',
            '响应式设计'
          ],
          icon: '🎴',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/SelectCard/SelectCard.html'
        }
      ],
      
      // 使用提示
      usageTips: [
        {
          title: '属性配置',
          content: 'maxRotation="10" 设置最大旋转角度(默认10度)'
        },
        {
          title: '插槽使用',
          content: '任何HTML内容都可以放入<select-card>标签内'
        },
        {
          title: '样式建议',
          content: '建议为卡片内容添加圆角和阴影以增强3D效果'
        }
      ],
      
      // 在线体验说明
      onlineExperience: {
        title: '在线体验',
        description: '直接体验SelectCard组件的3D旋转效果，感受不同角度设置下的交互体验。',
        htmlPath: '/ComponentControlSystem/Component/SelectCard/SelectCard.html',
        instructions: `SelectCard 旋转卡片在线体验

这是一个提供3D旋转效果的交互卡片组件，你可以：

• 将鼠标悬停在任意卡片上并移动鼠标
• 体验平滑的3D旋转动画效果
• 鼠标离开卡片时自动重置到初始状态
• 对比不同最大旋转角度的视觉效果差异
• 观察组件如何适配不同的卡片内容

尝试在不同的卡片上移动鼠标，感受3D旋转的魅力！`
      }
    };
  } catch (error) {
    console.error('加载SelectCard数据失败:', error);
    throw error; // 让上层处理错误
  }
}
