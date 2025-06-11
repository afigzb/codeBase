<template>
  <!-- 导航栏 -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e8eaed] shadow-sm">
    <div class="max-w-8xl mx-auto px-4 md:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo区域 -->
        <router-link to="/" class="flex items-center space-x-3 group">
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
        </router-link>
        
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
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'NavHeader',
  setup() {
    const showMobileMenu = ref(false)

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }

    const closeMobileMenu = () => {
      showMobileMenu.value = false
    }

    return {
      showMobileMenu,
      toggleMobileMenu,
      closeMobileMenu
    }
  },
  methods: {
    handleComponentsClick() {
      this.closeMobileMenu()
      
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
      if (this.$route.path === '/components') {
        window.dispatchEvent(new CustomEvent('reset-components-page'))
      } else {
        this.$router.push('/components')
      }
    },
    
    // 通用的导航跳转方法，包含回到顶部功能
    navigateWithScrollTop(to) {
      this.closeMobileMenu()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.$router.push(to)
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
</style> 