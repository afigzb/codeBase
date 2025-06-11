<template>
  <!-- 
    故事展示容器
    负责显示与指定键值对应的故事内容，采用打字机效果逐字显示
  -->
  <div class="bg-white w-full max-w-md lg:max-w-none rounded-xl shadow-lg border border-[#e8eaed] p-4 md:p-5">
    <!-- 故事区域标题 -->
    <h4 class="text-base md:text-lg font-semibold text-[#2f4554] mb-3 md:mb-4 flex items-center">
      <div class="w-2 h-2 bg-[#c23531] rounded-full mr-2"></div>
      聆听我们的故事
    </h4>
    
    <div class="space-y-3 md:space-y-4">
      <!-- 当前故事的标题 -->
      <div>
        <h5 class="text-sm font-medium text-[#2f4554] mb-2">{{ currentStory.title }}</h5>
      </div>

      <!-- 
        故事内容显示区域
        使用打字机效果逐字显示故事内容，包含光标闪烁动画
      -->
      <div class="border-t border-[#e8eaed] pt-3 md:pt-4 min-h-[150px] md:min-h-[200px]">
        <div class="text-sm text-[#6e7074] leading-relaxed">
          <!-- 已显示的文字内容 -->
          {{ displayedText }}
          <!-- 打字机光标，仅在打字过程中显示 -->
          <span v-if="isTyping" class="animate-pulse">|</span>
        </div>
      </div>

      <!-- 
        进度控制区域
        包含故事导航点和进度条，支持手动跳转和显示当前进度
      -->
      <div class="border-t border-[#e8eaed] pt-3 md:pt-4">
        <!-- 顶部状态栏：状态文字 + 故事导航点 -->
        <div class="flex items-center justify-between text-xs text-[#6e7074]">
          <span>正在讲述...</span>
          <!-- 故事导航点：每个点代表一个故事，支持点击跳转 -->
          <div class="flex items-center space-x-1">
            <button
              v-for="(_, index) in stories.length" 
              :key="index"
              :class="[
                'w-2 h-2 rounded-full transition-all duration-300 hover:scale-125',
                index === currentStoryIndex ? 'bg-[#c23531]' : 'bg-[#e8eaed] hover:bg-[#d48265]'
              ]"
              @click="jumpToStory(index)"
              :title="`跳转到故事 ${index + 1}`"
            ></button>
          </div>
        </div>
        
        <!-- 文字显示进度条：显示当前故事的文字显示进度 -->
        <div class="mt-3 w-full bg-[#e8eaed] rounded-full h-1">
          <div 
            class="bg-[#c23531] h-1 rounded-full transition-all duration-100 ease-linear"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { chartStories } from './StoryData.js'

// ####################################
// 数据层 (Data Layer)
// ####################################

// =====================================
// 组件接口定义
// =====================================
const props = defineProps({
  // 当前内容的键值，用于匹配对应的故事内容
  storyKey: {
    type: String,
    required: true
  },
  // 是否自动推进到下一个故事（故事模式开关）
  autoAdvance: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  'story-complete', // 当前故事播放完成时触发
  'story-changed'   // 请求切换到新故事（和对应内容）时触发
])

// =====================================
// 外部数据源
// =====================================
const stories = chartStories

// =====================================
// 响应式状态数据
// =====================================
const displayedText = ref('')        // 当前已显示的文字内容
const isTyping = ref(false)          // 是否正在执行打字机效果
const isPaused = ref(false)          // 是否处于暂停状态
const currentStoryIndex = ref(0)     // 当前故事在故事数组中的索引
const typewriterTimer = ref(null)    // 打字机效果的定时器引用
const storyTimer = ref(null)         // 故事自动推进的定时器引用

// =====================================
// 计算属性
// =====================================
/**
 * 当前显示的故事对象
 * 根据传入的storyKey查找对应的故事，如果没找到则使用第一个故事
 */
const currentStory = computed(() => {
  const story = stories.find(s => s.type === props.storyKey)
  return story || stories[0]
})

/**
 * 文字显示进度（百分比）
 * 计算当前已显示文字相对于故事总长度的比例
 */
const progress = computed(() => {
  if (!currentStory.value.content) return 0
  return Math.min(100, (displayedText.value.length / currentStory.value.content.length) * 100)
})

// ####################################
// 操作层 (Operation Layer)
// ####################################

/**
 * 清理所有定时器
 */
function clearAllTimers() {
  if (typewriterTimer.value) {
    clearTimeout(typewriterTimer.value)
    typewriterTimer.value = null
  }
  if (storyTimer.value) {
    clearTimeout(storyTimer.value)
    storyTimer.value = null
  }
}

/**
 * 检查字符是否为标点符号
 */
function isPunctuationChar(char) {
  return char === '，' || char === ',' || 
         char === '。' || char === '.' || 
         char === '！' || char === '？'
}

