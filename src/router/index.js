import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../components/homePage/HomePage.vue'
import DesignPage from '../components/Designpage/DesignPage.vue'
import ComponentsPage from '../components/ComponentsPage/ComponentsPage.vue'
import { setupPageTransition } from './pageTransition'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/design',
    name: 'Design',
    component: DesignPage
  },
  {
    path: '/components',
    name: 'Components',
    component: ComponentsPage
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 设置页面切换动画
setupPageTransition(router)

export default router 