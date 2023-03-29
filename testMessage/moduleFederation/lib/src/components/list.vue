<template>
  <div class="ul">
    <div class="item" v-for="(item, idx) in list" :key="idx">{{ item }}</div>
  </div>
</template>

<script setup name="list">
import { reactive, ref } from 'vue'
let list = [1, 2, 3, 5]
</script>
<style lang="less" scoped>
</style>