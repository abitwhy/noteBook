<template>
  <!-- <p>here is test</p> -->
  <van-sticky>
    <van-nav-bar
      :title="title"
      class="back"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </van-sticky>
</template>
<script>
import Vue from "vue";
import { NavBar } from "vant";

Vue.use(NavBar);
export default {
  name: "Back",
  props: {
    title: {
      type: String,
      defualt: "标题",
    },
  },
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="stylus" scoped>
.back{
    height 44px
}
</style>
