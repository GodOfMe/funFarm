import {POST,GET} from '@/utils/request'

// 菜品分类列表
export function productCategoryList(params) {
  return POST('/productCategory/list',params)
}
// 添加菜品分类
export function prductCategoryCreate(params) {
  return POST('/productCategory/create',params)
}
// 修改菜品分类
export function prductCategoryUpdate(params) {
  return POST('/productCategory/update', params)
}
// 删除菜品分类
export function prductCategoryDelete(params) {
  return POST('/productCategory/delete/'+params.id, params)
}

// 菜品列表 无分页
export function productList(params) {
  return GET('/product/list',params)
}
// 菜品列表 分页查询
export function productPage(params) {
  return POST('/product/page',params)
}

// 菜品列表 添加
export function productCreate(params) {
  return POST('/product/create',params)
}
// 菜品列表 修改
export function productUpdate(params) {
  return POST('/product/update',params)
}
// 菜品列表 删除
export function productDelete(params) {
  return GET('/product/delete/' + params.id)
}

// 菜品推荐方案分页列表POST /recommendScheme/save
export function recommendSchemeList(params) {
  return POST('/recommendScheme/list',params)
}

// 添加推荐方案
export function recommendSchemeSave(params) {
  return POST('/recommendScheme/save',params)
}

//发布菜品方案
export function recommendSchemePublish(params) {
  return GET('/recommendScheme/publish/'+params.id)
}
