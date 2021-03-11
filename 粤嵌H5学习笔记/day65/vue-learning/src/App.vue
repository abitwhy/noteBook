<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld num="9"/> -->
    <router-link class="rl" to="/">首页</router-link> <!-- router-link 默认渲染为 a 标签 -->
    <router-link class="rl" to="/Readme" num="9" tag="b">Readme</router-link> <!-- tag 允许修改标签类型 -->
    <router-link class="rl" to="/lazy-loader">lazy-loader</router-link>
    <!-- 路由渲染出口 -->
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style lang="stylus" scoped>
  #app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color #2c3e50
    margin-top 60px

  a 
    text-decoration none

  a:hover
    color #8dc149

  .rl+.rl::before
    content '-'

</style>
