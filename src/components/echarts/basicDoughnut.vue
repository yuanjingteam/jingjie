<template>
  <publicVue :optionData="optionData"></publicVue>
</template>
<script setup lang="ts">
import publicVue from '../publicVue.vue'
const optionData = {
  series: [
    {
      type: 'pie',
      radius: ['45%', '70%'], // 环形图关键参数[1,2](@ref)
      data: [
        { value: 120, name: 'Mon' },
        { value: 200, name: 'Tue' },
        { value: 150, name: 'Wed' },
        { value: 80, name: 'Thu' },
        { value: 70, name: 'Fri' },
        { value: 110, name: 'Sat' },
        { value: 130, name: 'Sun' },
      ],
      label: {
        formatter: '{b}\n{c}',
      },
    },
  ],
}
</script>
