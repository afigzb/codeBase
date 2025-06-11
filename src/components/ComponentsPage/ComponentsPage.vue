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
          组件库 <span class="text-sm text-[#6e7074] font-normal">({{ paginationInfo.total }})</span>
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
        <template v-else>
          <ComponentsList
            :components="paginatedComponents"
            :view-mode="viewMode"
            @select-component="selectComponent"
            @show-all-components="showAllComponents"
            @clear-filters="clearFilters"
          />
          
          <!-- 分页控制器 -->
          <Pagination
            v-if="filteredComponents.length > 0"
            :current-page="pagination.currentPage"
            :page-size="pagination.pageSize"
            :page-size-options="pagination.pageSizeOptions"
            :total="paginationInfo.total"
            :total-pages="paginationInfo.totalPages"
            :has-prev-page="paginationInfo.hasPrevPage"
            :has-next-page="paginationInfo.hasNextPage"
            :start-index="paginationInfo.startIndex"
            :end-index="paginationInfo.endIndex"
            :page-numbers="getPageNumbers()"
            @prev-page="prevPage"
            @next-page="nextPage"
            @go-to-page="goToPage"
            @change-page-size="changePageSize"
          />
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import ComponentsSidebar from './ComponentsSidebar.vue'
import ComponentsList from './ComponentsList.vue'
import ComponentDetail from './ComponentDetail.vue'
import Pagination from './components/Pagination.vue'
import { getAllComponents, getAllCategories, getAllTags } from './B_Data/index.js'

export default {
  name: 'ComponentsPage',
  components: {
    ComponentsSidebar,
    ComponentsList,
    ComponentDetail,
    Pagination
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
      
      // 分页相关状态
      pagination: {
        currentPage: 1,
        pageSize: 9, // 初始显示的页码，不和下面数值对应上的话也能运行就是有显示错误，默认每页9个组件（3列×3行）
        pageSizeOptions: [6, 9, 18, 36]
      },
      
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
    // 筛选后的组件（不包含分页）
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
    },

    // 分页计算属性
    paginationInfo() {
      const total = this.filteredComponents.length
      const totalPages = Math.ceil(total / this.pagination.pageSize)
      const hasNextPage = this.pagination.currentPage < totalPages
      const hasPrevPage = this.pagination.currentPage > 1
      
      return {
        total,
        totalPages,
        hasNextPage,
        hasPrevPage,
        startIndex: (this.pagination.currentPage - 1) * this.pagination.pageSize,
        endIndex: Math.min(this.pagination.currentPage * this.pagination.pageSize, total)
      }
    },

    // 当前页的组件数据
    paginatedComponents() {
      const { startIndex, endIndex } = this.paginationInfo
      return this.filteredComponents.slice(startIndex, endIndex)
    }
  },
  methods: {
    // 处理搜索查询更新
    handleSearchQueryUpdate(query) {
      this.searchQuery = query
      this.resetPagination() // 重置分页
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
      this.resetPagination() // 重置分页
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
      this.resetPagination() // 重置分页
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
      this.resetPagination() // 重置分页
      // 保持 selectedTags 不变
      // 移动端自动收起侧边栏
      this.hideMobileSidebar()
    },
    
    // 清除筛选条件（重置所有筛选条件）
    clearFilters() {
      this.searchQuery = ''
      this.activeCategory = 'all'
      this.selectedTags = []
      this.resetPagination()
      // 移动端自动收起侧边栏
      this.hideMobileSidebar()
    },

    // =====================================
    // 分页控制方法
    // =====================================
    
    // 重置分页到第一页
    resetPagination() {
      this.pagination.currentPage = 1
    },

    // 跳转到指定页
    goToPage(page) {
      const { totalPages } = this.paginationInfo
      if (page >= 1 && page <= totalPages) {
        this.pagination.currentPage = page
      }
    },

    // 上一页
    prevPage() {
      if (this.paginationInfo.hasPrevPage) {
        this.pagination.currentPage--
      }
    },

    // 下一页
    nextPage() {
      if (this.paginationInfo.hasNextPage) {
        this.pagination.currentPage++
      }
    },

    // 修改每页显示数量
    changePageSize(newSize) {
      this.pagination.pageSize = newSize
      // 重新计算当前页，确保不超出范围
      const maxPage = Math.ceil(this.filteredComponents.length / newSize)
      if (this.pagination.currentPage > maxPage) {
        this.pagination.currentPage = Math.max(1, maxPage)
      }
    },

    // 获取页码列表（用于分页器显示）
    getPageNumbers() {
      const { totalPages } = this.paginationInfo
      const current = this.pagination.currentPage
      const delta = 2 // 当前页前后显示的页数
      
      let pages = []
      
      // 总页数少于等于7页，显示所有页码
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // 总页数大于7页，显示部分页码
        if (current <= 4) {
          // 当前页在前部
          pages = [1, 2, 3, 4, 5, '...', totalPages]
        } else if (current >= totalPages - 3) {
          // 当前页在后部
          pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        } else {
          // 当前页在中部
          pages = [1, '...', current - 1, current, current + 1, '...', totalPages]
        }
      }
      
      return pages
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