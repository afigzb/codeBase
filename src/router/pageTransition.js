// 页面切换动画管理器
class PageTransitionManager {
  constructor() {
    this.isTransitioning = false
    this.listeners = []
    this.transitionDuration = 600 // 动画显示时间
    this.hideDuration = 300 // 动画隐藏延迟
  }

  // 添加状态变化监听器
  onStateChange(callback) {
    this.listeners.push(callback)
  }

  // 通知所有监听器状态变化
  notifyListeners(visible) {
    this.listeners.forEach(callback => callback(visible))
  }

  // 显示动画
  show() {
    if (this.isTransitioning) return
    
    this.isTransitioning = true
    this.notifyListeners(true)
  }

  // 隐藏动画
  hide() {
    this.isTransitioning = false
    this.notifyListeners(false)
  }

  // 执行完整的动画流程
  async executeTransition() {
    return new Promise((resolve) => {
      this.show()
      setTimeout(() => {
        this.hide()
        resolve()
      }, this.transitionDuration)
    })
  }
}

// 创建全局实例
export const pageTransitionManager = new PageTransitionManager()

// 设置路由守卫的函数
export function setupPageTransition(router) {
  let isFirstRoute = true
  let pendingNavigation = null

  router.beforeEach((to, from, next) => {
    // 第一次加载不显示动画
    if (isFirstRoute) {
      isFirstRoute = false
      next()
      return
    }

    // 如果是相同路由，不显示动画
    if (to.path === from.path) {
      next()
      return
    }

    // 如果已经有待处理的导航，取消它
    if (pendingNavigation) {
      clearTimeout(pendingNavigation)
    }

    // 显示动画
    pageTransitionManager.show()
    
    // 延迟导航，让动画先覆盖页面
    pendingNavigation = setTimeout(() => {
      pendingNavigation = null
      next()
    }, 350) // 让动画先播放350ms，确保覆盖效果
  })

  router.afterEach(() => {
    // 路由完成后，滚动到顶部并延迟隐藏动画
    if (!isFirstRoute && pageTransitionManager.isTransitioning) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      // 等待页面渲染完成后隐藏动画
      setTimeout(() => {
        pageTransitionManager.hide()
      }, 200)
    }
  })
}

// 手动触发动画的工具函数（可选）
export function navigateWithTransition(router, to) {
  return router.push(to)
} 