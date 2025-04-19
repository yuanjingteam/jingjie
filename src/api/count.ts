import instance from '@/utils/request'
export const countGetData = (obj: Object) => {
  return instance.get('chart', { params: obj })
}
// 新建图表
export const createChart = (obj: object) => {
  return instance.post('chart', obj)
}
// 获取图表详细
export const countGetDetail = (id: string) => {
  return instance.get(`chart/${id}`)
}
// 发布图表
export const countPublicChart = (obj: object, id: string) => {
  return instance.put(`chart/${id}`, obj)
}
// 删除列表
export const countDeleteList = (id: string) => {
  return instance.delete(`chart/${id}`)
}
// 复制图表
export const countCopyChart = (id: string, title: string,uid:string) => {
  return instance.post(`chart/import/${id}`, { uid, title })
}
// 预览图表
export const countViewChart = (id:string) => {
  return instance.get(`chart/view/${id}`)
}
