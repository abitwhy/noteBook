<template>
  <div class="recommend">
    <!-- <button @click="$router.push({path:'/playlist',query:{id:6618218969}})">test query</button> -->
    <!-- <p>Recommend</p> -->
    <!-- <Loading :height="90"></Loading> -->
    <Part title="推荐歌单" class="playlist">
      <template v-if="playlists">
        <Card
          v-for="list in playlists"
          :key="list.id"
          :picUrl="list.picUrl"
          :title="list.name"
          :info="list.playCount | formatNum"
          :to="{ path: '/playlist', query: { id: list.id } }"
        ></Card>
      </template>
      <Loading v-else :height="50"></Loading>
    </Part>
    <Part title="最新音乐" class="newsong">
      <template v-if="newsongs">
        <Cell
          v-for="(song, i) in newsongs"
          :key="song.id"
          :title="song.name"
          :describe="song.song.artists | findName"
          :hq="!(i%4==1)"
          :to="{ path: '/song', query: { id: song.id } }"
          :class="{ first: i == 0, second: i == 1, third: i == 2 }"
        >
          <!-- <template #left>
            <span class="left">{{ (i + 1) | pad0 }}</span>
          </template> -->
        </Cell>
      </template>
      <Loading v-else :height="50"></Loading>
    </Part>
  </div>
</template>
<script>
import Part from "@/components/Part";
import Card from "@/components/Card";
import Cell from "@/components/Cell";
import Loading from "@/components/Loading";
export default {
  name: "Recommend",
  components: {
    Part,
    Card,
    Cell,
    Loading,
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
    formatNum(val) {
      if (val < 10 ** 4) {
        return val;
      } else if (val < 10 ** 8) {
        return (val / 10 ** 4).toFixed(1) + "万";
      } else {
        return (val / 10 ** 8).toFixed(1) + "亿";
      }
    },
    pad0(val) {
      return String(val).padStart(2, "0");
    },
  },
  data() {
    return {
      playlists: null,
      newsongs: null,
    };
  },
  //   computed:{},
  created() {
    this.leaving = false;
    //   在 created 时进行 ajax 请求

    this.$axios
      // .get("/personalized?limit=6")
      .get("http://music.kele8.cn/personalized?limit=6")
      .then((res) => {
        // console.log(res);
        this.playlists = res.data.result;
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      // .get("/personalized/newsong")
      .get("http://music.kele8.cn/personalized/newsong")
      .then((res) => {
        console.log(res);
        this.newsongs = res.data.result;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods:{

  }
};
</script>
<style lang="stylus" socped>
.recommend
    .playlist
        display flex
        flex-flow wrap
        justify-content space-between
        .card
            width 32%
    .newsong
      .left
        margin-right 10px
      .first
        .left
            color #d43c33
      .second
        .left
            color #6149f6
      .third
        .left
            color #4e9875
</style>
