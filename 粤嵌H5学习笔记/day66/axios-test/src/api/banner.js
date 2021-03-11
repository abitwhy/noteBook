import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const banner = {
    // 说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
    banner() {
        return axios.post(`${base.musicapi}/banner`); // 接口状态:502(Bad Gateway)
    }
}

export default banner