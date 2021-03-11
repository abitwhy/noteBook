<template>
  <div class="video">
    <h2>视频</h2>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <Nav :list="list">
      <template #default="{index}">
        <a :id="list[index].id" href="javascript:;">{{list[index].content}}</a>
      </template>
      <template #control="{controler}">
        <span>{{controler.lastPick}}</span>
      </template>
    </Nav>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
    <div>Lorem, ipsum dolor.</div>
  </div>
</template>

<script>
  import Nav from '@/components/Nav.vue'
  
  export default {
    name: 'Video',
    data(){
      return{
        list:[{
          id: 'hot',
          content: '热门视频'
        },{
          id: 'latest',
          content: '最新视频'
        },]
      }
    },
    components:{
      Nav
    }
  }

</script>