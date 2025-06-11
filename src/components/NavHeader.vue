<template>
  <!-- 导航栏 -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e8eaed] shadow-sm">
    <div class="max-w-8xl mx-auto px-4 md:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo区域 -->
        <a @click="navigateWithScrollTop('/')" class="flex items-center space-x-3 group cursor-pointer">
          <!-- 简洁Logo -->
          <div class="relative">
            <div class="w-8 h-8 bg-[#2f4554] rounded-sm flex items-center justify-center group-hover:bg-[#c23531] transition-colors duration-300">
              <span class="text-white font-bold text-sm">A</span>
            </div>
            <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-[#c23531] rounded-sm opacity-80"></div>
          </div>
          <!-- 品牌文字 -->
          <div class="flex flex-col">
            <span class="text-xl font-bold text-[#2f4554] tracking-tight">Asuka</span>
            <span class="text-xs text-[#6e7074] -mt-1 tracking-wide">COMPONENTS</span>
          </div>
        </a>
        
        <!-- 桌面端导航 -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            @click="navigateWithScrollTop('/design')"
            class="nav-item cursor-pointer"
            :class="{ 'nav-item-active': $route.path === '/design' }"
          >
            设计
          </a>
          
          <a
            @click="handleComponentsClick"
            class="nav-item cursor-pointer"
            :class="{ 'nav-item-active': $route.path.startsWith('/components') }"
          >
            组件
          </a>
          
          <a
            href="https://blog.csdn.net/sahjiwij?spm=1000.2115.3001.10640"
            target="_blank"
            class="nav-item"
          >
            博客
          </a>
        </div>

        <!-- 移动端菜单按钮 -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-md hover:bg-[#f5f6f7] transition-colors duration-200"
        >
          <svg class="w-5 h-5 text-[#2f4554]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              v-if="!showMobileMenu"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path 
              v-else
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 移动端下拉菜单 -->
    <transition name="mobile-menu">
      <div v-if="showMobileMenu" class="md:hidden bg-white border-t border-[#e8eaed]">
        <div class="px-4 py-4 space-y-3">
          <a
            @click="navigateWithScrollTop('/design')"
            class="mobile-nav-item cursor-pointer"
            :class="{ 'mobile-nav-item-active': $route.path === '/design' }"
          >
            设计
          </a>
          <a
            @click="handleComponentsClick"
            class="mobile-nav-item cursor-pointer"
            :class="{ 'mobile-nav-item-active': $route.path.startsWith('/components') }"
          >
            组件
          </a>
          <a
            href="https://blog.csdn.net/sahjiwij?spm=1000.2115.3001.10640"
            target="_blank"
            @click="closeMobileMenu"
            class="mobile-nav-item"
          >
            博客
          </a>
        </div>
      </div>
    </transition>
  </nav>

  <!-- 页面切换动画 -->
  <transition name="page-transition">
    <div v-if="isTransitioning" class="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
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

export default {
  name: 'NavHeader',
  setup() {
    const showMobileMenu = ref(false)
    const isTransitioning = ref(false)

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }

    const closeMobileMenu = () => {
      showMobileMenu.value = false
    }

    // 页面切换动画控制
    const showTransition = () => {
      isTransitioning.value = true
    }

    const hideTransition = () => {
      isTransitioning.value = false
    }

    return {
      showMobileMenu,
      isTransitioning,
      toggleMobileMenu,
      closeMobileMenu,
      showTransition,
      hideTransition
    }
  },
  methods: {
    handleComponentsClick() {
      this.closeMobileMenu()
      
      if (this.$route.path === '/components') {
        // 如果已经在组件页面，只需要滚动到顶部并重置页面
        window.scrollTo({ top: 0, behavior: 'smooth' })
        window.dispatchEvent(new CustomEvent('reset-components-page'))
      } else {
        // 显示动画，跳转页面，然后隐藏动画
        this.showTransition()
        setTimeout(() => {
          this.$router.push('/components').then(() => {
            window.scrollTo({ top: 0, behavior: 'auto' })
            setTimeout(() => {
              this.hideTransition()
            }, 200)
          })
        }, 300)
      }
    },
    
    // 通用的导航跳转方法，包含回到顶部功能
    navigateWithScrollTop(to) {
      this.closeMobileMenu()
      
      // 如果是当前页面，不需要动画
      if (this.$route.path === to) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      
      // 显示动画，跳转页面，然后隐藏动画
      this.showTransition()
      setTimeout(() => {
        this.$router.push(to).then(() => {
          window.scrollTo({ top: 0, behavior: 'auto' })
          setTimeout(() => {
            this.hideTransition()
          }, 200)
        })
      }, 300)
    }
  }
}
</script>

<style scoped>
/* 桌面端导航项 */
.nav-item {
  @apply relative text-[#6e7074] font-medium text-sm tracking-wide 
         hover:text-[#2f4554] transition-all duration-300
         after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
         after:bg-[#c23531] after:transition-all after:duration-300
         hover:after:w-full;
}

.nav-item-active {
  @apply text-[#2f4554] font-semibold after:w-full;
}

/* 移动端导航项 */
.mobile-nav-item {
  @apply block py-3 px-4 text-[#6e7074] font-medium text-base
         border-l-4 border-transparent
         hover:text-[#2f4554] hover:bg-[#f5f6f7] hover:border-[#e8eaed]
         transition-all duration-200;
}

.mobile-nav-item-active {
  @apply text-[#2f4554] bg-[#f5f6f7] border-[#c23531] font-semibold;
}

/* 移动端菜单动画 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 页面切换动画 */
.page-transition-enter-active {
  transition: all 0.3s ease-out;
}

.page-transition-leave-active {
  transition: all 0.3s ease-in;
}

.page-transition-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.page-transition-leave-to {
  opacity: 0;
  transform: scale(1.1);
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