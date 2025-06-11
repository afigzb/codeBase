/**
 * 图表数据层 - 基于访客核心的业务逻辑数据
 * 以访客为中心构建完整的数据体系，包含访客信息、行为记录、交易数据等
 */

import { EChartsDataConverter } from '@/components/Echarts/src/Utils/DataConversionFunction.js';

// =====================================
// 核心业务数据表（模拟服务器返回的有逻辑关系的数据）
// =====================================

// 访客基本信息表
const visitorProfiles = [
  // 个体开发者（数量更多，体现个体开发者群体庞大）
  { visitor_id: 'V001', type: '个体开发者', region: '北美', device: '桌面端', browser: 'Chrome', register_date: '2024-01-15' },
  { visitor_id: 'V003', type: '个体开发者', region: '欧洲', device: '移动端', browser: 'Safari', register_date: '2024-02-01' },
  { visitor_id: 'V005', type: '个体开发者', region: '亚太', device: '移动端', browser: 'Chrome', register_date: '2024-02-10' },
  { visitor_id: 'V007', type: '个体开发者', region: '北美', device: '桌面端', browser: 'Chrome', register_date: '2024-03-15' },
  { visitor_id: 'V009', type: '个体开发者', region: '欧洲', device: '桌面端', browser: 'Firefox', register_date: '2024-01-25' },
  { visitor_id: 'V010', type: '个体开发者', region: '亚太', device: '移动端', browser: 'Safari', register_date: '2024-02-20' },
  { visitor_id: 'V011', type: '个体开发者', region: '北美', device: '桌面端', browser: 'Edge', register_date: '2024-03-05' },
  { visitor_id: 'V012', type: '个体开发者', region: '欧洲', device: '移动端', browser: 'Chrome', register_date: '2024-03-25' },
  { visitor_id: 'V013', type: '个体开发者', region: '亚太', device: '桌面端', browser: 'Firefox', register_date: '2024-04-10' },
  { visitor_id: 'V014', type: '个体开发者', region: '北美', device: '移动端', browser: 'Safari', register_date: '2024-04-15' },
  
  // 企业用户（数量相对较少）
  { visitor_id: 'V002', type: '企业用户', region: '北美', device: '桌面端', browser: 'Firefox', register_date: '2024-01-20' },
  { visitor_id: 'V004', type: '企业用户', region: '欧洲', device: '桌面端', browser: 'Chrome', register_date: '2024-02-05' },
  { visitor_id: 'V006', type: '企业用户', region: '亚太', device: '桌面端', browser: 'Edge', register_date: '2024-03-01' },
  { visitor_id: 'V008', type: '企业用户', region: '欧洲', device: '桌面端', browser: 'Firefox', register_date: '2024-04-01' },
  { visitor_id: 'V015', type: '企业用户', region: '北美', device: '桌面端', browser: 'Chrome', register_date: '2024-04-20' }
];

