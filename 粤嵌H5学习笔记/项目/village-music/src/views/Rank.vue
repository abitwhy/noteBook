<template>
  <!-- <p>Hot</p> -->

  <div class="rank">
    <div class="header">
      <div class="bg"></div>
      <!-- 榜单描述:{{playlist.description}} -->
      <!-- 更新时间:{{playlist.updateTime}} -->
      <div class="content">
        <div class="poster">
          <div class="caption">
            <div class="title">热歌榜</div>
            <div class="info">
              更新时间:{{ playlist.updateTime | formatDate }}
            </div>
          </div>
        </div>
        <div class="bullet">
          <!-- <marquee v-for="(song,i) in songs.slice(0,7)" :key="song.id" :class="{ first: i == 0, second: i == 1, third: i == 2 }">{{song.name}}</marquee> -->
          <template v-for="(song, i) in songs">
            <marquee
              v-if="i >= bulletCount - 7 && i < bulletCount"
              :key="song.id"
              :class="{ first: i == 0, second: i == 1, third: i == 2 }"
              @click="$router.push({ path: '/song', query: { id: song.id } })"
              >{{ song.name }}</marquee
            >
          </template>
        </div>
      </div>
    </div>
    <!-- {{ toplist }} -->
    <!-- {{ playlist }} -->
    <!-- {{ songsId }} -->
    <!-- {{ songs }} -->
    <!-- <p v-for="song in songs" :key="song.id">
      歌名:{{ song.name }} 歌手:{{ song.ar | findName }}
    </p> -->
    <Cell
      v-for="(song, i) in songs"
      :key="song.id"
      :title="song.name"
      :describe="song.ar | findName"
      :hq="!(i % 7 == 3)"
      :to="{ path: '/song', query: { id: song.id } }"
    >
      <template #left>
        <span
          class="left"
          :class="{ first: i == 0, second: i == 1, third: i == 2 }"
          >{{ (i + 1) | pad0 }}</span
        >
      </template>
    </Cell>
    <Loading v-if="loading" :height="30"></Loading>

    <!-- <button @click="currentIndex += addition">获取更多歌曲</button> -->
    <span v-if="!nomore" class="more" @click="getMoreSongs(addition)"
      >获取更多歌曲</span
    >
    <span v-else class="more" :class="{ bling: bling }" @click="bling = !bling"
      >没有更多了...</span
    >
  </div>
</template>
<script>
import Cell from "@/components/Cell";
import Loading from "@/components/Loading";
export default {
  name: "Rank",
  components: {
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
    pad0(val) {
      return String(val).padStart(2, "0");
    },
    formatDate(val) {
      return new Date(val).toLocaleDateString();
    },
  },
  data() {
    return {
      toplist: null, // 排行榜
      playlist: null, // 歌单
      songsId: null, // 指定(热歌榜)榜单歌曲 id
      songs: [], // 榜单歌曲详情
      addition: 50, // 获取新歌数量
      bulletCount: 7, // 控制弹幕展示
      bulletCounter: -1,
      loading: false,
      nomore: false,
      bling: false,
    };
  },
  computed: {
    // nextSongsId(){
    //   return this.songsId.slice(this.currentIndex,this.currentIndex+10)
    // }
  },
  watch: {
    songsId() {
      this.getMoreSongs(10);
    },
  },
  created() {
    //   在 created 时进行 ajax 请求
    this.getData();
  },
  mounted() {
    this.changBullet();
  },
  updated() {
    // this.getMoreSongs(10);
  },
  destroyed() {
    clearInterval(this.bulletCounter);
  },
  methods: {
    async getData() {
      this.loading = true;
      this.toplist = (await this.getToplist()).data.list;
      this.playlist = (await this.getPlaylistDetail(3778678)).data.playlist; // 3778678是"热歌榜"的歌单 id
      // this.playlist = (await this.getPlaylistDetail(19723756)).data.playlist; // 19723756是"飙升榜"的歌单 id
      this.songsId = this.playlist.trackIds.map((el) => el.id);
      this.loading = false;
      // this.songsId = (await this.getSongDetail());
    },
    async getMoreSongs(num) {
      // 暂时支持搜200首
      if (this.songs.length >= 200) {
        // alert("没有更多了");
        this.nomore = true;
        return;
      }
      this.loading = true;
      // console.log(`songsId:${this.songsId}`);
      (
        await this.getSongDetail(
          this.songsId
            .slice(this.songs.length, this.songs.length + num)
            .join(",")
        )
      ).data.songs.forEach((item) => this.songs.push(item));
      this.loading = false;
    },
    changBullet() {
      this.bulletCounter = setInterval(() => {
        this.bulletCount = (this.bulletCount + 7) % this.songs.length;
      }, 6000);
    },
    // 下面是需要封装的 axios 请求
    async getToplist() {
      // 1.飙升榜,2.新歌榜,3.原创榜 4.热歌榜...
      console.log(`/toplist`);
      // this.toplist = await this.$axios.get(`/toplist`)
      return await this.$axios.get(`/toplist`);
      // return await this.$axios.get(`http://music.kele8.cn/toplist`);
    },
    async getToplistDetail() {
      // 1.飙升榜,2.新歌榜,3.原创榜 4.热歌榜...
      console.log(`/toplist/detail`);
      return await this.$axios.get(`/toplist/detail`);
    },
    async getPlaylistDetail(id) {
      console.log(`/playlist/detail?ids=${id}`);
      return await this.$axios.get(`/playlist/detail?id=${id}`);
      // return await this.$axios.get(
      //   `http://music.kele8.cn/playlist/detail?id=${id}`
      // );
    },
    async getSongDetail(id) {
      console.log(`http://music.kele8.cn/song/detail?ids=${id}`);
      // return await this.$axios.get(`/song/detail?ids=${id}`);
      return await this.$axios.get(
        `http://music.kele8.cn/song/detail?ids=${id}`
      );
    },
  },
};
</script>
<style lang="stylus" scoped>
.header
  overflow hidden
  position relative
  .bg
    background url(../assets/images/bg-toplist.jpg) no-repeat
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
      background url(../assets/images/hot.png) no-repeat
      background-size cover
      box-shadow 0 0 5px 1px
      display flex
      align-items flex-end
      z-index 3
      .caption
        width 100%
        background #0008
        color #dd001b
        .title
          font-size x-large
        .info
          font-size 12px
          color gainsboro
    .bullet
      position absolute
      top 0
      width 100%
      color #fff
      display flex
      flex-flow column
      align-items center

.more
  line-height 40px
  font-size small
  color #888
.left
  margin-right 10px
.first
    color #d43c33
.second
    color #6149f6
.third
    color #4e9875
.bling
  color red
  animation bling .5s ease-out 3

@keyframes bling {
  form{
    opacity 1
  }to{
    opacity 0
  }
}
</style>
