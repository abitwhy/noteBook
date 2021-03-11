<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{info}}</div>
  </div>
</template>
<script>
export default {
  name:"About",
  data(){
    return {
      info:null
    }
  },
  mounted(){
    this.$axios({
      method:"post",
      url:"/personalized/newsong",
    })
    .then(response=>{
      this.info = response
    })
    .catch(error=>console.log(error,'error'))
  }
}
</script>
