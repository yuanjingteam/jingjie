<template>
  <publicVue :optionData="optionData"></publicVue>
</template>
<script setup lang="ts">
import publicVue from '../publicVue.vue'
const optionData = {
  series: [
    {
      type: 'pie', // ① 图表类型改为饼图[1,4](@ref)
      data: [
        // ② 数据格式改造为对象数组
        { value: 120, name: 'Mon' },
        { value: 200, name: 'Tue' },
        { value: 150, name: 'Wed' },
        { value: 80, name: 'Thu' },
        { value: 70, name: 'Fri' },
        { value: 110, name: 'Sat' },
        { value: 130, name: 'Sun' },
      ],
      radius: '50%', // ③ 设置饼图半径[1,4](@ref)
    },
  ],
}
</script>
