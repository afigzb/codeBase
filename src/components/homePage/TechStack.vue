<template>
  <section class="py-12 md:py-20 bg-white">
    <div class="max-w-6xl mx-auto px-4 md:px-6">
      <!-- 标题区域 -->
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-2xl md:text-3xl font-bold text-[#2f4554] mb-3 md:mb-4">技术栈</h2>
        <p class="text-base md:text-lg text-[#6e7074] max-w-xl md:max-w-2xl mx-auto px-4">
          基于现代前端技术构建，原生实现核心组件
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
        <!-- 左侧：核心技术 -->
        <div>
          <h3 class="text-lg md:text-xl font-bold text-[#2f4554] mb-6 md:mb-8">组件技术</h3>
          <div class="grid grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            <!-- Lit -->
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-[#324FFF] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">L</span>
              </div>
              <h4 class="font-semibold text-[#2f4554] mb-2">Lit</h4>
              <p class="text-sm text-[#6e7074]">轻量Web Components</p>
            </div>

            <!-- JavaScript -->
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-[#F7DF1E] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span class="text-black font-bold text-xl">JS</span>
              </div>
              <h4 class="font-semibold text-[#2f4554] mb-2">JavaScript</h4>
              <p class="text-sm text-[#6e7074]">原生JavaScript实现</p>
            </div>

            <!-- Canvas -->
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-[#FF6B35] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">CV</span>
              </div>
              <h4 class="font-semibold text-[#2f4554] mb-2">Canvas</h4>
              <p class="text-sm text-[#6e7074]">2D图形绘制</p>
            </div>

            <!-- HTML/CSS -->
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-[#E34C26] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span class="text-white font-bold text-xl">H</span>
              </div>
              <h4 class="font-semibold text-[#2f4554] mb-2">HTML/CSS</h4>
              <p class="text-sm text-[#6e7074]">标准前端技术</p>
            </div>
          </div>

          <!-- 开发工具 -->
          <h4 class="text-lg font-bold text-[#2f4554] mb-6">页面技术</h4>
          <div class="space-y-4">
            <div class="flex items-center gap-3 text-[#6e7074]">
              <div class="w-2 h-2 bg-[#4FC08D] rounded-full"></div>
              <span>Vue.js 3 - 页面框架</span>
            </div>
            <div class="flex items-center gap-3 text-[#6e7074]">
              <div class="w-2 h-2 bg-[#06B6D4] rounded-full"></div>
              <span>Tailwind CSS - 样式框架</span>
            </div>
            <div class="flex items-center gap-3 text-[#6e7074]">
              <div class="w-2 h-2 bg-[#646CFF] rounded-full"></div>
              <span>Vite - 构建工具</span>
            </div>
            <div class="flex items-center gap-3 text-[#6e7074]">
              <div class="w-2 h-2 bg-[#c23531] rounded-full"></div>
              <span>ECharts - 图表库</span>
            </div>
          </div>
        </div>

        <!-- 右侧：性能表现 -->
        <div>
          <h3 class="text-xl font-bold text-[#2f4554] mb-8">性能表现</h3>
          <div class="space-y-6">
            <!-- 包大小 -->
            <div class="border-l-4 border-[#c23531] pl-6">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold text-[#2f4554]">包体积</span>
                <span class="text-xl font-bold text-[#c23531]">< 50KB</span>
              </div>
              <p class="text-sm text-[#6e7074]">Gzip压缩后，按需加载优化</p>
            </div>

            <!-- 加载速度 -->
            <div class="border-l-4 border-[#d48265] pl-6">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold text-[#2f4554]">初始化时间</span>
                <span class="text-xl font-bold text-[#d48265]">< 100ms</span>
              </div>
              <p class="text-sm text-[#6e7074]">组件懒加载，极速响应</p>
            </div>

            <!-- 兼容性 -->
            <div class="border-l-4 border-[#ca8622] pl-6">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold text-[#2f4554]">浏览器兼容</span>
                <span class="text-xl font-bold text-[#ca8622]">95%+</span>
              </div>
              <p class="text-sm text-[#6e7074]">支持现代浏览器及IE11+</p>
            </div>

            <!-- 组件数量 -->
            <div class="border-l-4 border-[#61a0a8] pl-6">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold text-[#2f4554]">组件数量</span>
                <span class="text-xl font-bold text-[#61a0a8]">20+</span>
              </div>
              <p class="text-sm text-[#6e7074]">持续新增，覆盖常用场景</p>
            </div>
          </div>

          <!-- 性能优化趋势图 -->
          <div class="mt-12">
            <h4 class="text-lg font-bold text-[#2f4554] mb-4">性能优化趋势</h4>
            <div class="bg-[#f5f6f7] p-6 rounded-lg border border-[#e8eaed]">
              <div ref="performanceChart" class="w-full h-48"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const performanceChart = ref(null)
let chartInstance = null

onMounted(() => {
  if (performanceChart.value) {
    chartInstance = echarts.init(performanceChart.value)
    
    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e8eaed',
        borderWidth: 1,
        textStyle: {
          color: '#2f4554',
          fontSize: 12
        }
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['v1.0', 'v1.5', 'v2.0', 'v2.5', 'v3.0', '当前'],
        axisLine: {
          lineStyle: {
            color: '#e8eaed'
          }
        },
        axisLabel: {
          color: '#6e7074',
          fontSize: 11
        }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: '#6e7074',
          fontSize: 11,
          formatter: '{value}%'
        },
        splitLine: {
          lineStyle: {
            color: '#e8eaed',
            type: 'dashed'
          }
        }
      },
      series: [
        {
          name: '性能提升',
          type: 'line',
          data: [0, 20, 45, 65, 80, 90],
          smooth: true,
          lineStyle: {
            color: '#c23531',
            width: 2
          },
          itemStyle: {
            color: '#c23531'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(194, 53, 49, 0.2)' },
                { offset: 1, color: 'rgba(194, 53, 49, 0.02)' }
              ]
            }
          }
        }
      ]
    }
    
    chartInstance.setOption(option)
    
    const handleResize = () => {
      if (chartInstance) {
        chartInstance.resize()
      }
    }
    
    window.addEventListener('resize', handleResize)
    
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
      if (chartInstance) {
        chartInstance.dispose()
        chartInstance = null
      }
    })
  }
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script> 