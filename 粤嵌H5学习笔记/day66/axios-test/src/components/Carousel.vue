<template>
  <div class="carousel">
    <slider ref="slider" :list="imgs" :dir="direction">
      <template #slide-item="{index}">
        <!-- 插槽有自己的作用域,不会污染外部变量 -->
        <!-- <img src="../assets/images/01.jpg" alt="" /> -->
        <template v-for="(img, i) in imgs">
          <img
            v-show="i == index"
            :key="img"
            :src="require(`../assets/images/0${i + 1}.jpg`)"
            alt=""
          />
        </template>
      </template>
      <template v-if="controls" #slide-controler="{controler}">
        {{ controler.lastPick }}
        <ul v-if="pick" class="pick-list">
          <li
            v-for="(item, index) in imgs"
            :key="index"
            :class="{ picked: controler.lastPick == index }"
            @click="picking(index < controler.lastPick, index)"
          ></li>
        </ul>
        <ul v-if="toggle" class="toggle-list">
          <li @click="picking(true)"></li>
          <li @click="picking(false)"></li>
        </ul>
      </template>
    </slider>
  </div>
</template>
<script>
import slider from "@/components/Slider.vue";
export default {
  components: {
    slider,
  },
  props: {
    imgs: {
      type: Array,
      require: true,
    },
    width:{
      type:[Number,String],
      default:"100%"
    },
    height:{

    },
    vertical: {
      type: Boolean,
      default: false,
    },
    controls: {
      type: Boolean,
      default: false,
    },
    pick: {
      type: Boolean,
      default: true,
    },
    toggle: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
    //   imgs: [
    //     "../assets/images/01.jpg",
    //     "../assets/images/02.jpg",
    //     "../assets/images/03.jpg",
    //     "../assets/images/04.jpg",
    //     "../assets/images/05.jpg",
    //   ],
    };
  },
  computed: {
    direction() {
      return this.vertical ? "slideY" : "slideX";
    },
  },
  methods: {
    picking(reverse, currentPick) {
      // 选中图片
      this.$refs.slider.slide(reverse, currentPick); // $refs 钩子允许父组件访问定义了 ref 属性的子组件实例(或虚拟 dom 标签实例).这里调用了子组件实例 slider 的 slide 方法
      //   this.$refs.slider.autoPlay(); // [手动打断之后需要重新自动播放],最恰当的解决时,但增加了代码量
    },
  },
};
</script>
<style lang="stylus" scoped>
img
  width 100%
  height 100%
</style>
