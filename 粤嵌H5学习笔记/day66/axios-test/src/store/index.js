import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    // 开启严格模式,保证状态变仅由 mutation 引起,使得状态变更可调式和追踪
    strict: process.env.NODE_ENV !== 'production', // 仅开发环境开启
    // state 响应式的全局状态,是唯一数据源 (SSOT (opens new window))
    state: {
        network: true,
    },
    // mutations 同步提交状态变更,改变 state 状态的唯一途径.通过 store.commit 方法更改
    mutations: {
        // 注意:Mutation 需遵守 Vue 的响应规则:必须初始化所有属性;订阅模式的添加新属性方式
        changeNetwork(state, palyload) { // 二参被称为提交载荷（Payload）
            state.network = palyload.network
        }
    },

//     state: {
// 		musicid:[],//音乐id
// 		isplayshow:false,//播放条
// 		isdivshow:false,//播放条下面的div
// 		isplay:true,//是否播放音乐
// 		isfulllrc:false,//音乐播放页面是否显示
// 		mvid:[],//mvid
// 		songerid:[],//歌手id
// 		songids:[],//存放当前播放列表的音乐id
// 		songcurindex:[]//存放当前播放音乐在id列表的下标
//   },
// 	mutations: {
// 		modifystate(state,payload){
// 			// if(typeof payload.isfulllrc != "undefined"){
// 			// 	state.isfulllrc=payload.isfulllrc;
// 			// }
// 			for(let s in state){
// 				for(let p in payload){
// 					if(s == p){
// 						state[s]=payload[p]
// 						// console.log(p)
// 					}
// 				}
// 			}
// 			// console.log(state)
// 		}
//   },


    // Action 异步提交 mutation.通过 store.dispatch 方法触发
    actions: {
        changeNetworkAsync({ commit }, palyload) { // 同样支持荷载
            setTimeout(() => {
                commit('changeNetwork', palyload)
            }, 1000)
        }
    },
    modules: {}
})

