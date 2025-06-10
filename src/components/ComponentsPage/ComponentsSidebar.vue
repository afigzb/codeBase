<template>
  <aside class="w-80 bg-[#ffffff] border-r border-[#c4c9d0] h-full overflow-y-auto">
    <div class="p-6">
      <!-- 页面标题和搜索 -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-2xl font-bold text-[#2f4554]">组件库</h1>
            <p class="text-sm text-[#6e7074] mt-1">{{ componentCount }} 个组件</p>
          </div>
        </div>
        
        <!-- 搜索栏 -->
        <div class="relative mb-6">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-[#ca8622]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            :value="searchQuery"
            @input="$emit('update:searchQuery', $event.target.value)"
            type="text"
            class="block w-full pl-10 pr-3 py-2.5 border border-[#c4c9d0] rounded-lg text-sm leading-5 bg-[#ffffff] placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#c23531] focus:border-[#c23531] transition-colors duration-200"
            placeholder="搜索组件..."
          >
        </div>

        <!-- 视图切换 -->
        <div class="flex items-center space-x-1 p-1 bg-[#e8eaed] rounded-lg">
          <button
            @click="$emit('update:viewMode', 'grid')"
            :class="[
              'flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors',
              viewMode === 'grid' ? 'bg-[#ffffff] text-[#c23531] shadow-sm' : 'text-[#6e7074] hover:text-[#c23531]'
            ]"
          >
            <svg class="h-4 w-4 mx-auto" :class="viewMode === 'grid' ? 'text-[#ca8622]' : 'text-[#9ca3af]'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            @click="$emit('update:viewMode', 'list')"
            :class="[
              'flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors',
              viewMode === 'list' ? 'bg-[#ffffff] text-[#c23531] shadow-sm' : 'text-[#6e7074] hover:text-[#c23531]'
            ]"
          >
            <svg class="h-4 w-4 mx-auto" :class="viewMode === 'list' ? 'text-[#ca8622]' : 'text-[#9ca3af]'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 分类筛选 -->
      <div class="mb-8">
        <h3 class="text-sm font-semibold text-[#2f4554] uppercase tracking-wider mb-4">分类</h3>
        <div class="space-y-2">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="$emit('update:activeCategory', category.id)"
            :class="[
              'w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200',
              activeCategory === category.id
                ? 'bg-[#c23531] text-[#ffffff] shadow-sm'
                : 'text-[#6e7074] hover:bg-[#d48265]/10 hover:text-[#c23531]'
            ]"
          >
            <div class="flex items-center justify-between">
              <span>{{ category.name }}</span>
              <span :class="[
                'text-xs px-1.5 py-0.5 rounded-full',
                activeCategory === category.id ? 'bg-[#ffffff]/20 text-[#ffffff]' : 'bg-[#ca8622]/20 text-[#ca8622]'
              ]">{{ category.count }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- 标签筛选 -->
      <div class="mb-8 pb-6">
        <h3 class="text-sm font-semibold text-[#2f4554] uppercase tracking-wider mb-4">标签</h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="$emit('toggle-tag', tag)"
            :class="[
              'px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200',
              selectedTags.includes(tag)
                ? 'bg-[#d48265] text-[#ffffff] shadow-sm'
                : 'bg-[#e8eaed] text-[#6e7074] hover:bg-[#ca8622] hover:text-[#ffffff]'
            ]"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'ComponentsSidebar',
  props: {
    componentCount: {
      type: Number,
      required: true
    },
    searchQuery: {
      type: String,
      default: ''
    },
    viewMode: {
      type: String,
      default: 'grid'
    },
    activeCategory: {
      type: String,
      default: 'all'
    },
    selectedTags: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      required: true
    },
    allTags: {
      type: Array,
      required: true
    }
  },
  emits: ['update:searchQuery', 'update:viewMode', 'update:activeCategory', 'toggle-tag']
}
</script>

<style scoped>
/* 侧边栏阴影 */
aside {
  box-shadow: 2px 0 8px -2px rgba(194, 53, 49, 0.08);
}

/* 自定义滚动条样式 */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background: #c4c9d0;
  border-radius: 2px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* 视图切换按钮动画 */
.transition-all {
  transition: all 0.2s ease;
}
</style> 