<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import bigScreen from './components/bigScreen.vue'
import { countGetData } from '@/api/count'
import { useUserStore } from '@/stores'
import { createChart } from '@/api/count'
// 生成id
import { v4 as uuidv4 } from 'uuid'
import router from '@/router'
/* reactive能自动识别类型，但是这里识别不出来chartList,需要声明,不声明的话，此时访问 item._id 会触发 TypeScript 的 never 类型保护，因为 never[] 表示 ​​不可能有元素的数组​​。*/
const state = reactive({
  title: '',
  chartList: [] as Array<{ _id: string }>,
  total: 0,
})
const userStore = useUserStore()
const params = reactive({
  uid: userStore.user.uid,
  pageSize: 10,
  pageNo: 1,
})
const disabled = ref(false)
const showAddBox = () => {
  ElMessageBox.prompt('输入大屏标题', '创建大屏项目', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /\S/,
    inputErrorMessage: '标题不能为空',
  }).then(async ({ value }) => {
    const {
      data: {
        data: { _id },
      },
    } = await createChart({ title: value, uid: userStore.user.uid })
    router.push(`/edit/${_id}`)
  })
}
// 获取数据
const getData = async () => {
  const {
    data: {
      data: { chartList, total },
    },
  } = await countGetData(params)
  state.total = total
  state.chartList = chartList
}
getData()
// 处理组件内部的逻辑函数
const handlefn = (value: string) => {
  if (value === 'delete' || value === 'copy') {
    getData()
  }
}
// 监听params
watch(
  params,
  () => {
    getData()
  },
  { deep: true },
)
</script>
<template>
  <div class="demo-pagination-block">
    <el-pagination
      style="margin: 20px; justify-content: center"
      v-model:current-page="params.pageNo"
      v-model:page-size="params.pageSize"
      :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
      :disabled="disabled"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="state.total"
    />
  </div>
  <main>
    <div @click="showAddBox" class="item_add"><p>新建大屏</p></div>
    <template v-if="state.total !== 0">
      <bigScreen
        v-if="state.total !== 0"
        v-for="item in state.chartList"
        :key="item._id"
        :itemDate="item"
        :item="item"
        @handleSuccess="handlefn"
      ></bigScreen>
    </template>
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
