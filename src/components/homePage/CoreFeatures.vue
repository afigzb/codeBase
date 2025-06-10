<template>
  <!-- 功能特性介绍区域 -->
  <section class="relative py-20 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-20 left-10 w-32 h-32 bg-[#c23531] rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-40 h-40 bg-[#d48265] rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 w-24 h-24 bg-[#ca8622] rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
    
    <div class="relative max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-[#2f4554] mb-6 tracking-tight">
          核心<span class="text-[#c23531]">功能</span>
        </h2>
        <p class="text-xl text-[#6e7074] max-w-2xl mx-auto leading-relaxed">
          提供完整的组件库解决方案，从开发到部署的全流程支持
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <!-- 丰富组件 -->
        <div class="group relative">
          <div class="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            <!-- 装饰性背景 -->
            <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#c23531]/10 to-transparent rounded-bl-3xl rounded-tr-2xl"></div>
            
            <!-- 图标区域 -->
            <div class="relative mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-[#c23531] to-[#a82e29] text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 w-6 h-6 bg-[#c23531] rounded-full opacity-20 animate-pulse"></div>
            </div>
            
            <h3 class="text-2xl font-bold text-[#2f4554] mb-4 group-hover:text-[#c23531] transition-colors">丰富组件</h3>
            <p class="text-[#6e7074] leading-relaxed">
              提供高质量、可复用的UI组件，涵盖表单、导航、数据展示等多种使用场景，助力快速构建现代化应用
            </p>
            
            <!-- 底部装饰线 -->
            <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#c23531] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-bl-2xl rounded-br-2xl"></div>
          </div>
        </div>

        <!-- 数据可视化 -->
        <div class="group relative lg:mt-8">
          <div class="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            <!-- 装饰性背景 -->
            <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#d48265]/10 to-transparent rounded-bl-3xl rounded-tr-2xl"></div>
            
            <!-- 图标区域 -->
            <div class="relative mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-[#d48265] to-[#b8704e] text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 w-6 h-6 bg-[#d48265] rounded-full opacity-20 animate-pulse"></div>
            </div>
            
            <h3 class="text-2xl font-bold text-[#2f4554] mb-4 group-hover:text-[#d48265] transition-colors">数据分析</h3>
            <p class="text-[#6e7074] leading-relaxed">
              强大的数据可视化能力，支持柱状图、折线图、饼图等多种图表类型，提供丰富的交互方式和动画效果
            </p>
            
            <!-- 底部装饰线 -->
            <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d48265] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-bl-2xl rounded-br-2xl"></div>
          </div>
        </div>

        <!-- 开发体验 -->
        <div class="group relative">
          <div class="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            <!-- 装饰性背景 -->
            <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#ca8622]/10 to-transparent rounded-bl-3xl rounded-tr-2xl"></div>
            
            <!-- 图标区域 -->
            <div class="relative mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-[#ca8622] to-[#a67018] text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="absolute -top-2 -right-2 w-6 h-6 bg-[#ca8622] rounded-full opacity-20 animate-pulse"></div>
            </div>
            
            <h3 class="text-2xl font-bold text-[#2f4554] mb-4 group-hover:text-[#ca8622] transition-colors">开发友好</h3>
            <p class="text-[#6e7074] leading-relaxed">
              完善的文档和示例代码，全面的TypeScript支持，智能的代码提示，让开发过程更加高效愉悦
            </p>
            
            <!-- 底部装饰线 -->
            <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#ca8622] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-bl-2xl rounded-br-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 这个组件是纯展示组件，不需要响应式数据或方法
</script> 