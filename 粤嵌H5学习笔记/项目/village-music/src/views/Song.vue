<template>
  <div class="song">
    <Back></Back>
    歌曲页面{{ data }}
    {{ $route.query.id }}
    <audio
      :src="
        `https://music.163.com/song/media/outer/url?id=${$route.query.id}.mp3`
      "
      autoplay
    ></audio>
  </div>
</template>
<script>
import qs from "qs"; // qs.stringify 用于 get 请求;qs.pqrse 用于 post 请求
import Back from "@/components/Back";

export default {
  name: "Song",
  components:{
    Back
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
    console.log(`/song/detail?${qs.stringify(to.query)}`);
    window.axios
      //   .get(`/playlist/detail?id=${to.params.id}`)
      .get(`/song/detail?${qs.stringify(to.query)}`) // 当传多参时很方便
      .then((res) => {
        next((vm) => vm.setData(res));
      });
    // .catch((err) => {
    //   this.error = err;
    // });
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.data = null;
  //   window.axios
  //     .get(`/song/detail?id=${to.params.id}`)
  //     .then((res) => {
  //       this.setData(res);
  //       next();
  //     })
  //     // .catch((err) => {
  //     //   this.error = err;
  //     // });
  // },
  methods: {
    setData(res) {
      this.data = res;
    },
  },
};
</script>
<style lang="stylus" scoped></style>