/**
 * 计算打字延迟时间
 */
function calculateDelay(charsAfterPunctuation, currentChar) {
  const avgSentenceLength = 30
  const segmentProgress = Math.min(1, charsAfterPunctuation / avgSentenceLength)
  const baseDelay = 80 - (segmentProgress * 60)
  let delay = Math.max(20, baseDelay)
  
  if (isPunctuationChar(currentChar)) {
    if (currentChar === '，' || currentChar === ',') {
      delay += 300
    } else {
      delay += 500
    }
  }
  
  return delay
}

// =====================================
// 状态管理函数
// =====================================
/**
 * 重置打字机状态
 */
function resetTypewriterState() {
  displayedText.value = ''
  isTyping.value = true
  isPaused.value = false
}

/**
 * 切换暂停/继续状态
 */
function togglePause() {
  if (isPaused.value) {
    resumeTypewriter()
  } else {
    pauseTypewriter()
  }
}

// =====================================
// 核心业务逻辑
// =====================================
/**
 * 处理打字完成
 */
function handleTypeComplete() {
  isTyping.value = false
  emit('story-complete')
  
  if (props.autoAdvance) {
    storyTimer.value = setTimeout(() => {
      nextStory()
    }, 2000)
  }
}

/**
 * 创建打字机核心逻辑
 */
function createTypewriterLogic(startIndex = 0) {
  const story = currentStory.value
  if (!story.content) return null
  
  const content = story.content
  let charIndex = startIndex
  let charsAfterPunctuation = 0
  
  // 如果从中间开始，计算当前句子片段中已显示的字符数
  if (startIndex > 0) {
    for (let i = startIndex - 1; i >= 0; i--) {
      const char = content[i]
      if (isPunctuationChar(char)) break
      charsAfterPunctuation++
    }
  }
  
  const typeNextChar = () => {
    if (charIndex < content.length && !isPaused.value) {
      const currentChar = content[charIndex]
      displayedText.value += currentChar
      charIndex++
      charsAfterPunctuation++
      
      const delay = calculateDelay(charsAfterPunctuation, currentChar)
      
      if (isPunctuationChar(currentChar)) {
        charsAfterPunctuation = 0
      }
      
      typewriterTimer.value = setTimeout(typeNextChar, delay)
    } else if (charIndex >= content.length) {
      handleTypeComplete()
    }
  }
  
  return typeNextChar
}

// =====================================
// 主要操作函数
// =====================================
/**
 * 启动打字机效果
 */
function startTypewriter() {
  clearAllTimers()
  resetTypewriterState()
  
  const typeLogic = createTypewriterLogic(0)
  if (typeLogic) {
    typewriterTimer.value = setTimeout(typeLogic, 80)
  }
}

/**
 * 暂停打字机效果
 */
function pauseTypewriter() {
  clearAllTimers()
  isPaused.value = true
  isTyping.value = false
}

/**
 * 继续打字机效果
 */
function resumeTypewriter() {
  if (!isPaused.value) return
  
  isPaused.value = false
  isTyping.value = true
  
  const startIndex = displayedText.value.length
  const typeLogic = createTypewriterLogic(startIndex)
  if (typeLogic) {
    typewriterTimer.value = setTimeout(typeLogic, 80)
  }
}

/**
 * 切换到下一个故事
 */
function nextStory() {
  currentStoryIndex.value = (currentStoryIndex.value + 1) % stories.length
  const nextKey = stories[currentStoryIndex.value].type
  emit('story-changed', nextKey)
}

// =====================================
// 事件处理函数
// =====================================
/**
 * 跳转到指定故事
 * @param {number} index - 目标故事的索引
 */
function jumpToStory(index) {
  const targetKey = stories[index].type
  
  if (targetKey === props.storyKey && currentStoryIndex.value === index) {
    togglePause()
  } else {
    clearAllTimers()
    currentStoryIndex.value = index
    emit('story-changed', targetKey)
  }
}

// =====================================
// 监听器
// =====================================
/**
 * 监听storyKey变化
 */
watch(() => props.storyKey, (newKey) => {
  const newIndex = stories.findIndex(s => s.type === newKey)
  if (newIndex !== -1) {
    currentStoryIndex.value = newIndex
  }
  startTypewriter()
}, { immediate: true })

// =====================================
// 生命周期钩子
// =====================================
/**
 * 组件挂载后的初始化
 */
onMounted(() => {
  const index = stories.findIndex(s => s.type === props.storyKey)
  if (index !== -1) {
    currentStoryIndex.value = index
  }
})

/**
 * 组件卸载前的清理工作
 */
onUnmounted(() => {
  clearAllTimers()
})

// =====================================
// 组件接口暴露
// =====================================
defineExpose({
  startTypewriter,
  pauseTypewriter,
  resumeTypewriter,
  nextStory
})
</script> 