import axios from 'axios'
// import Qs from 'qs'; // 用来处理参数，可不使用，若要使用，npm安装： npm install qs
axios.defaults.baseURL = 'https://musicapi.leanapp.cn/' // 请求的默认域名
    // axios.defaults.baseURL = 'https://192.168.96.50:8080/' // 请求的默认域名

// 添加一个请求拦截器
axios.interceptors.request.use(config => {
        config.headers.languagetype = 'CN'; // 举例，加上一个公共头部
        return config;
    },
    err => {
        return Promise.reject(err)
    })
axios.interceptors.response.use(res => {
        // 返回处理数据
        return res.data;
    },
    err => {
        return Promise.reject(err)
    })

export default axios