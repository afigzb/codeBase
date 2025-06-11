<template>
  <div class="pagination-container">
    <!-- 分页信息 -->
    <div class="pagination-info">
      <span class="text-sm text-[#6e7074]">
        显示第 {{ startIndex + 1 }}-{{ endIndex }} 项，共 {{ total }} 项
      </span>
    </div>

    <!-- 分页控制器 -->
    <div class="pagination-controls" v-if="totalPages > 1">
      <!-- 上一页 -->
      <button
        @click="$emit('prev-page')"
        :disabled="!hasPrevPage"
        class="pagination-btn pagination-nav"
        :class="{ 'disabled': !hasPrevPage }"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        <span class="hidden sm:inline ml-1">上一页</span>
      </button>

      <!-- 页码列表 -->
      <div class="pagination-pages">
        <template v-for="(page, index) in pageNumbers" :key="index">
          <!-- 省略号 -->
          <span v-if="page === '...'" class="pagination-ellipsis">...</span>
          
          <!-- 页码按钮 -->
          <button
            v-else
            @click="$emit('go-to-page', page)"
            class="pagination-btn pagination-page"
            :class="{ 'active': page === currentPage }"
          >
            {{ page }}
          </button>
        </template>
      </div>

      <!-- 下一页 -->
      <button
        @click="$emit('next-page')"
        :disabled="!hasNextPage"
        class="pagination-btn pagination-nav"
        :class="{ 'disabled': !hasNextPage }"
      >
        <span class="hidden sm:inline mr-1">下一页</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>

    <!-- 每页数量选择 -->
    <div class="page-size-selector">
      <label class="text-sm text-[#6e7074] mr-2">每页显示:</label>
      <select
        :value="pageSize"
        @change="$emit('change-page-size', parseInt($event.target.value))"
        class="page-size-select"
      >
        <option
          v-for="size in pageSizeOptions"
          :key="size"
          :value="size"
        >
          {{ size }} 条
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // 当前页码
    currentPage: {
      type: Number,
      required: true
    },
    // 每页数量
    pageSize: {
      type: Number,
      required: true
    },
    // 每页数量选项
    pageSizeOptions: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    // 总数据量
    total: {
      type: Number,
      required: true
    },
    // 总页数
    totalPages: {
      type: Number,
      required: true
    },
    // 是否有上一页
    hasPrevPage: {
      type: Boolean,
      required: true
    },
    // 是否有下一页
    hasNextPage: {
      type: Boolean,
      required: true
    },
    // 当前页开始索引
    startIndex: {
      type: Number,
      required: true
    },
    // 当前页结束索引
    endIndex: {
      type: Number,
      required: true
    },
    // 页码列表
    pageNumbers: {
      type: Array,
      required: true
    }
  },
  emits: [
    'prev-page',
    'next-page', 
    'go-to-page',
    'change-page-size'
  ]
}
</script>

<style scoped>
.pagination-container {
  @apply flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 px-1;
}

.pagination-info {
  @apply flex-shrink-0;
}

.pagination-controls {
  @apply flex items-center gap-1 sm:gap-2;
}

.pagination-pages {
  @apply flex items-center gap-1;
}

.pagination-btn {
  @apply min-w-[36px] h-9 px-2 sm:px-3 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200 border;
}

.pagination-nav {
  @apply bg-white border-[#e8eaed] text-[#6e7074] hover:bg-[#f5f6f7] hover:border-[#c4c9d0] hover:text-[#2f4554];
}

.pagination-nav.disabled {
  @apply opacity-50 cursor-not-allowed hover:bg-white hover:border-[#e8eaed] hover:text-[#6e7074];
}

.pagination-page {
  @apply bg-white border-[#e8eaed] text-[#6e7074] hover:bg-[#f5f6f7] hover:border-[#c4c9d0] hover:text-[#2f4554];
}

.pagination-page.active {
  @apply bg-[#c23531] border-[#c23531] text-white hover:bg-[#a02622] hover:border-[#a02622] hover:text-white shadow-sm;
}

.pagination-ellipsis {
  @apply px-2 py-2 text-[#9ca3af] text-sm font-medium;
}

.page-size-selector {
  @apply flex items-center flex-shrink-0;
}

.page-size-select {
  @apply px-3 py-1.5 text-sm border border-[#e8eaed] rounded-lg bg-white text-[#2f4554] focus:outline-none focus:ring-2 focus:ring-[#c23531]/20 focus:border-[#c23531] transition-all duration-200;
}

.page-size-select:hover {
  @apply border-[#c4c9d0];
}

/* 响应式优化 */
@media (max-width: 640px) {
  .pagination-container {
    @apply flex-col items-stretch gap-3;
  }
  
  .pagination-controls {
    @apply justify-center;
  }
  
  .pagination-info,
  .page-size-selector {
    @apply justify-center;
  }
}
</style> 