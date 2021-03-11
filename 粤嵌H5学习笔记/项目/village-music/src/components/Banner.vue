<template>
  <div class="banner">
    <div :style="{backgroundImage:`url(${data.coverImgUrl||'https://p1.music.126.net/Flkiit40-TEkb3aD_85LVw==/109951165759823173.jpg?imageView=1&type=webp&thumbnail=253x0'}` }" class="bg"></div>
    <div class="content">
      <Card
        :picUrl="data.coverImgUrl"
        :title="data.name"
        :info="data.playCount"
        badge="歌单"
        class="poster"
      >
      </Card>
      <div v-if="bullet" class="bullet">
        <template v-for="(b, i) in bullet">
          <marquee
            v-if="i >= bulletCount - 7 && i < bulletCount"
            :key="i"
            :class="{ first: i == 0, second: i == 1, third: i == 2 }"
          >
            {{ b }}
          </marquee>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
export default {
  name: "Banner",
  components: {
    Card,
  },
  filters: {
    findName(val) {
      return val.map((item) => item.name).join("/");
      // if(val.length){
      //     return val.map(item=>item.name).join('/')
      // }else{
      //     return val.name
      // }
    },
    pad0(val) {
      return String(val).padStart(2, "0");
    },
    formatDate(val) {
      return new Date(val).toLocaleDateString();
    },
  },
  props: {
    data:Object,
    bullet:Array,
    },
  data() {
    return {
      bulletCount: 7, // 控制弹幕展示
      bulletCounter: -1,
    };
  },
  mounted() {
    this.changBullet();
  },
  destroyed() {
    clearInterval(this.bulletCounter);
  },
  methods: {
    changBullet() {
      this.bulletCounter = setInterval(() => {
        this.bulletCount = (this.bulletCount + 7) % this.songs.length;
      }, 6000);
    },
  },
};
</script>
<style lang="stylus" scoped>
.banner
  overflow hidden
  position relative
  .bg
    background-repeat  no-repeat
    background-size cover
    width 100%
    height 100%
    position absolute
    filter blur(25px)
    z-index 1
  .content
    height 150px
    display flex
    align-items flex-end
    position relative
    z-index 2
    .poster
      width 100px
      height 100px
      margin-left 10px
      margin-bottom 5px
      background-size contain
      box-shadow 0 0 5px 1px
      z-index 3
    .bullet
      position absolute
      top 0
      width 100%
      color #fff
      display flex
      flex-flow column
      align-items center

.first
    color #d43c33
.second
    color #6149f6
.third
    color #4e9875

</style>