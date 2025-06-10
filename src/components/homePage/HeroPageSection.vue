<template>
  <!-- 英雄区域 - 占满首屏 -->
  <div class="pt-16 min-h-screen flex flex-col justify-center text-center py-16 bg-[#f5f6f7]">
    <h1 class="text-6xl font-bold text-[#2f4554] mb-6">
      asuka
    </h1>
    
    <p class="text-xl text-[#6e7074] mb-8">
      Vue.js 组件库
    </p>
    
    <div class="flex gap-4 justify-center mb-16">
      <button class="border-2 border-[#c23531] bg-[#c23531] text-white px-8 py-3 hover:bg-[#d48265] hover:border-[#d48265] transition-colors duration-200">
        开始使用
      </button>
      <button class="border-2 border-[#c4c9d0] text-[#2f4554] px-8 py-3 hover:border-[#c23531] hover:text-[#c23531] transition-colors duration-200">
        查看组件
      </button>
    </div>

    <div class="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div class="bg-white border border-[#e8eaed] p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
        <h3 class="text-xl font-semibold text-[#2f4554] mb-2">交互体验</h3>
        <p class="text-[#6e7074]">拖拽、回弹、手势识别等交互效果</p>
      </div>
      
      <div class="bg-white border border-[#e8eaed] p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
        <h3 class="text-xl font-semibold text-[#2f4554] mb-2">视觉动效</h3>
        <p class="text-[#6e7074]">动画效果和图形组件</p>
      </div>
      
      <div class="bg-white border border-[#e8eaed] p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
        <h3 class="text-xl font-semibold text-[#2f4554] mb-2">创意设计</h3>
        <p class="text-[#6e7074]">独特创意的组件设计</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroPageSection',
}
</script> 