<template>
  <div class="loading" :style="{ height: height + 'px' }">
    <span
      v-for="i in 5"
      :key="i"
      :style="{ width: width + 'px', marginLeft: i > 1 && marginLeft + 'px' }"
    ></span>
  </div>
</template>
<script>
export default {
  name: "Loading",
  props: {
    height: {
      type: Number,
      default: 30,
    },
  },
  data() {
    return {
      //   height: 90,
    };
  },
  computed: {
    width() {
      return this.height / 8;
    },
    marginLeft() {
      return this.height / 10;
    },
  },
};
</script>
<style lang="stylus" scoped>
.loading
    width 100%
    display flex
    justify-content center
    span
        height 100%
        background #dd001b
        border-radius 5px
        box-shadow 2px 2px 2px
        &:nth-child(1)
            transform scaleY(1)
            animation tall .3s linear .1s infinite
        &:nth-child(2)
            transform scaleY(0.8)
            animation tall .3s linear .11s infinite
        &:nth-child(3)
            transform scaleY(0.6)
            animation tall .3s linear .14s infinite
        &:nth-child(4)
            transform scaleY(0.4)
            animation tall .3s linear .17s infinite
        &:nth-child(5)
            transform scaleY(0.2)
            animation tall .3s linear .22s infinite
@keyframes tall {
    from{
        transform scaleY(1)
    }
    to{
        transform scaleY(0.2)
    }
}
</style>
