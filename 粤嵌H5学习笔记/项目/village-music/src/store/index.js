import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  state: {
    musicids:[],//音乐id
    // isplayshow:false,//播放条
    // isdivshow:false,//播放条下面的div
    // isplay:true,//是否播放音乐
    // isfulllrc:false,//音乐播放页面是否显示
    // mvid:[],//mvid
    // songerid:[],//歌手id
    // songids:[],//存放当前播放列表的音乐id
    // songcurindex:[]//存放当前播放音乐在id列表的下标


    currentNav: 0,
    token:false,
  },
  mutations: {
    modifystate(state, payload) {
      // if(typeof payload.isfulllrc != "undefined"){
      // 	state.isfulllrc=payload.isfulllrc;
      // }
      for (let s in state) {
        for (let p in payload) {
          if (s == p) {
            state[s] = payload[p]
            // console.log(p)
          }
        }
      }
      // console.log(state)
    },
    login(state,n){
      state.token=true;
      state.username=n;
      sessionStorage.setItem('isLogin',true);
      sessionStorage.setItem('name',n);  // 用于全局展示是谁登录系统
    },
  },
  actions: {
  },
  modules: {
  }
})
