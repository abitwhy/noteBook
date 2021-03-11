/**
 * article模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const personalized = {
    // // 新闻列表    
    // articleList () {        
    //     return axios.get(`${base.sq}/topics`);    
    // },    
    // // 新闻详情,演示    
    // articleDetail (id, params) {        
    //     return axios.get(`${base.sq}/topic/${id}`, {            
    //         params: params        
    //     });    
    // },
    // // post提交    
    // login (params) {        
    //     return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));    
    // }
    personalized(limit) {
        return axios.get(`${base.musicapi}/personalized?limit=${limit||30}`);
    },
    mv() {
        // 说明 : 调用此接口 , 可获取推荐 mv
        return axios.post(`${base.musicapi}/personalized/mv`);
    },
    newsong() {
        // 说明 : 调用此接口 , 可获取推荐新音乐
        return axios.post(`${base.musicapi}/personalized/newsong`);
    },
    djprogram() {
        // 说明 : 调用此接口 , 可获取推荐电台
        return axios.post(`${base.musicapi}/personalized/djprogram`);
    },

}

export default personalized;