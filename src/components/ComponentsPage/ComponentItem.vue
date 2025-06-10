<template>
  <div
    :class="[
      'bg-[#ffffff] border border-[#c4c9d0] hover:border-[#c23531] hover:shadow-lg cursor-pointer transition-all duration-200 group',
      layout === 'grid' ? 'rounded-xl' : 'rounded-xl',
      layout === 'list' ? 'flex items-center p-6' : ''
    ]"
    @click="$emit('select-component', component)"
  >
    <!-- 网格布局 -->
    <template v-if="layout === 'grid'">
      <!-- 图片区域 -->
      <div class="relative h-48 bg-gradient-to-br from-[#f8f9fa] to-[#e8eaed] rounded-t-xl flex items-center justify-center p-8 border-b border-[#e8eaed] overflow-hidden group-hover:from-[#c23531]/5 group-hover:to-[#d48265]/5 transition-all duration-300">
        <!-- 装饰性背景图案 -->
        <div class="absolute inset-0 opacity-20">
          <div class="absolute top-4 right-4 w-12 h-12 bg-[#c23531]/15 rounded-full blur-lg group-hover:bg-[#ca8622]/25 transition-all duration-300"></div>
          <div class="absolute bottom-4 left-4 w-8 h-8 bg-[#d48265]/15 rounded-full blur-md group-hover:bg-[#c23531]/25 transition-all duration-300"></div>
        </div>
        
        <!-- 图片内容 -->
        <div class="relative z-10 flex items-center justify-center">
          <div v-if="component.icon" 
               class="bg-[#ffffff] rounded-xl p-4 shadow-sm group-hover:shadow-md transition-all duration-300 border border-[#e8eaed]">
            <img 
              :src="component.icon" 
              :alt="component.name"
              class="h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div v-else class="w-16 h-16 bg-[#ffffff] rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 border border-[#e8eaed]">
            <span class="text-2xl">📦</span>
          </div>
        </div>
        
        <!-- 光效装饰 -->
        <div class="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#ffffff]/10 pointer-events-none group-hover:to-[#ca8622]/5 transition-all duration-300"></div>
      </div>
      
      <!-- 信息区域 -->
      <div class="p-5">
        <!-- 标题和分类 -->
        <div class="flex items-start justify-between mb-3 gap-2">
          <h3 class="text-lg font-semibold text-[#2f4554] group-hover:text-[#c23531] transition-colors duration-200 flex-1 min-w-0 truncate">
            {{ component.name }}
          </h3>
          <span class="text-xs bg-gradient-to-r from-[#c23531] to-[#d48265] text-[#ffffff] px-2 py-1 rounded-full font-medium whitespace-nowrap flex-shrink-0 shadow-sm">
            {{ component.categoryName || component.category }}
          </span>
        </div>
        
        <!-- 描述 -->
        <p class="text-sm text-[#6e7074] mb-4 line-clamp-3 leading-relaxed group-hover:text-[#546570] transition-colors duration-200">
          {{ component.description }}
        </p>
        
        <!-- 标签 -->
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in component.tags.slice(0, 3)"
            :key="tag"
            class="text-xs bg-[#e8eaed] text-[#6e7074] px-2 py-1 rounded-md group-hover:bg-[#ca8622]/10 group-hover:text-[#ca8622] transition-all duration-200"
          >
            {{ tag }}
          </span>
          <span
            v-if="component.tags.length > 3"
            class="text-xs bg-[#d48265] text-[#ffffff] px-2 py-1 rounded-md shadow-sm"
          >
            +{{ component.tags.length - 3 }}
          </span>
        </div>
      </div>
    </template>

    <!-- 列表布局 -->
    <template v-else>
      <!-- 组件图片 -->
      <div class="w-24 h-24 rounded-xl bg-gradient-to-br from-[#f8f9fa] to-[#e8eaed] flex items-center justify-center flex-shrink-0 mr-6 overflow-hidden group-hover:shadow-md transition-all duration-200 border border-[#c4c9d0] group-hover:from-[#c23531]/5 group-hover:to-[#d48265]/5">
        <img 
          v-if="component.icon" 
          :src="component.icon" 
          :alt="component.name"
          class="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
        />
        <div v-else class="w-16 h-16 bg-[#c23531]/10 rounded-xl flex items-center justify-center">
          <span class="text-2xl">📦</span>
        </div>
      </div>

      <!-- 组件信息 -->
      <div class="flex-1 min-w-0">
        <div class="mb-3">
          <div class="flex items-center mb-2 gap-3">
            <h3 class="text-xl font-semibold text-[#2f4554] group-hover:text-[#c23531] transition-colors duration-200 flex-1 min-w-0 truncate">
              {{ component.name }}
            </h3>
            <span class="inline-flex items-center px-3 py-1 bg-gradient-to-r from-[#c23531] to-[#d48265] text-[#ffffff] text-xs font-medium rounded-full flex-shrink-0 shadow-sm">
              {{ component.categoryName || component.category }}
            </span>
          </div>
          <p class="text-[#6e7074] leading-relaxed group-hover:text-[#546570] transition-colors duration-200">{{ component.description }}</p>
        </div>
        
        <!-- 标签 -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in component.tags.slice(0, 6)"
            :key="tag"
            class="px-3 py-1 bg-[#e8eaed] text-[#6e7074] text-sm rounded-md hover:bg-[#ca8622] hover:text-[#ffffff] transition-all duration-200"
          >
            {{ tag }}
          </span>
          <span
            v-if="component.tags.length > 6"
            class="px-3 py-1 bg-[#d48265] text-[#ffffff] text-sm rounded-md shadow-sm"
          >
            +{{ component.tags.length - 6 }}
          </span>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex items-center ml-4">
        <div class="w-10 h-10 rounded-lg bg-[#c23531]/10 flex items-center justify-center text-[#c23531] group-hover:bg-[#c23531] group-hover:text-[#ffffff] transition-all duration-200">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ComponentItem',
  props: {
    component: {
      type: Object,
      required: true
    },
    layout: {
      type: String,
      default: 'grid',
      validator: value => ['grid', 'list'].includes(value)
    }
  },
  emits: ['select-component']
}
</script>

<style scoped>
/* 文本截断 */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 