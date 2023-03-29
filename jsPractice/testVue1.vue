<template>
  <div>
    <div @click="changeArray">You clicked me {{ items }} times.</div>
    <span>{{$store.state.name}}</span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data: {
    items: ['a', 'b', 'c'],
    a: 1,
  },
  watch: {
    a () {
      console.log(12)
    },
    items () {
      console.log(9)
    },
  },
  methods: {
    changeArray () {
      console.log(31)
      this.items[1] = 'x'
      // this.items.pop()
    }
  },
  data () {
    return {
      items: ['a', 'b', 'c'],
      a: 1,
    }
  },
  computed: {},
  created () { },
  mounted () { }
};
</script>
<style lang="scss" scoped>
</style>