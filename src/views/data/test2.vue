<template>
  <div>子组件</div>
  {{ props.optionData }}
</template>
<script setup>
import { watch, reactive } from 'vue'
const props = defineProps({
  optionData: {
    type: Object,
  },
})
watch(
  props.optionData,
  (newVal) => {
    console.log('触发监听')
  },
  { deep: true }, // 仍不触发
)
</script>
