<template>
  <section class="py-12 md:py-20 bg-[#f5f6f7]">
    <div class="max-w-6xl mx-auto px-4 md:px-6">
      <!-- 标题区域 -->
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-[#2f4554] mb-4 md:mb-6">
          快速开始
        </h2>
        <p class="text-lg md:text-xl text-[#6e7074] max-w-xl md:max-w-2xl mx-auto px-4">
          三步即可开始使用，丰富的组件库助力快速开发
        </p>
      </div>

      <!-- 主要内容 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <!-- 左侧：步骤指引 -->
        <div class="flex flex-col justify-between min-h-[500px] md:min-h-[600px]">
          <!-- 顶部：使用步骤 -->
          <div>
            <h3 class="text-2xl font-bold text-[#2f4554] mb-8">使用步骤</h3>
            
            <!-- 步骤列表 -->
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="w-8 h-8 bg-[#c23531] text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 class="text-lg font-semibold text-[#2f4554] mb-2">浏览组件库</h4>
                  <p class="text-[#6e7074]">查看我们提供的各种交互组件，包括光标效果、数据可视化、表单控件等</p>
                </div>
              </div>
              
              <div class="flex gap-4">
                <div class="w-8 h-8 bg-[#d48265] text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 class="text-lg font-semibold text-[#2f4554] mb-2">在线体验</h4>
                  <p class="text-[#6e7074]">每个组件都提供在线演示，可以直接体验功能和调整参数</p>
                </div>
              </div>
              
              <div class="flex gap-4">
                <div class="w-8 h-8 bg-[#ca8622] text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 class="text-lg font-semibold text-[#2f4554] mb-2">下载使用</h4>
                  <p class="text-[#6e7074]">复制代码或下载文件，按照文档说明集成到你的项目中</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 底部：特色功能 -->
          <div class="mt-8">
            <h4 class="text-lg font-semibold text-[#2f4554] mb-4">特色功能</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="flex items-center gap-2 text-[#6e7074]">
                <div class="w-1.5 h-1.5 bg-[#c23531] rounded-full"></div>
                <span>原生JavaScript实现</span>
              </div>
              <div class="flex items-center gap-2 text-[#6e7074]">
                <div class="w-1.5 h-1.5 bg-[#c23531] rounded-full"></div>
                <span>Canvas图形绘制</span>
              </div>
              <div class="flex items-center gap-2 text-[#6e7074]">
                <div class="w-1.5 h-1.5 bg-[#c23531] rounded-full"></div>
                <span>Lit Web Components</span>
              </div>
              <div class="flex items-center gap-2 text-[#6e7074]">
                <div class="w-1.5 h-1.5 bg-[#c23531] rounded-full"></div>
                <span>响应式设计</span>
              </div>
              <div class="flex items-center gap-2 text-[#6e7074]">
                <div class="w-1.5 h-1.5 bg-[#c23531] rounded-full"></div>
                <span>ECharts集成</span>
              </div>
              <div class="flex items-center gap-2 text-[#6e7074]">
                <div class="w-1.5 h-1.5 bg-[#c23531] rounded-full"></div>
                <span>开箱即用</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：组件分类和开发指南 -->
        <div class="flex flex-col justify-between min-h-[600px]">
          <!-- 顶部：组件分类 -->
          <div>
            <h3 class="text-2xl font-bold text-[#2f4554] mb-8">组件分类</h3>
            
            <!-- 组件分类卡片 -->
            <div class="space-y-4">
              <!-- 交互效果组件 -->
              <div class="bg-white p-6 rounded-xl border border-[#e8eaed] hover:shadow-md transition-shadow duration-200">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-[#c23531] to-[#a82e29] text-white rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-semibold text-[#2f4554] mb-2">交互效果组件</h4>
                    <p class="text-[#6e7074] text-sm mb-3">鼠标跟随、拖拽交互、视觉特效等创意组件</p>
                    <div class="text-xs text-[#9ca3af]">
                      FluidCursor • RippCursor • CircleCursor • DragDropContainer
                    </div>
                  </div>
                </div>
              </div>

              <!-- 数据可视化组件 -->
              <div class="bg-white p-6 rounded-xl border border-[#e8eaed] hover:shadow-md transition-shadow duration-200">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-[#d48265] to-[#b8704e] text-white rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-semibold text-[#2f4554] mb-2">数据可视化组件</h4>
                    <p class="text-[#6e7074] text-sm mb-3">图表绘制、数据展示、统计分析等可视化工具</p>
                    <div class="text-xs text-[#9ca3af]">
                      ECharts • 柱状图 • 折线图 • 饼图 • 雷达图
                    </div>
                  </div>
                </div>
              </div>

              <!-- 表单和控件组件 -->
              <div class="bg-white p-6 rounded-xl border border-[#e8eaed] hover:shadow-md transition-shadow duration-200">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-[#ca8622] to-[#a67018] text-white rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-semibold text-[#2f4554] mb-2">表单和控件组件</h4>
                    <p class="text-[#6e7074] text-sm mb-3">输入控件、选择器、树形结构等交互元素</p>
                    <div class="text-xs text-[#9ca3af]">
                      TreeSelect • CodeEditor • FormValidator • DatePicker
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 更多功能组件 -->
              <div class="bg-white p-6 rounded-xl border border-[#e8eaed] hover:shadow-md transition-shadow duration-200">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-[#61a0a8] to-[#4d8a91] text-white rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-semibold text-[#2f4554] mb-2">更多功能组件</h4>
                    <p class="text-[#6e7074] text-sm mb-3">实用工具、辅助功能、扩展组件等多样化功能</p>
                    <div class="text-xs text-[#9ca3af]">
                      FileUploader • ImageCropper • RichTextEditor • MarkdownEditor
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>

      <!-- 底部链接区域 -->
      <div class="mt-16 pt-12 border-t border-[#e8eaed]">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 快速链接 -->
          <div>
            <h4 class="text-lg font-semibold text-[#2f4554] mb-4">快速链接</h4>
            <div class="space-y-2">
              <a @click="goToComponents" class="block text-[#6e7074] hover:text-[#c23531] transition-colors cursor-pointer">浏览所有组件</a>
              <a @click="goToComponents" class="block text-[#6e7074] hover:text-[#c23531] transition-colors cursor-pointer">在线演示</a>
              <a @click="openGitHub" class="block text-[#6e7074] hover:text-[#c23531] transition-colors cursor-pointer">GitHub 仓库</a>
              <a @click="goToDesign" class="block text-[#6e7074] hover:text-[#c23531] transition-colors cursor-pointer">设计指南</a>
            </div>
          </div>

          <!-- 技术资源 -->
          <div>
            <h4 class="text-lg font-semibold text-[#2f4554] mb-4">技术资源</h4>
            <div class="space-y-2">
              <a @click="openGitHub" class="block text-[#6e7074] hover:text-[#c23531] transition-colors cursor-pointer">源码下载</a>
              <a @click="goToComponents" class="block text-[#6e7074] hover:text-[#c23531] transition-colors cursor-pointer">使用示例</a>
              <a @click="openBlog" class="block text-[#6e7074] hover:text-[#c23531] transition-colors cursor-pointer">技术博客</a>
              <a @click="openIssues" class="block text-[#6e7074] hover:text-[#c23531] transition-colors cursor-pointer">问题反馈</a>
            </div>
          </div>

          <!-- 社区和支持 -->
          <div>
            <h4 class="text-lg font-semibold text-[#2f4554] mb-4">社区和支持</h4>
            <div class="space-y-2">
              <a @click="openGitHub" class="block text-[#6e7074] hover:text-[#c23531] transition-colors cursor-pointer">GitHub 仓库</a>
              <a @click="openIssues" class="block text-[#6e7074] hover:text-[#c23531] transition-colors cursor-pointer">问题反馈</a>
              <a @click="openBlog" class="block text-[#6e7074] hover:text-[#c23531] transition-colors cursor-pointer">作者博客</a>
              <a @click="goHome" class="block text-[#6e7074] hover:text-[#c23531] transition-colors cursor-pointer">返回首页</a>
            </div>
          </div>
        </div>

        <!-- 行动召唤按钮 -->
        <div class="text-center mt-8 md:mt-12">
          <div class="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button @click="goToComponents" class="bg-[#c23531] text-white px-6 md:px-8 py-3 rounded-lg hover:bg-[#d48265] transition-colors font-semibold text-sm md:text-base">
              开始探索
            </button>
            <button @click="openGitHub" class="border border-[#c23531] text-[#c23531] px-6 md:px-8 py-3 rounded-lg hover:bg-[#c23531] hover:text-white transition-colors font-semibold text-sm md:text-base">
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 导航方法
const goToComponents = () => {
  router.push('/components')
}

const goToDesign = () => {
  router.push('/design')
}

const goHome = () => {
  router.push('/')
}

// 外部链接方法
const openGitHub = () => {
  window.open('https://github.com/afigzb/codeBase', '_blank')
}

const openIssues = () => {
  window.open('https://github.com/afigzb/codeBase/issues', '_blank')
}

const openBlog = () => {
  window.open('https://blog.csdn.net/sahjiwij?spm=1000.2115.3001.10640', '_blank')
}
</script> 