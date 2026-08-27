<script setup lang="ts">
import { noLogin } from '~/assets/images'

const route = useRoute()
const fullPath = encodeURIComponent(route.fullPath)
</script>

<template>
  <div class="flex flex-col items-center pt-[5%]">
    <img :src="noLogin" alt="" class="h-33 w-33">
    <div class="mt-2 text-4">
      暂未登录
    </div>
    <div class="mt-2 text-3 color-[#B1B4C3]">
      无法查看关注的用户动态，请登录后操作
    </div>

    <RouterLink class="mt-6 rounded-2 bg-[#5F2AFF] px-7 py-3 color-white" :to="`/user/login?redirectPath=${fullPath}`">
      去登录
    </RouterLink>
  </div>
</template>
