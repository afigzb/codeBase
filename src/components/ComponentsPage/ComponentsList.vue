<template>
  <div>
    <!-- 网格视图 -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      <ComponentItem
        v-for="component in components"
        :key="component.id"
        :component="component"
        layout="grid"
        @select-component="$emit('select-component', $event)"
      />
    </div>

    <!-- 列表视图 -->
    <div v-else-if="viewMode === 'list'" class="space-y-3 sm:space-y-4">
      <ComponentItem
        v-for="component in components"
        :key="component.id"
        :component="component"
        layout="list"
        @select-component="$emit('select-component', $event)"
      />
    </div>

    <!-- 空状态 -->
    <div v-if="components.length === 0" class="text-center py-12 sm:py-16 px-4">
      <div class="max-w-sm sm:max-w-md mx-auto">
        <!-- 空状态图标 -->
        <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#c23531]/10 to-[#d48265]/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
          <svg class="h-8 w-8 sm:h-10 sm:w-10 text-[#ca8622]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        
        <!-- 标题和描述 -->
        <h3 class="text-lg sm:text-xl font-semibold text-[#2f4554] mb-2 sm:mb-3">未找到组件</h3>
        <p class="text-sm sm:text-base text-[#6e7074] mb-4 sm:mb-6 leading-relaxed">
          没有找到符合条件的组件，尝试调整搜索词或筛选条件，
          <br class="hidden sm:block">
          或者浏览所有可用的组件分类。
        </p>
        
        <!-- 建议操作 -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            @click="$emit('show-all-components')"
            class="px-4 py-2 sm:px-6 sm:py-3 bg-[#c23531] text-[#ffffff] rounded-lg hover:bg-[#d48265] transition-colors duration-200 font-medium shadow-sm hover:shadow-md text-sm sm:text-base"
          >
            查看所有组件
          </button>
          <button 
            @click="$emit('clear-filters')"
            class="px-4 py-2 sm:px-6 sm:py-3 bg-[#e8eaed] text-[#6e7074] rounded-lg hover:bg-[#ca8622] hover:text-[#ffffff] transition-all duration-200 font-medium text-sm sm:text-base"
          >
            清除筛选条件
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentItem from './ComponentItem.vue'

export default {
  name: 'ComponentsList',
  components: {
    ComponentItem
  },
  props: {
    components: {
      type: Array,
      required: true
    },
    viewMode: {
      type: String,
      required: true,
      validator: value => ['grid', 'list'].includes(value)
    }
  },
  emits: ['select-component', 'show-all-components', 'clear-filters']
}
</script> 