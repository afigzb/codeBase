<template>
  <section class="py-12 md:py-20 bg-[#f5f6f7]">
    <div class="max-w-6xl mx-auto px-4 md:px-6">
      <!-- 标题和统计数据 -->
      <div class="text-center mb-16 md:mb-20">
        <h2 class="text-2xl md:text-3xl font-bold text-[#2f4554] mb-3 md:mb-4">项目数据</h2>
        <p class="text-base md:text-lg text-[#6e7074] max-w-xl md:max-w-2xl mx-auto mb-8 md:mb-12 px-4">
          持续更新的组件库，服务开发者社区
        </p>
        
        <!-- 核心数据 -->
        <div ref="statsContainer" class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div class="text-center p-4">
            <div class="text-2xl md:text-4xl font-bold text-[#c23531] mb-1 md:mb-2">
              {{ animatedStats.users.toLocaleString() }}+
            </div>
            <div class="text-sm md:text-base text-[#6e7074]">活跃用户</div>
          </div>
          <div class="text-center p-4">
            <div class="text-2xl md:text-4xl font-bold text-[#d48265] mb-1 md:mb-2">
              {{ animatedStats.downloads.toLocaleString() }}+
            </div>
            <div class="text-sm md:text-base text-[#6e7074]">下载次数</div>
          </div>
          <div class="text-center p-4">
            <div class="text-2xl md:text-4xl font-bold text-[#ca8622] mb-1 md:mb-2">
              {{ animatedStats.components }}+
            </div>
            <div class="text-sm md:text-base text-[#6e7074]">优质组件</div>
          </div>
          <div class="text-center p-4">
            <div class="text-2xl md:text-4xl font-bold text-[#61a0a8] mb-1 md:mb-2">
              {{ animatedStats.satisfaction }}%
            </div>
            <div class="text-sm md:text-base text-[#6e7074]">满意度</div>
          </div>
        </div>
      </div>

      <!-- 应用场景 -->
      <div class="text-center mb-8 md:mb-12">
        <h3 class="text-xl md:text-2xl font-bold text-[#2f4554] mb-3 md:mb-4">广泛的应用场景</h3>
        <p class="text-sm md:text-base text-[#6e7074] mb-8 md:mb-12 px-4">适用于各种项目类型，帮助开发者快速构建优秀的用户界面</p>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
          <!-- 企业官网 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-[#c23531] text-white rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 12V8H4v8h12z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h4 class="font-medium text-[#2f4554] mb-1">企业官网</h4>
            <p class="text-xs text-[#6e7074]">品牌展示</p>
          </div>

          <!-- 后台管理 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-[#d48265] text-white rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <h4 class="font-medium text-[#2f4554] mb-1">后台管理</h4>
            <p class="text-xs text-[#6e7074]">数据管理</p>
          </div>

          <!-- 数据可视化 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-[#ca8622] text-white rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h4 class="font-medium text-[#2f4554] mb-1">数据可视化</h4>
            <p class="text-xs text-[#6e7074]">图表展示</p>
          </div>

          <!-- 创意展示 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-[#61a0a8] text-white rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h4 class="font-medium text-[#2f4554] mb-1">创意展示</h4>
            <p class="text-xs text-[#6e7074]">个性体验</p>
          </div>

          <!-- 移动应用 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-[#2f4554] text-white rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zM6 4a1 1 0 011-1h6a1 1 0 011 1v10a1 1 0 01-1 1H7a1 1 0 01-1-1V4zm2.5 9a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h4 class="font-medium text-[#2f4554] mb-1">移动应用</h4>
            <p class="text-xs text-[#6e7074]">移动适配</p>
          </div>

          <!-- 电商平台 -->
          <div class="text-center">
            <div class="w-16 h-16 bg-[#6e7074] text-white rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM6 9a1 1 0 112 0 1 1 0 01-2 0zm6 0a1 1 0 112 0 1 1 0 01-2 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h4 class="font-medium text-[#2f4554] mb-1">电商平台</h4>
            <p class="text-xs text-[#6e7074]">购物体验</p>
          </div>
        </div>
      </div>

      <!-- 用户反馈 -->
      <div class="text-center">
        <h3 class="text-xl font-bold text-[#2f4554] mb-8">用户反馈</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 反馈1 -->
          <div class="bg-white p-6 rounded-lg border border-[#e8eaed]">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-[#c23531] text-white rounded-full flex items-center justify-center mr-3">
                <span class="font-semibold">李</span>
              </div>
              <div class="text-left">
                <div class="font-medium text-[#2f4554]">李开发</div>
                <div class="text-sm text-[#6e7074]">前端工程师</div>
              </div>
            </div>
            <p class="text-[#6e7074] text-sm text-left mb-3">
              "组件库的交互效果非常棒，特别是光标跟随组件，为我们的项目增色不少。文档也很详细，上手很快。"
            </p>
            <div class="text-[#ca8622] text-left">★★★★★</div>
          </div>

          <!-- 反馈2 -->
          <div class="bg-white p-6 rounded-lg border border-[#e8eaed]">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-[#d48265] text-white rounded-full flex items-center justify-center mr-3">
                <span class="font-semibold">张</span>
              </div>
              <div class="text-left">
                <div class="font-medium text-[#2f4554]">张设计师</div>
                <div class="text-sm text-[#6e7074]">UI/UX 设计师</div>
              </div>
            </div>
            <p class="text-[#6e7074] text-sm text-left mb-3">
              "设计风格很独特，复古工业风配上现代交互，既有个性又不失实用性。团队都很喜欢这种风格。"
            </p>
            <div class="text-[#ca8622] text-left">★★★★★</div>
          </div>

          <!-- 反馈3 -->
          <div class="bg-white p-6 rounded-lg border border-[#e8eaed]">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-[#ca8622] text-white rounded-full flex items-center justify-center mr-3">
                <span class="font-semibold">王</span>
              </div>
              <div class="text-left">
                <div class="font-medium text-[#2f4554]">王全栈</div>
                <div class="text-sm text-[#6e7074]">全栈开发者</div>
              </div>
            </div>
            <p class="text-[#6e7074] text-sm text-left mb-3">
              "零依赖和TypeScript支持太赞了！集成到项目中毫无压力，代码提示也很完善，开发效率提升明显。"
            </p>
            <div class="text-[#ca8622] text-left">★★★★★</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// 统计数据目标值
const targetStats = {
  users: 1200,
  downloads: 3500,
  components: 20,
  satisfaction: 98
}

// 当前动画显示的数值
const animatedStats = reactive({
  users: 0,
  downloads: 0,
  components: 0,
  satisfaction: 0
})

// DOM引用
const statsContainer = ref(null)
let observer = null
let hasAnimated = false

// 数字动画函数
const animateNumber = (start, end, duration, callback) => {
  const startTime = performance.now()
  const range = end - start
  
  const updateValue = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // 使用 easeOutCubic 缓动函数，让动画更自然
    const easeOutCubic = 1 - Math.pow(1 - progress, 3)
    const currentValue = Math.floor(start + range * easeOutCubic)
    
    callback(currentValue)
    
    if (progress < 1) {
      requestAnimationFrame(updateValue)
    } else {
      callback(end) // 确保最终值正确
    }
  }
  
  requestAnimationFrame(updateValue)
}

// 启动所有数字动画
const startAnimation = () => {
  if (hasAnimated) return // 防止重复动画
  hasAnimated = true
  
  // 为每个统计数字添加动画，使用不同的持续时间来创建交错效果
  animateNumber(0, targetStats.users, 2000, (value) => {
    animatedStats.users = value
  })
  
  setTimeout(() => {
    animateNumber(0, targetStats.downloads, 2200, (value) => {
      animatedStats.downloads = value
    })
  }, 200)
  
  setTimeout(() => {
    animateNumber(0, targetStats.components, 1800, (value) => {
      animatedStats.components = value
    })
  }, 400)
  
  setTimeout(() => {
    animateNumber(0, targetStats.satisfaction, 2500, (value) => {
      animatedStats.satisfaction = value
    })
  }, 600)
}

onMounted(() => {
  // 创建 Intersection Observer 来监听元素是否进入视口
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          startAnimation()
        }
      })
    },
    {
      threshold: 0.3, // 当30%的元素可见时触发
      rootMargin: '0px 0px -50px 0px' // 稍微提前触发
    }
  )
  
  if (statsContainer.value) {
    observer.observe(statsContainer.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script> 