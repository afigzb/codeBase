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
          <router-link
            to="/design"
            class="nav-item"
            :class="{ 'nav-item-active': $route.path === '/design' }"
          >
            设计
          </router-link>
          
          <router-link
            to="/components"
            @click="handleComponentsClick"
            class="nav-item"
            :class="{ 'nav-item-active': $route.path.startsWith('/components') }"
          >
            组件
          </router-link>
          
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

    <!-- 移动端菜单组件 -->
    <MobileMenu 
      :is-visible="showMobileMenu"
      @close="closeMobileMenu"
    />
  </nav>
</template>

<script>
import { ref } from 'vue'
import MobileMenu from './MobileMenu.vue'

export default {
  name: 'NavHeader',
  components: {
    MobileMenu
  },
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
      if (this.$route.path === '/components') {
        // 如果已经在组件页面，只需要滚动到顶部并重置页面
        window.scrollTo({ top: 0, behavior: 'smooth' })
        window.dispatchEvent(new CustomEvent('reset-components-page'))
        // 阻止路由跳转
        event.preventDefault()
      }
    }
  }
}
</script>

<style scoped>
/* 桌面端导航项 */
.nav-item {
  @apply relative text-[#6e7074] font-medium text-sm tracking-wide 
         hover:text-[#2f4554] transition-all duration-300 no-underline
         after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 
         after:bg-[#c23531] after:transition-all after:duration-300
         hover:after:w-full;
}

.nav-item-active {
  @apply text-[#2f4554] font-semibold after:w-full;
}
</style> 