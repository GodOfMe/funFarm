import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service


// post方法
export function POST(url, params) {
  if (typeof params == "undefined") {
    return new Promise((resolve, reject) => {
      service.post(url, params)
      .then(
        response => {
          resolve(response);
        },
        err => {
          reject(err);
        }
      )
      .catch(err => {
        reject(err);
      });
    });
  } else {
    let header = params["header-config"];
    if (typeof header == "undefined") {
      return new Promise((resolve, reject) => {
        service.post(url, params)
        .then(
          response => {
            resolve(response);
          },
          err => {
            reject(err);
          }
        )
        .catch(err => {
          reject(err);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        service.post(url, params, { headers: header })
        .then(
          response => {
            resolve(response);
          },
          err => {
            reject(err);
          }
        )
        .catch(err => {
          reject(err);
        });
      });
    }
  }
}

// get方法
export function GET(url, params) {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params
    })
    .then(
      response => {
        resolve(response);
      },
      err => {
        reject(err);
      }
    )
    .catch(err => {
      reject(err);
    });
  });
}
