<!-- <script setup lang="ts">
import { Vue3RulerTool } from 'vue3-ruler-tool'
import 'vue3-ruler-tool/dist/style.css'
</script>
<template>
  <vue3-ruler-tool :content-layout="{ left: 200, top: 100 }" :is-scale-revise="false">
    <div class="test"></div>
  </vue3-ruler-tool>
</template>
<style scoped>
</style> -->
<template>
  <div class="screen" @click="toggle">切换全屏状态</div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

// 默认以整个网页为全屏目标，也可指定元素：const el = ref<HTMLElement>()
const { isFullscreen, toggle } = useFullscreen()
</script>
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
