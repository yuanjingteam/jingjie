# jingjie

基于 Vue3 + TypeScript+element-plus 构建的数据可视化大屏，集成 ECharts、拖拽布局、状态管理等核心功能
## 技术栈
**核心框架**
- Vue 3 (Composition API)
- Vite 6.x
- TypeScript 5.8
**可视化组件**
- ECharts 5.x
- vue3-draggable-resizable-v2
- vue3-ruler-tool
- html2canvas
- @vueuse
**工具链**
- Pinia 状态管理
- Vue Router 4.x
- Element Plus 2.x
- Axios 1.x
- uuid

## 项目结构
├─ public # 静态资源
├─ src
|   ├─ api # 接口模块
│   |   ├─ count.ts
│   |   └─ user.ts
|   ├─ assets # 资源文件
│   |   ├─ geojson # 地理数据
│   |   ├─ images # 图片资源
│   |   └─ main.scss # 全局样式
|   ├─ components # 公共组件
│   |   ├─ echarts # 图表封装组件
|   |   └─ publicVue # 图表公共组件
|   ├─ router # 路由配置
|   ├─ stores # Pinia 状态管理
|   ├─ types # TS 类型声明
│   ├─ utils # 工具库
│   |   ├─  echarts.ts # ECharts 工具
│   |   ├─  request.ts # 请求封装
│   |   └─  jsonData.ts # 图表初始数据
|   └─ views # 页面组件
│       ├─ data # 数据操作页面
│       ├─ layout # 布局组件
│       ├─ login # 登录页面
│       └─ manage # 管理系统
├─ tsconfig.json # ts 编译配置
└─ vite.config.js  # vue-cli 配置
## 快速开始
```
#通过 npm 安装 pnpm (如果本地已安装pnpm,请忽略)
npm install -g pnpm
#安装项目依赖
pnpm install
#开发环境启动
pnpm dev
#打包代码
pnpm build
#代码质量检查
pnpm lint
##注：详细请阅读package.json 以及对应的环境配置文件（即.env 文件）！
```