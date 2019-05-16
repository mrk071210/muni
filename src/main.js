import Vue from 'vue'
import App from './App'
import CustomerHeader from './components/header/header.vue'
import request from '@/common/request.js'
import './common/font/iconfont.css'
Vue.config.productionTip = false

Vue.component('customer-header', CustomerHeader)
App.mpType = 'app'

request.setConfig({
  baseUrl: 'http://192.168.0.142:3000', 
  dataType: 'json', 
  responseType: 'text', 
  header: {
    'content-type': 'application/json' 
  }
})

// 设置请求拦截器
request.interceptors.request(config => {
  // 配置参数和全局配置相同，此优先级最高，会覆盖在其他地方的相同配置参数

  // 追加请求头，推荐
  // config.header['content-type'] = 'application/json';
  // config.header.token = 'token from interceptors';

  // 覆盖请求头
  // config.header = {
    // 'content-type': 'application/json',
    // 'token': 'token from interceptors'
  // }

  // return false; // 终止请求
  // return Promise.reject('error from request interceptors'); // 向外层抛出错误，用catch捕获
  return config; // 返回修改后的配置，如未修改也需添加这行
})

// 设置响应拦截器
request.interceptors.response(res => {
  // 接收请求，执行响应操作
  // 您的逻辑......

  // return false;    // 阻止返回,页面不会接收返回值
  // return {message: '自定义值，来自拦截器'};   // 返回您自定义的值，将覆盖原始返回值
  // return Promise.reject('error from response interceptors') // 向外层抛出错误，用catch捕获
  return res; // 原样返回
})

// // 挂载到全局vue实例上，在页面中可以使用this.$request调用request实例下相应方法
Vue.prototype.$request = request;


const app = new Vue({
	...App
})
app.$mount()
