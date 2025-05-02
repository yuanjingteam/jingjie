<template>
  <Vue3DraggableResizable
    :initW="props.w"
    :initH="props.h"
    v-model:x="props.x"
    v-model:y="props.y"
    v-model:w="props.w"
    v-model:h="props.h"
    @dragging="handleDragging"
    @resizing="handleResizing"
    :parent="true"
    :draggable="props.state"
  >
    <div
      ref="chartRef"
      class="chart-container"
      :style="{
        width: props.w + 'px',
        height: props.h + 'px',
        backgroundColor: props.bgcolor,
      }"
    ></div>
  </Vue3DraggableResizable>
</template>

<script setup lang="ts">
import Vue3DraggableResizable from 'vue3-draggable-resizable-v2'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { initECharts, type EChartsCoreOption, type ECharts } from '@/utils/echarts'
import * as echarts from 'echarts/core'
import chinaGeoJSON from '@/assets/geojson/china.json'
const props = defineProps({
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  w: {
    type: Number,
    default: 300,
  },
  h: {
    type: Number,
    default: 200,
  },
  bgcolor: {
    type: String,
    default: 'transparent',
  },
  state: {
    type: Boolean,
    default: true,
  },
  optionData: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['update:x', 'update:y', 'update:w', 'update:h', 'getOption'])
// 1. 类型定义（根据实际使用的图表类型调整）
type ECOption = EChartsCoreOption
// 2. 图表实例管理
const chartRef = ref<HTMLElement>()
let chartInstance: ECharts | null = null
// const data = ref({
//   optionData: props.optionData,
// })
// 3. 配置项（复杂场景建议使用ref）
const option: ECOption = props.optionData
// 重绘
const resize = () => {
  if (chartInstance) {
    chartInstance.resize({
      width: props.w,
      height: props.h,
      animation: { duration: 300 },
    })
  }
}

// 4. 图表生命周期管理
onMounted(() => {
  if (!chartRef.value) return
  // 注册地图
  if (props.type) {
    echarts.registerMap('china', chinaGeoJSON as any)
  }
  // 初始化图表（带高清屏适配）
  chartInstance = initECharts(chartRef.value)

  // 配置项设置
  chartInstance.setOption(option)

  // 响应式适配
  const resizeHandler = () => chartInstance?.resize()
  window.addEventListener('resize', resizeHandler)
  // console.log(data.value.optionData)
  emits('getOption', props.optionData)
  // 自动清理
  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler)
    chartInstance?.dispose()
    chartInstance = null
  })
})
// 监听拖拽和缩放事件
const handleDragging = (val: { x: number; y: number }) => {
  emits('update:x', val.x)
  emits('update:y', val.y)
}

const handleResizing = (val: { w: number; h: number }) => {
  emits('update:w', val.w)
  emits('update:h', val.h)
  resize()
}
watch(
  () => props.optionData, // 改用函数返回
  (new1) => {
    console.log('子组件监听到变化', new1)
    chartInstance?.setOption(new1) // 关键：更新图表
    console.log(props.optionData)
    emits('getOption', props.optionData)
  },
  { deep: true, immediate: true }, // 补充 immediate 确保初始化触发
)
</script>

<style scoped>
.chart-container {
  position: absolute;
  transition: all 0.5s;
}
</style>
