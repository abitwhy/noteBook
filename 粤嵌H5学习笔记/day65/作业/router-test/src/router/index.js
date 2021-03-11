import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        name: 'Home',
        component: Home,
        alias: '/' // 别名
    },
    {
        path: '/video',
        name: 'Video',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Video.vue')
    },
    {
        path: '/look',
        name: 'Look',
        component: () =>
            import ('../views/Look.vue'),
        children: [{
            path: '/look/:id',
            component: () =>
                import ('../views/Section')
        }]
    },
    {
        path: '/news',
        name: 'News',
        component: () =>
            import ('../views/News.vue')
    },
]

const router = new VueRouter({
    routes,
    // mode: 'history',
    base: process.env.BASE_URL, // 配置 css 样式的基准路径
    linkActiveClass: 'active', // 激活样式类名:当前路由及其所有根路由都会匹配该样式
    linkExactActiveClass: 'ex-active', // 精准匹配样式类名,只有当前路由会匹配该样式
    scrollBehavior(to) {
        if (to.hash !== '') {
            return {
                selector: to.hash
            }
        }
        // 还可以默认滚动指定距离
        // return {
        //     x:100,
        //     y:100,
        // }
    }
});

export default router