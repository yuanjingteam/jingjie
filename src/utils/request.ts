import axios from "axios";
import { useUserStore } from '@/stores'
import { ElMessage } from "element-plus";
import router from "@/router";
router
const baseURL = 'http://192.168.10.5:7000'
const instance = axios.create({
  baseURL,
  timeout:20000
})
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore()
    // console.log('Token type:', typeof userStore.token)
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err),
)
// 响应拦截器
instance.interceptors.response.use(
  // 这是处理业务的成功或者失败
  (res) => {
    if (res.data.errno === 0) {
      // console.log(res)
      // console.log(res.response)
      return res
    }
    // TODO 3. 处理业务失败，给错误提示，抛出错误
    // TODO 4. 摘取核心响应数据
    ElMessage.error(res.data.mrrmsg || '服务异常')
    return Promise.reject(res.data) //错误信息结果抛出
  },
  // 当我们发送一个HTTP请求，服务器会返回一个响应对象。这个响应对象里面包含了很多信息，比如状态码、响应头、数据等等。当请求成功时，Axios会进入then分支，我们可以通过response.status来获取HTTP状态码，比如200表示成功，404表示未找到等。
  // 但如果请求失败了呢？比如网络问题或者服务器返回了4xx或5xx的错误码。这时候，Axios会进入catch分支，抛出一个错误对象err。根据Axios的文档，这个错误对象err有一个response属性，里面包含了服务器返回的响应信息。所以err.response.status应该就是服务器返回的实际HTTP状态码，比如401未授权，500服务器内部错误等。
  //这是响应的错误
  // 不过，用户可能分不清什么时候用response.status，什么时候用err.response.status。比如在拦截器里，成功响应和错误响应的处理方式不同。在成功的情况下，响应对象是res，可以直接用res.status。而在错误的情况下，错误对象是err，需要通过err.response来访问服务器响应，进而获取状态码
  (err) => {
    //一定响应式出错
    // TODO 5. 处理401错误
    //错误的特殊情况，401，说明权限不足或者token过期，拦截到登录i
    //有status才会执行
    // 当请求成功时，响应对象会有 status 属性，包含 HTTP 状态码。而当请求失败时，错误对象 err 是否有 response 属性，这取决于错误的类型。例如，网络错误或请求超时可能不会有 response 对象，因此 err.response 会是 undefined，这时候如果直接访问 err.response.status 就会导致错误。
    if (err.response?.status === 401) {
      router.push('/login')
    }
    // console.log(111)
    // console.log(err.response)
    console.log(err.message)
    // ElMessage.error('111')
    // ElMessage.error(err.response?.data.message || '服务异常')
    ElMessage.error(err.message || '服务异常')

    return Promise.reject(err)
  },
)

export default instance
export { baseURL }
