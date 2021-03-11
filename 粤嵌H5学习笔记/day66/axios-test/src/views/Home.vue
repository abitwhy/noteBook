<template>
  <div class="home">
    <!-- {{recommend}} -->
    <!-- {{banner}} -->
    <!-- 使用全局按需引入组件 -->
    <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
    </van-swipe> -->
    <div v-for="(name, index) in routeNameZH" :key="index" class="section">
      <template v-if="index > 0">
        <!-- <h4 class="title">
          {{ name }}<router-link :to="routePath[index]+'Detail/'+id">&emsp;></router-link>
        </h4> -->
        <van-cell
          :title="name"
          is-link
          :to="routePath[index] + 'Detail/' + id"
          class="title"
          value="更多"
        />
        <van-row v-if="index==1" type="flex" gutter="10" justify="space-around">
          <van-loading v-if="!playlist.length" type="spinner" color="#dd001b" />
          <van-col v-else span="8" v-for="list in playlist" :key="list.id" class="card">
            <van-image width="100%" :src="list.picUrl" />
            <!-- <div class="van-ellipsis">{{list.name}}</div> -->
            <div class="card-text van-multi-ellipsis--l2">{{ list.name }}</div>
            <br />
          </van-col>
        </van-row>
        
      </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Nav from '@/components/Nav.vue'

// 局部按需引入
// import { Button } from 'vant'

// 全局按需引入
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload, Cell, Loading } from "vant";

Vue.use(Swipe)
  .use(SwipeItem)
  .use(Lazyload);
Vue.use(Cell);
Vue.use(Loading);

export default {
  name: "Home",
  data() {
    return {
      // 推荐歌单
      playlist: [],
      // banner:null,
      // images: [
      //   'https://img01.yzcdn.cn/vant/apple-1.jpg',
      //   'https://img01.yzcdn.cn/vant/apple-2.jpg',
      // ],
      id: 12345,
    };
  },
  computed: {
    routePath() {
      return this.$router.options.routes
        .filter((route) => route.nameZH)
        .map((route) => route.path);
    },
    routeNameZH() {
      return this.$router.options.routes
        .filter((route) => route.nameZH)
        .map((route) => route.nameZH);
    },
  },
  watch: {},
  created() {
    this.get();
  },

  methods: {
    get() {
      // 推荐歌单
      // this.playlist = await this.$api.personalized.personalized(8);
      this.$api.personalized.personalized(6).then((res) => {
        // this.playlist = JSON.stringify(res.data.result);
        this.playlist = res.data.result;
        console.log(this.playlist);
      });
      // 轮播图
      // this.banner = await this.$api.dj.banner()
      // this.$api.banner.banner()
      //   .then(response=>{
      //     console.log(response)
      //   })
    },
    // toTest(){
    //   this.$router.push('/test')
    // }
  },
};
</script>
<style lang="stylus" scoped>
baseColor1 = #f6f6f8; // 背景-灰
baseColor2 = #ceddf3; // 背景-蓝
baseColor3 = #ec4141; // 主题-红
baseColor4 = #3fecff; // 配色-蓝
baseColor5 = #6149f6; // 配色-紫
baseColor6 = #4e9875; // 配色-绿
baseColor7 = #dd001b; // 配色-红

.home
  padding 0 20px
  .section
    .title
      margin-bottom 10px
      background transparent
      text-align left
      .van-cell__title
        font-weight bold
      &::before
        content ''
        position absolute
        top 15px
        left 0
        width 3px
        height 1em
        background baseColor3
    .card-text
      text-align left
      font-size small
</style>
