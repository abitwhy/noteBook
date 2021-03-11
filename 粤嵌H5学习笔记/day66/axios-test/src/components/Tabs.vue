<template>
  <div class="tabs">
    <div class="tabs-bar">
      <!-- 标签页标题，通过v-for实现循环-->
      <div
        v-for="(item, index) in navList"
        :key="item.name"
        :class="{ 'tabs-tab-active': item.name == currentValue }"
        class="tabs-tab"
        @click="handleChange(index)"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="tabs-content">
      <!-- slot放置tab组件内容-->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      currentValue: this.value,
      navList: [],
    };
  },
  methods: {
    // tabCls(item) {
    //   return {
    //     "tabs-tab-active": item.name === this.currentValue,
    //   };
    // },
    getTabs() {
      //获取 tab
    //   console.log("$slots.default:",this.$slots.default);
    //   console.log("$children:",this.$children);
    //   console.log(this.$slots.default.filter((vn)=>vn.componentOptions.tag="tab"));
      return this.$children.filter( // $children:当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。
        (item) => item.$options._componentTag === "tab"
      );
    },
    updateStatus() {
      this.getTabs().forEach(
        (tab) => (tab.show = tab.name === this.currentValue)
      );
    },
    updateNav() {
      //获取标题，name,并放置到navList数组中
      this.navList = []; // 先清空
      this.getTabs().forEach((tab, index) => {
        // console.log(tab);
        if (tab.name===undefined) tab.name = index;
        this.navList.push({
          label: tab.label,
          name: tab.name,
        });
        // if (index === 0) {
        //   if (!this.currentValue) {
        //     this.currentValue = tab.name || index;
        //   }
        // }
      });
      this.updateStatus();
    },
    handleChange(index) {
      let nav = this.navList[index];
      let name = nav.name;
      this.currentValue = name;
      this.$emit("input", name);
    //   this.$emit("on-click", name); // 作用是什么?
    },
  },
  watch: {
    value: function(val) {
      this.currentValue = val;
    },
    currentValue() {
      this.updateStatus();
    },
  },
};
</script>

<style scoped>
.tabs {
  margin-top: 80px;
  font-size: 14px;
  color: #657180;
}
.tabs-bar:after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #d7dde4;
  margin-top: -1px;
}
.tabs-tab {
  display: inline-block;
  padding: 4px 16px;
  margin-right: 6px;
  background: #fff;
  border: 1px solid #d7dde4;
  cursor: pointer;
  position: relative;
}
.tabs-tab-active {
  color: #3399ff;
  border-top: 1px solid #3399ff;
  border-bottom: 1px solid #3399ff;
}
.tabs-tab-active:before {
  content: "";
  display: block;
  height: 1px;
  background: #3399ff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.tabs-content {
  padding: 8px 0;
}
</style>
