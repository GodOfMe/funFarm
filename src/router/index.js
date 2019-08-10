import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: '/cmp/product',
    children: [{
      path: 'cmp',
      name: 'cmp',
      component: () => import('@/views/cmp/product/index'),
      meta: {title: '客户管理', icon: 'product'}
    }]
  },
  {
    path: '/dishes',
    component: Layout,
    name: 'dishes',
    meta: {title: '菜品管理', icon: 'product'},
    children: [{
      path: 'classify',
      name: 'classify',
      component: () => import('@/views/dishes/classify/index'),
      meta: {title: '分类管理', icon: 'product-cate'}
    },
    {
      path: 'variety',
      name: 'variety',
      component: () => import('@/views/dishes/variety/index'),
      meta: {title: '菜品管理', icon: 'product-list'}
    },
    {
      path: 'addVariety',
      name: 'addVariety',
      component: () => import('@/views/dishes/variety/edit'),
      meta: {title: '添加菜品', icon: 'product-add'},
      hidden: true
    },
    {
      path: 'updateVariety',
      name: 'updateVariety',
      component: () => import('@/views/dishes/variety/edit'),
      meta: {title: '修改菜品', icon: 'product-add'},
      hidden: true
    },
    {
      path: 'plan',
      name: 'plan',
      component: () => import('@/views/dishes/plan/index'),
      meta: {title: '种菜方案管理', icon: 'product-list'}
    },]
  },
  {
    path: '/land',
    component: Layout,
    redirct: '/land/farm',
    name: 'land',
    meta: {title: '土地管理', icon: 'product'},
    children: [{
      path: 'farm',
      name: 'farm',
      component: () => import('@/views/land/farm/index'),
      meta: {title: '农场管理', icon: 'product-list'}
    },
    {
      path: 'plot',
      name: 'plot',
      component: () => import('@/views/land/plot/index'),
      meta: {title: '地块管理', icon: 'product-list'}
    },
    {
      path: 'field',
      name: 'field',
      component: () => import('@/views/land/field/index'),
      meta: {title: '田地管理', icon: 'product-list'}
    },
    {
      path: 'field-detail',
      name: 'field-detail',
      component: () => import('@/views/land/field/detail'),
      meta: {title: '天地详情', icon: 'product-add'},
      hidden: true
    },
  ]
  },
  {
    path: '/market',
    component: Layout,
    name: 'market',
    meta: {title: '市场管理', icon: 'product'},
    children: [{
      path: 'basket',
      name: 'basket',
      component: () => import('@/views/market/basket/index'),
      meta: {title: '菜篮子管理', icon: 'product-list'}
    },
      {
        path: 'tradeGoods',
        name: 'tradeGoods',
        component: () => import('@/views/market/tradeGoods/index'),
        meta: {title: '交易商品管理', icon: 'product-add'}
      },
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/reservation/index',
    children: [{
      path: 'reservation',
      name: 'reservation',
      component: () => import('@/views/reservation/index'),
      meta: {title: '预约管理', icon: 'product'}
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: '/feedback/index',
    children: [{
      path: 'feedback',
      name: 'feedback',
      component: () => import('@/views/feedback/index'),
      meta: {title: '意见反馈', icon: 'product-comment'}
    }]
  },
  {
    path: '/content',
    component: Layout,
    name: 'content',
    meta: {title: '内容管理', icon: 'product'},
    children: [{
      path: 'articleCate',
      name: 'articleCate',
      component: () => import('@/views/content/article-cate/index'),
      meta: {title: '文章分类管理', icon: 'product-cate'}
    },
      {
        path: 'article',
        name: 'article',
        component: () => import('@/views/content/article/index'),
        meta: {title: '文章管理', icon: 'sms-ad'}
      },
    ]
  },
  {
    path: '/audit',
    component: Layout,
    redirect: '/audit/index',
    children: [{
      path: 'audit',
      name: 'audit',
      component: () => import('@/views/audit/index'),
      meta: {title: '提现审核', icon: 'product-cate'}
    }]
  },
  {
    path: '/moneyDt',
    component: Layout,
    redirect: '/audit/index',
    children: [{
      path: 'moneyDt',
      name: 'moneyDt',
      component: () => import('@/views/moneyDt/index'),
      meta: {title: '收支明细', icon: 'product-cate'}
    }]
  },
  {
    path: '/coupon',
    component: Layout,
    redirect: '/sms/coupon/index',
    children: [
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/sms/coupon/index'),
        meta: {title: '优惠券列表', icon: 'sms-coupon'}
      },
    ]
  },
  {
    path: '/authority',
    component: Layout,
    name: 'authority',
    meta: {title: '权限管理', icon: 'product'},
    children: [{
      path: 'role',
      name: 'role',
      component: () => import('@/views/authority/role/index'),
      meta: {title: '角色管理', icon: 'product-list'}
    },
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/authority/account/index'),
        meta: {title: '帐号管理', icon: 'product-add'}
      },
    ]
  },






  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: '商品', icon: 'product'},
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: {title: '商品列表', icon: 'product-list'}
    },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('@/views/pms/product/add'),
        meta: {title: '添加商品', icon: 'product-add'}
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        component: () => import('@/views/pms/product/update'),
        meta: {title: '修改商品', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'productRecycle',
        name: 'productRecycle',
        component: () => import('@/views/pms/product/index'),
        meta: {title: '商品回收站', icon: 'product-recycle'},
        hidden: true
      },
      {
        path: 'productComment',
        name: 'productComment',
        component: () => import('@/views/pms/product/index'),
        meta: {title: '商品评价', icon: 'product-comment'},
        hidden: true
      },
      {
        path: 'productCate',
        name: 'productCate',
        component: () => import('@/views/pms/productCate/index'),
        meta: {title: '商品分类', icon: 'product-cate'}
      },
      {
        path: 'addProductCate',
        name: 'addProductCate',
        component: () => import('@/views/pms/productCate/add'),
        meta: {title: '添加商品分类'},
        hidden: true
      },
      {
        path: 'updateProductCate',
        name: 'updateProductCate',
        component: () => import('@/views/pms/productCate/update'),
        meta: {title: '修改商品分类'},
        hidden: true
      },
      {
        path: 'productAttr',
        name: 'productAttr',
        component: () => import('@/views/pms/productAttr/index'),
        meta: {title: '商品类型', icon: 'product-attr'}
      },
      {
        path: 'productAttrList',
        name: 'productAttrList',
        component: () => import('@/views/pms/productAttr/productAttrList'),
        meta: {title: '商品属性列表'},
        hidden: true
      },
      {
        path: 'addProductAttr',
        name: 'addProductAttr',
        component: () => import('@/views/pms/productAttr/addProductAttr'),
        meta: {title: '添加商品属性'},
        hidden: true
      },
      {
        path: 'updateProductAttr',
        name: 'updateProductAttr',
        component: () => import('@/views/pms/productAttr/updateProductAttr'),
        meta: {title: '修改商品属性'},
        hidden: true
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/pms/brand/index'),
        meta: {title: '品牌管理', icon: 'product-brand'}
      },
      {
        path: 'addBrand',
        name: 'addBrand',
        component: () => import('@/views/pms/brand/add'),
        meta: {title: '添加品牌'},
        hidden: true
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        component: () => import('@/views/pms/brand/update'),
        meta: {title: '编辑品牌'},
        hidden: true
      }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: {title: '订单', icon: 'order'},
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/oms/order/index'),
        meta: {title: '订单列表', icon: 'product-list'}
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {title: '订单详情'},
        hidden:true
      },
      {
        path: 'deliverOrderList',
        name: 'deliverOrderList',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: {title: '发货列表'},
        hidden:true
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        component: () => import('@/views/oms/order/setting'),
        meta: {title: '订单设置', icon: 'order-setting'}
      },
      {
        path: 'returnApply',
        name: 'returnApply',
        component: () => import('@/views/oms/apply/index'),
        meta: {title: '退货申请处理', icon: 'order-return'}
      },
      {
        path: 'returnReason',
        name: 'returnReason',
        component: () => import('@/views/oms/apply/reason'),
        meta: {title: '退货原因设置', icon: 'order-return-reason'}
      },
      {
        path: 'returnApplyDetail',
        name: 'returnApplyDetail',
        component: () => import('@/views/oms/apply/applyDetail'),
        meta: {title: '退货原因详情'},
        hidden:true
      }
    ]
  },
  {
    path:'/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'sms',
    meta: {title: '营销', icon: 'sms'},
    children: [
      {
        path: 'flash',
        name: 'flash',
        component: () => import('@/views/sms/flash/index'),
        meta: {title: '秒杀活动列表', icon: 'sms-flash'}
      },
      {
        path: 'flashSession',
        name: 'flashSession',
        component: () => import('@/views/sms/flash/sessionList'),
        meta: {title: '秒杀时间段列表'},
        hidden:true
      },
      {
        path: 'selectSession',
        name: 'selectSession',
        component: () => import('@/views/sms/flash/selectSessionList'),
        meta: {title: '秒杀时间段选择'},
        hidden:true
      },
      {
        path: 'flashProductRelation',
        name: 'flashProductRelation',
        component: () => import('@/views/sms/flash/productRelationList'),
        meta: {title: '秒杀商品列表'},
        hidden:true
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/sms/coupon/index'),
        meta: {title: '优惠券列表', icon: 'sms-coupon'}
      },
      {
        path: 'addCoupon',
        name: 'addCoupon',
        component: () => import('@/views/sms/coupon/add'),
        meta: {title: '添加优惠券'},
        hidden:true
      },
      {
        path: 'updateCoupon',
        name: 'updateCoupon',
        component: () => import('@/views/sms/coupon/update'),
        meta: {title: '修改优惠券'},
        hidden:true
      },
      {
        path: 'couponHistory',
        name: 'couponHistory',
        component: () => import('@/views/sms/coupon/history'),
        meta: {title: '优惠券领取详情'},
        hidden:true
      },
      {
        path: 'brand',
        name: 'homeBrand',
        component: () => import('@/views/sms/brand/index'),
        meta: {title: '品牌推荐', icon: 'product-brand'}
      },
      {
        path: 'new',
        name: 'homeNew',
        component: () => import('@/views/sms/new/index'),
        meta: {title: '新品推荐', icon: 'sms-new'}
      },
      {
        path: 'hot',
        name: 'homeHot',
        component: () => import('@/views/sms/hot/index'),
        meta: {title: '人气推荐', icon: 'sms-hot'}
      },
      {
        path: 'subject',
        name: 'homeSubject',
        component: () => import('@/views/sms/subject/index'),
        meta: {title: '专题推荐', icon: 'sms-subject'}
      },
      {
        path: 'advertise',
        name: 'homeAdvertise',
        component: () => import('@/views/sms/advertise/index'),
        meta: {title: '广告列表', icon: 'sms-ad'}
      },
      {
        path: 'addAdvertise',
        name: 'addHomeAdvertise',
        component: () => import('@/views/sms/advertise/add'),
        meta: {title: '添加广告'},
        hidden:true
      },
      {
        path: 'updateAdvertise',
        name: 'updateHomeAdvertise',
        component: () => import('@/views/sms/advertise/update'),
        meta: {title: '编辑广告'},
        hidden:true
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

