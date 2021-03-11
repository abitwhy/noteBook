<template>
  <div
    v-if="!title"
    class="back backIcon icon"
    :style="backIconStyle"
    @click="back"
  ></div>
  <div v-else class="back backText" :style="backTextStyle">
    <div class="icon" :style="{ width: size*0.7, height: size*0.7 }" @click="back"></div>
    <div class="title" :style="{marginLeft:`-${size}`}">{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: "Back",
  props: {
    title: String,
    height: {
      type: [Number, String],
      default: 30,
    },
    top:{
        type:[Number,String],
        default:0
    }
  },
  //   filters: {
  //     formatSize(val) { // 在 style 属性中无法使用通道,filtes 未定义
  //       return typeof val == "number" ? val + "px" : val;
  //     },
  //   },
  computed: {
    size() {
      return this.formatSize(this.height);
    },
    backIconStyle() {
      return { width: this.size, height: this.size, lineHeight: this.size ,top:this.formatSize(this.top)};
    },
    backTextStyle() {
      return { height: this.size, lineHeight: this.size,top:this.formatSize(this.top)};
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    formatSize(val) {
      return typeof val == "number" ? val + "px" : val;
    },
  },
};
</script>
<style lang="stylus" scoped>
.back
    position fixed
    z-index 10
.icon
    width 30px
    height 30px
    background url(../assets/images/back.svg)
    background-size contain
.backIcon
    top 5px !important
    left 5px
    background-color #0606060a
.backText
    width 100%
    display flex
    align-items center
    background #fff
    .title
        flex 1
        font-size large
        font-weight bold
    .icon
        z-index 11
</style>
