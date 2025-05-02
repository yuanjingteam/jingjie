<template>
  <publicVue :optionData="optionData"></publicVue>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import publicVue from '../publicVue.vue'
const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
})
const optionData = computed(() => {
  return {
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'], // 环形图关键参数[1,2](@ref)
        data: props.chartData,
        label: {
          formatter: '{b}\n{c}',
        },
      },
    ],
  }
})
</script>
