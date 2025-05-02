import type { ChartDataItem } from './chart-data'
export type ChartType = 'line' | 'bar' | 'cn-map' | 'hbar' | 'pie' | 'doughnut'
import {
  BasicBar,
  BasicLine,
  ChinaMap,
  BasicHbar,
  BasicPie,
  BasicDoughnut,
} from '@/components/echarts'

// 动态组件映射表
export type ComponentMap = {
  [K in ChartType]:
    | typeof BasicLine
    | typeof BasicBar
    | typeof ChinaMap
    | typeof BasicHbar
    | typeof BasicPie
    | typeof BasicDoughnut
}
// 组件的数据
export interface Componented {
  type: ChartType
  dataOption: {
    name: string
    x: number
    y: number
    w: number
    h: number
    bgcolor: string
    active: boolean
    data?: {}
    id: string
    chartdata: ChartDataItem[]
  }
}
