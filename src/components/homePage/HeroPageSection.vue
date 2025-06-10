<template>
  <!-- 英雄区域 - 占满首屏 -->
  <div class="pt-16 min-h-screen flex flex-col justify-center text-center py-12 md:py-20 bg-[#f5f6f7]">
    <!-- 主标题区域 -->
    <div class="mb-8 md:mb-12 px-4">
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#2f4554] mb-3 md:mb-4">
        Asuka
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl text-[#6e7074] mb-3 md:mb-4">
        Vue 组件库
      </p>
      <p class="text-base md:text-lg text-[#6e7074] max-w-lg md:max-w-2xl mx-auto leading-relaxed px-4">
        复古工业风设计 + 现代交互体验
      </p>
    </div>
    
    <!-- 行动按钮 -->
    <div class="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16 px-4">
      <button 
        @click="goToComponents"
        class="bg-[#c23531] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-[#d48265] transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
      >
        查看组件
      </button>
      <button 
        @click="openGitHub"
        class="border-2 border-[#c23531] text-[#c23531] px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-[#c23531] hover:text-white transition-all duration-300 text-sm md:text-base"
      >
        GitHub
      </button>
    </div>

    <!-- 核心特点 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto px-4 md:px-6">
      <div class="bg-white p-4 md:p-6 rounded-lg border border-[#e8eaed] hover:border-[#c23531] transition-colors duration-300">
        <div class="w-12 h-12 bg-[#c23531] text-white rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zM1 15a1 1 0 011-1h6a1 1 0 110 2H2a1 1 0 01-1-1zm10-2a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zm1-5a1 1 0 100 2h6a1 1 0 100-2h-6zm0-4a1 1 0 100 2h6a1 1 0 100-2h-6z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="text-base md:text-lg font-semibold text-[#2f4554] mb-2 md:mb-3">独特设计</h3>
        <p class="text-sm md:text-base text-[#6e7074]">复古工业风遇见现代交互</p>
      </div>
      
      <div class="bg-white p-4 md:p-6 rounded-lg border border-[#e8eaed] hover:border-[#d48265] transition-colors duration-300">
        <div class="w-12 h-12 bg-[#d48265] text-white rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
          </svg>
        </div>
        <h3 class="text-base md:text-lg font-semibold text-[#2f4554] mb-2 md:mb-3">数据可视化</h3>
        <p class="text-sm md:text-base text-[#6e7074]">Canvas + ECharts 图表展示</p>
      </div>
      
      <div class="bg-white p-4 md:p-6 rounded-lg border border-[#e8eaed] hover:border-[#ca8622] transition-colors duration-300">
        <div class="w-12 h-12 bg-[#ca8622] text-white rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="text-base md:text-lg font-semibold text-[#2f4554] mb-2 md:mb-3">开发友好</h3>
        <p class="text-sm md:text-base text-[#6e7074]">原生实现，拿来即用</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HeroPageSection',
  methods: {
    goToComponents() {
      this.$router.push('/components')
    },
    openGitHub() {
      window.open('https://github.com/afigzb/codeBase', '_blank')
    }
  }
}
</script> 