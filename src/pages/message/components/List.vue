<script setup lang="ts">
import { fromNowTime } from '~/utils/time'

const props = defineProps<{
  listData: {
    id: string
    name: string
    desc: string
    img: string
    lastTime: string
    unReadNum: number
  }[]
}>()
</script>

<template>
  <div class="px-4">
    <div v-for="(item) in props.listData" :key="item.id" class="mt-5 flex items-center">
      <div class="relative h-13 w-13">
        <van-image
          class="h-full w-full overflow-hidden rounded-full"
          lazy-load
          :src="item.img"
        />
        <span class="absolute right--1 top--1 min-w-[14px] rounded-full bg-[#F44336] px-1 text-xs color-white line-height-[14px]">{{ item.unReadNum >= 100 ? '99+' : item.unReadNum }}</span>
      </div>
      <div class="flex-1 pl-3">
        <div class="flex justify-between">
          <span class="flex-1 text-4">{{ item.name }}</span>
          <span class="text-3 color-[#B1B4C3]">{{ fromNowTime(item.lastTime) }}</span>
        </div>
        <div class="line-clamp-1 mt-1 color-[#8D93A6]">
          {{ item.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
