import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import echarts from './utils/echarts'
import '@/assets/main.scss'
const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.use(pinia)
app.use(router)
app.mount('#app')
