<template>
  <div class="part">
    <div class="title">{{ title }}</div>
    <i></i>
    <slot>内容</slot>
  </div>
</template>
<script>
export default {
  name: "Part",
  props: {
    title: String,
  },
};
</script>
<style lang="stylus" scoped>
.part
    padding-top 1px // 解决 margin 塌陷
    // background #fcfcfd
    .title
      position relative
      width 100%
      margin 5px 0
      padding-left 10px
      font-size large
      text-align left 
      &::before
        content ''
        position absolute
        left 2px
        top 4px
        width 3px
        height 1em
        background #dd001b
    i 
      display  inline-block
      width 94%
      margin 0 auto 10px
      border-top 1px solid #ebebeb 
      
</style>