// 访客行为记录表
const visitorActivities = [
  // 1月数据
  { visitor_id: 'V001', month: '1月', activity: '浏览组件', component: 'Button', duration: 300, visits: 15 },
  { visitor_id: 'V001', month: '1月', activity: '下载源码', component: 'Table', duration: 120, visits: 3 },
  { visitor_id: 'V002', month: '1月', activity: '浏览组件', component: 'Form', duration: 450, visits: 8 },
  { visitor_id: 'V002', month: '1月', activity: '使用文档', component: 'Chart', duration: 600, visits: 12 },
  { visitor_id: 'V009', month: '1月', activity: '浏览组件', component: 'Button', duration: 250, visits: 12 },
  { visitor_id: 'V009', month: '1月', activity: '使用文档', component: 'Modal', duration: 380, visits: 18 },
  
  // 2月数据
  { visitor_id: 'V001', month: '2月', activity: '浏览组件', component: 'Modal', duration: 200, visits: 10 },
  { visitor_id: 'V002', month: '2月', activity: '下载源码', component: 'Button', duration: 180, visits: 5 },
  { visitor_id: 'V003', month: '2月', activity: '浏览组件', component: 'Table', duration: 350, visits: 18 },
  { visitor_id: 'V004', month: '2月', activity: '使用文档', component: 'Form', duration: 500, visits: 20 },
  { visitor_id: 'V005', month: '2月', activity: '浏览组件', component: 'Chart', duration: 280, visits: 12 },
  { visitor_id: 'V009', month: '2月', activity: '下载源码', component: 'Form', duration: 200, visits: 6 },
  { visitor_id: 'V010', month: '2月', activity: '浏览组件', component: 'Button', duration: 320, visits: 16 },
  { visitor_id: 'V010', month: '2月', activity: '使用文档', component: 'Table', duration: 420, visits: 22 },
  
  // 3月数据
  { visitor_id: 'V001', month: '3月', activity: '使用文档', component: 'Button', duration: 400, visits: 22 },
  { visitor_id: 'V002', month: '3月', activity: '浏览组件', component: 'Modal', duration: 320, visits: 15 },
  { visitor_id: 'V003', month: '3月', activity: '下载源码', component: 'Table', duration: 250, visits: 8 },
  { visitor_id: 'V004', month: '3月', activity: '使用文档', component: 'Chart', duration: 650, visits: 25 },
  { visitor_id: 'V005', month: '3月', activity: '浏览组件', component: 'Form', duration: 300, visits: 14 },
  { visitor_id: 'V006', month: '3月', activity: '使用文档', component: 'Button', duration: 400, visits: 18 },
  { visitor_id: 'V007', month: '3月', activity: '浏览组件', component: 'Modal', duration: 280, visits: 14 },
  { visitor_id: 'V009', month: '3月', activity: '使用文档', component: 'Chart', duration: 480, visits: 24 },
  { visitor_id: 'V010', month: '3月', activity: '下载源码', component: 'Button', duration: 160, visits: 5 },
  { visitor_id: 'V011', month: '3月', activity: '浏览组件', component: 'Form', duration: 350, visits: 17 },
  { visitor_id: 'V012', month: '3月', activity: '使用文档', component: 'Table', duration: 500, visits: 25 },
  
  // 4月数据
  { visitor_id: 'V001', month: '4月', activity: '下载源码', component: 'Chart', duration: 180, visits: 6 },
  { visitor_id: 'V002', month: '4月', activity: '使用文档', component: 'Table', duration: 520, visits: 28 },
  { visitor_id: 'V003', month: '4月', activity: '浏览组件', component: 'Modal', duration: 380, visits: 20 },
  { visitor_id: 'V004', month: '4月', activity: '下载源码', component: 'Form', duration: 220, visits: 9 },
  { visitor_id: 'V006', month: '4月', activity: '浏览组件', component: 'Button', duration: 350, visits: 16 },
  { visitor_id: 'V007', month: '4月', activity: '使用文档', component: 'Chart', duration: 480, visits: 22 },
  { visitor_id: 'V008', month: '4月', activity: '浏览组件', component: 'Table', duration: 290, visits: 13 },
  { visitor_id: 'V009', month: '4月', activity: '下载源码', component: 'Modal', duration: 200, visits: 7 },
  { visitor_id: 'V010', month: '4月', activity: '浏览组件', component: 'Chart', duration: 400, visits: 19 },
  { visitor_id: 'V011', month: '4月', activity: '使用文档', component: 'Button', duration: 380, visits: 20 },
  { visitor_id: 'V012', month: '4月', activity: '浏览组件', component: 'Form', duration: 320, visits: 15 },
  { visitor_id: 'V013', month: '4月', activity: '使用文档', component: 'Table', duration: 450, visits: 23 },
  { visitor_id: 'V014', month: '4月', activity: '浏览组件', component: 'Modal', duration: 280, visits: 14 },
  { visitor_id: 'V015', month: '4月', activity: '使用文档', component: 'Chart', duration: 520, visits: 26 }
];

