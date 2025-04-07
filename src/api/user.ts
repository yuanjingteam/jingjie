import instance from '@/utils/request'
export const userLoginServive = (obj: Object) => {
  return instance.post('user/login', obj)
}
export const userRegisterServive = (obj: Object) => {
  return instance.post('user/reg', obj)
}
