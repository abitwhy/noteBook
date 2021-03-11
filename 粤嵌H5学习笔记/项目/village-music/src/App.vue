<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
    </div> -->
    <router-view/>
    <Top></Top>
  </div>
</template>
<script>
import Vue from 'vue'
import animated from 'animate.css' 
import Top from './components/Top' 

Vue.use(animated)
export default {
  components:{
    Top
  }
}
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
</style>
