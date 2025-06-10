<template>
  <div class="pt-32 py-16 w-full bg-[#f5f6f7]">
    <div class="text-center mb-16">
      <h1 class="text-5xl font-bold text-[#2f4554] mb-6">设计系统</h1>
      <p class="text-xl text-[#6e7074] w-full mx-auto">
        vintage industrial · simple rational
      </p>
    </div>

    <!-- 设计理念 -->
    <div class="mb-16">
      <h2 class="text-3xl font-bold text-[#2f4554] text-center mb-12">页面设计理念</h2>
      <div class="grid grid-cols-4 gap-8 max-w-7xl mx-auto">
        <div class="bg-white border border-[#e8eaed] p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
          <div class="w-16 h-16 bg-[#c23531] rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.5 8.5L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L8.5 8.5L12 2Z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-[#2f4554] mb-2">复古工业美学</h3>
          <p class="text-[#6e7074] text-sm">低饱和度配色，高对比度层次，营造理性沉稳的视觉氛围</p>
        </div>
        
        <div class="bg-white border border-[#e8eaed] p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
          <div class="w-16 h-16 bg-[#d48265] rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-[#2f4554] mb-2">简洁理性布局</h3>
          <p class="text-[#6e7074] text-sm">清晰的信息层级，优雅的线框结构，专注内容本质</p>
        </div>
        
        <div class="bg-white border border-[#e8eaed] p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
          <div class="w-16 h-16 bg-[#ca8622] rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12L11 14L22 3L21 2L11 12L10 11L9 12ZM21 6V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H16L21 6Z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-[#2f4554] mb-2">6:3:1色彩配比</h3>
          <p class="text-[#6e7074] text-sm">浅色为主导，强调色点缀，变化色调和，现代设计法则</p>
        </div>
        
        <div class="bg-white border border-[#e8eaed] p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
          <div class="w-16 h-16 bg-[#61a0a8] rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-[#2f4554] mb-2">细节精致交互</h3>
          <p class="text-[#6e7074] text-sm">微妙的hover效果，流畅的过渡动画，提升使用体验</p>
        </div>
      </div>
    </div>

    <!-- 组件开发理念 -->
    <div class="mb-16">
      <h2 class="text-3xl font-bold text-[#2f4554] text-center mb-12">组件开发理念</h2>
      <div class="bg-white border border-[#e8eaed] p-8 max-w-7xl mx-auto shadow-sm">
        <div class="grid grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-[#2f4554] mb-4 flex items-center">
              <div class="w-8 h-8 bg-[#c23531] rounded mr-3 flex items-center justify-center">
                <span class="text-white text-sm font-bold">1</span>
              </div>
              模块化设计
            </h3>
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <div class="w-3 h-3 bg-[#ca8622] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p class="font-medium text-[#2f4554]">独立自治</p>
                  <p class="text-sm text-[#6e7074]">每个组件职责单一，可独立运行</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-3 h-3 bg-[#ca8622] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p class="font-medium text-[#2f4554]">标准化接口</p>
                  <p class="text-sm text-[#6e7074]">统一的Props和Events规范</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-[#2f4554] mb-4 flex items-center">
              <div class="w-8 h-8 bg-[#d48265] rounded mr-3 flex items-center justify-center">
                <span class="text-white text-sm font-bold">2</span>
              </div>
              数据驱动
            </h3>
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <div class="w-3 h-3 bg-[#ca8622] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p class="font-medium text-[#2f4554]">状态管理</p>
                  <p class="text-sm text-[#6e7074]">清晰的数据流和状态变化</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-3 h-3 bg-[#ca8622] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p class="font-medium text-[#2f4554]">响应式设计</p>
                  <p class="text-sm text-[#6e7074]">Vue 3 Composition API优势</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-[#2f4554] mb-4 flex items-center">
              <div class="w-8 h-8 bg-[#61a0a8] rounded mr-3 flex items-center justify-center">
                <span class="text-white text-sm font-bold">3</span>
              </div>
              用户体验
            </h3>
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <div class="w-3 h-3 bg-[#ca8622] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p class="font-medium text-[#2f4554]">性能优化</p>
                  <p class="text-sm text-[#6e7074]">懒加载、虚拟滚动等技术</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <div class="w-3 h-3 bg-[#ca8622] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p class="font-medium text-[#2f4554]">交互细节</p>
                  <p class="text-sm text-[#6e7074]">流畅的动画和反馈机制</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 程序设计理念 -->
    <div class="mb-16">
      <h2 class="text-3xl font-bold text-[#2f4554] text-center mb-12">程序设计理念</h2>
      <div class="grid grid-cols-2 gap-8 max-w-7xl mx-auto">
        <div class="bg-white border border-[#e8eaed] p-8 shadow-sm">
          <div class="h-48 border-2 border-dashed border-[#c4c9d0] flex items-center justify-center mb-6 bg-[#f9fafb]">
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-[#c23531] to-[#d48265] rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17L20.25 16.25L12 20.5L3.75 16.25L2 17Z"/>
                </svg>
              </div>
              <p class="text-[#2f4554] font-medium">架构设计</p>
            </div>
          </div>
          <h3 class="text-xl font-semibold text-[#2f4554] mb-2">清晰的系统架构</h3>
          <p class="text-[#6e7074]">分层设计、模块解耦、依赖注入，构建可维护的代码体系</p>
        </div>

        <div class="bg-white border border-[#e8eaed] p-8 shadow-sm">
          <div class="h-48 border-2 border-dashed border-[#c4c9d0] flex items-center justify-center mb-6 bg-[#f9fafb]">
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-[#ca8622] to-[#61a0a8] rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12L11 14L22 3L21 2L11 12L10 11L9 12ZM21 6V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H16L21 6Z"/>
                </svg>
              </div>
              <p class="text-[#2f4554] font-medium">代码质量</p>
            </div>
          </div>
          <h3 class="text-xl font-semibold text-[#2f4554] mb-2">高质量代码标准</h3>
          <p class="text-[#6e7074]">TypeScript类型安全、ESLint规范检查、单元测试覆盖</p>
        </div>
      </div>
    </div>

    <!-- 色彩系统 -->
    <div class="mb-16">
      <h2 class="text-3xl font-bold text-[#2f4554] text-center mb-12">色彩系统</h2>
      <div class="bg-white border border-[#e8eaed] p-8 max-w-7xl mx-auto shadow-sm">
        <div class="grid grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-[#2f4554] mb-4">主色调 (60%)</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-[#f5f6f7] border-2 border-[#e8eaed]"></div>
                <div>
                  <p class="font-medium text-[#2f4554]">浅灰背景</p>
                  <p class="text-sm text-[#6e7074]">#f5f6f7</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-white border-2 border-[#e8eaed]"></div>
                <div>
                  <p class="font-medium text-[#2f4554]">纯白卡片</p>
                  <p class="text-sm text-[#6e7074]">#ffffff</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-[#2f4554] mb-4">强调色 (30%)</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-[#c23531] border-2 border-[#e8eaed]"></div>
                <div>
                  <p class="font-medium text-[#2f4554]">深红主色</p>
                  <p class="text-sm text-[#6e7074]">#c23531</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-[#2f4554] border-2 border-[#e8eaed]"></div>
                <div>
                  <p class="font-medium text-[#2f4554]">深灰蓝</p>
                  <p class="text-sm text-[#6e7074]">#2f4554</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-[#d48265] border-2 border-[#e8eaed]"></div>
                <div>
                  <p class="font-medium text-[#2f4554]">肉桂橙</p>
                  <p class="text-sm text-[#6e7074]">#d48265</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-[#2f4554] mb-4">点缀色 (10%)</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-[#ca8622] border-2 border-[#e8eaed]"></div>
                <div>
                  <p class="font-medium text-[#2f4554]">土黄色</p>
                  <p class="text-sm text-[#6e7074]">#ca8622</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-[#61a0a8] border-2 border-[#e8eaed]"></div>
                <div>
                  <p class="font-medium text-[#2f4554]">浅蓝绿</p>
                  <p class="text-sm text-[#6e7074]">#61a0a8</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DesignPage'
}
</script> 