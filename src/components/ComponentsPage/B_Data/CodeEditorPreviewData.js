/**
 * CodeEditorPreview 组件数据
 * 直接导入HTML文件内容，避免运行时fetch导致的404错误
 */

export async function getCodeEditorPreviewData() {
  try {
    return {
      id: 'code-editor-preview',
      name: '代码编辑器',
      title: '代码编辑器',
      icon: '/ComponentControlSystem/Component/CodeEditorPreview/resource/img/代码编辑预览器.png',
      category: 'editor',
      categoryName: '开发工具',
      tags: ['代码编辑', '实时预览', '开发工具'],
      
      // 功能描述
      description: '集代码编辑、实时预览、语法高亮于一体的综合性代码组件，为开发者提供完整的代码编写和预览体验。',
      
      // 核心功能列表
      features: [
        {
          icon: '💻',
          title: '代码编辑',
          description: '支持多语言语法高亮、自动补全、代码格式化'
        },
        {
          icon: '👁️',
          title: '实时预览',
          description: '即时预览代码执行结果，支持HTML/CSS/JS'
        },
        {
          icon: '🔧',
          title: '工具栏',
          description: '提供刷新、全屏、清空、复制等常用操作'
        },
        {
          icon: '🎨',
          title: '界面定制',
          description: '支持主题切换、布局调整、字体设置'
        }
      ],
      
      // 实现方式
      implementation: [
        {
          icon: '✏️',
          title: 'CodeEditor.js',
          description: '基于Monaco Editor构建，提供专业级代码编辑体验'
        },
        {
          icon: '🖥️',
          title: 'CodePreview.js',
          description: '使用iframe沙箱技术，安全隔离代码执行环境'
        },
        {
          icon: '🔗',
          title: '整合组件',
          description: '模块化设计，可独立使用或组合使用'
        }
      ],
      
      // 具体展示项目
      demonstrations: [
        {
          id: 'code-editor-full-demo',
          title: '完整组件演示',
          description: '体验完整的CodeEditorPreview组件功能，包括代码编辑、实时预览、主题切换、文件导入等所有特性。',
          features: [
            '完整的编辑器界面',
            '实时代码预览',
            '多主题支持',
            '工具栏操作',
            '外部文件导入',
            '全屏预览模式'
          ],
          icon: '💻',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/CodeEditorPreview/CodeEditorPreviewDemo/CodeEditorPreview.html'
        },
        {
          id: 'code-preview-demo',
          title: 'HTML代码实时预览',
          description: '支持HTML、CSS、JavaScript的编写和实时预览。编辑器提供语法高亮、自动缩进、括号匹配等功能，预览区域实时显示代码执行结果。',
          features: [
            '语法高亮和代码提示',
            '实时预览HTML渲染效果',
            '支持外部CSS和JS库引入'
          ],
          icon: '🌐',
          side: 'left',
          htmlPath: '/ComponentControlSystem/Component/CodeEditorPreview/CodeEditorPreviewDemo/CodePreview.html'
        },
        {
          id: 'code-display-demo',
          title: '代码展示与编辑',
          description: '提供专业的代码展示功能，支持多种编程语言的语法高亮，可切换只读和编辑模式。适合用于代码文档展示和在线编辑。',
          features: [
            '多语言语法高亮支持',
            '编辑模式动态切换',
            '主题自定义配置'
          ],
          icon: '⚛️',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/CodeEditorPreview/CodeEditorPreviewDemo/CodeDisplay.html'
        }
      ],
      
      // 使用提示
      usageTips: [
        {
          title: '快捷键',
          content: 'Ctrl+S 保存, Ctrl+F 查找, F11 全屏'
        },
        {
          title: '支持语言',
          content: 'HTML, CSS, JavaScript, React, Vue'
        },
        {
          title: '实时预览',
          content: '代码修改即时反映到预览区域'
        }
      ],
      
      // 在线体验说明
      onlineExperience: {
        title: '在线体验',
        description: '直接体验CodeEditorPreview组件的完整功能，包括代码编辑、实时预览、主题切换等特性。',
        htmlPath: '/ComponentControlSystem/Component/CodeEditorPreview/CodeEditorPreviewDemo/CodeEditorPreview.html',
        instructions: `CodeEditorPreview 在线体验

这是一个功能完整的代码编辑预览组件，你可以：

• 在左侧编辑器中编写 HTML、CSS、JavaScript 代码
• 实时在右侧预览区查看运行效果  
• 使用工具栏切换主题、语言，复制代码等
• 导入外部 CSS/JS 文件增强功能
• 点击全屏按钮获得更大预览空间

试试编写一些代码，体验实时预览的魅力！`
      }
    };
  } catch (error) {
    console.error('加载CodeEditorPreview数据失败:', error);
    throw error; // 让上层处理错误
  }
}




