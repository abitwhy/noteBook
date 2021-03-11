import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './plugins/anxios';
import store from './store'
import { Button } from 'vant' // 全局按需引入


Vue.config.productionTip = false

Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios

Vue.use(Button)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')