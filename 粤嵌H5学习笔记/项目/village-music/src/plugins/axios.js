"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: "https://musicapi.leanapp.cn"
  // baseURL:"http://music.kele8.cn"
  // baseURL:"http://y.music.163.com/m/"
  // baseURL:"http://192.168.96.2:3000" // living server 测试接口
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

// 请求拦截
_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // 如:设置 token
    // const token = store.state.token;        
    // token && (config.headers.Authorization = token); // 'Authorization'字段可能需要和后台规定一致
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
    // 还可以起更多别名
  });
  // 使用: Vue.axios,window.axios,this.$axios,this.$axios
};

Vue.use(Plugin)

export default Plugin;
