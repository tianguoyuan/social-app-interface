<script setup lang="ts">
const props = defineProps<{
  listData: API.FollowUserLikeRes['list']
}>()

const router = useRouter()
function toAllUserLike() {
  router.push('/home/userLike')
}
</script>

<template>
  <div>
    <div v-if="props.listData.length" class="flex justify-between px-3">
      <span class="text-4">可能感兴趣的人</span>
      <div class="color-[#B1B4C3]" @click="toAllUserLike">
        <span>
          全部
        </span>
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="mt-7 flex flex-nowrap overflow-x-auto pl-3">
      <div v-for="item in props.listData" :key="item.id" class="mr-4 w-28 flex flex-shrink-0 flex-col items-center justify-center bg-white p-4">
        <img :src="item.img" alt="" class="h-12 w-12 rounded-full">
        <p class="line-clamp-1 mt-1 text-4 line-height-5">
          {{ item.name }}
        </p>
        <p class="line-clamp-2 pt-1 text-3 color-[#8D93A6]">
          {{ item.desc }} {{ item.desc }}
        </p>
        <div class="mt-1 h-5 w-12 flex items-center justify-center rounded-2 bg-[#5F2AFF] text-3 color-white">
          +订阅
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
