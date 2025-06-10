<template>
  <div class="py-16 bg-[#f5f6f7]">
    <!-- 页面标题 -->
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-[#2f4554] mb-4">图表组件演示</h2>
      <p class="text-lg text-[#6e7074] max-w-2xl mx-auto">
        体验我们的动态图表组件，支持多种图表类型的实时切换和自动轮播功能
      </p>
    </div>

    <!-- 主要内容区域 -->
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex gap-8 items-start">
        <!-- 左侧：动态图表 -->
        <div class="w-[700px]">
          <div class="bg-white rounded-xl shadow-lg border border-[#e8eaed] p-6">
            <!-- 图表控制区域 -->
            <div class="mb-6">
              <div class="mb-4">
                <h3 class="text-lg font-semibold text-[#2f4554] mb-4">{{ getCurrentChartTitle() }}</h3>
              </div>
              
              <!-- 图表类型选择按钮 -->
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="chartType in chartTypes" 
                  :key="chartType.type"
                  :class="[
                    'px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200',
                    currentChartType === chartType.type 
                      ? 'bg-[#c23531] text-white shadow-md transform scale-105' 
                      : 'bg-[#e8eaed] text-[#2f4554] hover:bg-[#d48265] hover:text-white hover:transform hover:scale-105'
                  ]"
                  @click="switchChartType(chartType.type)"
                >
                  {{ chartType.label }}
                </button>
              </div>
            </div>
            
            <!-- 图表容器 -->
            <div ref="dynamicChart" class="w-full h-[350px]"></div>
          </div>
        </div>

        <!-- 右侧：故事描述区域 -->
        <div>
          <TypewriterStory 
            :chartType="currentChartType"
            :autoAdvance="isStoryMode"
            @story-complete="onStoryComplete"
            @story-changed="onStoryChanged"
            ref="typewriterRef"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { createChart } from '@/components/Echarts/src/EchartFactory/EchartFactory2.js'
import {
  visitorActivities as rawVisitorActivities
} from './echartsData.js'
import TypewriterStory from './TypewriterStory.vue'

// 直接导入原始数据表
import { EChartsDataConverter } from '@/components/Echarts/src/Utils/DataConversionFunction.js'

// 响应式数据（从导入的数据创建）
const visitorActivities = ref([...rawVisitorActivities])

// 图表引用
const dynamicChart = ref(null)
const typewriterRef = ref(null)

// 图表实例
let dynamicChartInstance = null

// 动态图表相关状态
const currentChartType = ref('bar')
const isStoryMode = ref(true) // 默认开启故事模式

// 支持的图表类型
const chartTypes = [
  { type: 'bar', label: '柱状图' },
  { type: 'line', label: '折线图' },
  { type: 'pie', label: '饼图' },
  { type: 'rose', label: '玫瑰图' },
  { type: 'radar', label: '雷达图' },
  { type: 'scatter', label: '散点图' }
]



onMounted(() => {
  initDynamicChart()
})

onUnmounted(() => {
  // 销毁图表实例
  dynamicChartInstance?.dispose()
})



// 初始化动态图表
function initDynamicChart() {
  if (dynamicChart.value) {
    const { data, config, chartType } = getChartDataAndConfig(currentChartType.value)
    dynamicChartInstance = createChart(dynamicChart.value, chartType, 'minimal')
    dynamicChartInstance.update(data, config)
  }
}

// 智能图表切换 - 根据图表类型转换数据格式并配置
function switchChartType(type, isManual = true) {
  currentChartType.value = type
  
  // 手动点击时停止故事模式
  if (isManual && isStoryMode.value) {
    isStoryMode.value = false
  }
  
  if (!dynamicChartInstance) {
    initDynamicChart()
    return
  }
  
  // 获取转换后的数据和配置
  const { data, config, chartType } = getChartDataAndConfig(type)
  
  // 切换图表类型
  dynamicChartInstance.switchType(chartType)
  
  // 更新数据和配置，带切换动画
  dynamicChartInstance.update(data, {
    ...config,
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut',
    animationDurationUpdate: 800
  })
}



// 故事模式事件处理
function onStoryComplete() {
  // 故事完成，可以在这里添加额外逻辑
  console.log('Story completed for chart type:', currentChartType.value)
}

