<template>
  <div class="box">{{ pageName }}</div>
</template>

<script setup lang="ts">
import { ref } from "@vue/runtime-core";

const pageName = ref('page1')
</script>

<style lang="less">
@import './css/index.less';
</style>
