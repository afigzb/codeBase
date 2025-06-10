/**
 * 自动化组件数据管理中心
 * 自动扫描和加载所有 *Data.js 文件，动态生成分类和标签
 */

// 自动导入所有数据文件
const dataModules = import.meta.glob('./*Data.js');

/**
 * 动态加载所有组件数据模块
 */
async function loadAllDataModules() {
  const modules = {};
  
  for (const path in dataModules) {
    try {
      const module = await dataModules[path]();
      // 从文件路径提取组件ID (例如: ./CodeEditorPreviewData.js -> code-editor-preview)
      const fileName = path.replace('./', '').replace('Data.js', '');
      const componentId = fileName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
      
      // 假设每个数据文件导出一个获取数据的函数
      const dataFunction = Object.values(module)[0];
      if (typeof dataFunction === 'function') {
        modules[componentId] = dataFunction;
      }
    } catch (error) {
      console.error(`加载数据模块 ${path} 失败:`, error);
    }
  }
  
  return modules;
}

// 缓存
let componentDataMap = null;
let cachedComponents = null;
let cachedCategories = null;
let cachedAllTags = null;

/**
 * 初始化数据映射
 */
async function initializeDataMap() {
  if (!componentDataMap) {
    componentDataMap = await loadAllDataModules();
  }
  return componentDataMap;
}

/**
 * 根据组件ID获取组件详细数据
 */
export async function getComponentData(componentId) {
  try {
    const dataMap = await initializeDataMap();
    const dataFunction = dataMap[componentId];
    
    if (typeof dataFunction === 'function') {
      return await dataFunction();
    } else {
      console.warn(`组件 ${componentId} 没有对应的数据获取函数`);
      return getEmptyComponentData();
    }
  } catch (error) {
    console.error(`加载组件 ${componentId} 的数据失败:`, error);
    return getEmptyComponentData();
  }
}

/**
 * 生成组件基础信息列表
 */
async function generateComponentsInfo() {
  const components = [];
  const dataMap = await initializeDataMap();
  
  for (const [componentId, dataFunction] of Object.entries(dataMap)) {
    try {
      const detailData = await dataFunction();
      
      // 提取基础信息
      const basicInfo = {
        id: detailData.id,
        name: detailData.name,
        description: detailData.description,
        category: detailData.category,
        categoryName: detailData.categoryName, // 分类显示名称
        icon: detailData.icon,
        iconBg: detailData.iconBg,
        previewBg: detailData.previewBg,
        previewText: detailData.previewText,
        tags: detailData.tags || []
      };
      
      components.push(basicInfo);
    } catch (error) {
      console.error(`生成组件 ${componentId} 基础信息失败:`, error);
    }
  }
  
  return components;
}

/**
 * 自动生成分类数据
 */
async function generateCategories() {
  const components = await generateComponentsInfo();
  const categoryInfo = {};
  
  // 收集分类信息和统计数量
  components.forEach(comp => {
    const category = comp.category;
    if (category) {
      if (!categoryInfo[category]) {
        categoryInfo[category] = {
          count: 0,
          name: comp.categoryName || category // 使用组件提供的分类名称，或使用ID作为默认名称
        };
      }
      categoryInfo[category].count++;
    }
  });
  
  // 生成分类数据
  const categories = [
    { id: 'all', name: '全部组件', count: components.length }
  ];
  
  // 根据收集的分类信息动态添加
  Object.entries(categoryInfo).forEach(([categoryId, info]) => {
    categories.push({
      id: categoryId,
      name: info.name,
      count: info.count
    });
  });
  
  return categories;
}

/**
 * 自动生成所有标签
 */
async function generateAllTags() {
  const components = await generateComponentsInfo();
  const tagSet = new Set();
  
  components.forEach(comp => {
    if (comp.tags && Array.isArray(comp.tags)) {
      comp.tags.forEach(tag => tagSet.add(tag));
    }
  });
  
  return Array.from(tagSet).sort();
}

/**
 * 获取所有组件的基础信息
 */
export async function getAllComponents() {
  if (!cachedComponents) {
    cachedComponents = await generateComponentsInfo();
  }
  return cachedComponents;
}

/**
 * 获取所有分类
 */
export async function getAllCategories() {
  if (!cachedCategories) {
    cachedCategories = await generateCategories();
  }
  return cachedCategories;
}

/**
 * 获取所有标签
 */
export async function getAllTags() {
  if (!cachedAllTags) {
    cachedAllTags = await generateAllTags();
  }
  return cachedAllTags;
}

/**
 * 根据组件ID获取组件基础信息
 */
export async function getComponentById(componentId) {
  const components = await getAllComponents();
  return components.find(comp => comp.id === componentId);
}

/**
 * 获取已注册的组件ID列表
 */
export async function getRegisteredComponentIds() {
  const dataMap = await initializeDataMap();
  return Object.keys(dataMap);
}

/**
 * 清除缓存（用于开发时刷新数据）
 */
export function clearCache() {
  componentDataMap = null;
  cachedComponents = null;
  cachedCategories = null;
  cachedAllTags = null;
}

/**
 * 空数据展示
 */
function getEmptyComponentData() {
  return {
    id: 'empty-component',
    name: '暂无数据',
    title: '组件数据加载中...',
    icon: '📦',
    category: 'unknown',
    description: '正在加载组件数据，请稍后...',
    features: [],
    implementation: [],
    demonstrations: [],
    usageTips: [],
    onlineExperience: {
      title: '暂无体验',
      description: '该组件暂时没有可用的在线体验。',
      buttonText: '暂不可用',
      available: false
    }
  };
}
