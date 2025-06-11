<template>
  <!-- 页面切换动画 -->
  <transition name="page-transition">
    <div v-if="isVisible" class="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div class="relative">
        <!-- 动画Logo -->
        <div class="relative rounded-sm w-full flex justify-center items-center animate-pulse">
          <div class="w-16 h-16 bg-[#2f4554] rounded-sm flex items-center justify-center animate-bounce">
            <span class="text-white font-bold text-2xl">A</span>
          </div>
          <div class="absolute rounded-sm -bottom-1 right-2 w-5 h-5 bg-[#c23531] opacity-80 animate-ping"></div>
        </div>
        
        <!-- 品牌文字 -->
        <div class="flex flex-col items-center mt-4 animate-fade-in">
          <span class="text-2xl font-bold text-[#2f4554] tracking-tight">Asuka</span>
          <span class="text-sm text-[#6e7074] tracking-wide">COMPONENTS</span>
        </div>
        
        <!-- 加载指示器 -->
        <div class="flex justify-center mt-6">
          <div class="flex space-x-1">
            <div class="w-2 h-2 bg-[#c23531] rounded-full animate-bounce" style="animation-delay: 0ms"></div>
            <div class="w-2 h-2 bg-[#c23531] rounded-full animate-bounce" style="animation-delay: 150ms"></div>
            <div class="w-2 h-2 bg-[#c23531] rounded-full animate-bounce" style="animation-delay: 300ms"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from 'vue'
import { pageTransitionManager } from '@/router/pageTransition'

export default {
  name: 'PageTransition',
  setup() {
    const isVisible = ref(false)

    // 监听动画状态变化
    pageTransitionManager.onStateChange((visible) => {
      isVisible.value = visible
    })

    return {
      isVisible
    }
  }
}
</script>

<style scoped>
/* 页面切换动画 */
.page-transition-enter-active {
  transition: all 0.4s ease-out;
}

.page-transition-leave-active {
  transition: all 0.4s ease-in;
}

.page-transition-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.page-transition-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* 自定义动画 */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style> 