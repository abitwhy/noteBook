import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Playlist from '../views/Playlist.vue'
import Song from '../views/Song.vue'
// import Auth from '../views/Auth.vue' // 测试登录=>失败:没有成功跳转

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    alias: ['/home', '/recommed'], // 别名
    // meta:{ // 设置全局组件显隐等布尔配置
    //     Banner:true,
    //     Navbar:true,
    //     Player:true
    // }
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
  }, {
    path: '/playlist',
    name: 'Playlist',
    component: Playlist,
  }, {
    path: '/song',
    name: 'Song',
    component: Song,
  },
  // {
  //   path:'/auth',
  //   name:'Auth',
  //   component:Auth,
  //   meta:{
  //     requireAuth: true,
  //   }
  // }

]

const router = new VueRouter({
  routes,
})
router.beforeEach((to,from,next)=>{
  //window.document.title=to.meta.title;
  if(to.meta.requireAuth == true){  //需要登录权限进入的路由
    if(this.$store.state.token){  //取到登录信息
       next()
    }else if(sessionStorage.getItem('isLogin')){  //得到登录信息，进行下一步
      next();
    }else{
        next({name:'Login'});
    }
  }else{  //不需要登录权限
     next();
  }
})

export default router
