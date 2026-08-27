<script setup lang="ts">
const props = defineProps<{
  bannerList: string[]
}>()
</script>

<template>
  <van-swipe class="h-30" :autoplay="5000" indicator-color="white" lazy-render>
    <van-swipe-item v-for="(item, index) in props.bannerList" :key="index">
      <img :src="item" alt="" class="w-full" :draggable="false">
    </van-swipe-item>
  </van-swipe>
</template>
