<script setup lang="ts">
import { reactive, ref } from 'vue'

const currentPage4 = ref(1)
const pageSize4 = ref(10)
const disabled = ref(false)

const showAddBox = () => {
  ElMessageBox.prompt('输入大屏标题', '创建大屏项目', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /\S/,
    inputErrorMessage: '标题不能为空',
  })
}
</script>
<template>
  <div class="demo-pagination-block">
    <el-pagination
      style="margin: 20px; justify-content: center"
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
      :disabled="disabled"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="20"
    />
  </div>
  <main>
    <div @click="showAddBox" class="item_add"><p>新建大屏</p></div>
  </main>
</template>
<style scoped lang="scss">
main {
  padding: 10px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .item_add {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 266px;
    height: 184px;
    background-image: linear-gradient(-90deg, rgba(0, 222, 255, 0.39), rgba(0, 174, 255, 0.19));
    box-shadow: 0 0 10px 0 rgba(55, 224, 255, 0.3);
    border: 1px solid #00baff;
    margin-left: 18px;
    margin-bottom: 40px;
    P {
      padding-top: 30px;
      color: #8eeeff;
      font-size: 14px;
    }
  }
  .item_add::after {
    position: absolute;
    top: 40px;
    content: '+';
    font-weight: 100;
    color: #8eeeff;
    font-size: 30px;
  }
  .item_add:hover {
    cursor: pointer;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.8);
  }
}
</style>
