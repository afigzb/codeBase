<template>
  <div class="min-h-screen bg-white">
    <!-- 导航栏 -->
    <NavHeader />

    <!-- 主要内容 -->
    <main class="w-full mx-auto px-4">
      <router-view />
    </main>

    <!-- 页面切换动画 -->
    <PageTransition />
  </div>
</template>

<script>
import NavHeader from './components/NavHeader.vue'
import PageTransition from './components/PageTransition.vue'

export default {
  name: 'App',
  components: {
    NavHeader,
    PageTransition
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style> 