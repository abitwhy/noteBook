<template>
    <p>刷新中...</p>
</template>
<script>
import store from '@/store/index'
export default {
    name:'Refresh',
    beforeRouteEnter (to, from, next) {
        next(vm => {   
            setTimeout(()=>{
                vm.$router.replace(from.fullPath)
                store.commit('changeNetwork', { online: window.navigator.onLine })
                }
            ,1000)    
        })    
    }
}
</script>