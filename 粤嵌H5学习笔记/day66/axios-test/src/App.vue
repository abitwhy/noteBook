<template>
  <div id="app">
    <Topbar></Topbar>
    <Navbar></Navbar>
    <!-- <router-view class="main" /> -->
    <transition enter-active-class="animate__animated animate__fadeIn animate__faster">
      <router-view class="main"></router-view>
    </transition>
    <Player></Player>
    <!-- <a id="top" href="#" alt="to top"></a> -->
    <van-icon tag="a" id="top" name="arrow-up" size="20" href="#" />
  </div>
</template>
<script>
import Vue from 'vue'
import animated from 'animate.css' 
import Topbar from "@/components/Topbar.vue";
import Navbar from "@/components/Navbar.vue";
import Player from "@/components/Player";

Vue.use(animated)

export default {
  components: {
    Topbar,
    Navbar,
    Player,
  },
  data() {
    return {};
  },
  methods: {
    onload() {
      // console.log(this.$router)
      // console.log(this.$router.options.routes)
      // console.log(this.$route)
    },
  },
  mounted() {
    // this.onload()
  },
};
</script>

<style lang="stylus">
body {
  background: #ceddf3;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main {
  margin-bottom: 80px;
}

#top {
  border-radius: 4px;
  background-color: #ffffff99;
  position: fixed;
  right: 5px;
  top: 70%;
}
</style>
