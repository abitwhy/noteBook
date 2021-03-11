<template>
  <div class="home">
    <Leaving v-if="leaving" />
    <header>
      <div class="banner">
        <span class="left">
          <svg
            t="1614857989240"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3969"
            width="50%"
            height="50%"
          >
            <path
              d="M553.159805 85.21678c-56.94439-20.180293-154.049561-29.970732-212.292683-9.091121-75.026732 27.073561-150.75278 82.31961-177.826342 159.943804-26.574049 75.925854 10.589659 176.427707 86.115903 213.191805 41.259707 20.180293 138.46478 10.989268 142.061268-116.486244 2.197854-77.624195-68.932683-104.597854-133.769366-90.311804-6.793366-27.373268 4.695415-54.546732 27.073561-71.929757 38.462439-30.070634 97.105171-46.954146 145.557854-41.859122 89.812293 9.490732 151.15239 93.80839 171.432585 174.229854 49.451707 196.008585-96.705561 420.589268-256.349658 522.789464-54.247024 34.766049-114.488195 64.337171-178.225951 76.425365-20.87961 3.996098-94.208 4.395707-94.60761 36.664196-0.099902 10.989268 9.290927 16.78361 23.976585 19.381073 43.257756 7.492683 131.171902-13.986341 146.556878-18.581854 113.089561-32.967805 228.077268-102.699707 308.898342-187.61678 90.811317-95.406829 170.233756-212.492488 179.125073-347.460683 8.59161-128.874146-48.35278-273.432976-177.726439-319.288196zM882.338341 274.731707c38.262634 0 69.432195-31.069659 69.432196-69.23239 0-38.162732-31.069659-69.432195-69.432196-69.432195-38.262634 0-69.23239 31.069659-69.23239 69.432195-0.199805 38.162732 30.869854 69.23239 69.23239 69.23239zM882.338341 428.781268c-38.262634 0-69.23239 31.069659-69.23239 69.232391 0 38.162732 31.069659 69.23239 69.23239 69.23239 38.362537 0 69.432195-31.069659 69.432196-69.23239s-31.069659-69.23239-69.432196-69.232391z"
              p-id="3970"
              fill="#fff"
            ></path>
          </svg>
          村音乐
        </span>
        <div class="right">
          <router-link to="/login" tag="span">登录&emsp;>></router-link>
        </div>
      </div>
      <ul class="navbar">
        <li
          v-for="(nav, i) in navs"
          :key="i"
          :class="{ active: i == currentNav }"
          @click="setNav(i)"
        >
          {{ nav.title }}
        </li>
      </ul>
    </header>
    <main>
      <transition
        enter-active-class="animate__animated animate__fadeInUp animate__faster"
      >
        <!-- 缓存组件 -->
        <keep-alive> 
          <div :is="currentView" class="content"></div>
        </keep-alive>
      </transition>
    </main>
    <!-- <footer>footer</footer> -->
    <!-- <div v-if="leaving">正在跳转</div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Recommend from "@/views/Recommend.vue";
import Rank from "@/views/Rank.vue";
import Search from "@/views/Search.vue";
import Leaving from "@/components/Leaving.vue";

// import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Recommend,
    Rank,
    Search,
    Leaving,
  },
  data() {
    return {
      leaving: false,
      navs: [
        {
          title: "推荐音乐",
          component: "Recommend",
        },
        {
          title: "热歌榜",
          component: "Rank",
        },
        {
          title: "搜索",
          component: "Search",
        },
      ],
    };
  },
  computed: {
    ...mapState(["currentNav"]),
    currentView() {
      return this.navs[this.currentNav].component;
    },
  },
  watch: {},
  beforeRouteLeave(to, form, next) {
    this.leaving = true;
    next();
  },
  methods: {
    setNav(val) {
      this.$store.commit("modifystate", { currentNav: val });
    },
  },
};
</script>
<style lang="stylus" scoped>
// 全局变量
baseColor0 = #fcfcfd; // 背景-灰
baseColor1 = #f6f6f8; // 背景-深灰
baseColor2 = #ceddf3; // 背景-蓝
baseColor3 = #d43c33; // 主题-红
baseColor4 = #3fecff; // 配色-蓝
baseColor5 = #6149f6; // 配色-紫
baseColor6 = #4e9875; // 配色-绿
baseColor7 = #dd001b; // 配色-红
baseColor8 = #fe7d4d; // 配色-橘红
baseColor9 = #ebebeb; // 线条-灰
baseColor10 = #888888; // 字体灰

banner-h = 80px
navbar-h = 40px

// 单行文字溢出隐藏
.thide
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    word-break normal
// 多行文字溢出隐藏
.thide-m
    overflow hidden
    display -webkit-box
    -webkit-box-orient vertical
    -webkit-line-clamp 2

header
  width 100%
  position fixed
  top 0
  z-index 10
  .banner
    height banner-h
    line-height banner-h
    padding 0 10px
    color white
    background baseColor3
    display flex
    justify-content space-between
    span
      flex 1
    .left
      text-align left
      font-size 26px
      font-family cursive
      .icon
        display inline-block
        vertical-align middle
        width unset
    .right
      text-align right
      text-decoration none
  .navbar
    height navbar-h
    line-height navbar-h
    background #fff
    display flex
    justify-content space-evenly
    box-shadow 0 1px 1px baseColor9
    .active
      // box-shadow 0 -2px 0 0 baseColor3 inset
      font-weight bold
      &::after
        content ''
        display block
        width 100%
        height 2px
        transform translateY(-100%)
        background baseColor3
main
  margin-top banner-h + navbar-h
  .content
    padding 5px
    background-color #fcfcfd
</style>
