<template>
  <div class="min-h-screen bg-white">
    <!-- 导航栏 -->
    <NavHeader />

    <!-- 主要内容 -->
    <main class="w-full mx-auto px-4">
      <router-view />
    </main>

  </div>
</template>

<script>
import NavHeader from './components/NavHeader.vue'

export default {
  name: 'App',
  components: {
    NavHeader
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