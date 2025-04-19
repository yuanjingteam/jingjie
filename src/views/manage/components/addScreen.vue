<template>
  <el-dialog v-model="outerVisible" title="发布" width="800">
    <div>发布成功，当前图表的公开链接为</div>
    <el-input v-model="porps.url" :readonly="true"></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handlefn"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const porps = defineProps({
  url: String,
})
const outerVisible = ref(false)
const ifshow = () => {
  outerVisible.value = !outerVisible.value
}
const handlefn = () => {
  outerVisible.value = false
  router.push('/')
}
defineExpose({
  ifshow,
})
</script>
<style scoped>
:deep(.el-input__wrapper) {
  background-color: #262c33;
  padding: 15px;
  color: #fff;
  margin: 20px 0;
}
:deep(.el-input__inner) {
  color: #fff;
  font-size: 16px;
}
</style>
