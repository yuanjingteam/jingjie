<script lang="ts" setup>
import { reactive, ref } from 'vue'

const dialogTableVisible = ref(false)
const switchShow = () => {
  dialogTableVisible.value = !dialogTableVisible.value
}
const formLabelWidth = '140px'
// 静态json数据
const props = defineProps({
  chartData: {
    type: Object,
  },
})
const emits = defineEmits(['handlefn'])
defineExpose({
  dialogTableVisible,
  switchShow,
})
</script>
<template>
  <div class="box">
    <el-dialog v-model="dialogTableVisible" title="编辑数据源" width="600">
      <el-button @click="emits('handlefn', { type: 'add' })" style="color: #409eff"
        >添加行</el-button
      >
      <el-table :data="chartData" height="250">
        <el-table-column property="name" label="名称" width="200">
          <template #default="{ row }">
            <el-input
              :modelValue="row.name"
              @update:model-value="
                emits('handlefn', { type: 'modify_name', value: row, value2: $event })
              "
              class="inp"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column property="value" label="值" width="150">
          <template #default="{ row }">
            <el-input
              :modelValue="row.value"
              @update:model-value="
                emits('handlefn', { type: 'modify_value', value: row, value2: $event })
              "
              class="inp"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="emits('handlefn', { type: 'delete', value: row })">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogTableVisible = false"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped>
.inp:deep(.el-input__wrapper) {
  background-color: #fff !important;
  /* color: black !important; */
  height: 30px !important;
}
.inp:deep(.el-input__inner) {
  color: #606266 !important;
}
</style>
