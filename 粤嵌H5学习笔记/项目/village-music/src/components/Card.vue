<template>
  <div class="card" @click="$router.push(to)">
    <img v-if="picUrl" :src="picUrl" />
    <img v-else :src="require('../assets/images/img-error.svg')" alt="歌单" />
    <p v-if="title" class="thide-m">{{ title }}</p>
    <span v-if="info" class="info">{{ info }}</span>
    <div v-if="badge" class="badge">{{ badge }}</div>
    <br />
  </div>
</template>
<script>
export default {
  name: "Card",
  props: {
    picUrl: String,
    title: String,
    info: [String, Number],
    badge: String,
    to: [String, Object],
  },
  filters: {
    // formatNum(val) {
    //     return (val/10000).toFixed(1)
    // }
  },
  methods: {},
};
</script>
<style lang="stylus" scoped>
// 多行文字溢出隐藏
.thide-m
    overflow hidden
    display -webkit-box
    -webkit-box-orient vertical
    -webkit-line-clamp 2

.card
    position relative
    p
        height 2.5em
        text-align left
        font-size small
    .info
        position absolute
        right 2px
        top 2px
        padding-left 2em
        background url(../assets/images/music.svg) no-repeat #00000017
        background-size contain
        font-size xx-small
        color white
        text-shadow: 1px 0 0 black;
    .badge
      position absolute
      top 10px
      height 14px
      line-height 14px
      background #dd001b
      color #fff
      font-size 12px
      &::after
        content ''
        position absolute
        width 0
        height 0
        border 7px solid
        border-color #dd001b
        border-right-color transparent
</style>
