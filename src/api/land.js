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
  return GET('/farm/delete/'+params.id)
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
  return POST('/farmBlock/update',params)
}
// 删除地块
export function farmBlockDelete(params) {
  return GET('/farmBlock/delete/'+params.id)
}
// 获取地块详情
export function farmBlockDetail(params) {
  return GET('/farmBlockField/detail/'+params.id)
}

// 田地列表
export function farmBlockFieldPage(params) {
  return POST('/farmBlockField/page',params)
}

// 田地详情 发货
export function farmBlockFieldeliver(params) {
  return GET('/farmBlockField/deliver',params)
}

// 田地详情 采摘完毕
export function endPick(params) {
  return GET('/farmBlockField/endPick',params)
}

// 田地详情 成熟
export function farmBlockFieldMature(params) {
  return GET('/farmBlockField/mature',params)
}

// 田地详情 播种
export function farmBlockFieldSow(params) {
  return GET('/farmBlockField/sow',params)
}

// 田地详情 开始采摘
export function startPick(params) {
  return GET('/farmBlockField/startPick',params)
}
