<template>
  <div class="slider">
    <transition-group
      :name="direction"
      tag="ul"
      class="item-list"
      @after-enter="afterEnter"
    >
      <li v-for="(item, index) in list" :key="item" v-show="index == lastPick">
        <slot name="slide-item" :index="index"
          >slide-item 后备内容{{ item }}</slot
        >
      </li>
    </transition-group>
    <slot name="slide-controler" :controler="{ lastPick }"></slot>
  </div>
</template>
<script>
export default {
  name: "Slider",
  props: {
    list: {
      // 数据数组或数据长度
      type: [Array, Number],
      required: true,
    },
    dir: {
      // 滑动方向(横向/竖向). dir 的名字中不要使用'_',这意味着可以为了自己的规范,将 slideX 修改为 slide-x(需要同时修改 slider.css 里的类名),但不能改为 slide_x
      type: String,
      default: "slideX",
    },
  },
  data() {
    return {
      lastPick: 0,
      reverse: false,
      isSlide: false,
      // autoPlayTimer: NaN,
    };
  },
  computed: {
    length() {
      return this.list instanceof Array ? this.list.length : this.list;
    },
    direction() {
      // 控制正反向,配合过渡/动画（列表）的动态 name，实现（通过改变类名，这一步是 vue 内部实现的）使用 css 改变滑动方向（不仅是方向，还可以是其它样式），而无需在 js 里改变样式（这符合关注点分离原则）
      // return  this.reverse ?
      //     this.dir.split('_')[0] + '_reverse' :
      //     this.dir.split('_')[0];
      return this.dir.split("_")[0] + (this.reverse ? "_reverse" : "");
    },
  },
  created() {
    // created 阶段实例被创建完成,事件,生命周期等构建好了
    // this.direction = this.dir;
  },
  mounted() {
    // mounted 阶段 DOM 渲染完成了,但不能保证所有组件都被编译完成=>若有需要,可在 mounted 里使用 vm.$netxTick 钩子,其能保证所有组件都已编译完成
    this.autoPlay();
  },
  destroyed() {
    clearInterval(this.autoPlayTimer);
  },
  methods: {
    slide(reverse, currentPick) {
      if (this.isSlide) {
        return;
      } else {
        currentPick == this.lastPick ? this.autoPlay() : (this.isSlide = true);
        // 以上处理控制进程的标志变量
        this.reverse = reverse;
        let pom = reverse ? -1 : 1; // pom:plus or minus
        this.lastPick =
          currentPick === undefined
            ? (this.lastPick + pom + this.length) % this.length
            : currentPick;
      }
    },
    afterEnter() {
      // 配合防抖及自动播放
      this.isSlide = false;
      this.autoPlay(); // 解决[手动打断之后需要重新自动播放],优点:提高易用性,副作用:滥用定时器
    },
    /* 自动播放 */
    autoPlay(reverse) {
      // 参数说明：reverse:{是否反向}[boolean](可选);
      // 返回值：undefined

      // console.log(this.autoPlayTimer)
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = setInterval(() => {
        this.slide(reverse);
      }, 3000);
    },
  },
};
</script>
<style scoped>
@charset "UTF-8";
@charset "UTF-8";
/* 以下为轮播器样式 */
.slider {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #262626;
  position: relative;
  overflow: hidden;
}

.slider * {
  margin: 0;
  padding: 0;
}

.slider li {
  list-style: none;
  color: white;
}

.slider .item-list {
  width: 100%;
  position: absolute;
  z-index: 1;
}

.slider .item-list > li {
  width: 100%;
  height: 100%;
  position: absolute;
}

.slider .item-list > li a {
  height: 100%;
  display: block;
}

.slider .pick-list {
  position: absolute;
  left: 50%;
  bottom: 10px;
  z-index: 1;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.slider .pick-list li {
  width: 12px;
  height: 12px;
  border: 1px solid white;
  border-radius: 50%;
  background-color: skyblue;
  float: left; /* 解决边框宽度变化导致元素跳动 */
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
}

.slider .pick-list li + li {
  margin-left: 4px;
}

.slider .pick-list li:hover,
.slider .pick-list li.picked {
  -webkit-box-shadow: 0px 0px 4px 1px white;
  box-shadow: 0px 0px 4px 1px white;
  background-color: red;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.slider .toggle-list li {
  width: 60px;
  height: 60px;
  margin-top: 2px;
  cursor: pointer;
}

.slider .toggle-list li:hover {
  -webkit-transform: scale(1.4);
  transform: scale(1.4);
}

.slider .toggle-list li:nth-child(1) {
  background: url(../assets/images/arrow_left.png) no-repeat center;
  background-size: contain;
  position: absolute;
  left: 0;
  top: 50%;
  z-index: 1;
}

.slider .toggle-list li:nth-child(2) {
  background: url(../assets/images/arrow_right.png) no-repeat center;
  background-size: contain;
  position: absolute;
  right: 0;
  top: 50%;
  z-index: 1;
}

/* 以下为 vue 过渡/动画钩子 */
.slideX-enter-to,
.slideX-leave,
.slideX_reverse-enter-to,
.slideX_reverse-leave {
  -webkit-transform: translateX(0%);
  transform: translateX(0%);
}

.slideX-leave-to,
.slideX_reverse-enter {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}

.slideX-enter,
.slideX_reverse-leave-to {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}

.slideX-enter-active,
.slideX-leave-active,
.slideX_reverse-enter-active,
.slideX_reverse-leave-active {
  -webkit-transition: -webkit-transform 0.6s ease-out;
  transition: -webkit-transform 0.6s ease-out;
  transition: transform 0.6s ease-out;
  transition: transform 0.6s ease-out, -webkit-transform 0.6s ease-out;
}

.slideY-enter-to,
.slideY-leave,
.slideY_reverse-enter-to,
.slideY_reverse-leave {
  -webkit-transform: translateY(0%);
  transform: translateY(0%);
}

.slideY-leave-to,
.slideY_reverse-enter {
  -webkit-transform: translateY(-100%);
  transform: translateY(-100%);
}

.slideY-enter,
.slideY_reverse-leave-to {
  -webkit-transform: translateY(100%);
  transform: translateY(100%);
}

.slideY-enter-active,
.slideY-leave-active,
.slideY_reverse-enter-active,
.slideY_reverse-leave-active {
  -webkit-transition: -webkit-transform 0.6s ease-out;
  transition: -webkit-transform 0.6s ease-out;
  transition: transform 0.6s ease-out;
  transition: transform 0.6s ease-out, -webkit-transform 0.6s ease-out;
}

#slider2 .slideX-enter-active,
#slider2 .slideX-leave-active,
#slider2 .slideX_reverse-enter-active,
#slider2 .slideX_reverse-leave-active {
  -webkit-transition: -webkit-transform 0.2s ease-out;
  transition: -webkit-transform 0.2s ease-out;
  transition: transform 0.2s ease-out;
  transition: transform 0.2s ease-out, -webkit-transform 0.2s ease-out;
}

#slider2 .slideY-enter-active,
#slider2 .slideY-leave-active,
#slider2 .slideY_reverse-enter-active,
#slider2 .slideY_reverse-leave-active {
  -webkit-transition: -webkit-transform 3s ease-out;
  transition: -webkit-transform 3s ease-out;
  transition: transform 3s ease-out;
  transition: transform 3s ease-out, -webkit-transform 3s ease-out;
}
</style>
