<template>
  <section class="py-12 md:py-20 bg-white">
    <div class="max-w-6xl mx-auto px-4 md:px-6">
      <!-- 标题区域 -->
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-2xl md:text-3xl font-bold text-[#2f4554] mb-3 md:mb-4">
          核心能力
        </h2>
        <p class="text-base md:text-lg text-[#6e7074] max-w-xl md:max-w-2xl mx-auto px-4">
          专注交互体验与数据可视化
        </p>
      </div>
      
      <!-- 能力展示 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <!-- 交互组件 -->
        <div class="text-center p-6 md:p-8 bg-[#f5f6f7] rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300">
          <div class="w-12 md:w-16 h-12 md:h-16 bg-[#c23531] text-white rounded-lg flex items-center justify-center mx-auto mb-4 md:mb-6">
            <svg class="w-6 md:w-8 h-6 md:h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
          </div>
          <h3 class="text-lg md:text-xl font-bold text-[#2f4554] mb-3 md:mb-4">交互组件</h3>
          <p class="text-sm md:text-base text-[#6e7074] leading-relaxed">
            光标跟随、拖拽、动画等创意交互效果
          </p>
        </div>

        <!-- 数据图表 -->
        <div class="text-center p-6 md:p-8 bg-[#f5f6f7] rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300">
          <div class="w-12 md:w-16 h-12 md:h-16 bg-[#d48265] text-white rounded-lg flex items-center justify-center mx-auto mb-4 md:mb-6">
            <svg class="w-6 md:w-8 h-6 md:h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
            </svg>
          </div>
          <h3 class="text-lg md:text-xl font-bold text-[#2f4554] mb-3 md:mb-4">数据图表</h3>
          <p class="text-sm md:text-base text-[#6e7074] leading-relaxed">
            Canvas 绘制与 ECharts 集成的图表组件
          </p>
        </div>

        <!-- 工具组件 -->
        <div class="text-center p-6 md:p-8 bg-[#f5f6f7] rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300">
          <div class="w-12 md:w-16 h-12 md:h-16 bg-[#ca8622] text-white rounded-lg flex items-center justify-center mx-auto mb-4 md:mb-6">
            <svg class="w-6 md:w-8 h-6 md:h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
            </svg>
          </div>
          <h3 class="text-lg md:text-xl font-bold text-[#2f4554] mb-3 md:mb-4">工具组件</h3>
          <p class="text-sm md:text-base text-[#6e7074] leading-relaxed">
            编辑器、文件处理、实用工具等功能组件
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 简化的功能展示组件
</script> 