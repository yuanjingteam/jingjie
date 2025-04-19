<script setup>
import { reactive, ref } from 'vue'
const data = ref({
  width: 1234,
  height: 234,
})
const state = reactive({
  select: '1',
  ifview: true,
  showTool:false
})
const color = ref('')
const tool = [
  {
    id: 1,
    title: '图表',
    iconfont: 'icon-tubiao-zhuzhuangtu',
    list: [
      { img: '/chart/1.png', name: '折线图' },
      { img: '/chart/2.png', name: '柱状图' },
      { img: '/chart/3.png', name: '条形图' },
      { img: '/chart/4.png', name: '饼图' },
      { img: '/chart/5.png', name: '环状图' },
      { img: '/chart/6.png', name: '漏斗图' },
      { img: '/chart/7.png', name: '雷达图' },
      { img: '/chart/8.png', name: '中国地图' },
      { img: '/chart/9.png', name: '仪表盘' },
      { img: '/chart/10.png', name: '水球图' },
    ],
  },
  {
    id: 2,
    title: '文本',
    iconfont: 'icon-xingzhuang-wenzi',
    list: [
      { img: '/text/1.png', name: '文本' },
      { img: '/text/2.png', name: '实时时间' },
    ],
  },
  {
    id: 3,
    title: '图片',
    iconfont: 'icon-tupian',
    list: [{ img: '/img/1.png', name: '图片' }],
  },
  {
    id: 4,
    title: '组件',
    iconfont: 'icon-zujian1',
    list: [
      { img: '/componentImg/1.png', name: '边框' },
      { img: '/componentImg/2.png', name: '蒙板' },
      { img: '/componentImg/3.png', name: '天气时间' },
      { img: '/componentImg/4.png', name: '表格' },
    ],
  },
]
const activeId = ref(0)
const handleTool = (id) => {
  if (state.showTool === false) {
    state.showTool = !state.showTool
    activeId.value = id
    return
  }
  if (id === activeId.value) {
    state.showTool = !state.showTool
  } else {
    activeId.value = id
  }
}
</script>
<template>
  <div class="basic-dots">
    <header>
      <span class="iconfont icon-zuojiantou"></span>
      <span>截屏</span>
      <div class="title">2fdsddw32</div>
      <i
        @click="state.ifview = !state.ifview"
        class="iconfont icon-icon-"
        :class="{ 'i-active': state.ifview === true }"
      ></i>
      <span>发布</span>
    </header>
    <content>
      <div v-show="state.ifview" class="tool">
        <div class="tool-left">
          <i
            v-for="item in tool"
            id="item.id"
            :class="[
              'iconfont',
              item.iconfont,
              {
                'tool-active': item.id === activeId, // 条件类名
              },
            ]"
            @click="handleTool(item.id)"
          ></i>
        </div>
        <div
          class="tool-show-box"
          v-if="state.showTool === true"
          v-for="item in tool"
          :id="item.id"
        >
          <div class="tool-show" v-show="activeId === item.id">
            <div class="title">{{ `${item.title} (${item.list.length})` }}</div>
            <div class="list">
              <div class="list-item" v-for="item in item.list">
                <img :src="`../../../public${item.img}`" alt="" />
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="state.ifview" class="tool-right">
        <div class="config-box">
          <div class="title">画布大小</div>
          <div class="config-size">
            <div class="size w">
              <span>w</span>
              <el-input v-model="data.width"></el-input>
            </div>
            <div class="size h">
              <span>h</span>
              <el-input v-model="data.height"></el-input>
            </div>
          </div>
        </div>
        <div class="config-box">
          <div class="title">背景配置</div>
          <el-select v-model="select">
            <el-option label="背景颜色" value="1" />
            <el-option label="背景图片" value="2" />
          </el-select>
          <div v-if="state.select === '1'" class="color">
            <el-color-picker style="width: 40px; height: 40px" v-model="color" />
            <el-input v-model="color" style="margin-left: 5px"></el-input>
          </div>
          <div v-else class="bg-upload">+</div>
        </div>
      </div>
    </content>
  </div>
