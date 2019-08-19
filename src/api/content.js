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
  return GET('/articleCategory/delete/' + params.id)
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
  return POST('/article/update',params)
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
  return POST('/appointment/page',params)
}

//通过预约
export function appointmentApprove(params) {
  return GET('/appointment/approve/'+params.id)
}

//取消预约
export function appointmentCancel(params) {
  return GET('/appointment/cancel/'+params.id)
}

// 收支明细
export function balancePage(params) {
  return POST('/balance/page',params)
}

//标记未打款
export function notTransfered(params) {
  return POST('/withdrawApply/note/notTransfered',params)
}

//标记已打款
export function transfered(params) {
  return POST('/withdrawApply/note/transfered',params)
}

//审核通过
export function pass(params) {
  return POST('/withdrawApply/verify/pass',params)
}

//审核未通过
export function reject(params) {
  return POST('/withdrawApply/note/reject',params)
}

//
// export function notTransfered(params) {
//   return POST('/withdrawApply/note/notTransfered',params)
// }
