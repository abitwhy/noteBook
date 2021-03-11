<template>
  <tabs>
    <template #default="{ index:i,picked }">
      <div class="tab">
        <span :index="i" name="" type="radio" @click="$emit('change-pick')"></span>
        <template v-show="index==picked">
            <slot>内容{{i}}</slot>
        </template>
      </div>
    </template>
  </tabs>
</template>
<script>
export default {
  components: {
    tabs,
  },
  props: {
    index: Number,
    title: String,
  },
  data(){
      return{
          index:0
      }
  },
  created() {
    this.$emit("counter");
  },
};
</script>
