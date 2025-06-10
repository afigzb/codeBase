<template>
  <div class="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-[#f5f6f7] to-[#f2f3f4]">
    <!-- 精致的导航指示器 -->
    <div class="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
      <div class="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg border border-[#e8eaed]/50">
        <div class="space-y-3">
          <div v-for="(section, index) in sections" :key="index" 
               class="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
               :class="activeSection === index ? 'bg-[#c23531] scale-125' : 'bg-[#c4c9d0] hover:bg-[#d48265]'"
               @click="scrollToSection(index)">
          </div>
        </div>
      </div>
    </div>

    <!-- 英雄区域 -->
    <section class="relative pt-24 pb-20 overflow-hidden" ref="section0">
      <!-- 精致背景装饰 -->
      <div class="absolute inset-0 opacity-[0.02]">
        <div class="absolute top-20 left-20 w-96 h-96 bg-[#c23531] rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-80 h-80 bg-[#ca8622] rounded-full blur-3xl"></div>
      </div>
      
      <!-- 网格背景 -->
      <div class="absolute inset-0 opacity-[0.015]" 
           style="background-image: linear-gradient(#2f4554 1px, transparent 1px), linear-gradient(90deg, #2f4554 1px, transparent 1px); background-size: 24px 24px;">
          </div>

      <div class="relative max-w-6xl mx-auto px-6 text-center">
        <!-- 微妙的预标题 -->
        <div class="mb-4">
          <span class="inline-flex items-center px-4 py-1.5 bg-white/60 backdrop-blur-sm border border-[#e8eaed]/50 rounded-full text-sm text-[#6e7074] font-medium shadow-sm">
            <span class="w-1.5 h-1.5 bg-[#c23531] rounded-full mr-2 animate-pulse"></span>
            Design Philosophy
          </span>
        </div>
        
        <!-- 主标题 -->
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-light text-[#2f4554] mb-6 tracking-tight">
          <span class="font-extralight">Asuka</span>
          <span class="block font-medium mt-2">
            <span class="text-[#2f4554]">设计</span><span class="text-[#c23531]">理念</span>
          </span>
        </h1>

                 <!-- 精致的副标题 -->
         <div class="max-w-3xl mx-auto mb-12 space-y-4">
           <p class="text-xl md:text-2xl text-[#6e7074] font-light leading-relaxed">
             复古工业风格与现代简约主义的精妙融合
           </p>
           <div class="w-24 h-0.5 bg-[#c23531] mx-auto"></div>
           <p class="text-base text-[#9ca3af] max-w-2xl mx-auto leading-loose">
             随机应变的灵活思维，精益求精的设计追求
           </p>
         </div>
        
        <!-- 精致的统计数据 -->
        <div class="grid grid-cols-3 max-w-lg mx-auto gap-8 mt-16">
          <div class="text-center group">
            <div class="text-2xl font-light text-[#c23531] mb-1 group-hover:text-[#d48265] transition-colors duration-300">12+</div>
            <div class="text-xs text-[#9ca3af] uppercase tracking-wider">组件</div>
          </div>
          <div class="text-center group">
            <div class="text-2xl font-light text-[#c23531] mb-1 group-hover:text-[#d48265] transition-colors duration-300">6</div>
            <div class="text-xs text-[#9ca3af] uppercase tracking-wider">设计原则</div>
        </div>
          <div class="text-center group">
            <div class="text-2xl font-light text-[#c23531] mb-1 group-hover:text-[#d48265] transition-colors duration-300">∞</div>
            <div class="text-xs text-[#9ca3af] uppercase tracking-wider">可能性</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 设计哲学 -->
    <section class="py-20" ref="section1">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-light text-[#2f4554] mb-4">设计哲学</h2>
          <p class="text-lg text-[#6e7074] max-w-2xl mx-auto">细微之处见真章，简约而不简单</p>
    </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 哲学卡片1 -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-br from-[#c23531]/5 to-transparent rounded-2xl transform rotate-1 transition-transform duration-500 group-hover:rotate-2"></div>
            <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#e8eaed]/50 shadow-sm hover:shadow-md transition-all duration-500">
              <div class="w-12 h-12 bg-gradient-to-br from-[#c23531] to-[#d48265] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span class="text-white text-xl">🎯</span>
              </div>
              <h3 class="text-xl font-medium text-[#2f4554] mb-4">既专业又不冷冰冰</h3>
              <p class="text-[#6e7074] leading-relaxed text-sm mb-4">
                保持技术感的同时，注入人文关怀。每一个细节都体现对用户的理解和尊重。
              </p>
              <div class="text-xs text-[#9ca3af] italic">
                "技术是手段，温度是目的"
              </div>
            </div>
                </div>

          <!-- 哲学卡片2 -->
          <div class="group relative lg:mt-8">
            <div class="absolute inset-0 bg-gradient-to-br from-[#d48265]/5 to-transparent rounded-2xl transform -rotate-1 transition-transform duration-500 group-hover:-rotate-2"></div>
            <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#e8eaed]/50 shadow-sm hover:shadow-md transition-all duration-500">
              <div class="w-12 h-12 bg-gradient-to-br from-[#d48265] to-[#ca8622] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span class="text-white text-xl">⚖️</span>
              </div>
              <h3 class="text-xl font-medium text-[#2f4554] mb-4">既整齐又有点意思</h3>
              <p class="text-[#6e7074] leading-relaxed text-sm mb-4">
                在规整的基础上，加入一些小惊喜。完美的对齐很安全，偶尔的错位能创造惊喜。
              </p>
              <div class="text-xs text-[#9ca3af] italic">
                "秩序中的自由，规则中的创新"
              </div>
            </div>
          </div>

          <!-- 哲学卡片3 -->
          <div class="group relative lg:mt-4">
            <div class="absolute inset-0 bg-gradient-to-br from-[#ca8622]/5 to-transparent rounded-2xl transform rotate-0.5 transition-transform duration-500 group-hover:rotate-1"></div>
            <div class="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#e8eaed]/50 shadow-sm hover:shadow-md transition-all duration-500">
              <div class="w-12 h-12 bg-gradient-to-br from-[#ca8622] to-[#61a0a8] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span class="text-white text-xl">💝</span>
              </div>
              <h3 class="text-xl font-medium text-[#2f4554] mb-4">既实用又赏心悦目</h3>
              <p class="text-[#6e7074] leading-relaxed text-sm mb-4">
                功能第一，但也要美观。好的设计不是装饰，而是让功能更加优雅地呈现。
              </p>
              <div class="text-xs text-[#9ca3af] italic">
                "美即功能，功能即美"
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 色彩精神 -->
    <section class="py-20 bg-gradient-to-b from-transparent to-white/50" ref="section2">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-light text-[#2f4554] mb-4">色彩的精神</h2>
          <p class="text-lg text-[#6e7074] max-w-2xl mx-auto">每种颜色都有它的性格，每次搭配都有它的故事</p>
        </div>

        <!-- 主色调展示 -->
        <div class="mb-16">
          <h3 class="text-2xl font-light text-[#2f4554] text-center mb-12">主角与配角</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- 红色 -->
            <div class="group cursor-pointer">
              <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#c23531] to-[#d48265] h-40 mb-4 shadow-lg group-hover:shadow-xl transition-all duration-500">
                <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <div class="text-lg font-medium">#c23531</div>
                  <div class="text-xs opacity-80">PRIMARY</div>
                </div>
                <div class="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm group-hover:scale-110 transition-transform duration-300">
                  ♠
                </div>
              </div>
              <h4 class="font-medium text-[#2f4554] mb-2">深红 - 主角</h4>
              <p class="text-xs text-[#6e7074] leading-relaxed">重要按钮、关键操作、需要用户注意的地方</p>
            </div>

            <!-- 橙色 -->
            <div class="group cursor-pointer">
              <div class="relative overflow-hidden rounded-2xl bg-[#d48265] h-40 mb-4 shadow-lg group-hover:shadow-xl transition-all duration-500">
                <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <div class="text-lg font-medium">#d48265</div>
                  <div class="text-xs opacity-80">SECONDARY</div>
                </div>
                <div class="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm group-hover:scale-110 transition-transform duration-300">
                  ♥
                </div>
              </div>
              <h4 class="font-medium text-[#2f4554] mb-2">橙色 - 配角</h4>
              <p class="text-xs text-[#6e7074] leading-relaxed">悬停效果、次要强调、温暖提示</p>
          </div>

            <!-- 黄色 -->
            <div class="group cursor-pointer">
              <div class="relative overflow-hidden rounded-2xl bg-[#ca8622] h-40 mb-4 shadow-lg group-hover:shadow-xl transition-all duration-500">
                <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <div class="text-lg font-medium">#ca8622</div>
                  <div class="text-xs opacity-80">ACCENT</div>
              </div>
                <div class="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm group-hover:scale-110 transition-transform duration-300">
                  ♦
                </div>
              </div>
              <h4 class="font-medium text-[#2f4554] mb-2">黄色 - 点缀</h4>
              <p class="text-xs text-[#6e7074] leading-relaxed">图标装饰、状态标识、画龙点睛</p>
            </div>

            <!-- 深蓝灰 -->
            <div class="group cursor-pointer">
              <div class="relative overflow-hidden rounded-2xl bg-[#2f4554] h-40 mb-4 shadow-lg group-hover:shadow-xl transition-all duration-500">
                <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <div class="text-lg font-medium">#2f4554</div>
                  <div class="text-xs opacity-80">NEUTRAL</div>
                </div>
                <div class="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm group-hover:scale-110 transition-transform duration-300">
                  ♣
                </div>
              </div>
              <h4 class="font-medium text-[#2f4554] mb-2">深蓝灰 - 基调</h4>
              <p class="text-xs text-[#6e7074] leading-relaxed">标题文字、重要信息、结构元素</p>
            </div>
          </div>
        </div>

        <!-- 色彩关系图 -->
        <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-[#e8eaed]/50 shadow-sm">
          <h3 class="text-xl font-light text-[#2f4554] text-center mb-8">色彩关系与比例</h3>
          <div class="flex items-center justify-center space-x-2 mb-8">
            <div class="w-24 h-8 bg-[#f5f6f7] rounded-lg flex items-center justify-center text-xs text-[#6e7074]">60%</div>
            <div class="w-16 h-8 bg-[#c23531] rounded-lg flex items-center justify-center text-xs text-white">30%</div>
            <div class="w-8 h-8 bg-[#ca8622] rounded-lg flex items-center justify-center text-xs text-white">10%</div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div class="text-sm font-medium text-[#2f4554] mb-2">主导色 (60%)</div>
              <div class="text-xs text-[#6e7074]">背景、大面积使用的中性色彩</div>
            </div>
            <div>
              <div class="text-sm font-medium text-[#2f4554] mb-2">强调色 (30%)</div>
              <div class="text-xs text-[#6e7074]">按钮、链接、重要元素</div>
            </div>
            <div>
              <div class="text-sm font-medium text-[#2f4554] mb-2">点缀色 (10%)</div>
              <div class="text-xs text-[#6e7074]">细节装饰、状态提示</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 布局美学 -->
    <section class="py-20" ref="section3">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-light text-[#2f4554] mb-4">布局的美学</h2>
          <p class="text-lg text-[#6e7074] max-w-2xl mx-auto">空间的呼吸感，元素的和谐感</p>
        </div>

        <div class="space-y-20">
          <!-- 间距原则 -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 class="text-2xl font-light text-[#2f4554] mb-6">间距的节奏</h3>
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <div class="w-3 h-3 bg-[#c23531] rounded-full flex-shrink-0"></div>
                  <div>
                    <div class="text-sm font-medium text-[#2f4554]">紧密关联 (8px-12px)</div>
                    <div class="text-xs text-[#6e7074]">相关内容之间的距离</div>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="w-3 h-3 bg-[#d48265] rounded-full flex-shrink-0"></div>
                  <div>
                    <div class="text-sm font-medium text-[#2f4554]">逻辑分组 (16px-24px)</div>
                    <div class="text-xs text-[#6e7074]">功能模块之间的距离</div>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="w-3 h-3 bg-[#ca8622] rounded-full flex-shrink-0"></div>
                  <div>
                    <div class="text-sm font-medium text-[#2f4554]">区域分离 (32px-48px)</div>
                    <div class="text-xs text-[#6e7074]">不同区块之间的距离</div>
          </div>
        </div>
      </div>
    </div>

            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#e8eaed]/50">
              <div class="space-y-3">
                <div class="h-4 bg-[#2f4554] w-3/4 rounded-sm"></div>
                <div class="h-2 bg-[#6e7074] w-full rounded-sm"></div>
                <div class="h-2 bg-[#6e7074] w-5/6 rounded-sm"></div>
                <div class="my-6"></div>
                <div class="h-3 bg-[#c23531] w-1/2 rounded-sm"></div>
                <div class="h-2 bg-[#9ca3af] w-4/5 rounded-sm"></div>
                <div class="h-2 bg-[#9ca3af] w-3/5 rounded-sm"></div>
              </div>
            </div>
          </div>

          <!-- 对齐与平衡 -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#e8eaed]/50">
              <div class="grid grid-cols-3 gap-3">
                <div class="h-20 bg-gradient-to-br from-[#c23531] to-[#d48265] rounded-lg transform hover:rotate-1 transition-transform duration-300"></div>
                <div class="h-20 bg-[#f5f6f7] rounded-lg border border-[#e8eaed]"></div>
                <div class="h-20 bg-gradient-to-br from-[#ca8622] to-[#61a0a8] rounded-lg transform hover:-rotate-1 transition-transform duration-300"></div>
                <div class="h-20 bg-[#f5f6f7] rounded-lg border border-[#e8eaed]"></div>
                <div class="h-20 bg-[#d48265] rounded-lg"></div>
                <div class="h-20 bg-[#f5f6f7] rounded-lg border border-[#e8eaed]"></div>
              </div>
        </div>

            <div class="order-1 lg:order-2">
              <h3 class="text-2xl font-light text-[#2f4554] mb-6">对齐的智慧</h3>
              <div class="space-y-4">
                <p class="text-[#6e7074] leading-relaxed">
                  基础对齐建立秩序，偶尔的错位创造活力。关键是要让"乱"看起来是有意为之的设计。
                </p>
                                 <div class="bg-[#f5f6f7] p-4 border-l-4 border-[#d48265]">
                   <p class="text-sm text-[#6e7074] italic">
                     "完美的对齐很安全，但偶尔的错位能创造惊喜"
                   </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 微交互设计 -->
    <section class="py-20 bg-gradient-to-b from-white/50 to-transparent" ref="section4">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-light text-[#2f4554] mb-4">微交互的魅力</h2>
          <p class="text-lg text-[#6e7074] max-w-2xl mx-auto">细节决定体验，微妙传递温度</p>
    </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     <!-- 悬停变化 -->
           <div class="group cursor-pointer">
             <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#e8eaed]/50 hover:border-[#c23531]/30 transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
               <div class="w-16 h-16 bg-[#c23531] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                 <span class="text-white text-2xl">👆</span>
               </div>
              <h3 class="text-lg font-medium text-[#2f4554] mb-2 group-hover:text-[#c23531] transition-colors duration-300">细腻悬停</h3>
              <p class="text-sm text-[#6e7074] leading-relaxed">
                轻微的缩放、颜色变化和位移，让界面有了生命力
              </p>
              <div class="mt-4 text-xs text-[#9ca3af]">
                持续时间：200-300ms
              </div>
            </div>
          </div>

                     <!-- 渐进展示 -->
           <div class="group cursor-pointer">
             <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#e8eaed]/50 hover:border-[#d48265]/30 transition-all duration-500 hover:shadow-lg">
               <div class="w-16 h-16 bg-[#d48265] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                 <span class="text-white text-2xl">⚡</span>
               </div>
              <h3 class="text-lg font-medium text-[#2f4554] mb-2 group-hover:text-[#d48265] transition-colors duration-300">渐进动画</h3>
              <p class="text-sm text-[#6e7074] leading-relaxed">
                内容逐步展现，给用户时间消化信息，避免认知负担
              </p>
              <div class="mt-4 text-xs text-[#9ca3af]">
                持续时间：400-600ms
              </div>
            </div>
                </div>

                     <!-- 反馈机制 -->
           <div class="group cursor-pointer">
             <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#e8eaed]/50 hover:border-[#ca8622]/30 transition-all duration-500 hover:shadow-lg">
               <div class="w-16 h-16 bg-[#ca8622] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                 <span class="text-white text-2xl transform group-hover:rotate-12 transition-transform duration-300">🎯</span>
               </div>
              <h3 class="text-lg font-medium text-[#2f4554] mb-2 group-hover:text-[#ca8622] transition-colors duration-300">即时反馈</h3>
              <p class="text-sm text-[#6e7074] leading-relaxed">
                每次点击、每次输入都有即时响应，让用户感知到系统的状态
              </p>
              <div class="mt-4 text-xs text-[#9ca3af]">
                持续时间：100-200ms
              </div>
            </div>
          </div>
                </div>

                 <!-- 动画时间轴 -->
         <div class="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#e8eaed]/50">
           <h3 class="text-xl font-light text-[#2f4554] text-center mb-8">动画时间的艺术</h3>
           <div class="relative max-w-2xl mx-auto">
             <div class="absolute left-0 top-1/2 w-full h-0.5 bg-[#e8eaed]"></div>
             <div class="flex justify-between items-center relative">
               <div class="text-center bg-white px-4 py-2">
                 <div class="w-4 h-4 bg-[#c23531] rounded-full mx-auto mb-2"></div>
                 <div class="text-sm font-medium text-[#2f4554]">100ms</div>
                 <div class="text-xs text-[#6e7074]">即时反馈</div>
               </div>
               <div class="text-center bg-white px-4 py-2">
                 <div class="w-4 h-4 bg-[#d48265] rounded-full mx-auto mb-2"></div>
                 <div class="text-sm font-medium text-[#2f4554]">300ms</div>
                 <div class="text-xs text-[#6e7074]">悬停效果</div>
               </div>
               <div class="text-center bg-white px-4 py-2">
                 <div class="w-4 h-4 bg-[#ca8622] rounded-full mx-auto mb-2"></div>
                 <div class="text-sm font-medium text-[#2f4554]">500ms</div>
                 <div class="text-xs text-[#6e7074]">页面切换</div>
               </div>
             </div>
           </div>
         </div>
      </div>
    </section>

    <!-- 细节的力量 -->
    <section class="py-20" ref="section5">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-light text-[#2f4554] mb-8">细节的力量</h2>
        
        <div class="bg-gradient-to-br from-white/80 to-[#f5f6f7]/80 backdrop-blur-sm rounded-3xl p-12 border border-[#e8eaed]/50 shadow-lg">
          <blockquote class="text-2xl md:text-3xl text-[#6e7074] font-light leading-relaxed mb-8 italic">
            "真正的设计不是可见的装饰，<br>
            而是不可见的周到考虑。"
          </blockquote>
          
                     <div class="w-24 h-0.5 bg-[#c23531] mx-auto mb-8"></div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-[#2f4554]">设计的温度</h3>
              <p class="text-sm text-[#6e7074] leading-relaxed">
                每一个圆角、每一处阴影、每一次过渡都经过精心设计，传递着对用户的关怀。
              </p>
            </div>
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-[#2f4554]">细节的坚持</h3>
              <p class="text-sm text-[#6e7074] leading-relaxed">
                从像素级的对齐到毫秒级的动画，每个细节都是对品质的承诺。
              </p>
            </div>
          </div>
          
          <div class="mt-12 flex flex-wrap justify-center gap-3">
            <span class="px-4 py-2 bg-white/60 backdrop-blur-sm border border-[#e8eaed]/50 rounded-full text-sm text-[#c23531]">精致入微</span>
            <span class="px-4 py-2 bg-white/60 backdrop-blur-sm border border-[#e8eaed]/50 rounded-full text-sm text-[#d48265]">细节至上</span>
            <span class="px-4 py-2 bg-white/60 backdrop-blur-sm border border-[#e8eaed]/50 rounded-full text-sm text-[#ca8622]">温度设计</span>
          </div>
          
                     <div class="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
             <button class="px-8 py-3 bg-[#c23531] text-white rounded-full hover:bg-[#d48265] hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium">
               探索组件库
             </button>
             <button class="px-8 py-3 bg-white/60 backdrop-blur-sm border border-[#e8eaed]/50 text-[#2f4554] rounded-full hover:bg-white hover:shadow-md transition-all duration-300 font-medium">
               查看源码
             </button>
           </div>
      </div>
    </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DesignPage',
  data() {
    return {
      activeSection: 0,
      sections: ['简介', '哲学', '色彩', '布局', '交互', '细节']
    }
  },
  mounted() {
    this.setupScrollListener()
  },
  beforeUnmount() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener)
    }
  },
  methods: {
    setupScrollListener() {
      this.scrollListener = () => {
        const sections = this.$refs
        let currentSection = 0
        
        Object.keys(sections).forEach((key, index) => {
          if (key.startsWith('section')) {
            const element = sections[key]
            if (element) {
              const rect = element.getBoundingClientRect()
              if (rect.top <= window.innerHeight / 2) {
                currentSection = parseInt(key.replace('section', ''))
              }
            }
          }
        })
        
        this.activeSection = currentSection
      }
      
      window.addEventListener('scroll', this.scrollListener)
    },
    
    scrollToSection(index) {
      const sectionRef = this.$refs[`section${index}`]
      if (sectionRef) {
        sectionRef.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }
}
</script> 

<style scoped>
/* 精细的滚动条 */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #c23531, #d48265);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #d48265, #ca8622);
}

/* 精致的文字渲染 */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 微妙的过渡效果 */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* 背景模糊效果 */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* 渐变文字 */
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}

/* 微妙的阴影 */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(47, 69, 84, 0.05);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(47, 69, 84, 0.1), 0 2px 4px -1px rgba(47, 69, 84, 0.06);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(47, 69, 84, 0.1), 0 4px 6px -2px rgba(47, 69, 84, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(47, 69, 84, 0.1), 0 10px 10px -5px rgba(47, 69, 84, 0.04);
}
</style> 