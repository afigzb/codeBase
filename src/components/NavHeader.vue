<template>
  <!-- 导航栏 -->
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[#ffffff] border-b border-[#c4c9d0] shadow-sm">
    <div class="w-full px-4">
      <div class="flex justify-between items-center h-16">
        <router-link to="/" class="text-[#2f4554] font-bold text-lg">
          <span>asuka</span>
        </router-link>
        
        <!-- 导航链接 -->
        <div class="flex items-center space-x-8">
          <router-link 
            to="/design" 
            class="text-[#6e7074] hover:text-[#c23531] transition-colors duration-200" 
            :class="{ 'text-[#c23531] font-medium': $route.path === '/design' }"
          >
            设计
          </router-link>
          <a
            @click="handleComponentsClick"
            class="text-[#6e7074] hover:text-[#c23531] transition-colors duration-200 cursor-pointer" 
            :class="{ 'text-[#c23531] font-medium': $route.path.startsWith('/components') }"
          >
            组件
          </a>
          <a
            href="https://blog.csdn.net/sahjiwij?spm=1000.2115.3001.10640"
            target="_blank"
            class="text-[#6e7074] hover:text-[#c23531] transition-colors duration-200"
          >
            博客
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavHeader',
  methods: {
    handleComponentsClick() {
      // 如果已经在组件页面，派发一个全局事件来重置状态
      if (this.$route.path === '/components') {
        // 使用window对象派发自定义事件
        window.dispatchEvent(new CustomEvent('reset-components-page'))
      } else {
        // 正常导航到组件页面
        this.$router.push('/components')
      }
    }
  }
}
</script> 