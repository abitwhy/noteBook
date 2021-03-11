<template>
  <div class="leaving">
    <slot v-show="!text">正在跳转</slot>
    {{ text }}<i v-for="i in count && count % 4" :key="i">.</i>
  </div>
</template>
<script>
export default {
  name: "Leaving",
  props: {
    text: { type: String, default: "" },
  },
  data() {
    return {
      count: 0,
      timer: null,
    };
  },
  created() {
    this.counter();
  },
  destoryed() {
    clearInterval(this.timer);
  },
  methods: {
    counter() {
      this.timer = setInterval(() => {
        this.count++;
      }, 333);
    },
  },
};
</script>
<style lang="stylus" scoped>
.leaving
    position fixed
    z-index 100
    left 50%
    top 50%
    transform translateX(-50%)
    width 38.1vw
    padding 0 10px
    background #0009
    color #fff
    font-size 24px
    text-align left
</style>
