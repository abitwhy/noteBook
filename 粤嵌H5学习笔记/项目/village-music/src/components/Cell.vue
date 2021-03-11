<template>
  <div class="cell" @click="$router.push(to)">
    <div class="header">
      <slot name="left"></slot>
      <div class="mid">
        <h4 class="title thide">{{ title }}</h4>
        <div class="describe thide"><span v-if="hq" class="hq"></span>{{ describe }}</div>
        <slot name="addtion"></slot>
      </div>
      <slot name="right">
        <span class="icon"></span>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Cell",
  props: {
    title: String,
    describe: String,
    hq:Boolean, //高清图标
    to: [String, Object],
  },
  methods: {},
};
</script>
<style lang="stylus" scoped>
// 单行文字溢出隐藏
.thide
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    word-break normal
.cell
  .header
      padding-left 10px
      display flex
      align-items center
      justify-content space-between
      .mid
          flex 1
          max-width 88% // 配合单行文字溢出隐藏
          padding 5px 0
          border-bottom 1px solid gainsboro
          text-align left
          display flex
          flex-flow column
          // .title
              // height 50%
          .describe
              font-size smaller
              color #888888
              .hq
                display inline-block
                vertical-align text-bottom
                width 1em
                height 1em
                background url(../assets/images/hq-line.svg)
                background-size contain
          .addtion
            margin-top 5px
      .icon
          width 30px
          height 30px
          background url(../assets/images/play-btn.svg)
          background-size contain
</style>
