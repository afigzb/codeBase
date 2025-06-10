<template>
  <div>
    <!-- 英雄区域 - 占满首屏 -->
    <HeroPageSection />

    <!-- 功能特性介绍区域 -->
    <CoreFeatures />

    <!-- 组件展示区域 -->
    <ComponentPageShowcase />

    <!-- 使用说明区域 -->
    <section class="py-16 bg-[#f5f6f7]">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold text-[#2f4554] mb-8">快速开始</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <!-- 安装 -->
          <div class="bg-white p-6 border border-[#e8eaed]">
            <div class="text-left">
              <h3 class="text-lg font-semibold text-[#2f4554] mb-4">1. 安装组件库</h3>
              <div class="bg-[#2f4554] text-white p-4 rounded font-mono text-sm">
                npm install @your-org/component-lib
              </div>
            </div>
          </div>

          <!-- 使用 -->
          <div class="bg-white p-6 border border-[#e8eaed]">
            <div class="text-left">
              <h3 class="text-lg font-semibold text-[#2f4554] mb-4">2. 导入使用</h3>
              <div class="bg-[#2f4554] text-white p-4 rounded font-mono text-sm">
                import { EChart } from '@your-org/component-lib'
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-4">
          <button class="bg-[#c23531] text-white px-6 py-3 rounded hover:bg-[#d48265] transition-colors">
            查看文档
          </button>
          <button class="border border-[#c23531] text-[#c23531] px-6 py-3 rounded hover:bg-[#c23531] hover:text-white transition-colors">
            GitHub
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeroPageSection from './HeroPageSection.vue'
import CoreFeatures from './CoreFeatures.vue'
import ComponentPageShowcase from './ComponentPageShowcase.vue'

export default {
  name: 'HomePage',
  components: {
    HeroPageSection,
    CoreFeatures,
    ComponentPageShowcase
  }
}
</script> 