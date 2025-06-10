/**
 * AudioPlayer 组件数据
 * 基于Web Components的现代音频播放器，支持完整的播放控制和播放列表管理
 */

export async function getAudioPlayerData() {
  try {
    return {
      id: 'audio-player',
      name: '音频播放器',
      title: '音频播放器',
      icon: '/ComponentControlSystem/Component/AudioPlayer/resource/img/音乐播放器.png',
      category: 'media',
      categoryName: '媒体播放',
      tags: ['媒体控制', '音频播放', '播放列表'],
      
      // 功能描述
      description: '基于Web Components构建的现代音频播放器，提供完整的播放控制、播放列表管理、多种播放模式等功能，支持浮动球和完整展开两种显示模式。',
      
      // 核心功能列表
      features: [
        {
          icon: '🎵',
          title: '完整播放控制',
          description: '播放/暂停、上一首/下一首、进度条拖拽、音量控制'
        },
        {
          icon: '📋',
          title: '播放列表管理',
          description: '支持多首歌曲管理、列表显示、点击切换播放'
        },
        {
          icon: '🔄',
          title: '多种播放模式',
          description: '顺序播放、单曲循环、列表循环、随机播放'
        },
        {
          icon: '🎨',
          title: '双重显示模式',
          description: '浮动球模式和完整展开模式，适应不同使用场景'
        }
      ],
      
      // 实现方式
      implementation: [
        {
          icon: '🔧',
          title: 'Web Components',
          description: '使用现代Web标准，兼容性强，可在任意框架中使用'
        },
        {
          icon: '🎮',
          title: '观察者模式',
          description: '采用观察者模式管理状态，响应式更新界面'
        },
        {
          icon: '🎯',
          title: '模块化架构',
          description: '控制器、数据、工具类分离，代码结构清晰'
        }
      ],
      
      // 具体展示项目
      demonstrations: [
        {
          id: 'basic-audio-player-demo',
          title: '基础播放器演示',
          description: '展示AudioPlayer的基本功能，包括浮动球展开、播放控制、音量调节等核心特性。提供外部API控制示例，演示组件的完整交互流程。',
          features: [
            '浮动球点击展开',
            '完整播放控制界面',
            '进度条拖拽跳转',
            '音量调节和静音',
            '播放列表管理',
            '外部API控制示例'
          ],
          icon: '🎵',
          side: 'left',
          htmlPath: '/ComponentControlSystem/Component/AudioPlayer/AudioPlayerDemo/BasicPlayerDemo.html'
        },
        {
          id: 'full-audio-player-demo',
          title: '完整模式对比演示',
          description: '对比展示浮动球模式和完整展开模式的差异，演示不同配置下的播放器效果。包含多个播放列表和播放模式的实际应用场景。',
          features: [
            '浮动球模式展示',
            '完整展开模式展示',
            '不同播放模式对比',
            '多样化播放列表',
            '配置参数说明',
            '响应式设计展示'
          ],
          icon: '📱',
          side: 'right',
          htmlPath: '/ComponentControlSystem/Component/AudioPlayer/AudioPlayerDemo/FullPlayerDemo.html'
        }
      ],
      
      // 使用提示
      usageTips: [
        {
          title: '基本使用',
          content: '简单添加<audio-player>标签，通过JavaScript设置播放列表'
        },
        {
          title: '显示模式',
          content: '设置hide-ball="true"可隐藏浮动球，直接显示完整界面'
        },
        {
          title: '播放控制',
          content: '支持外部JavaScript API控制播放、暂停、切换歌曲等'
        },
        {
          title: '自定义配置',
          content: '可配置初始音量、播放模式、是否自动播放等参数'
        }
      ],
      
      // 在线体验说明
      onlineExperience: {
        title: '在线体验',
        description: '体验AudioPlayer组件的完整功能，包括播放控制、列表管理、模式切换等特性。',
        htmlPath: '/ComponentControlSystem/Component/AudioPlayer/AudioPlayerDemo/BasicPlayerDemo.html',
        instructions: `AudioPlayer 在线体验

这是一个功能完整的音频播放器组件，你可以：

• 🎵 点击浮动球展开完整播放器界面
• ▶️ 使用播放/暂停、上一首/下一首控制音频
• 🎚️ 拖拽进度条跳转到指定位置
• 🔊 调节音量滑块或点击静音按钮
• 📋 点击播放列表按钮查看和切换歌曲
• 🔄 切换不同的播放模式（循环、随机等）
• 🎮 使用页面上的外部控制按钮测试API

组件特点：
- 基于Web Components标准
- 支持浮动球和完整两种显示模式
- 完整的播放控制功能
- 多种播放模式支持
- 响应式设计适配移动端

试试点击浮动球，体验完整的音频播放功能！`
      },
      
      // API 文档
      apiDocumentation: {
        title: 'API 文档',
        attributes: [
          {
            name: 'hide-ball',
            type: 'Boolean',
            default: 'false',
            description: '是否隐藏浮动球，设为true时直接显示完整播放器'
          },
          {
            name: 'initial-play-mode',
            type: 'String',
            default: 'list-loop',
            description: '初始播放模式：list-loop(列表循环)、single-loop(单曲循环)、sequential(顺序播放)、random(随机播放)'
          },
          {
            name: 'initial-track-id',
            type: 'String',
            default: 'null',
            description: '初始播放的歌曲ID'
          },
          {
            name: 'auto-play',
            type: 'Boolean',
            default: 'false',
            description: '是否自动播放（需要用户交互后才能生效）'
          },
          {
            name: 'audio-base-path',
            type: 'String',
            default: 'audio/',
            description: '音频文件的基础路径'
          },
          {
            name: 'initial-volume',
            type: 'Number',
            default: '50',
            description: '初始音量（0-100）'
          }
        ],
        methods: [
          {
            name: 'setPlaylist(playlist)',
            description: '设置播放列表',
            parameters: [
              {
                name: 'playlist',
                type: 'Array',
                description: '播放列表数组，每个项目包含id、title、artist、src、duration等属性'
              }
            ]
          },
          {
            name: 'playTrack(trackId)',
            description: '播放指定歌曲',
            parameters: [
              {
                name: 'trackId',
                type: 'String',
                description: '要播放的歌曲ID'
              }
            ]
          },
          {
            name: 'play()',
            description: '开始播放当前歌曲'
          },
          {
            name: 'pause()',
            description: '暂停播放'
          },
          {
            name: 'setPlayMode(mode)',
            description: '设置播放模式',
            parameters: [
              {
                name: 'mode',
                type: 'String',
                description: '播放模式：list-loop、single-loop、sequential、random'
              }
            ]
          }
        ],
        events: [
          {
            name: 'trackchange',
            description: '当前播放歌曲改变时触发',
            detail: {
              trackId: 'String - 当前歌曲ID',
              track: 'Object - 当前歌曲信息'
            }
          },
          {
            name: 'playstate',
            description: '播放状态改变时触发',
            detail: {
              state: 'String - 播放状态（playing、paused、stopped）'
            }
          },
          {
            name: 'progress',
            description: '播放进度更新时触发',
            detail: {
              currentTime: 'Number - 当前时间（秒）',
              duration: 'Number - 总时长（秒）',
              progress: 'Number - 进度百分比（0-100）'
            }
          }
        ]
      },
      
      // 播放列表数据格式
      dataFormat: {
        title: '播放列表格式',
        description: '播放列表是一个包含歌曲信息的数组',
        example: {
          playlist: [
            {
              id: 'song1',
              title: '歌曲标题',
              artist: '艺术家名称',
              src: '音频文件URL',
              duration: 240,
              cover: '封面图片URL（可选）'
            }
          ]
        },
        properties: [
          {
            name: 'id',
            type: 'String',
            required: true,
            description: '歌曲的唯一标识符'
          },
          {
            name: 'title',
            type: 'String',
            required: true,
            description: '歌曲标题'
          },
          {
            name: 'artist',
            type: 'String',
            required: false,
            description: '艺术家名称'
          },
          {
            name: 'src',
            type: 'String',
            required: true,
            description: '音频文件的URL地址'
          },
          {
            name: 'duration',
            type: 'Number',
            required: false,
            description: '歌曲时长（秒），用于显示总时长'
          },
          {
            name: 'cover',
            type: 'String',
            required: false,
            description: '封面图片URL（预留功能）'
          }
        ]
      },
      
      // 使用场景
      useCases: [
        {
          title: '网站背景音乐',
          description: '为网站添加背景音乐播放器，使用浮动球模式节省空间'
        },
        {
          title: '音乐网站播放器',
          description: '作为音乐网站的主要播放器，使用完整模式展示所有功能'
        },
        {
          title: '教育平台音频',
          description: '在线教育平台播放课程音频，支持进度控制和列表管理'
        },
        {
          title: '播客应用',
          description: '播客应用的音频播放器，支持多集管理和播放模式'
        }
      ],
      
      // 浏览器支持
      browserSupport: {
        title: '浏览器支持',
        description: '基于Web Components和现代JavaScript特性',
        supported: [
          'Chrome 54+',
          'Firefox 63+',
          'Safari 10.1+',
          'Edge 79+',
          'iOS Safari 10.3+',
          'Android Browser 81+'
        ],
        notes: [
          '需要支持Web Components的浏览器',
          '需要支持ES6模块的浏览器',
          '音频播放需要用户手势激活（现代浏览器安全策略）'
        ]
      }
    };
  } catch (error) {
    console.error('加载AudioPlayer数据失败:', error);
    throw error; // 让上层处理错误
  }
}
