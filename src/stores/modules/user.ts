import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
interface UserInfo {
  username: string
  password: string
  uid: string
}
export const useUserStore = defineStore(
  'big-user',
  () => {
    // token
    const token = ref<string>('')
    const setToken = (newValue: string) => {
      token.value = newValue
    }
    const removeToken = () => {
      token.value = ''
    }
    // 用户信息
    const user = reactive<UserInfo>({
      username: '',
      password: '',
      uid:''
    } as UserInfo)
    const setUserInfo = async (obj: UserInfo) => {
      Object.assign(user, obj)
    }
    const getUser = (): UserInfo => user

    return { token, setToken, removeToken, user, setUserInfo, getUser }
  },
  {
    persist: true,
  },
)
