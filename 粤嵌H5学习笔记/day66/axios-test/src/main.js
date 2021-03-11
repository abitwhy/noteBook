import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'

// 全局注册
Vue.prototype.$api = api // 使用方法为:this.$api

Vue.config.productionTip = false

// 全局按需引入
// import { Tab, Tabs } from 'vant'

// Vue.use(Tab).use(Tabs)

// import { Swipe, SwipeItem } from 'vant';

// Vue.use(Swipe).use(SwipeItem)

// import { Lazyload } from 'vant';

// Vue.use(Lazyload);



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')