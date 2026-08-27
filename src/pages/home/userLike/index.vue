<script setup lang="ts">
import { followUserLike } from '~/api/follow'

const listData = ref<API.FollowUserLikeRes['list']>([])
const result = await followUserLike({ pageNum: 1, pageSize: 10 })
listData.value = result.list
</script>

<template>
  <div>
    <van-nav-bar placeholder fixed title="可能感兴趣的人">
      <template #left>
        <RouterLink to="/home">
          <van-icon name="arrow-left" color="#0B1526" />
        </RouterLink>
      </template>
    </van-nav-bar>
    <div>
      <div v-for="item in listData" :key="item.id" class="flex flex-shrink-0 bg-white p-4">
        <img :src="item.img" alt="" class="h-12 w-12 rounded-full">
        <div class="flex-1 px-4">
          <p class="line-clamp-1 mt-1 text-4 line-height-5">
            {{ item.name }}
          </p>
          <p class="line-clamp-2 pt-1 text-3 color-[#8D93A6]">
            {{ item.desc }} {{ item.desc }}
          </p>
        </div>
        <div class="mt-1 h-5 w-12 flex items-center justify-center rounded-2 bg-[#5F2AFF] text-3 color-white">
          +订阅
        </div>
      </div>

      <div class="py-4 text-center text-xs color-[#8D93A6]">
        没有更多了
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>

<route lang="yaml">
  meta:
    title: 可能感兴趣的人
</route>
