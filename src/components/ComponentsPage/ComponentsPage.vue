<template>
  <div class="pt-16 h-screen bg-[#f5f6f7] flex overflow-hidden">
    <!-- 移动端侧边栏遮罩 -->
    <div 
      v-if="showMobileSidebar" 
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      @click="hideMobileSidebar"
    ></div>

    <!-- 侧边栏 -->
    <div :class="[
      'fixed lg:relative z-50 lg:z-auto transition-transform duration-300 ease-in-out',
      'w-80 h-full lg:transform-none',
      showMobileSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]">
      <ComponentsSidebar
        :component-count="filteredComponents.length"
        :search-query="searchQuery"
        :view-mode="viewMode"
        :active-category="activeCategory"
        :selected-tags="selectedTags"
        :categories="categories"
        :all-tags="allTags"
        @update:search-query="handleSearchQueryUpdate"
        @update:view-mode="viewMode = $event"
        @update:active-category="handleCategoryUpdate"
        @toggle-tag="handleTagToggle"
        @close-mobile="hideMobileSidebar"
      />
    </div>

    <!-- 主内容区 -->
    <main class="flex-1 h-full overflow-y-auto lg:ml-0">
      <!-- 移动端顶部栏 -->
      <div class="lg:hidden bg-white border-b border-[#e8eaed] p-4 flex items-center justify-between sticky top-0 z-30">
        <button
          @click="showMobileSidebar = true"
          class="p-2 rounded-lg bg-[#f5f6f7] hover:bg-[#e8eaed] transition-colors duration-200"
        >
          <svg class="w-5 h-5 text-[#2f4554]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <h1 class="text-lg font-semibold text-[#2f4554]">
          组件库 <span class="text-sm text-[#6e7074] font-normal">({{ filteredComponents.length }})</span>
        </h1>
        <div class="w-9"></div> <!-- 占位元素保持标题居中 -->
      </div>

      <div class="p-4 sm:p-6 lg:p-8">
        <!-- 组件详情视图 -->
        <ComponentDetail
          v-if="currentView === 'detail' && selectedComponent"
          :component="selectedComponent"
          @back="backToList"
        />

        <!-- 组件列表视图 -->
        <ComponentsList
          v-else
          :components="filteredComponents"
          :view-mode="viewMode"
          @select-component="selectComponent"
          @show-all-components="showAllComponents"
          @clear-filters="clearFilters"
        />
      </div>
    </main>
  </div>
</template>

<script>
import ComponentsSidebar from './ComponentsSidebar.vue'
import ComponentsList from './ComponentsList.vue'
import ComponentDetail from './ComponentDetail.vue'
import { getAllComponents, getAllCategories, getAllTags } from './B_Data/index.js'

export default {
  name: 'ComponentsPage',
  components: {
    ComponentsSidebar,
    ComponentsList,
    ComponentDetail
  },
  data() {
    return {
      searchQuery: '',
      activeCategory: 'all',
      selectedTags: [],
      viewMode: 'grid', // 'grid' | 'list'
      currentView: 'list', // 'list' | 'detail'
      selectedComponent: null,
      showMobileSidebar: false, // 移动端侧边栏显示状态
      
      // 从统一数据源获取的数据
      categories: [],
      allTags: [],
      components: []
    }
  },
  async mounted() {
    // 加载数据
    this.categories = await getAllCategories();
    this.allTags = await getAllTags();
    this.components = await getAllComponents();
    
    // 监听全局重置事件
    window.addEventListener('reset-components-page', this.resetToListView);
    
    // 监听屏幕尺寸变化
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    // 清理事件监听器
    window.removeEventListener('reset-components-page', this.resetToListView);
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    filteredComponents() {
      let filtered = this.components

      // 按分类筛选
      if (this.activeCategory !== 'all') {
        filtered = filtered.filter(component => component.category === this.activeCategory)
      }

      // 按标签筛选
      if (this.selectedTags.length > 0) {
        filtered = filtered.filter(component =>
          this.selectedTags.some(tag => component.tags.includes(tag))
        )
      }

      // 按搜索词筛选
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(component =>
          component.name.toLowerCase().includes(query) ||
          component.description.toLowerCase().includes(query) ||
          component.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }

      return filtered
    }
  },
  methods: {
    // 处理搜索查询更新
    handleSearchQueryUpdate(query) {
      this.searchQuery = query
      // 如果在详情页面，切换回列表视图
      if (this.currentView === 'detail') {
        this.backToList()
      }
      // 移动端自动收起侧边栏
      this.hideMobileSidebar()
    },
    
    // 处理分类更新
    handleCategoryUpdate(categoryId) {
      this.activeCategory = categoryId
      // 如果在详情页面，切换回列表视图
      if (this.currentView === 'detail') {
        this.backToList()
      }
      // 移动端自动收起侧边栏
      this.hideMobileSidebar()
    },
    
    // 处理标签切换
    handleTagToggle(tag) {
      this.toggleTag(tag)
      // 如果在详情页面，切换回列表视图
      if (this.currentView === 'detail') {
        this.backToList()
      }
    },
    
    toggleTag(tag) {
      const index = this.selectedTags.indexOf(tag)
      if (index > -1) {
        this.selectedTags.splice(index, 1)
      } else {
        this.selectedTags.push(tag)
      }
    },
    
    selectComponent(component) {
      this.selectedComponent = component
      this.currentView = 'detail'
      // 移动端自动收起侧边栏
      this.hideMobileSidebar()
    },
    
    backToList() {
      this.currentView = 'list'
      this.selectedComponent = null
    },
    
    resetToListView() {
      this.currentView = 'list'
      this.selectedComponent = null
    },
    
    // 移动端侧边栏控制
    hideMobileSidebar() {
      this.showMobileSidebar = false
    },
    
    // 处理屏幕尺寸变化
    handleResize() {
      // 当屏幕变大时自动隐藏移动端侧边栏
      if (window.innerWidth >= 1024) {
        this.showMobileSidebar = false
      }
    },
    
    // 显示所有组件（保持标签筛选，只重置分类和搜索）
    showAllComponents() {
      this.searchQuery = ''
      this.activeCategory = 'all'
      // 保持 selectedTags 不变
      // 移动端自动收起侧边栏
      this.hideMobileSidebar()
    },
    
    // 清除筛选条件（重置所有筛选条件）
    clearFilters() {
      this.searchQuery = ''
      this.activeCategory = 'all'
      this.selectedTags = []
      // 移动端自动收起侧边栏
      this.hideMobileSidebar()
    }
  }
}
</script>

<style scoped>
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #e8eaed;
}

::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6e7074;
}
</style> 