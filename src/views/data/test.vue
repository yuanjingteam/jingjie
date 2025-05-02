<!-- <script setup>
import { reactive } from 'vue'
import Data from '@/utils/jsonData'
import codeEditor from './components/codeEditor.vue'
const jsonData = reactive([...Data])
const ttt = reactive({
  value: {
    1: 'one',
    2: 'two',
  },
})
const addnew = () => {
  ttt.value[3] = 'three'
  console.log(ttt)
  jsonData[0].key = 'Mon1'
  jsonData[0].id = 1
  jsonData.push(123)
}
const addnew2 = () => {
  ttt.value2 = 'three'
  console.log(ttt)
}
const xiugai = () => {
  ttt.value2 = '修改后了'
}
</script>
<template>
  <div class="test">
    {{ Object.keys(Data) }}
    {{ ttt }}
    {{ ttt.value2 }}
    <button @click="addnew">添加新属性,最内层，测试是否具有响应式</button>
    <button @click="addnew2">添加新属性,最外层层，测试是否具有响应式</button>
    <button @click="xiugai">后续修改，测试是否具有响应性</button>
    {{ jsonData }}
  </div>
  <div class="hua"></div>
  <codeEditor></codeEditor>
</template>
<style scoped>
.test {
  background-color: pink;
}
.hua {
  position: relative;
  z-index: 1;
  width: 3000px;
  height: 300px;
  background-color: pink;
}
</style> -->
<template>
  <button @click="handle">修改data的值</button>
  <button @click="handle1">添加data的值</button>{{ data }}
  <test2 :optionData="optionData"></test2>
</template>
<script setup>
import { reactive, computed, watch } from 'vue'
import test2 from './test2.vue'
const data = reactive({
  x: 1,
  y: 2,
})
const handle = () => {
  data.x = 123
}
const handle1 = () => {
  data.z = 123
}
const optionData = computed(() => ({
  title: 'Weekly Sales',
  xAxis: data,
  series: data.y,
}))
// 父组件
// 父组件中添加不可预测的嵌套结构
// const optionData = computed(() => ({
//   title: 'Weekly Sales',
//   xAxis: data,
//   series: data.y,
//   ...data,
//   _hash: {
//     timestamp: Date.now(),
//     random: Math.random(), // 增加随机嵌套
//   },
// }))
watch(
  optionData,
  () => {
    console.log('组件件检测到了optionData的变化')
  },
  {
    deep: true,
  },
)
</script>
