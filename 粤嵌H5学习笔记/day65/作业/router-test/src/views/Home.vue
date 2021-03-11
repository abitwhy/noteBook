<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h1>主页</h1>
    <Nav ref="nav" :list="list">
      <template #default="{index}">
        <a id="list[index].id" href="javascript:;">{{list[index].content}}</a>
      </template>
      <template #control="{controler}">
        <span>{{controler.lastPick}}</span>
      </template>
    </Nav>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Nav from '@/components/Nav.vue'

  export default {
    name: 'Home',
    data() {
      return{
        list: [{
          id: 'concern',
          content: '关注',
        },{
          id: 'recommend',
          content: '推荐'
        }]
      }
    },
    methods:{
      pick(){
        this.$refs.Nav
      }
    },
    components: {
      Nav
    }
  }
</script>
<style lang="stylus" scoped>
  h1
    text-align center
</style>