function onStoryChanged(newChartType) {
  // 故事组件请求切换图表类型
  switchChartType(newChartType, false) // false表示非手动操作
}

// 根据图表类型获取正确的数据格式和配置
function getChartDataAndConfig(type) {
  const rawData = visitorActivities.value
  
  switch (type) {
    case 'bar':
    case 'line':
      return {
        chartType: type,
        data: createCartesianData(rawData),
        config: {
          boundaryGap: type === 'bar'
        }
      }
    
    case 'pie':
    case 'rose':
      return {
        chartType: 'pie',
        data: createPieData(rawData),
        config: type === 'rose' ? { roseType: 'area' } : {}
      }
    
    case 'radar':
      return {
        chartType: 'radar',
        data: createRadarData(rawData),
        config: {}
      }
    
    case 'scatter':
      return {
        chartType: 'scatter',
        data: createScatterData(rawData),
        config: {}
      }
    
    default:
      return {
        chartType: 'bar',
        data: createCartesianData(rawData),
        config: {}
      }
  }
}

// 创建直角坐标系数据（柱状图/折线图）
function createCartesianData(rawData) {
  const monthlyStats = {}
  
  rawData.forEach(activity => {
    const key = `${activity.month}-${activity.activity}`
    if (!monthlyStats[key]) {
      monthlyStats[key] = {
        month: activity.month,
        activity: activity.activity,
        total_visits: 0
      }
    }
    monthlyStats[key].total_visits += activity.visits
  })
  
  const converted = EChartsDataConverter.convertToEChartsData(
    Object.values(monthlyStats),
    { categoryField: 'month', valueField: 'total_visits', seriesField: 'activity' },
    'bar'
  )
  
  return {
    xAxis: converted.xAxis.data,
    series: converted.series.map(series => ({
      name: series.name,
      data: series.data
    }))
  }
}

// 创建饼图数据
function createPieData(rawData) {
  const activityStats = {}
  
  rawData.forEach(activity => {
    if (!activityStats[activity.activity]) {
      activityStats[activity.activity] = 0
    }
    activityStats[activity.activity] += activity.visits
  })
  
  const pieData = Object.entries(activityStats).map(([name, value]) => ({
    name,
    value
  }))
  
  return {
    series: [{
      data: pieData
    }]
  }
}

// 创建雷达图数据
function createRadarData(rawData) {
  const componentStats = {}
  
  rawData.forEach(activity => {
    if (!componentStats[activity.component]) {
      componentStats[activity.component] = {
        '浏览组件': 0,
        '下载源码': 0,
        '使用文档': 0
      }
    }
    componentStats[activity.component][activity.activity] += activity.visits
  })
  
  const activities = ['浏览组件', '下载源码', '使用文档']
  const maxValues = activities.map(activity => {
    return Math.max(...Object.values(componentStats).map(comp => comp[activity] || 0))
  })
  
  return {
    indicator: activities.map((activity, index) => ({
      name: activity,
      max: maxValues[index] * 1.2
    })),
    series: [{
      data: Object.keys(componentStats).slice(0, 3).map(component => ({
        name: component,
        value: activities.map(activity => componentStats[component][activity] || 0)
      }))
    }]
  }
}

// 创建散点图数据
function createScatterData(rawData) {
  const scatterData = {}
  
  rawData.forEach(activity => {
    if (!scatterData[activity.activity]) {
      scatterData[activity.activity] = []
    }
    scatterData[activity.activity].push([activity.duration, activity.visits])
  })
  
  return {
    series: Object.entries(scatterData).map(([activity, data]) => ({
      name: activity,
      data: data
    }))
  }
}

// 获取当前图表标题
function getCurrentChartTitle() {
  const titles = {
    bar: '月度活动统计 - 柱状图展示',
    line: '活动趋势分析 - 折线图展示',
    pie: '行为类型分布 - 饼图展示',
    rose: '行为类型分布 - 玫瑰图展示',
    radar: '组件多维度分析 - 雷达图展示',
    scatter: '时长与访问次数关系 - 散点图展示'
  }
  return titles[currentChartType.value] || '数据展示'
}
</script>

