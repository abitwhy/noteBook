<template>
  <div class="playlist">
    歌单详情{{ data }}
    <Back></Back>
    <Banner :data="data" :bullet="[1,2]"></Banner>
    <!-- <Back :title="$route.path" :height="60"></Back> -->
    <!-- <Back :title="$route.path" height="60px"></Back> -->
    <div>歌单详情:</div>
    <Cell>

    </Cell>
  </div>
</template>
<script>
import qs from "qs"; // qs.stringify 用于 get 请求;qs.pqrse 用于 post 请求
import Back from "@/components/Back";
import Banner from "@/components/Banner";
export default {
  name: "Playlist",
  components: {
    Back,
    Banner,
  },
  filters: {
    findName(val) {
      return val.map((item) => item.name);
      // if(val.length){
      //     return val.map(item=>item.name).join('/')
      // }else{
      //     return val.name
      // }
    },
  },
  data() {
    return {
      data: null,
      error: null,
    };
  },
  computed: {},
  beforeRouteEnter(to, form, next) {
    // 在导航完成前获取数据
    window.axios
      //   .get(`/playlist/detail?id=${to.params.id}`)
      .get(`/playlist/detail?${qs.stringify(to.query)}`) // 当传多参时很方便
      // .get(`http://music.kele8.cn/playlist/detail?${qs.stringify(to.query)}`)
      .then((res) => {
        next((vm) => vm.setData(res.data.playlist));
      })
      .catch((err) => {
        this.error = err;
      });
  },
  beforeRouteUpdate(to, from, next) {
    this.data = null;
    window.axios
      .get(`/playlist/detail?id=${to.params.id}`)
      // .get(`http://music.kele8.cn/playlist/detail?id=${to.params.id}`)
      .then((res) => {
        this.setData(res);
        next();
      })
      .catch((err) => {
        this.error = err;
      });
  },
  methods: {
    setData(res) {
      this.data.playlist = res;
    },
  },
};
</script>
<style lang="stylus" scoped>
.playlist
  overflow hidden
</style>
