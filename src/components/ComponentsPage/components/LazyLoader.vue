<template>
  <div 
    ref="container" 
    :class="containerClass"
    :style="containerStyle"
  >
    <!-- 加载状态：显示占位符 -->
    <div v-if="!isLoaded" class="lazy-placeholder">
      <slot name="placeholder" :isIntersecting="isIntersecting">
        <!-- 默认占位符 -->
        <div class="default-placeholder">
          <div class="flex items-center justify-center h-full">
            <div class="text-center text-[#6e7074]">
              <div class="w-10 h-10 sm:w-14 sm:h-14 bg-[#f8f9fa] rounded-lg mx-auto mb-3 sm:mb-4 border border-[#e8eaed] flex items-center justify-center">
                <div v-if="isIntersecting" class="animate-spin w-4 h-4 border-2 border-[#c23531] border-t-transparent rounded-full"></div>
                <span v-else class="text-lg sm:text-xl">{{ placeholderIcon }}</span>
              </div>
              <p class="text-sm sm:text-base font-medium">{{ placeholderTitle }}</p>
              <p class="text-xs sm:text-sm text-[#9ca3af]">
                {{ isIntersecting ? '正在加载...' : placeholderDescription }}
              </p>
            </div>
          </div>
        </div>
      </slot>
    </div>

    <!-- 已加载：显示实际内容 -->
    <div v-if="isLoaded" class="lazy-content">
      <slot :isLoaded="isLoaded" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LazyLoader',
  props: {
    // 占位符配置
    placeholderIcon: {
      type: String,
      default: '📦'
    },
    placeholderTitle: {
      type: String,
      default: '内容加载中'
    },
    placeholderDescription: {
      type: String,
      default: '滚动到此处开始加载'
    },
    
    // 容器样式
    containerClass: {
      type: String,
      default: ''
    },
    containerStyle: {
      type: Object,
      default: () => ({})
    },
    
    // Intersection Observer 配置
    rootMargin: {
      type: String,
      default: '100px' // 提前100px开始加载
    },
    threshold: {
      type: Number,
      default: 0.1
    },
    
    // 加载延迟（毫秒）
    loadDelay: {
      type: Number,
      default: 200
    },
    
    // 是否只加载一次
    once: {
      type: Boolean,
      default: true
    },
    
    // 最小占位符显示时间（毫秒）
    minPlaceholderTime: {
      type: Number,
      default: 300
    }
  },
  emits: ['load', 'loaded', 'intersect'],
  data() {
    return {
      isIntersecting: false,
      isLoaded: false,
      observer: null,
      loadTimer: null,
      startTime: null
    }
  },
  mounted() {
    this.initIntersectionObserver()
  },
  beforeUnmount() {
    this.cleanup()
  },
  methods: {
    /**
     * 初始化 Intersection Observer
     */
    initIntersectionObserver() {
      if (!('IntersectionObserver' in window)) {
        // 不支持 IntersectionObserver，直接加载
        this.handleIntersect(true)
        return
      }

      this.observer = new IntersectionObserver(
        this.handleIntersectionChange,
        {
          rootMargin: this.rootMargin,
          threshold: this.threshold
        }
      )

      this.observer.observe(this.$refs.container)
    },

    /**
     * 处理交叉观察变化
     */
    handleIntersectionChange(entries) {
      const entry = entries[0]
      const isIntersecting = entry.isIntersecting

      this.isIntersecting = isIntersecting
      this.$emit('intersect', isIntersecting)

      if (isIntersecting && !this.isLoaded) {
        this.handleIntersect()
      }
    },

    /**
     * 处理元素进入视口
     */
    handleIntersect() {
      if (this.isLoaded) return

      this.startTime = Date.now()
      
      // 延迟加载
      this.loadTimer = setTimeout(() => {
        this.startLoading()
      }, this.loadDelay)
    },

    /**
     * 开始加载内容
     */
    async startLoading() {
      this.$emit('load')

      try {
        // 确保最小占位符显示时间
        const elapsed = Date.now() - this.startTime
        const remainingTime = Math.max(0, this.minPlaceholderTime - elapsed)
        
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime))
        }

        // 在下一个事件循环中设置加载完成
        await this.$nextTick()
        
        this.isLoaded = true
        this.$emit('loaded')

        // 如果只加载一次，停止观察
        if (this.once && this.observer) {
          this.observer.unobserve(this.$refs.container)
        }
      } catch (error) {
        console.error('懒加载内容失败:', error)
        this.$emit('loaded', error)
      }
    },

    /**
     * 手动触发加载
     */
    forceLoad() {
      if (!this.isLoaded) {
        this.handleIntersect()
      }
    },

    /**
     * 重置加载状态
     */
    reset() {
      this.isLoaded = false
      this.isIntersecting = false
      this.cleanup()
      this.$nextTick(() => {
        this.initIntersectionObserver()
      })
    },

    /**
     * 清理资源
     */
    cleanup() {
      if (this.observer) {
        this.observer.disconnect()
        this.observer = null
      }
      
      if (this.loadTimer) {
        clearTimeout(this.loadTimer)
        this.loadTimer = null
      }
    }
  }
}
</script>

<style scoped>
.lazy-placeholder,
.lazy-content {
  min-height: inherit;
}

.default-placeholder {
  min-height: 200px;
}

/* 加载动画 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* 平滑过渡 */
.lazy-content {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 