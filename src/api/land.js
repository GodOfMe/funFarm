import {POST,GET} from '@/utils/request'

// 农场列表数据
export function farmPage(params) {
  return POST('/farm/page',params)
}
// 添加农场列表数据
export function farmCreate(params) {
  return POST('/farm/create',params)
}
// 编辑农场列表数据
export function farmUpdate(params) {
  return POST('/farm/update?id='+params.id,params)
}
// 删除农场列表数据
export function farmDelete(params) {
  return GET('/farm/delete',params)
}
// 添加管理员
export function farmAddAdmin(params) {
  return POST('/farm/addAdmin',params)
}
// 删除管理员
export function farmDeleteAdmin(params) {
  return POST('/farm/deleteAdmin',params)
}
// 地块列表数据
export function farmBlockPage(params) {
  return POST('/farmBlock/page',params)
}
// 新增地块
export function farmBlockCreate(params) {
  return POST('/farmBlock/create',params)
}
// 修改地块
export function farmBlockUpdate(params) {
  return POST('/farmBlock/update?id='+params.id,params)
}
// 删除地块
export function farmBlockDelete(params) {
  return GET('/farmBlock/delete',params)
}

// 田地列表
export function farmBlockFieldPage(params) {
  return POST('/farmBlockField/page',params)
}
