<script setup lang="ts">
import { countViewChart } from '@/api/count'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { ref } from 'vue'
import type { ComponentMap, Componented } from '@/types'
// Vue 单文件组件（.vue 文件）通过 defineComponent 或 <script setup> 定义后，其默认导出的是一个 ​​组件选项对象​​（即构造器），而非实例化的组件对象36。
import {
  BasicBar,
  BasicLine,
  ChinaMap,
  BasicHbar,
  BasicPie,
  BasicDoughnut,
} from '@/components/echarts'
import { useFullscreen } from '@vueuse/core'

// 默认以整个网页为全屏目标，也可指定元素：const el = ref<HTMLElement>()
const { isFullscreen, toggle } = useFullscreen()

const route = useRoute()
const id: string = route.params.id as string
const components = ref<Componented[]>([])
const componentMap: ComponentMap = {
  line: BasicLine,
  bar: BasicBar,
  'cn-map': ChinaMap,
  hbar: BasicHbar,
  pie: BasicPie,
  doughnut: BasicDoughnut,
}
// 获取信息
const getDetail = async () => {
  const {
    data: {
      data: {
        chartData: { elements },
      },
    },
  } = await countViewChart(id)
  components.value = elements
}
onMounted(() => {
  getDetail()
})
</script>
<template>
  <div class="screen" @click="toggle">切换全屏状态</div>
  <component
    v-for="item in components"
    :key="item.dataOption.id"
    :is="componentMap[item.type]"
    v-model:w="item.dataOption.w"
    v-model:h="item.dataOption.h"
    :x="item.dataOption.x"
    :y="item.dataOption.y"
    v-model:bgcolor="item.dataOption.bgcolor"
    :state="false"
    :chartData="item.dataOption.chartdata"
  ></component>
</template>
<style scoped>
.screen {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 80px;
  line-height: 80px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  text-align: center;
  font-size: 24px;
  opacity: 0;
  z-index: 999;
}
.screen:hover {
  opacity: 1;
}
</style>
