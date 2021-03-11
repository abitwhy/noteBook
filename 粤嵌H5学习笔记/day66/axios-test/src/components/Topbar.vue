<template>
  <!-- <van-search v-model="value" placeholder="搜索歌曲,歌单,电台" /> -->
  <van-sticky>
    <van-row v-if="this.$route.meta.Topbar" class="topbar">
      <van-col class="user" span="4">
        <van-icon
          name="user-circle-o"
          class="icon"
          size="30px"
          @click="onClickUser"
        />
      </van-col>
      <van-col class="search" span="20">
        <van-search
          v-model="value"
          class="searchbar"
          placeholder="搜索歌曲,歌单,电台"
          background="#ec4141"
          @focus="onFocus"
          @blur="void 0"
          @search="onSearch"
        />
      </van-col>
    </van-row>
  </van-sticky>
</template>
<script>
import Vue from "vue";
import { Search, Toast } from "vant";

Vue.use(Search);
Vue.use(Toast);

export default {
  name: "Topbar",
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onClickUser() {
      Toast("弹出用户侧栏");
    },
    onFocus() {
      Toast("弹出历史、热搜词下拉条");
    },
    onSearch(val) {
      Toast(`搜索"${val}"并展示结果`);
    },
  },
};
</script>
<style lang="stylus" scoped>
.topbar
    border-bottom 1px solid grey
    .user
      background: #ec4141;
      height 54px
      .icon
        margin-top 14px
        border-radius: 50%;
        background: #f6f6f8;
        box-shadow: 0 0 2px 2px red inset;
</style>
