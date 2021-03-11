/** 
 * api接口的统一出口
 */
// 模块接口
import personalized from '@/api/personalized'
import banner from '@/api/banner'
import dj from '@/api/dj'
// 其他模块的接口……

// 导出接口
export default {
    personalized,
    banner,
    dj
    // ……
}
