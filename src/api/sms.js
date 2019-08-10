import {POST,GET} from '@/utils/request'

// 优惠券
export function couponPage(params) {
  return POST('/coupon/page',params)
}

// 推荐列表
export function recommendSchemeList(params) {
  return GET('/recommendScheme/list',params)
}
