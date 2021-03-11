import Vue from 'vue'
import App from './App.vue'
// import router from './router/index.js' // 引入路映射表由表 (若在使用脚手架创建项目时选择路由插件,此步骤会自动配置好)
import router from './router' // /index.js 可略写

Vue.config.productionTip = false;
/* eslint-disable no-new */

new Vue({
    router, // 挂载路由到根组件(若在使用脚手架创建项目时选择路由插件,此步骤会自动配置好)
    // 通过注入路由器，我们可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由
    render: h => h(App),
}).$mount('#app');

// 原写法:
// new Vue({
//     el: '#app',
//     // router,
//     components: {
//         App
//     },
//     template: '<App/>'
// });