// 交易记录表（个体开发者通过众多小额捐赠累积成远超企业用户的总营收）
const transactionRecords = [
  // 1月交易 - 个体开发者积少成多，企业用户单笔较大
  { visitor_id: 'V001', month: '1月', type: '捐赠', amount: 180, frequency: 3 },
  { visitor_id: 'V003', month: '1月', type: '捐赠', amount: 120, frequency: 2 },
  { visitor_id: 'V009', month: '1月', type: '捐赠', amount: 200, frequency: 4 },
  { visitor_id: 'V002', month: '1月', type: '购买商业授权', amount: 800, frequency: 1 },
  
  // 2月交易 - 个体开发者持续贡献，营收增长
  { visitor_id: 'V001', month: '2月', type: '捐赠', amount: 250, frequency: 5 },
  { visitor_id: 'V003', month: '2月', type: '捐赠', amount: 160, frequency: 3 },
  { visitor_id: 'V005', month: '2月', type: '捐赠', amount: 140, frequency: 2 },
  { visitor_id: 'V009', month: '2月', type: '捐赠', amount: 320, frequency: 6 },
  { visitor_id: 'V010', month: '2月', type: '捐赠', amount: 180, frequency: 3 },
  { visitor_id: 'V004', month: '2月', type: '购买商业授权', amount: 1200, frequency: 1 },
  
  // 3月交易 - 个体开发者群体爆发式增长
  { visitor_id: 'V001', month: '3月', type: '捐赠', amount: 300, frequency: 6 },
  { visitor_id: 'V003', month: '3月', type: '捐赠', amount: 220, frequency: 4 },
  { visitor_id: 'V005', month: '3月', type: '捐赠', amount: 190, frequency: 3 },
  { visitor_id: 'V007', month: '3月', type: '捐赠', amount: 240, frequency: 4 },
  { visitor_id: 'V009', month: '3月', type: '捐赠', amount: 380, frequency: 7 },
  { visitor_id: 'V010', month: '3月', type: '捐赠', amount: 280, frequency: 5 },
  { visitor_id: 'V011', month: '3月', type: '捐赠', amount: 160, frequency: 3 },
  { visitor_id: 'V012', month: '3月', type: '捐赠', amount: 210, frequency: 4 },
  { visitor_id: 'V002', month: '3月', type: '购买商业授权', amount: 950, frequency: 1 },
  { visitor_id: 'V006', month: '3月', type: '购买商业授权', amount: 1100, frequency: 1 },
  
  // 4月交易 - 个体开发者持续高增长，远超企业用户
  { visitor_id: 'V001', month: '4月', type: '捐赠', amount: 420, frequency: 8 },
  { visitor_id: 'V003', month: '4月', type: '捐赠', amount: 280, frequency: 5 },
  { visitor_id: 'V005', month: '4月', type: '捐赠', amount: 230, frequency: 4 },
  { visitor_id: 'V007', month: '4月', type: '捐赠', amount: 320, frequency: 6 },
  { visitor_id: 'V009', month: '4月', type: '捐赠', amount: 480, frequency: 9 },
  { visitor_id: 'V010', month: '4月', type: '捐赠', amount: 350, frequency: 6 },
  { visitor_id: 'V011', month: '4月', type: '捐赠', amount: 240, frequency: 4 },
  { visitor_id: 'V012', month: '4月', type: '捐赠', amount: 290, frequency: 5 },
  { visitor_id: 'V013', month: '4月', type: '捐赠', amount: 200, frequency: 3 },
  { visitor_id: 'V014', month: '4月', type: '捐赠', amount: 180, frequency: 3 },
  { visitor_id: 'V004', month: '4月', type: '购买商业授权', amount: 1300, frequency: 1 },
  { visitor_id: 'V008', month: '4月', type: '购买商业授权', amount: 1150, frequency: 1 },
  { visitor_id: 'V015', month: '4月', type: '购买商业授权', amount: 900, frequency: 1 }
];

// =====================================
// 动态图表数据处理函数
// =====================================

/**
 * 根据图表类型获取正确的数据格式和配置
 * @param {string} type - 图表类型
 * @param {Array} rawData - 原始数据
 * @returns {Object} 包含chartType、data和config的对象
 */
export function getChartDataAndConfig(type, rawData = visitorActivities) {
  switch (type) {
    case 'bar':
    case 'line':
      return {
        chartType: type,
        data: createCartesianData(rawData),
        config: {
          boundaryGap: type === 'bar'
        }
      }
    
    case 'pie':
    case 'rose':
      return {
        chartType: 'pie',
        data: createPieData(rawData),
        config: type === 'rose' ? { roseType: 'area' } : {}
      }
    
    case 'radar':
      return {
        chartType: 'radar',
        data: createRadarData(rawData),
        config: {}
      }
    
    case 'scatter':
      return {
        chartType: 'scatter',
        data: createScatterData(rawData),
        config: {}
      }
    
    default:
      return {
        chartType: 'bar',
        data: createCartesianData(rawData),
        config: {}
      }
  }
}

