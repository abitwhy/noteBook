import Vue from 'vue'
// 安装路由插件
// npm 命令: npm i vue-router --save (注意不是 -D,因为 router 是生产环境下需要使用的组件)
// 或 vue 命令:vue add router // 这会覆盖 App.vue,需提前备份该文件
// 引入: 
import Router from 'vue-router'
// 使用:
Vue.use(Router);
// 引入组件/页面
// import HelloWorld from '@/components/HelloWorld'
import HelloWorld from '../components/HelloWorld' // 虽然路由里可以放组件,但其语义是存放 view 里的视图的
import readme from '../views/readme' // 视图 view 通常是一整张页面,因此也有人把它命名为页面 page

export default new Router({
    mode: 'history', // 设置切换路由的方式,三个可选参数: hash(默认),history 和 abstract, 详见:https://www.cnblogs.com/ceceliahappycoding/p/10552620.html
    base: process.env.BASE_URL, // 配置 css 样式的基准路径
    linkActiveClass: 'active', // 激活样式类名:当前路由及其所有根路由都会匹配该样式
    linkExactActiveClass: 'active-ex', // 精准匹配样式类名,只有当前路由会匹配该样式
    routes: [{ // 路映射表由表
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
        },
        {
            path: '/readme',
            name: 'readme',
            component: readme,
        },
        {
            path: '/lazy-loader',
            name: 'lazy-loader',
            component: () =>
                import ('../views/lazy-loader'),
        },
    ]
})