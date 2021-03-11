<template>
  <div class="playlist">
    <img alt="Vue logo" src="../assets/logo.png" />
    <router-link :to="'/playlistDetail/'+id">to PlaylistDetail</router-link>
    <!-- <HelloWorld :msg="info" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Test",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      list: null,
      id:123,
    };
  },
  created() {
      this.$api.personalized.newsong().then((response) => {
        console.log(response)
        this.list = JSON.stringify(response.data.result);
      });
  },
  mounted() {
    // this.onload();
  },
  // beforeRouteEnter(to,from,next){
    
  // }
};
</script>
<style lang="stylus" scoped>
.playlist
  overflow hidden
</style>
