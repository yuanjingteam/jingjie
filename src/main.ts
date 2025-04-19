import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import echarts from './utils/echarts'
// import Vue3DraggableResizable from 'vue3-draggable-resizable-v2'
// import 'vue3-draggable-resizable-v2/css'
import '@/assets/main.scss'
const app = createApp(App)
app.config.globalProperties.$echarts = echarts
// app.use(Vue3DraggableResizable)
app.use(pinia)
app.use(router)
app.mount('#app')
