<script setup lang="ts">
import { countViewChart } from '@/api/count'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { ref } from 'vue'
import basicLine from '@/components/echarts/basicLine.vue'
import basicBar from '@/components/echarts/basicBar.vue'
import { useFullscreen } from '@vueuse/core'

// 默认以整个网页为全屏目标，也可指定元素：const el = ref<HTMLElement>()
const { isFullscreen, toggle } = useFullscreen()
type ChartType = 'line' | 'bar'

interface DataOption {
  active: boolean
  bgcolor: string
  data: object
  id: string
  w: number
  h: number
  x: number
  y: number
}

interface ChartItem {
  type: ChartType
  dataOption: DataOption
}

const route = useRoute()
const id: string = route.params.id as string
const components = ref<ChartItem[]>([])

const componentMap = {
  line: basicLine,
  bar: basicBar,
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
}
.screen:hover {
  opacity: 1;
}
</style>