/**
 * 创建直角坐标系数据（柱状图/折线图）
 * @param {Array} rawData - 原始数据
 * @returns {Object} 转换后的图表数据
 */
export function createCartesianData(rawData) {
  const monthlyStats = {}
  
  rawData.forEach(activity => {
    const key = `${activity.month}-${activity.activity}`
    if (!monthlyStats[key]) {
      monthlyStats[key] = {
        month: activity.month,
        activity: activity.activity,
        total_visits: 0
      }
    }
    monthlyStats[key].total_visits += activity.visits
  })
  
  const converted = EChartsDataConverter.convertToEChartsData(
    Object.values(monthlyStats),
    { categoryField: 'month', valueField: 'total_visits', seriesField: 'activity' },
    'bar'
  )
  
  return {
    xAxis: converted.xAxis.data,
    series: converted.series.map(series => ({
      name: series.name,
      data: series.data
    }))
  }
}

/**
 * 创建饼图数据
 * @param {Array} rawData - 原始数据
 * @returns {Object} 转换后的图表数据
 */
export function createPieData(rawData) {
  const activityStats = {}
  
  rawData.forEach(activity => {
    if (!activityStats[activity.activity]) {
      activityStats[activity.activity] = 0
    }
    activityStats[activity.activity] += activity.visits
  })
  
  const pieData = Object.entries(activityStats).map(([name, value]) => ({
    name,
    value
  }))
  
  return {
    series: [{
      data: pieData
    }]
  }
}

/**
 * 创建雷达图数据
 * @param {Array} rawData - 原始数据
 * @returns {Object} 转换后的图表数据
 */
export function createRadarData(rawData) {
  const componentStats = {}
  
  rawData.forEach(activity => {
    if (!componentStats[activity.component]) {
      componentStats[activity.component] = {
        '浏览组件': 0,
        '下载源码': 0,
        '使用文档': 0
      }
    }
    componentStats[activity.component][activity.activity] += activity.visits
  })
  
  const activities = ['浏览组件', '下载源码', '使用文档']
  const maxValues = activities.map(activity => {
    return Math.max(...Object.values(componentStats).map(comp => comp[activity] || 0))
  })
  
  return {
    indicator: activities.map((activity, index) => ({
      name: activity,
      max: maxValues[index] * 1.2
    })),
    series: [{
      data: Object.keys(componentStats).slice(0, 3).map(component => ({
        name: component,
        value: activities.map(activity => componentStats[component][activity] || 0)
      }))
    }]
  }
}

/**
 * 创建散点图数据
 * @param {Array} rawData - 原始数据
 * @returns {Object} 转换后的图表数据
 */
export function createScatterData(rawData) {
  const scatterData = {}
  
  rawData.forEach(activity => {
    if (!scatterData[activity.activity]) {
      scatterData[activity.activity] = []
    }
    scatterData[activity.activity].push([activity.duration, activity.visits])
  })
  
  return {
    series: Object.entries(scatterData).map(([activity, data]) => ({
      name: activity,
      data: data
    }))
  }
}

/**
 * 获取当前图表标题
 * @param {string} chartType - 图表类型
 * @returns {string} 图表标题
 */
export function getChartTitle(chartType) {
  const titles = {
    bar: '月度活动统计 - 柱状图展示',
    line: '活动趋势分析 - 折线图展示',
    pie: '行为类型分布 - 饼图展示',
    rose: '行为类型分布 - 玫瑰图展示',
    radar: '组件多维度分析 - 雷达图展示',
    scatter: '时长与访问次数关系 - 散点图展示'
  }
  return titles[chartType] || '数据展示'
}

// =====================================
// 基于业务逻辑的数据分析和图表构建
// =====================================

