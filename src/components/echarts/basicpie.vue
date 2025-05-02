<template>
  <publicVue :optionData="optionData"></publicVue>
</template>
<script setup lang="ts">
import { compile, computed } from 'vue'
import publicVue from '../publicVue.vue'
interface ChartDataItem {
  name: String | Number
  value: Number
}
const props = defineProps({
  chartData: {
    type: Array<ChartDataItem>,
    required: true,
  },
})
const optionData = computed(() => {
  return {
    series: [
      {
        type: 'pie', // ① 图表类型改为饼图[1,4](@ref)
        data: props.chartData,
        radius: '50%', // ③ 设置饼图半径[1,4](@ref)
      },
    ],
  }
})
</script>
