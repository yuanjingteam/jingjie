<script setup lang="ts">
import BasicBar from '@/components/echarts/basicBar.vue'
import BasicLine from '@/components/echarts/basicLine.vue'
import chinaMap from '@/components/echarts/chinaMap.vue'
import basichbar from '@/components/echarts/basichbar.vue'
import basicpie from '@/components/echarts/basicpie.vue'
import basicDoughnut from '@/components/echarts/basicDoughnut.vue'
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { Vue3RulerTool } from 'vue3-ruler-tool'
import 'vue3-ruler-tool/dist/style.css'
import { countGetDetail, countPublicChart } from '@/api/count'
import html2canvas from 'html2canvas'
// 生成id
import { v4 as uuidv4 } from 'uuid'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { nextTick } from 'vue'
import addScreen from '../manage/components/addScreen.vue'
import codeEditor from './components/codeEditor.vue'
import Data from '@/utils/jsonData'
interface Componented {
  type: ChartType
  dataOption: {
    name: string
    x: number
    y: number
    w: number
    h: number
    bgcolor: string
    active: boolean
    data?: {}
    id: string
    chartdata: Array<ChartDataItem>
  }
}
interface ChartDataItem {
  name: String | Number
  value: Number
}
// 静态json数据
let chartData: Array<ChartDataItem> = reactive([...Data])
const route = useRoute()
const router = useRouter()
const state = reactive({
  ifview: true,
  showTool: false,
  showdata: false,
  config: 'basic',
  url: `${window.location.origin}/view/${route.params.id}`,
})
const handleshowData = (value: boolean) => {
  if (components.length !== 0) {
    state.showdata = value
  }
}
//关于组件
// 定义动态组件的映射表
type ChartType = 'line' | 'bar' | 'cn-map' | 'hbar' | 'pie' | 'doughnut'
const componentMap: object = {
  line: BasicLine,
  bar: BasicBar,
  'cn-map': chinaMap,
  hbar: basichbar,
  pie: basicpie,
  doughnut: basicDoughnut,
}

