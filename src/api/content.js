import {POST,GET} from '@/utils/request'

// 文章分类列表查询
export function articleCategoryList(params) {
  return GET('/articleCategory/list',params)
}
// 文章分类添加
export function articleCategoryCreate(params) {
  return POST('/articleCategory/create',params)
}
// 文章分类编辑
export function articleCategoryUpdate(params) {
  return POST('/articleCategory/update?id=' + params.id,params)
}
// 文章分类删除
export function articleCategoryDelete(params) {
  return POST('/articleCategory/delete?id=' + params.id,params)
}
// 文章列表查询
export function articleList(params) {
  return GET('/article/list',params)
}
// 文章添加
export function articleCreate(params) {
  return POST('/article/create',params)
}
// 文章编辑
export function articleUpdate(params) {
  return POST('/article/update?id=' + params.id,params)
}

// 意见反馈列表
export function memberReportPage(params) {
  return POST('/memberReport/page',params)
}

// 首页 运营数据
export function homeOperationData() {
  return GET('/home/operationData')
}

// 首页 待处理数据
export function hometodoData() {
  return GET('/home/todoData')
}

// 客户管理列表
export function memberPage(params) {
  return POST('/member/page',params)
}
// 客户管理列表 修改用户地址
export function memberUpdate(params) {
  return POST('/member/update',params)
}
// 客户管理列表 禁用
export function memberForbidden(params) {
  return GET('/member/forbidden/' + params.id,params)
}


// 提现审核列表
export function withdrawApplyPage(params) {
  return POST('/withdrawApply/page',params)
}


// 预约管理 列表
export function withdraApplyPage(params) {
  return POST('/withdrawApply/page',params)
}


// 收支明细
export function balancePage(params) {
  return POST('/balance/page',params)
}
