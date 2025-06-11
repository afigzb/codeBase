<template>
  <div class="component-detail">
    <!-- 正常数据展示 -->
    <template v-if="componentData">
      <!-- 1. 功能说明 -->
      <div class="function-description bg-[#ffffff] rounded-xl border border-[#c4c9d0] overflow-hidden mb-6 sm:mb-8 shadow-sm">
        <!-- 顶部图片展示区域 -->
        <div class="relative h-60 sm:h-72 md:h-80 bg-gradient-to-br from-[#f8f9fa] to-[#e8eaed] flex items-center justify-center overflow-hidden group">
          <!-- 返回按钮 - 左上角 -->
          <button
            @click="$emit('back')"
            class="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 flex items-center text-[#6e7074] hover:text-[#c23531] transition-colors duration-200 group bg-[#ffffff]/90 backdrop-blur-sm px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg shadow-sm hover:shadow-md border border-[#e8eaed]/50"
          >
            <svg class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 group-hover:text-[#ca8622] transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="text-xs sm:text-sm font-medium">返回</span>
          </button>

          <!-- 装饰性背景元素 -->
          <div class="absolute inset-0">
            <!-- 几何装饰 -->
            <div class="absolute top-4 right-4 sm:top-8 sm:right-8 w-16 h-16 sm:w-24 sm:h-24 bg-[#c23531]/8 rounded-full blur-xl group-hover:bg-[#ca8622]/12 transition-all duration-700"></div>
            <div class="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 bg-[#d48265]/8 rounded-full blur-lg group-hover:bg-[#c23531]/12 transition-all duration-700"></div>
          </div>
          
          <!-- 主图片内容 -->
          <div class="relative z-20 flex items-center justify-center">
            <div v-if="componentData.icon" 
                 class="bg-[#ffffff] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-[#e8eaed]">
              <img 
                :src="componentData.icon" 
                :alt="componentData.title"
                class="h-20 sm:h-28 md:h-32 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div v-else class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#ffffff] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm border border-[#e8eaed]">
              <span class="text-2xl sm:text-3xl md:text-4xl">📦</span>
            </div>
          </div>

        </div>
        
        <!-- 内容区域 -->
        <div class="p-4 sm:p-6 md:p-8">
          <!-- 标题和描述 -->
          <div class="text-center mb-6 sm:mb-8">
            <h1 class="text-2xl sm:text-3xl font-bold text-[#2f4554] mb-3 sm:mb-4">{{ componentData.title }}</h1>
            <p class="text-base sm:text-lg text-[#6e7074] max-w-2xl sm:max-w-3xl mx-auto leading-relaxed">
              {{ componentData.description }}
            </p>
          </div>
          
          <!-- 核心功能 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" v-if="componentData.features">
            <div 
              v-for="feature in componentData.features" 
              :key="feature.title"
              class="bg-[#f8f9fa] rounded-lg p-4 sm:p-5 hover:bg-[#f5f6f7] transition-colors duration-200 border border-[#e8eaed] group"
            >
              <div class="flex items-start space-x-3 sm:space-x-4">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-[#ffffff] rounded-lg flex items-center justify-center shadow-sm border border-[#c4c9d0] flex-shrink-0">
                  <span class="text-base sm:text-lg group-hover:scale-105 transition-transform duration-200">{{ feature.icon }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-[#2f4554] mb-1 sm:mb-2 text-sm sm:text-base">{{ feature.title }}</h3>
                  <p class="text-xs sm:text-sm text-[#6e7074] leading-relaxed">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 实现方式 -->
      <div class="implementation bg-[#ffffff] rounded-xl border border-[#c4c9d0] p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm" v-if="componentData.implementation">
        <h2 class="text-xl sm:text-2xl font-bold text-[#2f4554] mb-4 sm:mb-6">实现方式</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div 
            v-for="impl in componentData.implementation" 
            :key="impl.title"
            class="text-center group"
          >
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-[#c23531]/8 rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-[#ca8622]/15 transition-colors duration-200">
              <span class="text-base sm:text-lg group-hover:scale-105 transition-transform duration-200">{{ impl.icon }}</span>
            </div>
            <h3 class="font-semibold text-[#2f4554] mb-1 sm:mb-2 text-sm sm:text-base">{{ impl.title }}</h3>
            <p class="text-xs sm:text-sm text-[#6e7074]">{{ impl.description }}</p>
          </div>
        </div>
      </div>

      <!-- 3. 具体展示 -->
      <div class="demonstrations mb-6 sm:mb-8" v-if="componentData.demonstrations">
        <h2 class="text-xl sm:text-2xl font-bold text-[#2f4554] mb-4 sm:mb-6">具体展示</h2>
        
        <!-- 展示项目列表 -->
        <div class="space-y-6 sm:space-y-8">
          <lazy-loader
            v-for="(demo, index) in componentData.demonstrations" 
            :key="demo.id"
            :placeholder-icon="demo.icon"
            :placeholder-title="demo.title"
            :placeholder-description="`${demo.title} 演示加载中...`"
            container-class="demo-item"
            :load-delay="index * 100"
            :min-placeholder-time="200"
            @load="handleDemoLoad(demo)"
            @loaded="handleDemoLoaded(demo)"
          >
            <!-- 自定义占位符 -->
            <template #placeholder="{ isIntersecting }">
              <div :class="[
                'flex flex-col lg:flex-row lg:items-center',
                demo.side === 'right' ? 'lg:flex-row-reverse' : '',
                'space-y-4 lg:space-y-0 lg:space-x-6',
                demo.side === 'right' ? 'lg:space-x-reverse' : ''
              ]">
                <div class="demo-description flex-1 order-2 lg:order-1">
                  <h3 class="text-lg sm:text-xl font-semibold text-[#2f4554] mb-2 sm:mb-3">{{ demo.title }}</h3>
                  <p class="text-sm sm:text-base text-[#6e7074] mb-3 sm:mb-4">{{ demo.description }}</p>
                  <div class="space-y-1">
                    <div class="h-3 bg-[#f0f0f0] rounded animate-pulse"></div>
                    <div class="h-3 bg-[#f0f0f0] rounded animate-pulse w-4/5"></div>
                    <div class="h-3 bg-[#f0f0f0] rounded animate-pulse w-3/5"></div>
                  </div>
                </div>
                <div class="demo-preview flex-1 order-1 lg:order-2">
                  <div class="preview-area bg-[#f8f9fa] border-2 border-dashed border-[#c4c9d0] rounded-lg h-48 sm:h-56 md:h-64 flex items-center justify-center">
                    <div class="text-center text-[#6e7074]">
                      <div class="w-10 h-10 sm:w-14 sm:h-14 bg-[#c23531]/8 rounded-lg mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                        <div v-if="isIntersecting" class="animate-spin w-4 h-4 border-2 border-[#c23531] border-t-transparent rounded-full"></div>
                        <span v-else class="text-lg sm:text-xl">{{ demo.icon }}</span>
                      </div>
                      <p class="font-medium text-sm sm:text-base">{{ demo.title }}</p>
                      <p class="text-xs sm:text-sm">
                        {{ isIntersecting ? '正在加载演示...' : '滚动到此处开始加载' }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- 实际内容 -->
            <template #default="{ isLoaded }">
              <div :class="[
                'flex flex-col lg:flex-row lg:items-center',
                demo.side === 'right' ? 'lg:flex-row-reverse' : '',
                'space-y-4 lg:space-y-0 lg:space-x-6',
                demo.side === 'right' ? 'lg:space-x-reverse' : ''
              ]">
                <div class="demo-description flex-1 order-2 lg:order-1">
                  <h3 class="text-lg sm:text-xl font-semibold text-[#2f4554] mb-2 sm:mb-3">{{ demo.title }}</h3>
                  <p class="text-sm sm:text-base text-[#6e7074] mb-3 sm:mb-4">{{ demo.description }}</p>
                  <ul class="text-xs sm:text-sm text-[#9ca3af] space-y-1" v-if="demo.features">
                    <li v-for="feature in demo.features" :key="feature" class="flex items-center">
                      <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#ca8622] rounded-full mr-2 flex-shrink-0"></span>
                      {{ feature }}
                    </li>
                  </ul>
                </div>
                <div class="demo-preview flex-1 order-1 lg:order-2">
                  <!-- 使用CodePreview组件展示HTML内容 -->
                  <div 
                    v-if="ContentLoader.getContent(demo) && isLoaded" 
                    class="preview-area overflow-hidden rounded-lg border border-[#e8eaed]"
                    :ref="`demo-preview-${demo.id}`"
                    style="height: 300px; min-height: 250px;"
                  >
                    <!-- CodePreview组件会在loaded事件中初始化 -->
                  </div>
                  <!-- 加载失败占位符 -->
                  <div v-else class="preview-area bg-[#f8f9fa] border-2 border-dashed border-[#c4c9d0] rounded-lg h-48 sm:h-56 md:h-64 flex items-center justify-center">
                    <div class="text-center text-[#6e7074]">
                      <div class="w-10 h-10 sm:w-14 sm:h-14 bg-[#c23531]/8 rounded-lg mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                        <span class="text-lg sm:text-xl">⚠️</span>
                      </div>
                      <p class="font-medium text-sm sm:text-base">{{ demo.title }}</p>
                      <p class="text-xs sm:text-sm">内容加载失败</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </lazy-loader>
        </div>
      </div>

      <!-- 4. 编辑区域 -->
      <div class="editor-section bg-[#ffffff] rounded-xl border border-[#c4c9d0] p-4 sm:p-6 shadow-sm">
        <h2 class="text-xl sm:text-2xl font-bold text-[#2f4554] mb-4 sm:mb-6">在线体验</h2>
        <p class="text-sm sm:text-base text-[#6e7074] mb-4 sm:mb-6">
          {{ componentData.onlineExperience?.description || '该组件暂时没有可用的在线体验。' }}
        </p>
        
        <!-- 在线体验组件 - 统一使用CodeEditorPreview -->
        <div class="online-experience-container">
          <code-editor-preview 
            v-if="componentData.onlineExperience"
            width="100%"
            theme="prism"
            language="html"
            editable="true"
            auto-preview="true"
            show-toolbar="true"
            debounce-delay="300"
            :instructions="componentData.onlineExperience.instructions || ''"
            :default-code="componentData.onlineExperience.htmlContent || ''"
            :default-code-path="componentData.onlineExperience.htmlPath || ''"
          />
          <div v-else class="flex items-center justify-center h-48 sm:h-56 md:h-64 text-[#6e7074]">
            <div class="text-center">
              <div class="w-10 h-10 sm:w-14 sm:h-14 bg-[#f8f9fa] rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-[#e8eaed]">
                <span class="text-lg sm:text-xl">📦</span>
              </div>
              <p class="text-sm sm:text-base">正在加载在线体验...</p>
            </div>
          </div>
        </div>
        
        <!-- 使用提示 -->
        <div class="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" v-if="componentData.usageTips">
          <div 
            v-for="tip in componentData.usageTips" 
            :key="tip.title"
            class="bg-[#f8f9fa] rounded-lg p-3 sm:p-4 border border-[#e8eaed] hover:bg-[#f5f6f7] transition-colors duration-200"
          >
            <h4 class="font-medium text-[#2f4554] mb-1 sm:mb-2 text-sm sm:text-base">{{ tip.title }}</h4>
            <p class="text-xs sm:text-sm text-[#6e7074]">{{ tip.content }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { getComponentData } from './B_Data/index.js';
import { ContentLoader } from './CodeEditorPreview/Utils/ContentLoader.js';
import LazyLoader from './components/LazyLoader.vue';

// 动态导入CodePreview组件
let CodePreview = null;
import('./CodeEditorPreview/CodePreview/CodePreview.js').then(module => {
  CodePreview = module.CodePreview;
}).catch(error => {
  console.warn('CodePreview组件加载失败:', error);
});

// 导入CodeEditorPreview Web Component
import('./CodeEditorPreview/CodeEditorPreview.js').catch(error => {
  console.warn('CodeEditorPreview组件加载失败:', error);
});

export default {
  name: 'ComponentDetail',
  components: {
    LazyLoader
  },
  props: {
    component: {
      type: Object,
      required: true
    }
  },
  emits: ['back'],
  data() {
    return {
      componentData: null,
      previewInstances: {}, // 存储CodePreview实例
      loadedDemos: new Set(), // 跟踪已加载的demo
      ContentLoader // 暴露给模板使用
    };
  },
  async mounted() {
    await this.loadComponentData();
  },
  beforeUnmount() {
    this.destroyPreviewComponents();
  },
  watch: {
    'component.id': {
      async handler() {
        await this.loadComponentData();
        // 重置加载状态
        this.loadedDemos.clear();
        this.destroyPreviewComponents();
      },
      immediate: false
    }
  },
  methods: {
    async loadComponentData() {
      const componentId = this.component?.id || 'code-editor-preview';
      this.componentData = await getComponentData(componentId);
    },

    // 初始化预览组件
    async initializePreviewComponents() {
      if (!this.componentData?.demonstrations || !CodePreview) {
        return;
      }

      // 清理现有实例
      this.destroyPreviewComponents();

      // 为每个demonstration创建CodePreview实例
      for (const demo of this.componentData.demonstrations) {
        const content = ContentLoader.getContent(demo);
        if (content) {
          const refName = `demo-preview-${demo.id}`;
          const container = this.$refs[refName];
          
          if (container && container[0]) {
            // 加载实际内容
            const loadedContent = await ContentLoader.loadContent(content);
            const previewInstance = await CodePreview.create(
              container[0], 
              loadedContent,
              {
                width: '100%',
                height: '300px'
              }
            );
            
            this.previewInstances[demo.id] = previewInstance;
          }
        }
      }
    },

    // 销毁预览组件
    destroyPreviewComponents() {
      Object.values(this.previewInstances).forEach(instance => {
        if (instance && typeof instance.destroy === 'function') {
          instance.destroy();
        }
      });
      this.previewInstances = {};
    },

    /**
     * 处理演示开始加载
     */
    handleDemoLoad(demo) {
      console.log(`开始加载演示: ${demo.title}`);
    },

    /**
     * 处理演示加载完成
     */
    async handleDemoLoaded(demo) {
      if (this.loadedDemos.has(demo.id)) {
        return; // 避免重复加载
      }

      this.loadedDemos.add(demo.id);
      console.log(`演示加载完成: ${demo.title}`);

      // 等待DOM更新后初始化CodePreview
      await this.$nextTick();
      
      // 为这个特定的demo初始化CodePreview
      await this.initializeSingleDemo(demo);
    },

    /**
     * 初始化单个演示的CodePreview
     */
    async initializeSingleDemo(demo) {
      if (!CodePreview) {
        console.warn('CodePreview组件未加载');
        return;
      }

      const content = ContentLoader.getContent(demo);
      if (!content) {
        console.warn(`无法获取演示内容: ${demo.id}`);
        return;
      }

      const refName = `demo-preview-${demo.id}`;
      const container = this.$refs[refName];
      
      if (container && container[0]) {
        try {
          // 加载实际内容
          const loadedContent = await ContentLoader.loadContent(content);
          const previewInstance = await CodePreview.create(
            container[0], 
            loadedContent,
            {
              width: '100%',
              height: '300px'
            }
          );
          
          this.previewInstances[demo.id] = previewInstance;
          console.log(`CodePreview实例创建成功: ${demo.title}`);
        } catch (error) {
          console.error(`初始化演示失败: ${demo.title}`, error);
        }
      } else {
        console.warn(`找不到容器元素: ${refName}`);
      }
    }
  }
}
</script>

<style scoped>
.component-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
}

.demo-item {
  padding: 1rem;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #c4c9d0;
  box-shadow: 0 1px 3px 0 rgba(194, 53, 49, 0.04);
}

@media (min-width: 640px) {
  .demo-item {
    padding: 1.5rem;
  }
}

.preview-area {
  transition: all 0.2s ease;
}

/* 在线体验容器样式 */
.online-experience-container {
  border: 1px solid #c4c9d0;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
  min-height: 400px;
}

@media (min-width: 640px) {
  .online-experience-container {
    min-height: 500px;
  }
}

/* 骨架屏动画 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

</style> 