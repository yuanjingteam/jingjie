<template>
  <publicVue :optionData="optionData"></publicVue>
</template>
<script setup lang="ts">
import { computed } from 'vue'
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
const categories = computed(() => props.chartData.map((item: ChartDataItem) => item.name)) // ['Mon', 'Tue', ...]
const values = computed(() => props.chartData.map((item: ChartDataItem) => item.value)) // [150, 230, ...]
const optionData = computed(() => {
  return {
    xAxis: { type: 'category', data: categories.value },
    yAxis: { type: 'value' },
    series: [{ data: values.value, type: 'bar' }],
  }
})
</script>
