<template>
  <transition
    enter-active-class="animate__animated animate__fadeInUp"
  >
    <div id="player" v-show="this.$route.meta.Player">
      <van-row
        v-if="!fullscreen"
        class="player-bar"
        type="flex"
        justify="space-around"
      >
        <van-col span="7" class="part detail">
          <!-- 引入网络图片 -->
          <van-image
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            class="poster"
            alter="poster"
            fit="fill"
            @click="fullscreen = true"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
          </van-image>
          <!-- <div class="info">
                <span class="song">song</span>
                <span class="singer">singer</span>
            </div> -->
          <a href="#" class="info song van-ellipsis">song</a>
          <a href="#" class="info singer">singer</a>
          <!-- 引入本地图片 -->
          <!-- <van-image :src="require('@/assets/logo.png')" class="poster" 
                alter="poster" fit="contain"
            /> -->
        </van-col>
        <van-col span="8" class="part contrl">
          <van-icon name="arrow-left" size="32" @click="prev" />
          <van-circle
            v-model="currentRate"
            :rate="rate"
            :color="gradientColor"
            layer-color="#c8c8c9"
            fill="#f6f6f8"
            class="play"
          >
            <van-icon
              v-if="!play"
              name="play"
              class="icon"
              size="40"
              @click="togglePlay"
            />
            <van-icon
              v-else
              name="pause"
              class="icon"
              size="40"
              @click="togglePlay"
            />
          </van-circle>
          <van-icon name="arrow" size="32" @click="next" />
        </van-col>
        <van-col span="7" class="part songs">
          <van-icon
            name="bars"
            class="icon list"
            size="40"
            @click="toggleList"
          />

          <!-- 暂时使用[喜欢] -->
          <van-icon
            v-if="!like"
            name="like-o"
            class="icon"
            size="40"
            @click="toggleLike"
          />
          <van-icon
            v-else
            name="like"
            class="icon"
            color="#dd001b"
            size="40"
            @click="toggleLike"
          />
          <!-- 更合理的是使用[播放顺序] -->
          <!-- <van-icon v-if="way==='order'" name="" size="46" />
            <van-icon v-else-if="way==='random'" size="46" />
            <van-icon v-else-if="way==='single'" size="46" /> -->
        </van-col>
      </van-row>
      <van-overlay :show="fullscreen" class="playerPage" z-index="100">
        <div class="wrapp">
          <!--  -->
          <!-- 关闭 -->
          <van-icon
            name="shrink"
            class="close"
            size="50"
            color="#333"
            @click.stop="fullscreen = false"
          />
        </div>
      </van-overlay>
    </div>
  </transition>
</template>
<script>
import Vue from "vue";
import {
  Toast,
  Col,
  Row,
  Image as VanImage,
  Loading,
  Circle,
  Icon,
  Overlay,
} from "vant";

Vue.use(Toast);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Loading);
Vue.use(Circle);
Vue.use(Icon);
Vue.use(Overlay);

export default {
  name: "Player",
  components: {},
  data() {
    return {
      fullscreen: false,
      currentRate: 0,
      rate: 50,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
      play: false,
      like: false,
      showList: false,
    };
  },
  methods: {
    fullscren() {
      Toast("点击海报");
    },
    togglePlay() {
      this.play = !this.play;
      Toast(`${this.play ? "播放" : "暂停"}`);
    },
    prev() {
      Toast("点击上一曲");
    },
    next() {
      Toast("点击下一曲");
    },
    toggleLike() {
      this.like = !this.like;
      Toast(`${this.like ? "点击" : "取消"}喜欢`);
    },
    toggleList() {
      this.showList = !this.showList;
      Toast(`${this.showList ? "打开" : "关闭"}歌单`);
    },
  },
};
</script>
<style lang="stylus" scoped>

baseHeight = 50px

// * {
// border: 1px solid red;
// }
#player {
  .player-bar {
    width: 100vw;
    height: 50px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-shadow: 0 -1px 4px;
    background: #f6f6f8;
    position: fixed;
    z-index 10
    bottom: 0;

    .detail {
      height: 50px;

      >* {
        float: left;
      }

      .poster {
        height: 50px;
        width: 50px;
      }

      .info {
        max-width: 56%;
        margin-left: 2px;
        margin-top: 4px;
      }

      .song {
        font-size: 14px;
        font-weight: bold;
      }

      .singer {
        font-size: x-small;
      }
    }

    .contrl {
      .play {
        width: 46%;
        height: 160%;
        transform: translateY(-40%);

        .icon {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .prev {
        float: left;
      }

      .next {
        float: right;
      }
    }

    .songs {
      .icon {
        margin-top: 6px;
        float: right;
      }
    }
  }

  .playerPage {
    .wrapp {
      width: 100%;
      height: 100%;
      background: #fff;
      .close {
        float: right;
      }
    }
  }
}
</style>
