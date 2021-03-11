import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
// import Playlist from '../views/Playlist'
// import PlaylistDetail from '../views/PlaylistDetail'
// import Radio from '../views/Radio'
// import Singer from '../views/Singer'
// import Newest from '../views/Newest'
// import Refresh from '../views/Refresh'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        name: 'Home',
        nameZH: '个性推荐', // 自定义路由中文名属性,有该属性的路由才出现在导航中
        component: Home,
        alias: ['/', '/recommed'], // 别名
        meta:{ // 设置全局组件显隐
            Topbar:true,
            Navbar:true,
            Player:true
        }
    },
    {
        path: '/playlist',
        name: 'Playlist',
        nameZH: '歌单',
        // component: Playlist,
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Playlist.vue'),
        meta:{
            Topbar:true,
            Navbar:true,
            Player:false
        }
    },
    {
        path: '/playlistDetail/:id',
        name: 'PlaylistDetail',
        // component: Playlist,
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/PlaylistDetail.vue'),
        meta:{
            Topbar:false,
            Navbar:false,
            Player:false
        }
    },
    {
        path: '/radio',
        name: 'Radio',
        nameZH: '电台',
        // component: Radio,
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Radio.vue'),
        meta:{
            Topbar:true,
            Navbar:true,
            Player:false
        }
    },
    {
        path: '/rank',
        name: 'Rank',
        nameZH: '排行榜',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Rank.vue'),
        meta:{
            Topbar:true,
            Navbar:true,
                Player:false
        }
    },
    {
        path: '/singer',
        name: 'Singer',
        nameZH: '歌手',
        // component: Singer,
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Singer.vue'),
        meta:{
            Topbar:true,
            Navbar:true,
            Player:false
        }
    },
    {
        path: '/newest',
        name: 'Newest',
        nameZH: '最新音乐',
        // component: Newest,
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Newest.vue'),
        meta:{
            Topbar:true,
            Navbar:true,
            Player:false
        }
    },
    {
        path: '/refresh',
        name: 'Refresh',
        // component: Refresh,
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Refresh.vue'),
        meta:{
            Topbar:true,
            Navbar:true,
            Player:false
        }
    },    {
        path: '/test',
        // component: Refresh,
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Test.vue'),
        meta:{
            Topbar:true,
            Navbar:false,
            Player:false,
        }
    },

]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    // ...
    console.log('to:',to);
    console.log('from:',from);
    // 配合 van-tab 组件效果

    next();
})
export default router