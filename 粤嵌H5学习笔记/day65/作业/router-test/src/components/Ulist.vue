<template>
    <Nav :length="len" tag="ul">
      <template #default="{index}">
        <slot name="default" :i="{index}">{{index}}</slot>
      </template>
      <template #control="{controler}">
        <slot name="control" :c="{controler}"></slot>
      </template>
    </Nav>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  name: 'Ulist',
  props: {
    len: {
      type: Number,
      required: true,
    }
  },
  compoents:{
    Nav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
ul
  list-style-type none
  padding 0

a
  text-decoration none

</style>
