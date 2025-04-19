// src/utils/echarts.ts

/* 核心模块 (必须) */
import * as echarts from 'echarts/core'

/* 图表类型 (按需引入) */
import {
  BarChart, // 柱状图
  LineChart, // 折线图
  PieChart, // 饼图
  GaugeChart, // 仪表盘
  ScatterChart, // 散点图
  MapChart, // 地图
} from 'echarts/charts'

/* 基础组件 (必须) */
import {
  TitleComponent, // 标题
  TooltipComponent, // 提示框
  GridComponent, // 直角坐标系
  LegendComponent, // 图例
  DatasetComponent, // 数据集
  TransformComponent, // 数据转换器
} from 'echarts/components'

/* 扩展功能 */
import {
  LabelLayout, // 标签自动布局
  UniversalTransition, // 全局过渡动画
} from 'echarts/features'

/* 渲染器 (必须选其一) */
import { CanvasRenderer } from 'echarts/renderers' // Canvas渲染器

// 模块化注册
echarts.use([
  // 基础组件
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,

  // 图表类型
  BarChart,
  LineChart,
  PieChart,
  GaugeChart,
  ScatterChart,
  MapChart,

  // 扩展功能
  LabelLayout,
  UniversalTransition,

  // 渲染器
  CanvasRenderer,
])

// 导出初始化方法
export const initECharts = (dom: HTMLElement, theme?: string) => {
  return echarts.init(dom, theme, {
    renderer: 'canvas', // 指定渲染模式
    devicePixelRatio: window.devicePixelRatio, // 适配高清屏
  })
}

// 导出类型支持
export type EChartsCoreOption = echarts.EChartsCoreOption
export type ECharts = echarts.ECharts
export default echarts
