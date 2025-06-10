/**
 * ECharts 组件数据
 * 使用 public 目录下的文件路径，避免构建时路径变化问题
 */

export async function getEchartsData() {
  try {
    return {
      id: 'echarts',
      name: '图表组件',
      title: '图表组件',
      icon: '/ComponentControlSystem/Component/Echarts/resource/img/图表工厂.png',
      category: 'visual',
      categoryName: '数据可视化',
      tags: ['数据图表', '可视化展示', 'Echarts'],
      
      // 功能描述
      description: '基于Apache ECharts构建的强大图表组件库，提供多种图表类型、主题切换、动态交互等功能，为数据可视化提供专业解决方案。',
      
      // 核心功能列表
      features: [
        {
          icon: '📊',
          title: '多种图表类型',
          description: '支持柱状图、折线图、饼图、散点图、雷达图等多种图表类型'
        },
        {
          icon: '🎨',
          title: '主题定制',
          description: '内置多套精美主题，支持默认、未来风格、简约、深色等主题切换'
        },
        {
          icon: '🔄',
          title: '动态交互',
          description: '支持图表类型切换、数据动态更新、实时交互等高级功能'
        },
        {
          icon: '⚡',
          title: '高性能渲染',
          description: '基于Canvas/SVG渲染，支持大数据量展示，流畅的动画效果'
        }
      ],
      
      // 实现方式
      implementation: [
        {
          icon: '🏭',
          title: 'EchartFactory2.js',
          description: '统一的图表工厂，提供创建、切换、更新等核心方法'
        },
        {
          icon: '📊',
          title: '图表类型支持',
          description: '支持bar、line、pie、scatter、radar等主流图表类型'
        },
        {
          icon: '🎨',
          title: '主题系统',
          description: '内置多套主题配置，支持动态切换和自定义主题'
        }
      ],
      
      // 具体展示项目
      demonstrations: [
        {
          id: 'basic-bar-chart',
          title: '基础柱状图',
          description: '展示基础柱状图的创建和数据绑定，使用默认主题，适合展示分类数据的对比。',
          features: [
            'const chart = createChart(container, \'bar\', \'default\'); - 创建基础柱状图',
            'chart.update({ xAxis: chartData.xAxis, series: chartData.series }); - 更新图表数据',
            'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); - 渐变背景设计',
            'width: 90%; max-width: 800px; - 响应式布局配置'
          ],
          icon: '📊',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/Echarts/EchartsDemo/BasicBarChart.html'
        },
        {
          id: 'stacked-bar-chart',
          title: '堆叠柱状图',
          description: '展示多系列数据的堆叠效果，通过stack参数实现数据叠加显示，便于对比各部分占比。',
          features: [
            'chart.update({ xAxis: stackedBarChartData.xAxis, series: stackedBarChartData.series }, { stack: \'total\' }); - 启用堆叠配置',
            'background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); - 青粉渐变背景',
            'box-shadow: 0 8px 32px rgba(168, 237, 234, 0.3); - 柔和阴影效果',
            'import { stackedBarChartData } from \'../data.js\'; - 堆叠数据导入'
          ],
          icon: '📈',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/Echarts/EchartsDemo/StackedBarChart.html'
        },
        {
          id: 'multi-line-chart',
          title: '多系列折线图',
          description: '支持多条折线同时展示，使用未来风格主题，适合展示时间序列数据的趋势对比。',
          features: [
            'const chart = createChart(container, \'line\', \'futuristic\'); - 创建未来风格折线图',
            'chart.update({ xAxis: multiLineChartData.xAxis, series: multiLineChartData.series }); - 多系列数据更新',
            'background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); - 深色渐变背景',
            'backdrop-filter: blur(10px); - 毛玻璃效果'
          ],
          icon: '📉',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/Echarts/EchartsDemo/MultiLineChart.html'
        },
        {
          id: 'area-chart',
          title: '面积图',
          description: '在折线图基础上添加面积填充效果，使用minimal主题，突出数据变化趋势和累积效果。',
          features: [
            'const chart = createChart(container, \'line\', \'minimal\'); - 创建简约风格折线图',
            'chart.update({ xAxis: areaChartData.xAxis, series: areaChartData.series }, { areaStyle: true }); - 启用面积填充',
            'background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%); - 蓝色渐变背景',
            'border-radius: 12px; - 圆角容器设计'
          ],
          icon: '🏔️',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/Echarts/EchartsDemo/AreaChart.html'
        },
        {
          id: 'pie-chart',
          title: '饼图',
          description: '经典的饼图展示，使用minimal主题，适合展示数据的组成比例和分布情况。',
          features: [
            'const chart = createChart(container, \'pie\', \'minimal\'); - 创建简约饼图',
            'chart.update({ series: pieChartData.series }); - 饼图数据更新',
            'background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); - 浅灰渐变背景',
            'box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); - 轻微阴影效果'
          ],
          icon: '🥧',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/Echarts/EchartsDemo/PieChart.html'
        },
        {
          id: 'rose-chart',
          title: '玫瑰图',
          description: '南丁格尔玫瑰图，通过roseType参数实现扇形半径映射数据大小，视觉效果更加突出。',
          features: [
            'const chart = createChart(container, \'pie\', \'minimal\'); - 创建饼图基础',
            'chart.update({ series: roseChartData.series }, { roseType: \'radius\' }); - 启用玫瑰图模式',
            'background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); - 温暖橙色渐变',
            'box-shadow: 0 8px 32px rgba(252, 182, 159, 0.3); - 橙色阴影效果'
          ],
          icon: '🌹',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/Echarts/EchartsDemo/RoseChart.html'
        },
        {
          id: 'scatter-chart',
          title: '散点图',
          description: '散点图展示数据的分布和相关性，使用futuristic主题，适合展示两个变量之间的关系。',
          features: [
            'const chart = createChart(container, \'scatter\', \'futuristic\'); - 创建未来风格散点图',
            'chart.update({ series: scatterChartData.series }); - 散点数据更新',
            'background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%); - 橙红渐变背景',
            'backdrop-filter: blur(10px); - 毛玻璃模糊效果'
          ],
          icon: '💫',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/Echarts/EchartsDemo/ScatterChart.html'
        },
        {
          id: 'radar-chart',
          title: '雷达图',
          description: '多维数据雷达图，使用cleanDark深色主题，适合展示多个指标的综合评估。',
          features: [
            'const chart = createChart(container, \'radar\', \'cleanDark\'); - 创建深色雷达图',
            'chart.update({ indicator: radarChartData.indicator, series: radarChartData.series }); - 雷达指标配置',
            'background: linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%); - 深色渐变背景',
            'background: rgba(52, 73, 94, 0.9); - 半透明深色容器'
          ],
          icon: '🎯',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/Echarts/EchartsDemo/RadarChart.html'
        },
        {
          id: 'mixed-chart',
          title: '混合图表',
          description: '柱状图与折线图的混合展示，使用futuristic主题，适合同时展示不同类型的相关数据。',
          features: [
            'const chart = createChart(container, \'bar\', \'futuristic\'); - 创建未来风格柱状图基础',
            'const mixedSeries = [{ name: \'蒸发量\', data: mixedChartData.evaporationData }, { name: \'降水量\', data: mixedChartData.precipitationData }]; - 混合数据构建',
            'background: linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%); - 粉色渐变背景',
            'backdrop-filter: blur(10px); - 毛玻璃背景模糊'
          ],
          icon: '📊📈',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/Echarts/EchartsDemo/MixedChart.html'
        },
        {
          id: 'polar-bar-chart',
          title: '极坐标柱状图',
          description: '基于极坐标系的柱状图，提供独特的圆形展示效果，适合展示周期性数据。',
          features: [
            'const chart = createChart(container, \'bar\', \'default\'); - 创建极坐标柱状图',
            'chart.update({ polar: polarBarChartData.polar, series: polarBarChartData.series }); - 极坐标配置',
            'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); - 紫蓝渐变背景',
            'border-radius: 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); - 圆角阴影设计'
          ],
          icon: '🎡',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/Echarts/EchartsDemo/PolarBarChart.html'
        },
        {
          id: 'polar-line-chart',
          title: '极坐标折线图',
          description: '基于极坐标系的折线图，以圆形方式展示数据趋势，提供不同的数据观察视角。',
          features: [
            'const chart = createChart(container, \'line\', \'minimal\'); - 创建极坐标折线图',
            'chart.update({ polar: polarLineChartData.polar, series: polarLineChartData.series }); - 极坐标数据配置',
            'background: linear-gradient(135deg, #e3ffe7 0%, #d9ffb3 100%); - 绿色清新渐变',
            'box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); - 轻柔阴影效果'
          ],
          icon: '🎪',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/Echarts/EchartsDemo/PolarLineChart.html'
        },
        {
          id: 'inverse-bar-chart',
          title: '反向柱状图',
          description: '横向柱状图展示，适合展示类别名称较长的数据，提供更好的可读性。',
          features: [
            'const chart = createChart(container, \'bar\', \'cleanDark\'); - 创建深色横向柱状图',
            'chart.update({ yAxis: inverseBarChartData.yAxis, series: inverseBarChartData.series }); - 横向数据配置',
            'background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%); - 深蓝渐变背景',
            'color: #ecf0f1; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); - 白色文字阴影'
          ],
          icon: '📋',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/Echarts/EchartsDemo/InverseBarChart.html'
        },
        {
          id: 'custom-theme-chart',
          title: '自定义主题图表',
          description: '展示自定义主题配置的效果，提供个性化的图表外观和色彩搭配。',
          features: [
            'const chart = createChart(container, \'line\', \'custom\'); - 创建自定义主题图表',
            'chart.update({ xAxis: customThemeChartData.xAxis, series: customThemeChartData.series }); - 自定义数据更新',
            'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); - 个性化渐变配色',
            'font-family: \'Arial\', sans-serif; - 统一字体风格'
          ],
          icon: '🎨',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/Echarts/EchartsDemo/CustomThemeChart.html'
        },
        {
          id: 'dynamic-chart',
          title: '动态交互图表',
          description: '支持图表类型切换和主题切换的动态图表，展示图表的交互能力和灵活性。包含切换按钮和实时更新功能。',
          features: [
            'const chartTypes = [\'bar\', \'line\']; chart.switchType(chartTypes[currentTypeIndex]); - 动态类型切换实现',
            'const themes = [\'default\', \'futuristic\', \'minimal\', \'cleanDark\']; chart.switchTheme(themes[currentThemeIndex]); - 多主题动态切换',
            'document.getElementById(\'switchType\').addEventListener(\'click\', () => { ... }); - 交互按钮事件监听',
            'background: linear-gradient(135deg, #8360c3 0%, #2ebf91 100%); backdrop-filter: blur(10px); - 紫绿渐变毛玻璃背景',
            'transition: all 0.3s ease; transform: translateY(-2px); - 按钮悬停动画效果',
            '.btn:hover { box-shadow: 0 6px 20px rgba(131, 96, 195, 0.4); } - 交互反馈效果'
          ],
          icon: '🔄',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/Echarts/EchartsDemo/DynamicChart.html'
        }
      ],
      
      // 使用提示
      usageTips: [
        {
          title: '图表创建',
          content: 'createChart(container, type, theme)'
        },
        {
          title: '数据更新',
          content: 'chart.update(data, options)'
        },
        {
          title: '主题切换',
          content: 'chart.switchTheme(themeName)'
        },
        {
          title: '类型切换',
          content: 'chart.switchType(chartType)'
        }
      ],
      
      // 在线体验说明
      onlineExperience: {
        title: '动态交互图表体验',
        description: '体验完整的ECharts动态图表功能，包括图表类型切换、主题切换、数据更新等交互特性。',
        htmlPath: '/ComponentControlSystem/Component/Echarts/EchartsDemo/DynamicChart.html', // 选择动态图表作为在线体验
        instructions: `ECharts 动态图表在线体验

这是一个功能完整的动态交互图表组件，你可以：

• 点击"切换图表类型"按钮在柱状图和折线图之间切换
• 点击"切换主题"按钮体验不同的视觉主题效果
• 观察流畅的动画过渡效果和主题变化
• 图表会根据不同主题自动调整配色方案
• 支持响应式布局，适配不同屏幕尺寸

体验ECharts强大的动态交互能力和丰富的主题系统！`
      }
    };
  } catch (error) {
    console.error('加载ECharts数据失败:', error);
    throw error; // 让上层处理错误
  }
}
