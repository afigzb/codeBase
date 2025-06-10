<template>
  <div class="bg-white w-[400px] rounded-xl shadow-lg border border-[#e8eaed] p-5">
    <h4 class="text-lg font-semibold text-[#2f4554] mb-4 flex items-center">
      <div class="w-2 h-2 bg-[#c23531] rounded-full mr-2"></div>
      聆听我们的故事
    </h4>
    
    <div class="space-y-4">
      <!-- 图表标题 -->
      <div>
        <h5 class="text-sm font-medium text-[#2f4554] mb-2">{{ currentStory.title }}</h5>
      </div>

      <!-- 故事内容 -->
      <div class="border-t border-[#e8eaed] pt-4 min-h-[200px]">
        <div class="text-sm text-[#6e7074] leading-relaxed">
          {{ displayedText }}<span v-if="isTyping" class="animate-pulse">|</span>
        </div>
      </div>

      <!-- 进度指示 -->
      <div class="border-t border-[#e8eaed] pt-4">
        <div class="flex items-center justify-between text-xs text-[#6e7074]">
          <span>正在讲述...</span>
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
        
        <!-- 进度条 -->
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

// Props
const props = defineProps({
  chartType: {
    type: String,
    required: true
  },
  autoAdvance: {
    type: Boolean,
    default: true
  }
})

// Emits
const emit = defineEmits(['story-complete', 'story-changed'])

// 响应式数据
const displayedText = ref('')
const isTyping = ref(false)
const currentStoryIndex = ref(0)
const typewriterTimer = ref(null)
const storyTimer = ref(null)

// 使用导入的故事数据
const stories = chartStories

// 计算属性
const currentStory = computed(() => {
  const story = stories.find(s => s.type === props.chartType)
  return story || stories[0]
})

const progress = computed(() => {
  if (!currentStory.value.content) return 0
  return Math.min(100, (displayedText.value.length / currentStory.value.content.length) * 100)
})

// 监听图表类型变化
watch(() => props.chartType, (newType) => {
  startTypewriter()
}, { immediate: true })

// 打字机效果
function startTypewriter() {
  // 清除之前的定时器
  if (typewriterTimer.value) {
    clearTimeout(typewriterTimer.value)
  }
  if (storyTimer.value) {
    clearTimeout(storyTimer.value)
  }
  
  // 重置状态
  displayedText.value = ''
  isTyping.value = true
  
  const story = currentStory.value
  if (!story.content) return
  
  let charIndex = 0
  let charsAfterPunctuation = 0 // 自上次标点符号以来的字符数
  const content = story.content
  
  const typeNextChar = () => {
    if (charIndex < content.length) {
      const currentChar = content[charIndex]
      displayedText.value += currentChar
      charIndex++
      charsAfterPunctuation++
      
      // 检查是否为标点符号
      const isPunctuation = currentChar === '，' || currentChar === ',' || 
                           currentChar === '。' || currentChar === '.' || 
                           currentChar === '！' || currentChar === '？'
      
      // 计算当前句子片段的进度（基于自上次标点符号以来的字符数）
      // 假设每个句子片段平均30个字符，用于计算进度
      const avgSentenceLength = 30
      const segmentProgress = Math.min(1, charsAfterPunctuation / avgSentenceLength)
      
      // 先慢后快的速度曲线：开始80ms，结束20ms
      const baseDelay = 80 - (segmentProgress * 60) // 从80ms减少到20ms
      let delay = Math.max(20, baseDelay) // 最快不超过20ms
      
      // 根据字符类型添加停顿，并重置计数器
      if (isPunctuation) {
        if (currentChar === '，' || currentChar === ',') {
          delay += 300 // 逗号额外停顿300ms
        } else if (currentChar === '。' || currentChar === '.' || currentChar === '！' || currentChar === '？') {
          delay += 500 // 句号等额外停顿500ms
        }
        // 重置字符计数器，下一个句子重新开始慢速
        charsAfterPunctuation = 0
      }
      
      typewriterTimer.value = setTimeout(typeNextChar, delay)
    } else {
      // 打字完成
      isTyping.value = false
      
      // 触发故事完成事件
      emit('story-complete')
      
      // 如果开启自动推进，等待2秒后进入下一个故事
      if (props.autoAdvance) {
        storyTimer.value = setTimeout(() => {
          nextStory()
        }, 2000)
      }
    }
  }
  
  // 开始打字
  typewriterTimer.value = setTimeout(typeNextChar, 80)
}

function nextStory() {
  currentStoryIndex.value = (currentStoryIndex.value + 1) % stories.length
  const nextType = stories[currentStoryIndex.value].type
  emit('story-changed', nextType)
}

// 跳转到指定故事
function jumpToStory(index) {
  // 清除定时器，停止自动播放
  if (typewriterTimer.value) {
    clearTimeout(typewriterTimer.value)
  }
  if (storyTimer.value) {
    clearTimeout(storyTimer.value)
  }
  
  // 更新索引
  currentStoryIndex.value = index
  const targetType = stories[index].type
  
  // 触发图表切换
  emit('story-changed', targetType)
}

// 暴露方法给父组件
defineExpose({
  startTypewriter,
  nextStory
})

onMounted(() => {
  // 找到当前图表类型对应的故事索引
  const index = stories.findIndex(s => s.type === props.chartType)
  if (index !== -1) {
    currentStoryIndex.value = index
  }
})

onUnmounted(() => {
  if (typewriterTimer.value) {
    clearTimeout(typewriterTimer.value)
  }
  if (storyTimer.value) {
    clearTimeout(storyTimer.value)
  }
})
</script> 