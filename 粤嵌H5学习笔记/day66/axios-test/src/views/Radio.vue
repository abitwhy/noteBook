<template>
  <div class="radio">
    <!-- 电台 -->
      <Back></Back>

    <tabs v-model="value">
      <tab label="标签一" name="1">
        标签一内容
      </tab>
      <tab label="标签二" name="2">
        标签二内容
      </tab>
      <tab label="标签三" name="3">
        标签三内容
      </tab>

      <!-- 没有 name 的 tab 有 bug -->
      <!-- <tab label="标签一">
        标签一内容
      </tab>
      <tab label="标签二">
        标签二内容
      </tab>
      <tab label="标签三">
        标签三内容
      </tab> -->
    </tabs>
  </div>
</template>
<script>
import Tabs from "@/components/Tabs";
import Tab from "@/components/Tab";
import Back from "@/components/Back";
export default {
  name: "Radio",
  components: {
    Tabs,
    Tab,
    Back,
  },
  data() {
    return {
      value: 3,
    };
  },
};
</script>
