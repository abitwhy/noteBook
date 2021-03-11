<template>
  <div class="about">
    <h1>测试断网</h1>
    <p>{{network}}</p>
    <div v-if="!network">      
        <h3>我没网了</h3>      
        <div @click="onRefresh">刷新</div>
    </div>      
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {  
        name: 'About',  
        computed: {    
            ...mapState(['network'])  
        },  
        methods: {    
            // 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
            onRefresh () {      
                this.$router.replace('/refresh')    
            }  
        }
    }
</script>
