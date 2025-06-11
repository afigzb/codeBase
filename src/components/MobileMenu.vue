<template>
  <!-- 移动端下拉菜单 -->
  <transition name="mobile-menu">
    <div v-if="isVisible" class="md:hidden bg-white border-t border-[#e8eaed]">
      <div class="px-4 py-4 space-y-3">
        <router-link
          to="/design"
          @click="closeMenu"
          class="mobile-nav-item"
          :class="{ 'mobile-nav-item-active': $route.path === '/design' }"
        >
          设计
        </router-link>
        <router-link
          to="/components"
          @click="closeMenu"
          class="mobile-nav-item"
          :class="{ 'mobile-nav-item-active': $route.path.startsWith('/components') }"
        >
          组件
        </router-link>
        <a
          href="https://blog.csdn.net/sahjiwij?spm=1000.2115.3001.10640"
          target="_blank"
          @click="closeMenu"
          class="mobile-nav-item"
        >
          博客
        </a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MobileMenu',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  methods: {
    closeMenu() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
/* 移动端导航项 */
.mobile-nav-item {
  @apply block py-3 px-4 text-[#6e7074] font-medium text-base
         border-l-4 border-transparent
         hover:text-[#2f4554] hover:bg-[#f5f6f7] hover:border-[#e8eaed]
         transition-all duration-200 no-underline;
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