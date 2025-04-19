<template>
  <publicVue :optionData="optionData"></publicVue>
</template>
<script setup lang="ts">
import publicVue from '../publicVue.vue'
const optionData = {
  yAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  xAxis: { type: 'value' },
  series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: 'bar' }],
}
</script>
