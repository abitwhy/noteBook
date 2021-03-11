<template>
  <nav class="nav-bar">
    <ul>
      <li v-for="(item,i) in list" :key="i" @click="lastPick=i">
        <slot name="default" :index="i">
          <a href="javascript:;">{{item}}</a>
        </slot>
      </li>
    </ul>
    <slot name="control" :controler="{lastPick}">{{lastPick}}</slot>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return{
      lastPick: 0
    }
  },
  props: {
    list: {
      type: [Array,Number],
      required: true
    },
    tag: {
      type: String,
      default: 'ul'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
ul,ol
  list-style-type none
  padding 0

li
  display inline-block
  &+li::before
    content '|'
    margin 0 10px

a
  text-decoration none

</style>
