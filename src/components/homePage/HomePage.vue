<template>
  <div class="relative">
    <!-- 英雄区域 -->
    <HeroPageSection />

    <!-- 功能特性介绍 -->
    <CoreFeatures />

    <!-- 组件展示 -->
    <ComponentPageShowcase />

    <!-- 技术栈与性能 -->
    <TechStack />

    <!-- 统计数据 -->
    <StatsShowcase />

    <!-- 快速开始 -->
    <QuickStart />

    <!-- 页面进度条 -->
    <div class="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c23531] via-[#d48265] to-[#ca8622] z-50 transform scale-x-0 transition-transform duration-300" 
         :class="{ 'scale-x-100': scrollProgress > 0 }"
         :style="{ transform: `scaleX(${scrollProgress})` }"></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import HeroPageSection from './HeroPageSection.vue'
import CoreFeatures from './CoreFeatures.vue'
import TechStack from './TechStack.vue'
import ComponentPageShowcase from './ComponentPageShowcase.vue'
import StatsShowcase from './StatsShowcase.vue'
import QuickStart from './QuickStart.vue'

export default {
  name: 'HomePage',
  components: {
    HeroPageSection,
    CoreFeatures,
    TechStack,
    ComponentPageShowcase,
    StatsShowcase,
    QuickStart
  },
  setup() {
    const scrollProgress = ref(0)

    const updateScrollProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      scrollProgress.value = winScroll / height
    }

    onMounted(() => {
      window.addEventListener('scroll', updateScrollProgress)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', updateScrollProgress)
    })

    return {
      scrollProgress
    }
  }
}
</script> 