<script setup lang="ts">
import { userLoginServive, userRegisterServive } from '@/api/user'
import router from '@/router'
import MD5 from 'crypto-js/md5'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores'
// 定义表单类型接口
interface loginFrom {
  user: string
  pass: string
}
// 定义状态类型
interface comState {
  situation: 'login' | 'register'
  show: boolean
}
const form = reactive<loginFrom>({
  user: '',
  pass: '',
})
let transPass = ref('')
const state = reactive<comState>({
  situation: 'login',
  show: false,
})
const userStore = useUserStore()
const enterfn = async () => {
  if (state.show == false) {
    state.show = true
    return
  } else {
    // 进入
    transPass.value = MD5(form.pass).toString()
    // 登录模块
    if (state.situation === 'login') {
      const {
        data: {
          data: { uid, name },
        },
      } = await userLoginServive({ user: form.user, pass: transPass.value })
      userStore.setUserInfo({ username: form.user, password: transPass.value, uid: uid })
    }
    // 注册模块
    if (state.situation === 'register') {
      const {
        data: {
          data: { uid, name },
        },
      } = await userRegisterServive({ user: form.user, pass: transPass.value })
      userStore.setUserInfo({ username: form.user, password: transPass.value, uid: uid })
    }
    userStore.setToken(transPass.value)
    ElMessage.success('登录成功')
    router.push('/')
  }
}
</script>
<template>
  <div class="screen">
    <div class="bg"></div>
    <h1 class="logo">鲸界</h1>
    <div class="desc">一站式数据大屏制作平台</div>
    <Transition name="fade">
      <!-- 添加过渡容器 -->
      <div v-if="state.show === true" class="form">
        <div class="choose">
          <span
            @click="state.situation = 'login'"
            class="radio-btn"
            :class="{ active: state.situation == 'login' }"
            >登录</span
          >
          <span
            @click="state.situation = 'register'"
            class="radio-btn"
            :class="{ active: state.situation == 'register' }"
            >注册</span
          >
        </div>
        <el-form>
          <el-form-item>
            <el-input v-model="form.user" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="form.pass" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </Transition>
    <span @click="enterfn" class="btn">进入系统</span>
  </div>
</template>
<style scoped lang="scss">
.screen {
  position: relative;
  width: 100%;
  height: 100vh;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(http://192.168.10.5:5008/img/bg.209a1768.jpg) no-repeat;
    background-size: cover;
    z-index: -1;
  }
  .bg::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .logo {
    // position: absolute;
    // height: 72px;
    padding-top: 180px;
    line-height: 72px;
    text-align: center;
    font-weight: 700;
    color: #fff;
    font-size: 36px;
    // background-color: pink;
  }
  .logo::after {
    content: '';
    display: inline-block;
    margin-left: 2px;
    width: 5px;
    height: 5px;
    background-color: rgba(255, 0, 0, 0.6);
  }
  .desc {
    text-align: center;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 4px;
    color: grey;
    // margin-top: 3px;
  }
  .form {
    display: flex;
    margin: 40px auto;
    margin-bottom: 0;
    width: 320px;
    // height: 190px;
    background-color: #fff;
    padding: 0 40px 20px;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    .choose {
      display: flex;
      justify-content: center;
      .radio-btn {
        padding: 10px 20px;
        margin: 10px;
        color: #999999;
        border-bottom: 2px solid transparent;
      }
      .active {
        color: #00145f;
        border-bottom: 2px solid #212121;
      }
    }
    ::v-deep .el-form-item {
      margin-bottom: 10px;
    }
    ::v-deep .el-input__inner {
      // background-color: rgb(70, 63, 64);
      padding: 0 5px;
      font-size: 14px;
      height: 40px;
      color: #606266;
      font-weight: 100;
      // border: 1px solid #dcdfe6;
    }
    ::v-deep .el-input__inner:hover {
      cursor: text;
    }
  }
  .btn {
    position: absolute;
    left: 50%;
    margin-left: -60px;
    margin-top: 31px;
    padding: 10px 32px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    transition: all 0.3s ease;
    font-size: 14px;
    border-radius: 50px;
  }
  .btn:hover {
    background-color: #409eff;
    cursor: pointer;
  }
}
</style>
