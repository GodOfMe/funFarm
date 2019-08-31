import {POST,GET} from '@/utils/request'

//  获取角色列表
export function roleList(params) {
  return POST('/role/list',params)
}
// 添加角色
export function roleCreate(params) {
  return POST('/role/create',params)
}
// 编辑角色
export function roleUpdate(params) {
  return POST('/role/update?id='+params.id,params)
}
// 删除角色
export function roleDelete(params) {
  return POST('/role/delete/'+params.id,params)
}


// 管理员列表
export function adminList(params) {
  return POST('/admin/list',params)
}
// 注册管理员
export function adminRegister(params) {
  return POST('/admin/register',params)
}
// 修改管理员
export function adminUpdate(params) {
  return POST('/admin/update/'+params.id  ,params)
}
// 删除管理员
export function adminDelete(params) {
  return GET('/admin/delete/'+params.id)
}
