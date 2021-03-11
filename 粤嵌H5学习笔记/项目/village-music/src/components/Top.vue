<template>
  <div v-show="show" class="top" @click="toTop"></div>
</template>
<script>
export default {
  name: "Top",
  data() {
    return {
      show: false,
    };
  },
  computed: {
    // 初始视口高度
    viewH() {
      return document.body.offsetHeight;
    },
  },
  watch: {},
  mounted() {
    this.listenScroll();
  },
  updated() {},
  methods: {
    listenScroll() {
      document.addEventListener("scroll", () => {
        this.show = window.scrollY - this.viewH > 0;
      });
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.top
  width 26px
  height 26px
  // border-radius: 4px;
  background url(../assets/images/top.svg)
  background-size contain
  position: fixed;
  right: 2px;
  top: 60vh;
</style>
