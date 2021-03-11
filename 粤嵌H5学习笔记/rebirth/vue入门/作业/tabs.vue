<template>
  <div class="tabs" @counter="count++">
    <slot :slotProp="{ i, picked }"></slot>
  </div>
</template>
<script>
export default {
  model: {
    prop: "picked",
    event: "change-pick",
},
  props: {
    picked: Boolean,
    tabs: Array,
  },
  data(){
      return{
          pick:0,
          count:0,
      }
  },
  methods:{

  }
};
</script>
