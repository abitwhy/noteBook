import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const recommend = {
    // 说明 : 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
    resource() {
        return axios.post(`${base.musicapi}/recommend/resource`);
    },
    // 说明 : 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
    songs() {
        return axios.post(`${base.musicapi}/recommend/songs`);
    }
}

export default recommend