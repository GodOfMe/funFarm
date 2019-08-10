import {POST,GET} from '@/utils/request'

// 菜篮子 列表数据
export function tradeBasketPage(params) {
  return POST('/tradeBasket/page',params)
}

