import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/homePage/HomePage.vue'
import DesignPage from '../components/Designpage/DesignPage.vue'
import ComponentsPage from '../components/ComponentsPage/ComponentsPage.vue'

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
  history: createWebHistory(),
  routes
})

export default router 