</template>
<style scoped lang="scss">
.basic-dots {
  background-color: #2a2e33;
  /* 径向渐变 circle at 10px 10px表示渐变的中心点位于背景的(10px, 10px)位置。接下来，颜色从rgba(255,254,254,0.2) 1px到transparent 1px，这意味着在1像素的位置颜色突然变化，形成一个1像素大小的半白点，然后立即变为透明。这样实际上创建了一个小圆点。*/
  background-image: radial-gradient(
    circle at 10px 10px,
    /* 圆点中心位置 */ rgba(255, 254, 254, 0.2) 1px,
    /* 圆点颜色和大小 */ transparent 1px /* 透明区域 */
  );
  background-size: 15px 15px; /* 点阵间距，将图片限制成15,15，浏览器浏览器默认会自动平铺 */
  height: 100vh;
}
header {
  display: flex;
  top: 0;
  position: fixed;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #1d1e1f;
  color: #fff;
  span {
    padding: 0 18px;
    height: 36px;
    background-color: #353535;
    text-align: center;
    line-height: 36px;
    border-radius: 18px;
    transition: all 0.5s ease;
  }
  i:hover,
  span:hover {
    background-color: #666;
  }
  i {
    color: #fff;
    text-align: center;
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    margin-right: 5px;
    transition: all 0.5s ease;
  }
  .i-active {
    background-color: hsla(0, 0%, 100%, 0.1);
    color: #409eff;
  }
  .title {
    flex: 1;
    text-align: center;
  }
}
content {
  width: 100%;
  height: 100vh;
  display: flex;
  padding-top: 60px;
  .tool {
    position: relative;
    display: flex;
    height: 100%;
    background-color: #191c21;
    .tool-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50px;
      height: 100%;
      padding-top: 10px;
      i {
        padding: 8px;
        color: #999;
        font-size: 23px;
        border-radius: 5px;
        // background-color: pink;
        margin-bottom: 10px;
        transition: all 0.5s ease;
      }
      i:hover {
        background-color: #1d2938;
      }
    }
    .tool-active {
      background-color: rgba(64, 160, 255, 0.1);
      color: #409eff !important;
    }
    .tool-show-box {
      position: absolute;
      left: 50px;
      background-color: #191c21;
      height: 100%;
      padding-top: 5px;
      .tool-show {
        color: #999;
        padding: 5px 10px 0px;
        height: 100%;
        width: 250px;
        overflow-y: auto;
        .list {
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
          .list-item {
            width: 80px;
            height: 90px;
            text-align: center;
            background-color: rgba(64, 160, 255, 0.06);
            margin: 0 10px 12px 0;
            border: 1px solid rgba(64, 160, 255, 0.1);
            opacity: 0.8;
            transition: all 0.3s ease;
            img {
              width: 54px;
              height: 54px;
              margin-top: 10px;
            }
            .name {
              font-size: 13px;
              color: #777;
              text-align: center;
              // background-color: pink;
            }
          }
          .list-item:hover {
            border: 1px solid #3884d3;
            opacity: 1;
          }
        }
      }
    }
  }
  .tool-right {
    position: fixed;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: #191c21;
    padding-top: 30px;
    .title {
      font-size: 14px;
      color: #fff;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .config-box {
      padding: 14px 20px;
      :deep(.el-input__wrapper),
      :deep(.el-select__wrapper) {
        background-color: #262c33;
        // border-radius: 0;
        color: #fff;
        height: 40px;
      }
      :deep(.el-input__inner) {
        color: #fff;
      }
      :deep(.el-select__placeholder) {
        color: #fff;
      }

      .config-size {
        display: flex;
        justify-content: space-between;
        .size {
          display: flex;
          width: 112px;
          height: 40px;
          background-color: #476497;
          border-radius: 3px;
          overflow: hidden;
          span {
            padding: 0 20px;
            text-align: center;
            height: 100%;
            line-height: 40px;
            font-size: 14px;
            color: #909399;
            background-color: #f5f7fa;
          }
          :deep(.el-input__wrapper) {
            border-radius: 0;
          }
        }
      }
      .color {
        display: flex;
        margin-top: 10px;
        :deep(.el-color-picker__trigger) {
          width: 40px;
          height: 40px;
        }
      }
      .bg-upload {
        color: #fff;
        font-size: 24px;
      }
    }
  }
}
</style>
