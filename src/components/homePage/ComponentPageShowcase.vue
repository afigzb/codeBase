<template>
  <div class="py-12 md:py-16 bg-[#f5f6f7]">
    <!-- 标题区域 -->
    <div class="text-center mb-12 md:mb-16 px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-[#2f4554] mb-3 md:mb-4">
        组件演示
      </h2>
      <p class="text-base md:text-lg text-[#6e7074] max-w-xl md:max-w-2xl mx-auto">
        体验动态图表组件的实时切换和自动轮播功能
      </p>
    </div>

    <!-- 主要内容区域 -->
    <div class="max-w-6xl mx-auto px-4 md:px-6">
      <div class="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
        <!-- 左侧：动态图表 -->
        <div class="w-full lg:w-[700px] xl:w-[750px]">
          <div class="bg-white rounded-xl shadow-lg border border-[#e8eaed] p-4 md:p-6">
            <!-- 图表控制区域 -->
            <div class="mb-4 md:mb-6">
              <div class="mb-3 md:mb-4">
                <h3 class="text-base md:text-lg font-semibold text-[#2f4554] mb-3 md:mb-4">{{ getCurrentChartTitle() }}</h3>
              </div>
              
              <!-- 图表类型选择按钮 -->
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="chartType in chartTypes" 
                  :key="chartType.type"
                  :class="[
                    'px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium rounded-lg transition-all duration-200',
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
            <div ref="dynamicChart" class="w-full h-[250px] md:h-[300px] lg:h-[350px]"></div>
          </div>
        </div>

        <!-- 右侧：故事描述区域 -->
        <div class="w-full lg:flex-1">
          <TypewriterStory 
            :storyKey="currentChartType"
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
  visitorActivities as rawVisitorActivities,
  getChartDataAndConfig,
  getChartTitle
} from './echartsData.js'
import TypewriterStory from './TypewriterStory.vue'

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
    const { data, config, chartType } = getChartDataAndConfig(currentChartType.value, visitorActivities.value)
    dynamicChartInstance = createChart(dynamicChart.value, chartType, 'minimal')
    dynamicChartInstance.update(data, config)
  }
}

// 智能图表切换 - 根据图表类型转换数据格式并配置
function switchChartType(type, isManual = true) {
  currentChartType.value = type
  
  // 手动点击时停止故事模式
  // if (isManual && isStoryMode.value) {
  //   isStoryMode.value = false
  // }
  
  if (!dynamicChartInstance) {
    initDynamicChart()
    return
  }
  
  // 获取转换后的数据和配置
  const { data, config, chartType } = getChartDataAndConfig(type, visitorActivities.value)
  
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
  console.log('Story completed for key:', currentChartType.value)
}

function onStoryChanged(newKey) {
  // 故事组件请求切换内容类型
  switchChartType(newKey, false) // false表示非手动操作
}

// 获取当前图表标题
function getCurrentChartTitle() {
  return getChartTitle(currentChartType.value)
}
</script>

