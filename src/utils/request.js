// 处理axios发送请求
import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import { Toast } from 'vant'

// 把axios挂载到vue的原型
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL ,基准地址
const URL = 'http://localhost:3000'
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.baseURL = URL
Vue.prototype.$base = URL

// 添加请求拦截器
// 给axios配置拦截器
axios.interceptors.request.use(function(config) {
  // config指的是请求的配置信息
  // console.log('拦截到了请求', config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    router.push('./login')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    Toast.fail('登录游戏失败')
  }
  return response
})
