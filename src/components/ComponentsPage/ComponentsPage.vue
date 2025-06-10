<template>
  <div class="pt-16 h-screen bg-[#f5f6f7] flex overflow-hidden">
    <!-- 侧边栏 -->
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
    />

    <!-- 主内容区 -->
    <main class="flex-1 h-full overflow-y-auto">
      <div class="p-8">
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
  },
  beforeUnmount() {
    // 清理事件监听器
    window.removeEventListener('reset-components-page', this.resetToListView);
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
    },
    
    // 处理分类更新
    handleCategoryUpdate(categoryId) {
      this.activeCategory = categoryId
      // 如果在详情页面，切换回列表视图
      if (this.currentView === 'detail') {
        this.backToList()
      }
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
    },
    
    backToList() {
      this.currentView = 'list'
      this.selectedComponent = null
    },
    
    resetToListView() {
      this.currentView = 'list'
      this.selectedComponent = null
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