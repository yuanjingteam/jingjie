<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const router = useRouter()
const route = useRoute()
const nowPath = computed(() => route.fullPath)
const handlefn = (to: string) => {
  router.push(to)
}
console.log(nowPath)
</script>
<template>
  <header>
    <div class="bg"></div>
    <p>
      Dashbord<br />
      <i class="title">可视化数据大屏</i>
    </p>
    <ul>
      <li
        @click="handlefn('/manage/dashBoard')"
        :class="{ active: nowPath === '/manage/dashBoard' }"
      >
        <i class="iconfont icon-guanli-fill"></i>大屏管理
      </li>
      <li @click="handlefn('/manage/map')" :class="{ active: nowPath === '/manage/map' }">
        <i class="iconfont icon-ditu"></i>地图管理
      </li>
      <li @click="handlefn('/manage/category')" :class="{ active: nowPath === '/manage/category' }">
        <i class="iconfont icon-wenjianjia"></i> 分类管理
      </li>
      <li
        @click="handlefn('/manage/dataSource')"
        :class="{ active: nowPath === '/manage/dataSource' }"
      >
        <i class="iconfont icon-daijianshujuyuan"></i>数据源管理
      </li>
    </ul>
  </header>
  <content><router-view></router-view></content>
</template>
<style scoped lang="scss">
header {
  position: relative;
  height: 210px;
  width: 100%;
  padding: 35px 34px 0px 34px;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(http://192.168.10.5:5008/img/header.2bda2374.png) no-repeat;
    background-size: 100% 100%;
    z-index: -1;
    // brightness(0.5)，这会减少元素的亮度到原来的一半，让元素变暗。然后contrast(200%)将对比度提高到两倍
    filter: brightness(0.5) contrast(200%);
  }
  p {
    font-size: 34px;
    line-height: 40px;
    margin-top: 20px;
    color: $primary-color;
    .title {
      font-size: 18px;
      font-style: normal;
    }
  }
  ul {
    display: flex;
    color: #fff;
    li {
      padding: 10px;
      padding-bottom: 20px;
      list-style: none;
      font-size: 14px;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      .iconfont {
        margin: 0 10px;
        color: #909399;
      }
    }
    .active {
      border-bottom: 2px solid $primary-color;
      color: $primary-color;
      .iconfont {
        color: $primary-color;
      }
    }
  }
}
content {
  height: 100%;
  background-color: #fff;
}
</style>
