<template>
  <div class="look">
    <h2>发现</h2>
    <router-link v-for="i in 4" :key="i" :to="`/look/${i}`" tag="p" active-class="active active-l" exact-active-class="ex-active ex-active-l">section{{i}}</router-link>
    <router-view/>
    <!-- <keep-alive><router-view/></keep-alive> -->
  </div>
</template>

<script>
  // import Section from '@/views/Section'
  export default {
    name: 'Look',
    beforeRouteEnter(to,from,next){
      console.log('%cevent','background:skyblue;font-weight: bold;','message beforeRouteEnter');
      console.log('message beforeRouteEnter this:',this);
      next(function(vm){
        // next 在 created 与 mounted 之间发生,默认参数为组件实例 vm
        console.log('%cevent','background:skyblue;font-weight: bold;','message beforeRouteEnter next', vm);
      });
    },
    beforeRouteLeave(to,from,next){
      console.log('%cevent','background:skyblue;font-weight: bold;','message beforeRouteLeave');
      console.log('message beforeRouteLeave this:',this);
      next();
    },
    created(){
      console.log('%cevent','background:skyblue;font-weight: bold;','message created');
    },
    mounted(){
      console.log('%cevent','background:skyblue;font-weight: bold;','message mounted');
    },
    distroyed(){
      console.log('%cevent','background:skyblue;font-weight: bold;','message distroyed');
    },
  }
</script>

<style lang="stylus" scoped>
  baseColor = #42b991
  .active-l
    color baseColor
  .ex-active-l::before
    content '>'
</style>
