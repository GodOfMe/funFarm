import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css
import '@/styles/common.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import globalFun from '@/assets/common.js'
Vue.prototype.$globalFun = globalFun;
import '@/icons' // icon
import '@/permission' // permission control
import filters from '@/assets/filters'; // 全局vue filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.use(ElementUI,{size: 'small'})
Vue.use(VCharts)

Vue.config.productionTip = false
// AJAX接口封装
import * as api from '@/api/index'
Vue.prototype.$api = api;
// 各种格式化
// 年-月-日 时-分-秒
Vue.filter('timeFormat', timestamp => {
  if (!timestamp) {
    return '-';
  }
  let time = new Date(timestamp);
  let month =
    time.getMonth() + 1 < 10
      ? `0${time.getMonth() + 1}`
      : `${time.getMonth() + 1}`;
  let date = time.getDate() < 10 ? `0${time.getDate()}` : `${time.getDate()}`;
  let hours =
    time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
  let minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
  let seconds =
    time.getSeconds() < 10 ? `0${time.getSeconds()}` : `${time.getSeconds()}`;
  return `${time.getFullYear()}-${month}-${date} ${hours}:${minutes}:${seconds}`;
});
// 年-月-日
Vue.filter('dateFormat', timestamp => {
  if (!timestamp) {
    return '-';
  }
  let time = new Date(timestamp);
  let month =
    time.getMonth() + 1 < 10
      ? `0${time.getMonth() + 1}`
      : `${time.getMonth() + 1}`;
  let date = time.getDate() < 10 ? `0${time.getDate()}` : `${time.getDate()}`;
  return `${time.getFullYear()}-${month}-${date}`;
});
Vue.filter('tableFormat', timestamp => {
  if (!timestamp) {
    return '-';
  }
  let time = new Date(timestamp);
  let month =
    time.getMonth() + 1 < 10
      ? `0${time.getMonth() + 1}`
      : `${time.getMonth() + 1}`;
  let date = time.getDate() < 10 ? `0${time.getDate()}` : `${time.getDate()}`;
  return `${time.getFullYear()}${month}${date}`;
});
// 年-月-日 时-分
Vue.filter('dateFormatMinute', timestamp => {
  if (!timestamp) {
    return '-';
  }
  let time = new Date(timestamp);
  let month =
    time.getMonth() + 1 < 10
      ? `0${time.getMonth() + 1}`
      : `${time.getMonth() + 1}`;
  let date = time.getDate() < 10 ? `0${time.getDate()}` : `${time.getDate()}`;
  let hour =
    time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
  let minute =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
  return `${time.getFullYear()}-${month}-${date} ${hour}:${minute}`;
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