// 图表1：月度营收对比 - 个体开发者 vs 企业用户
export const revenueChartData = (() => {
  const revenueData = [];
  
  // 按月份和访客类型聚合收入
  const monthlyRevenue = {};
  
  transactionRecords.forEach(record => {
    const visitor = visitorProfiles.find(v => v.visitor_id === record.visitor_id);
    const key = `${record.month}-${visitor.type}`;
    
    if (!monthlyRevenue[key]) {
      monthlyRevenue[key] = {
        month: record.month,
        visitor_type: visitor.type,
        total_revenue: 0
      };
    }
    monthlyRevenue[key].total_revenue += record.amount;
  });
  
  Object.values(monthlyRevenue).forEach(item => {
    revenueData.push(item);
  });

  const converted = EChartsDataConverter.convertToEChartsData(
    revenueData,
    { categoryField: 'month', valueField: 'total_revenue', seriesField: 'visitor_type' },
    'bar'
  );
  
  return {
    xAxis: converted.xAxis.data,
    series: converted.series.map(series => ({
      name: series.name,
      data: series.data
    }))
  };
})();

// 图表2：访客活跃度趋势 - 不同地区访客的月度访问次数
export const visitorTrendData = (() => {
  const trendData = [];
  
  // 按月份和地区聚合访问次数
  const monthlyVisits = {};
  
  visitorActivities.forEach(activity => {
    const visitor = visitorProfiles.find(v => v.visitor_id === activity.visitor_id);
    const key = `${activity.month}-${visitor.region}`;
    
    if (!monthlyVisits[key]) {
      monthlyVisits[key] = {
        month: activity.month,
        region: visitor.region,
        total_visits: 0
      };
    }
    monthlyVisits[key].total_visits += activity.visits;
  });
  
  Object.values(monthlyVisits).forEach(item => {
    trendData.push(item);
  });

  const converted = EChartsDataConverter.convertToEChartsData(
    trendData,
    { categoryField: 'month', valueField: 'total_visits', seriesField: 'region' },
    'line'
  );
  
  return {
    xAxis: converted.xAxis.data,
    series: converted.series.map(series => ({
      name: series.name,
      data: series.data
    }))
  };
})();

// 图表3：访客行为分布 - 用户在组件库中的行为类型分布
export const behaviorChartData = (() => {
  const behaviorData = [];
  const behaviorMap = {};
  
  // 统计各种行为的总次数
  visitorActivities.forEach(activity => {
    if (!behaviorMap[activity.activity]) {
      behaviorMap[activity.activity] = {
        activity: activity.activity,
        total_count: 0
      };
    }
    behaviorMap[activity.activity].total_count += activity.visits;
  });
  
  Object.values(behaviorMap).forEach(item => {
    behaviorData.push(item);
  });

  const converted = EChartsDataConverter.convertToEChartsData(
    behaviorData,
    { categoryField: 'activity', valueField: 'total_count' },
    'pie'
  );
  
  return {
    series: converted.series
  };
})();

// 图表4：访客类型活跃度分析 - 个体开发者 vs 企业用户的月度活跃时长
export const engagementChartData = (() => {
  const engagementData = [];
  
  // 按月份和访客类型聚合活跃时长
  const monthlyEngagement = {};
  
  visitorActivities.forEach(activity => {
    const visitor = visitorProfiles.find(v => v.visitor_id === activity.visitor_id);
    const key = `${activity.month}-${visitor.type}`;
    
    if (!monthlyEngagement[key]) {
      monthlyEngagement[key] = {
        month: activity.month,
        visitor_type: visitor.type,
        total_duration: 0
      };
    }
    monthlyEngagement[key].total_duration += activity.duration;
  });
  
  Object.values(monthlyEngagement).forEach(item => {
    // 转换为小时单位
    item.total_hours = Math.round(item.total_duration / 60 * 10) / 10;
    engagementData.push(item);
  });

  const converted = EChartsDataConverter.convertToEChartsData(
    engagementData,
    { categoryField: 'month', valueField: 'total_hours', seriesField: 'visitor_type' },
    'area'
  );
  
  return {
    xAxis: converted.xAxis.data,
    series: converted.series.map(series => ({
      name: series.name,
      data: series.data
    }))
  };
})();

// 导出数据（保持原有的命名，便于组件使用）
export const barChartData = revenueChartData;
export const lineChartData = visitorTrendData;
export const pieChartData = behaviorChartData;
export const areaChartData = engagementChartData;

// 导出原始数据表，供组件使用
export { visitorActivities };
