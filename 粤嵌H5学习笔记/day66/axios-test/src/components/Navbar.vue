<template>
  <!-- 顶部导航栏 -->
  <van-sticky :offset-top="54">
    <van-tabs
      v-show="this.$route.meta.Navbar"
      ref="tabs"
      v-model="active"
      class="navbar"
      animated
      ellipsis
    >
      <van-tab
        class="nav"
        v-for="(path, index) in routesPath"
        :key="index"
        :to="path"
        :title="routesNameZH[index]"
      >
      </van-tab>
      <a href="#">其他</a>
      <a href="#">其他</a>
      <a href="#">其他</a>
      <a href="#">其他</a>
      <a href="#">其他</a>
      <a href="#">其他</a>
    </van-tabs>
  </van-sticky>
</template>
<script>
// 全局按需引入
import Vue from "vue";
import { Tab, Tabs, Sticky } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Sticky);

export default {
  name: "Navbar",
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    // 导航栏包含的路由
    routes() {
      return this.$router.options.routes.filter((route) => route.nameZH);
    },
    routesPath() {
      return this.routes.map((route) => route.path);
    },
    routesNameZH() {
      return this.routes.map((route) => route.nameZH);
    },
    // activePath() {
    //   return this.routesPath[this.active];
    // },
    // testRoute(){
    //   return this.$route.path;
    // }
  },
  watch: {
    // activePath() {
    //   console.log("active changed");
    //   console.log('activePath:',this.activePath);
    //   // this.$router.replace(this.routesPath[this.active]) // 配合 van-tab 滑动改变路由=>[bug1]:与点击切换路由事件有冲突,报 NavigationDuplicated 错
    //   // debug:[bug1]:拦截异常
    //   // this.$router.push(this.activePath).catch(() => {}); // 配合 van-tab 滑动改变路由=>[bug1]:与点击切换路由事件有冲突,报 NavigationDuplicated 错
    // },
  },
  mounted() {
    // console.log(this.$route.path)
    // console.log(this.$router.options.routes);
    // console.log(this.$router.options.routes.map(route=>route.path))
    // console.log(this.$router.options.routes.filter(route=>route.nameZH).map(route=>route.path))
    // console.log(this.active)
  },
  methods: {},
};
</script>
<style lang="stylus" scoped></style>
