<template>
  <publicVue :optionData="optionData"></publicVue>
</template>
<script setup lang="ts">
import publicVue from '../publicVue.vue'
const optionData = {
  title: { text: 'Weekly Sales' },
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: { type: 'value' },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      smooth: true,
    },
  ],
}
</script>
