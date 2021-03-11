import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const dj = {
    // 说明 : 调用此接口,可获取电台banner
    banner() {
        return axios.get(`${base.musicapi}/dj/banner`); // 接口状态:404 (Not Found)
    }
}

export default dj