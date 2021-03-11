<template>
    <div>
        <h1>section{{id}}</h1>
    </div>
</template>
<script>
export default {
    name:'Section',
    data(){
        return {
            id:0
        }
    },
    beforeRouteUpdate(to,from,next){
        console.log('%cevent','background:skyblue;font-weight: bold;','Section beforeRouteUpdate');
        console.log("this.$route.params.id:",this.$route.params.id);
        console.log("to.params.id:",to.params.id);
        console.log("from.params.id:",from.params.id);
        this.id = to.params.id;
        next();
    },
    created(){
        this.id=this.$route.params.id;
        console.log('%cevent','background:skyblue;font-weight: bold;','Section created',this.$route.params.id);
    },

}
</script>