const components = reactive<Componented[]>([])
const addComponent = (type: ChartType) => {
  components.push({
    type,
    dataOption: {
      name: `新建图层${components.length + 1}`,
      x: 10,
      y: 10,
      w: 300,
      h: 300,
      bgcolor: 'rgba(0,0,0,0)',
      active: false,
      id: uuidv4(),
      chartdata: [...chartData],
    },
  })
}
type toolType = Array<{
  id: number
  title: string
  iconfont: string
  list: Array<{
    img: string
    name: string
    type: string
  }>
}>
const tool: toolType = [
  {
    id: 1,
    title: '图表',
    iconfont: 'icon-tubiao-zhuzhuangtu',
    list: [
      { img: '/chart/1.png', name: '折线图', type: 'line' },
      { img: '/chart/2.png', name: '柱状图', type: 'bar' },
      { img: '/chart/3.png', name: '条形图', type: 'hbar' },
      { img: '/chart/4.png', name: '饼图', type: 'pie' },
      { img: '/chart/5.png', name: '环状图', type: 'doughnut' },
      { img: '/chart/6.png', name: '漏斗图', type: 'funnel' },
      { img: '/chart/7.png', name: '雷达图', type: 'radar' },
      { img: '/chart/8.png', name: '中国地图', type: 'cn-map' },
      { img: '/chart/9.png', name: '仪表盘', type: 'gauge' },
      { img: '/chart/10.png', name: '水球图', type: 'liquid' },
    ],
  },
  {
    id: 2,
    title: '文本',
    iconfont: 'icon-xingzhuang-wenzi',
    list: [
      { img: '/text/1.png', name: '文本', type: 'text' },
      { img: '/text/2.png', name: '实时时间', type: 'time' },
    ],
  },
  {
    id: 3,
    title: '图片',
    iconfont: 'icon-tupian',
    list: [{ img: '/img/1.png', name: '图片', type: 'picture' }],
  },
  {
    id: 4,
    title: '组件',
    iconfont: 'icon-zujian1',
    list: [
      { img: '/componentImg/1.png', name: '边框', type: 'board' },
      { img: '/componentImg/2.png', name: '蒙板', type: '1' },
      { img: '/componentImg/3.png', name: '天气时间', type: 'weather' },
      { img: '/componentImg/4.png', name: '表格', type: 'table' },
    ],
  },
]
const activeId = ref(0)
const handleTool = (id: number) => {
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
const presetLine = ref([
  { type: 'h', site: 50 },
  { type: 'v', site: 250 },
])
const boardState = reactive({
  select: '1',
  w: 1920,
  h: 1080,
  bgcolor: '',
  present: 60,
  scale: 1,
})
let img: string = ''
const handleBoard = function (value: string) {
  if (value === '+') {
    if (boardState.present === 100) {
      return
    }
    boardState.scale += 0.1
    boardState.present += 10
  } else {
    if (boardState.present === 10) {
      return
    }
    boardState.scale -= 0.1
    boardState.present -= 10
  }
}
const getOption = (childValue: object, value: Componented) => {
  console.log('执行了')
  console.log(value)
  handleActive(value)
  value.dataOption.data = childValue
  // }
}
// 计算属性
const activeOption = computed(() => {
  const item = components.find((item) => item.dataOption.active === true)
  if (item) {
    return item
  }
})
// 点击组件改变active
const handleActive = (value: Componented) => {
  state.showdata = true
  // 将全部的active改成false
  components.map((item) => (item.dataOption.active = false))
  value.dataOption.active = true
}
// 图表信息
const title = ref('')
// 数据配置的选项
const selectDateOption = ref<string>('1')
onMounted(async () => {
  const {
    data: { data },
  } = await countGetDetail(route.params.id as string)
  console.log(data, '1111111')
  title.value = data.title
  img = data.image
  boardState.bgcolor = data.chartData.bgcolor
  boardState.w = data.chartData.w
  boardState.h = data.chartData.h
  if (data.chartData.elements) {
    console.log('执行了111')
    console.log(data.chartData.elements[1].dataOption.chartdata)
    Object.assign(chartData, data.chartData.elements[1].dataOption.chartdata)
  }
  console.log(chartData)
  components.push(...data.chartData.elements)

  // 如果有全局数据则覆盖
  if (data.chartData.globalChartData) {
    chartData.splice(0, chartData.length, ...data.chartData.globalChartData)
  }
})
// 修改5: 添加全局数据监听（根据需要）
const stopWatch = watch(
  () => chartData,
  (newVal) => {
    components.forEach((component) => {
      component.dataOption.chartdata = [...newVal]
    })
  },
  { deep: true },
)
// 发布逻辑
const publicControl = ref<{ ifshow: () => void } | null>(null)
const generateImageLink = async () => {
  const tempColor: string = boardState.bgcolor
  boardState.bgcolor = '#2c435b'
  await nextTick()
  try {
    boardState.bgcolor = tempColor
    // 获取画板DOM元素（根据你的class="box"定位）
    const boardElement = document.querySelector('.box') as HTMLElement
    // 生成Canvas（关闭抗锯齿保证清晰度）
    const canvas = await html2canvas(boardElement, {
      useCORS: true, // 解决跨域图片问题
      allowTaint: true,
      backgroundColor: '#2c435b',
    })
    // 转换为Base64
    img = canvas.toDataURL('image/png', 1.0)
    // 解构出
    const { w, h, bgcolor } = boardState
    // console.log({})
    await countPublicChart(
      { chartData: { bgcolor, elements: components, h, w, chartData }, img },
      route.params.id as string,
    )
    console.log({ chartData: { bgcolor, elements: components, h, w }, img })
    publicControl.value?.ifshow()
  } catch (error) {
    console.error('生成图片失败:', error)
  }
}
// ----------------------修改JSON数据-------------------------------
interface handleDataType {
  type: string
  value?: object
  value2?: number | string
}
const ModifyData = ref(null)
const handleModifyData = () => {
  if (ModifyData.value) {
    ModifyData.value.switchShow()
  }
}
// 处理具体的删除添加逻辑
const handleModifyfn = (data: handleDataType) => {
  if (data.type === 'delete') {
    // console.log(chartData)
    // console.log(data.value.name)
    chartData.find((item, index) => {
      if (item.name === data.value.name) {
        chartData.splice(index, 1)
        return true
      }
    })
  }
  if (data.type === 'add') {
    chartData.push({
      name: `data${chartData.length + 1}`,
      value: 546,
    })
  }
  if (data.type === 'modify_name') {
    chartData.find((item, index) => {
      if (item.name === data.value.name) {
        item.name = data.value2
        return true
      }
    })
  }
  if (data.type === 'modify_value') {
    // console.log(data)
    chartData.find((item, index) => {
      if (item.name === data.value.name) {
        item.value = Number(data.value2)
        return true
      }
    })
  }
}
</script>
<template>
  <div class="basic-dots">
    <header>
      <span class="iconfont icon-zuojiantou" @click="router.back()"></span>
      <span>截屏</span>
      <div class="title">{{ title }}</div>
      <i
        @click="state.ifview = !state.ifview"
        class="iconfont icon-icon-"
        :class="{ 'i-active': state.ifview === true }"
      ></i>
      <span @click="generateImageLink">发布</span>
    </header>
    <content>
      <div :style="{ opacity: state.ifview ? 1 : 0 }" class="tool">
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
          :id="item.id.toString()"
        >
          <div class="tool-show" v-show="activeId === item.id">
            <div class="title">{{ `${item.title} (${item.list.length})` }}</div>
            <div class="list">
              <div class="list-item" v-for="item2 in item.list" @click="addComponent(item2.type)">
                <img :src="`../../../public${item2.img}`" alt="" />
                <div class="name">{{ item2.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="board" @click="handleshowData(false)">
        <Vue3RulerTool :value="presetLine">
          <div
            class="box"
            :style="{
              width: boardState.w + 'px',
              height: boardState.h + 'px',
              backgroundColor: boardState.bgcolor ? boardState.bgcolor : '#fff',
              transform: `scale(${boardState.scale})`,
            }"
          >
            <component
              v-for="item in components"
              :key="item.dataOption.id"
              :is="componentMap[item.type]"
              v-model:w="item.dataOption.w"
              v-model:h="item.dataOption.h"
              v-model:x="item.dataOption.x"
              v-model:y="item.dataOption.y"
              v-model:bgcolor="item.dataOption.bgcolor"
              v-model:chartData="chartData"
              @getOption="(childValue: object) => getOption(childValue, item)"
              @click.stop="handleActive(item)"
            ></component>
          </div>
        </Vue3RulerTool>
        <div
          @click.stop
          class="control-bar"
          :style="{ right: state.ifview ? 350 + 'px' : 35 + 'px' }"
        >
          <i @click="handleBoard('-')" class="iconfont icon-jianhao"></i>
          <div class="scale-mount" style="font-size: 14px">{{ boardState.present }}%</div>
          <i @click="handleBoard('+')" class="iconfont icon-jiahao"></i>
        </div>
      </div>
      <div v-show="state.ifview" class="tool-right">
        <div v-if="!state.showdata" class="config-board">
          <div class="config-box">
            <div class="title">画布大小</div>
            <div class="config-size">
              <div class="size w">
                <span>w</span>
                <el-input v-model.number="boardState.w"></el-input>
              </div>
              <div class="size h">
                <span>h</span>
                <el-input v-model.number="boardState.h"></el-input>
              </div>
            </div>
          </div>
          <div class="config-box">
            <div class="title">背景配置</div>
            <el-select v-model="boardState.select">
              <el-option label="背景颜色" value="1" />
              <el-option label="背景图片" value="2" />
            </el-select>
            <div v-if="boardState.select === '1'" class="color">
              <el-color-picker style="width: 40px; height: 40px" v-model="boardState.bgcolor" />
              <el-input v-model="boardState.bgcolor" style="margin-left: 5px"></el-input>
            </div>
            <div v-else class="bg-upload">+</div>
          </div>
        </div>
        <div v-else class="config-charts">
          <div class="radio-group">
            <div
              class="radio-btn"
              :class="{ active: state.config === 'basic' }"
              @click="state.config = 'basic'"
            >
              基础
            </div>
            <div
              class="radio-btn"
              :class="{ active: state.config === 'data' }"
              @click="state.config = 'data'"
            >
              数据
            </div>
          </div>
          <div v-if="state.config === 'basic'" class="basic">
            <div class="config-box">
              <div class="title">控件名称</div>
              <el-input v-model="(activeOption?.dataOption ?? {}).name"></el-input>
            </div>
            <div class="config-box">
              <div class="title">组件位置</div>
              <div class="config-size">
                <div class="size w">
                  <span>x</span>
                  <el-input v-model.number="(activeOption?.dataOption ?? {}).x"></el-input>
                </div>
                <div class="size h">
                  <span>y</span>
                  <el-input v-model.number="(activeOption?.dataOption ?? {}).y"></el-input>
                </div>
              </div>
              <div class="config-size">
                <div class="size w">
                  <span>w</span>
                  <el-input v-model.number="(activeOption?.dataOption ?? {}).w"></el-input>
                </div>
                <div class="size h">
                  <span>h</span>
                  <el-input v-model.number="(activeOption?.dataOption ?? {}).h"></el-input>
                </div>
              </div>
            </div>
            <div class="config-box">
              <div class="title">背景颜色</div>
              <div class="color">
                <el-color-picker
                  style="width: 40px; height: 40px"
                  v-model="(activeOption?.dataOption ?? {}).bgcolor"
                />
                <el-input
                  v-model="(activeOption?.dataOption ?? {}).bgcolor"
                  style="margin-left: 5px"
                ></el-input>
              </div>
            </div>
            <div class="config-box">
              <div class="title">Settings.json</div>
              <p style="font-size: 14px">
                {{ activeOption?.dataOption }}
              </p>
            </div>
          </div>
          <div v-else class="data">
            <div class="config-box">
              <div class="title">数据配置</div>
              <el-select v-model="selectDateOption">
                <el-option label="静态JSON" value="1" />
                <el-option label="我的数据源" value="2" />
                <el-option label="GET接口" value="2" />
              </el-select>
              <div v-if="selectDateOption === '1'" class="editData" @click="handleModifyData">
                编辑数据源
              </div>
              <codeEditor
                ref="ModifyData"
                :chartData="chartData"
                @handlefn="handleModifyfn"
              ></codeEditor>
            </div>
          </div>
        </div>
      </div>
    </content>
    <addScreen ref="publicControl" :url="state.url"></addScreen>
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
      z-index: 1;
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
  .board {
    position: relative;
    width: 100%;
    height: 100%;
    margin-right: 300px;
    overflow: scroll;
    :deep(.vue-ruler-wrapper) {
      position: relative; /* 确保定位生效 */
      z-index: 0; /* 设置层级 */
    }
    .box {
      position: absolute;
      top: 68px;
      left: 268px;
      transform-origin: 0 0;
      transition: transform 0.5s ease;
    }
    .control-bar {
      position: fixed;
      display: flex;
      align-items: center;
      bottom: 15px;
      width: 130px;
      height: 32px;
      padding: 0 10px;
      background-color: #191c21;
      border-radius: 8px;
      border: 1px solid #fff;
      color: #666;
      i {
        padding: 5px;
        border-radius: 14px;
        transition: all 0.5s;
      }
      i:hover {
        background-color: #fff;
      }
      .scale-mount {
        flex: 1;
        text-align: center;
      }
    }
  }
  .tool-right {
    position: fixed;
    z-index: 1;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: #191c21;
    padding-top: 20px;
    overflow-y: auto;
    .radio-group {
      display: flex;
      justify-content: center;
      color: #999;
      .radio-btn {
        padding: 10px 20px;
        margin: 0 10px;
      }
      .active {
        color: #fff;
      }
    }
    .title {
      font-size: 14px;
      color: #fff;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .config-box {
      padding: 14px 20px;
      color: #fff;
      :deep(.el-input__wrapper),
      :deep(.el-select__wrapper) {
        background-color: #262c33;
        color: #fff;
        height: 40px;
      }
      :deep(.el-input__inner) {
        color: #fff;
      }
      :deep(.el-select__placeholder) {
        color: #fff;
      }
      .editData {
        display: inline-block;
        padding: 5px;
        margin: 20px auto;
        color: #409eff;
        border: 1px solid #409eff;
      }
      p {
        white-space: pre-wrap;
        font-weight: 400;
      }
      .config-size {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
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
