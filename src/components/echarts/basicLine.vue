<template>
  <publicVue :optionData="optionData"></publicVue>
</template>
<script setup lang="ts">
import publicVue from '../publicVue.vue'
import { computed, reactive, watch } from 'vue'
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
const categories = computed(() => props.chartData.map((item: ChartDataItem) => item.name))
const values = computed(() => props.chartData.map((item: ChartDataItem) => item.value))
const optionData = computed(() => {
  return {
    title: { text: 'Weekly Sales' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: categories.value,
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: values.value,
        type: 'line',
        smooth: true,
      },
    ],
  }
})
</script>
