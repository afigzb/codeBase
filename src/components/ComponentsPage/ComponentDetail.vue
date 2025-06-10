<template>
  <div class="component-detail">
    <!-- 正常数据展示 -->
    <template v-if="componentData">
      <!-- 1. 功能说明 -->
      <div class="function-description bg-[#ffffff] rounded-xl border border-[#c4c9d0] overflow-hidden mb-8 shadow-sm">
        <!-- 顶部图片展示区域 -->
        <div class="relative h-80 bg-gradient-to-br from-[#f8f9fa] to-[#e8eaed] flex items-center justify-center overflow-hidden group">
          <!-- 返回按钮 - 左上角 -->
          <button
            @click="$emit('back')"
            class="absolute top-6 left-6 z-30 flex items-center text-[#6e7074] hover:text-[#c23531] transition-colors duration-200 group bg-[#ffffff]/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm hover:shadow-md border border-[#e8eaed]/50"
          >
            <svg class="h-4 w-4 mr-2 group-hover:text-[#ca8622] transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="text-sm font-medium">返回</span>
          </button>

          <!-- 装饰性背景元素 -->
          <div class="absolute inset-0">
            <!-- 几何装饰 -->
            <div class="absolute top-8 right-8 w-24 h-24 bg-[#c23531]/8 rounded-full blur-xl group-hover:bg-[#ca8622]/12 transition-all duration-700"></div>
            <div class="absolute bottom-8 left-8 w-16 h-16 bg-[#d48265]/8 rounded-full blur-lg group-hover:bg-[#c23531]/12 transition-all duration-700"></div>
          </div>
          
          <!-- 主图片内容 -->
          <div class="relative z-20 flex items-center justify-center">
            <div v-if="componentData.icon" 
                 class="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-[#e8eaed]">
              <img 
                :src="componentData.icon" 
                :alt="componentData.title"
                class="h-32 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div v-else class="w-24 h-24 bg-[#ffffff] rounded-2xl flex items-center justify-center shadow-sm border border-[#e8eaed]">
              <span class="text-4xl">📦</span>
            </div>
          </div>

        </div>
        
        <!-- 内容区域 -->
        <div class="p-8">
          <!-- 标题和描述 -->
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-[#2f4554] mb-4">{{ componentData.title }}</h1>
            <p class="text-lg text-[#6e7074] max-w-3xl mx-auto leading-relaxed">
              {{ componentData.description }}
            </p>
          </div>
          
          <!-- 核心功能 -->
          <div class="grid grid-cols-2 gap-6" v-if="componentData.features">
            <div 
              v-for="feature in componentData.features" 
              :key="feature.title"
              class="bg-[#f8f9fa] rounded-lg p-5 hover:bg-[#f5f6f7] transition-colors duration-200 border border-[#e8eaed] group"
            >
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 bg-[#ffffff] rounded-lg flex items-center justify-center shadow-sm border border-[#c4c9d0]">
                  <span class="text-lg group-hover:scale-105 transition-transform duration-200">{{ feature.icon }}</span>
                </div>
                <div>
                  <h3 class="font-semibold text-[#2f4554] mb-2">{{ feature.title }}</h3>
                  <p class="text-sm text-[#6e7074] leading-relaxed">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 实现方式 -->
      <div class="implementation bg-[#ffffff] rounded-xl border border-[#c4c9d0] p-6 mb-8 shadow-sm" v-if="componentData.implementation">
        <h2 class="text-2xl font-bold text-[#2f4554] mb-6">实现方式</h2>
        
        <div class="grid grid-cols-3 gap-6">
          <div 
            v-for="impl in componentData.implementation" 
            :key="impl.title"
            class="text-center group"
          >
            <div class="w-10 h-10 bg-[#c23531]/8 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#ca8622]/15 transition-colors duration-200">
              <span class="text-lg group-hover:scale-105 transition-transform duration-200">{{ impl.icon }}</span>
            </div>
            <h3 class="font-semibold text-[#2f4554] mb-2">{{ impl.title }}</h3>
            <p class="text-sm text-[#6e7074]">{{ impl.description }}</p>
          </div>
        </div>
      </div>

      <!-- 3. 具体展示 -->
      <div class="demonstrations mb-8" v-if="componentData.demonstrations">
        <h2 class="text-2xl font-bold text-[#2f4554] mb-6">具体展示</h2>
        
        <!-- 展示项目列表 -->
        <div class="space-y-8">
          <div 
            v-for="(demo, index) in componentData.demonstrations" 
            :key="demo.id"
            :class="[
              'demo-item flex items-center space-x-8',
              demo.side === 'right' ? 'flex-row-reverse' : ''
            ]"
          >
            <div class="demo-description flex-1 ml-4">
              <h3 class="text-xl font-semibold text-[#2f4554] mb-3">{{ demo.title }}</h3>
              <p class="text-[#6e7074] mb-4">{{ demo.description }}</p>
              <ul class="text-sm text-[#9ca3af] space-y-1" v-if="demo.features">
                <li v-for="feature in demo.features" :key="feature" class="flex items-center">
                  <span class="w-1.5 h-1.5 bg-[#ca8622] rounded-full mr-2"></span>
                  {{ feature }}
                </li>
              </ul>
            </div>
            <div class="demo-preview flex-1">
              <!-- 使用CodePreview组件展示HTML内容 -->
              <div 
                v-if="ContentLoader.getContent(demo)" 
                class="preview-area"
                :ref="`demo-preview-${demo.id}`"
                style="height: 300px;"
              >
                <!-- CodePreview组件会在mounted时初始化 -->
              </div>
              <!-- 占位符 -->
              <div v-else class="preview-area bg-[#f8f9fa] border-2 border-dashed border-[#c4c9d0] rounded-lg h-64 flex items-center justify-center">
                <div class="text-center text-[#6e7074]">
                  <div class="w-14 h-14 bg-[#c23531]/8 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span class="text-xl">{{ demo.icon }}</span>
                  </div>
                  <p class="font-medium">{{ demo.title }}</p>
                  <p class="text-sm">预览内容加载中...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. 编辑区域 -->
      <div class="editor-section bg-[#ffffff] rounded-xl border border-[#c4c9d0] p-6 shadow-sm">
        <h2 class="text-2xl font-bold text-[#2f4554] mb-6">在线体验</h2>
        <p class="text-[#6e7074] mb-6">
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
          <div v-else class="flex items-center justify-center h-64 text-[#6e7074]">
            <div class="text-center">
              <div class="w-14 h-14 bg-[#f8f9fa] rounded-lg flex items-center justify-center mx-auto mb-4 border border-[#e8eaed]">
                <span class="text-xl">📦</span>
              </div>
              <p>正在加载在线体验...</p>
            </div>
          </div>
        </div>
        
        <!-- 使用提示 -->
        <div class="mt-6 grid grid-cols-3 gap-4" v-if="componentData.usageTips">
          <div 
            v-for="tip in componentData.usageTips" 
            :key="tip.title"
            class="bg-[#f8f9fa] rounded-lg p-4 border border-[#e8eaed] hover:bg-[#f5f6f7] transition-colors duration-200"
          >
            <h4 class="font-medium text-[#2f4554] mb-2">{{ tip.title }}</h4>
            <p class="text-sm text-[#6e7074]">{{ tip.content }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { getComponentData } from './B_Data/index.js';
import { ContentLoader } from './CodeEditorPreview/Utils/ContentLoader.js';

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
      ContentLoader // 暴露给模板使用
    };
  },
  async mounted() {
    await this.loadComponentData();
    this.$nextTick(() => {
      this.initializePreviewComponents();
    });
  },
  beforeUnmount() {
    this.destroyPreviewComponents();
  },
  watch: {
    'component.id': {
      async handler() {
        await this.loadComponentData();
        this.$nextTick(() => {
          this.initializePreviewComponents();
        });
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


  }
}
</script>

<style scoped>
.component-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.demo-item {
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #c4c9d0;
  box-shadow: 0 1px 3px 0 rgba(194, 53, 49, 0.04);
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
  min-height: 500px;
}

</style> 