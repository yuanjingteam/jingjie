<script setup lang="ts">
import { reactive } from 'vue'
import defaultImage from '@/assets/image.png'
import { countDeleteList } from '@/api/count'
import { countCopyChart } from '@/api/count'
import router from '@/router'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const state = reactive({
  show: false,
})
const props = defineProps({
  itemDate: Object,
})
const emits = defineEmits(['handleSuccess'])
// 删除逻辑
const handleDelete = async () => {
  ElMessageBox.confirm('是否删除大屏项目？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      if (props.itemDate?._id) {
        await countDeleteList(props.itemDate._id)
        emits('handleSuccess', 'delete')
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
}
// 复制逻辑
const handleCopy = () => {
  ElMessageBox.prompt('输入大屏项目', '复制大屏项目', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: `${props.itemDate?.title}_复制`,
    inputPattern: /\S/,
    inputErrorMessage: '标题不能为空',
  }).then(async ({ value }) => {
    await countCopyChart(props.itemDate?._id, value, userStore.user.uid)
    ElMessage({
      message: '复制成功',
      type: 'success',
    })
    emits('handleSuccess', 'copy')
  })
}
// 预览大屏
const handleView = (id: string) => {
  router.push(`/view/${id}`)
}
</script>
<template>
  <div class="content_item" @mouseenter="state.show = true" @mouseleave="state.show = false">
    <img :src="itemDate?.img !== '' ? itemDate?.img : defaultImage" width="100%" />
    <div class="content_main">
      <div class="title">{{ itemDate?.title }}</div>
      <div class="content_info">
        <el-tooltip content="删除" placement="bottom">
          <i class="iconfont icon-shanchu" @click="handleDelete"></i>
        </el-tooltip>
        <el-tooltip content="编辑" placement="bottom"
          ><i class="iconfont icon-bianji" @click="router.push(`/edit/${props.itemDate?._id}`)"></i
        ></el-tooltip>
        <el-tooltip content="预览" placement="bottom">
          <i @click="handleView(props.itemDate?._id)" class="iconfont icon-icon-"></i
        ></el-tooltip>
        <el-tooltip content="复制" placement="bottom">
          <i class="iconfont icon-fuzhi1" @click="handleCopy"></i
        ></el-tooltip>
      </div>
    </div>
    <div v-if="state.show" class="content_view">
      <span class="editor" @click="router.push(`/edit/${itemDate?._id}`)">编辑</span>
      <span @click="handleView(props.itemDate?._id)" class="visit">访问</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.content_item {
  position: relative;
  width: 266px;
  height: 184px;
  margin-left: 18px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  border: 1px solid #3a4659;
  .content_view {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 266px;
    height: 184px;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 30px;
    background-color: rgba(0, 0, 0, 0.5);
    span {
      text-align: center;
      height: 32px;
      line-height: 32px;
      width: 100px;
      color: #293f52;
      background-image: linear-gradient(-225deg, #00d3f1, #12b3ff);
      margin-top: 5px;
      font-size: 14px;
      cursor: pointer;
    }
  }
  img {
    height: 146px;
  }
  .content_main {
    display: flex;
    flex: 1;
    padding: 0 10px;
    font-size: 12px;
    background-color: #1d262e;
    color: #bcc9d4;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    .iconfont {
      position: relative;
      font-size: 12px;
      margin-right: 5px;
    }
  }
}
.content_item:hover {
  border: 1px solid #06c9f5;
}
</style>
