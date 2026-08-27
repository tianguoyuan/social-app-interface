<script setup lang="ts">
import { noFollow } from '~/assets/images'
</script>

<template>
  <div class="flex flex-col items-center pt-[10%]">
    <img :src="noFollow" alt="" class="h-33 w-33">
    <div class="mt-2 text-4">
      暂无关注
    </div>
    <div class="mt-2 text-3 color-[#B1B4C3]">
      去关注更多志同道合的朋友吧~
    </div>
  </div>
</template>
