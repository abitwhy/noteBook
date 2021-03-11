<template>
  <div id="app">
    <div id="nav">
      <!-- tag 属性可以指定渲染出何种标签 -->
      <router-link :tag="tag" to="/home">微博</router-link>
      <!-- to 属性可以是一个配置对象 -->
      <router-link :tag="tag" :to="{
          path:'/video',
          hash:'#hot',
          name:'Video',
          params:{
            foo: '若提供了 path,params 会被忽略'
          },
          query:{
            bar: 'bar'
          }}">视频</router-link>
          <!-- hash 需要配合 router 实例里的 scrollBehaviol 配置对象,来跳转到指定路由下指定锚点=>发现其会导致路由切换动画失效 -->
          <!-- 提供 name 参数会跳转到对应的命名路由,name 与 params 配合使用可完全替代书写 path 参数,使用起来更便捷 -->
      <router-link :tag="tag" to="/look">发现</router-link>
      <router-link :tag="tag" to="/news">消息</router-link>
    </div>
    <transition enter-active-class="animate__animated animate__fadeInRight"
                leave-active-class="animate__animated animate__fadeOutLeft">
      <router-view class="view" />
    </transition>
    <!-- <keep-alive><router-view class="view"></router-view></keep-alive> -->

  </div>
</template>
<script>
export default {
  data(){
    return{
      tag: 'b'
    }
  }
}
</script>

<style lang="stylus">
  baseColor = #42b991

  body
    height 100vh
    padding 0
    overflow-x hidden

    #app
      font-family Avenir, Helvetica, Arial, sans-serif
      -webkit-font-smoothing antialiased
      -moz-osx-font-smoothing grayscale
      text-align center
      color #2c3e50
      margin-top 60px

      a
        color black
        &:hover
          color baseColor

     #nav
        width 100%
        height 50px
        border-top 1px solid
        line-height 50px
        font-weight bold
        background-color #ebebeb
        position fixed
        bottom: 0
        z-index 1
        display flex
        justify-content space-around

        &>*
          cursor pointer
          &:hover
            color baseColor

        .active
          color baseColor
        .ex-active::before
          content '>'
          
     .view
        width 100%
        position absolute
</style>
