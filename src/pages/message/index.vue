<script setup lang="ts" name="/message/">
import { messageFind } from '~/api/message'
import btn1Img from '~/assets/images/message/btn1.png'
import btn2Img from '~/assets/images/message/btn2.png'
import btn3Img from '~/assets/images/message/btn3.png'
import List from './components/List.vue'

const btnList = [
  { img: btn1Img, name: '回复', id: '1' },
  { img: btn2Img, name: '分享', id: '2' },
  { img: btn3Img, name: '点赞', id: '3' },
]

const userStore = useUserStore()
const isLogin = computed(() => userStore.isLogin)

const listData = ref<API.MessageFindRes['list']>([])
async function init() {
  listData.value = (await messageFind()).list
}

watch(isLogin, init, { immediate: true })
</script>

<template>
  <div class="flex-1 bg-white">
    <van-nav-bar title="消息" placeholder fixed>
      <template #right>
        <van-icon name="setting-o" color="#0B1526" />
      </template>
    </van-nav-bar>

    <div v-if="isLogin" class="pb-10">
      <div class="flex justify-around bg-white py-5">
        <div v-for="(item) in btnList" :key="item.id" class="flex flex-col items-center">
          <img :src="item.img" alt="" class="h-15 w-15 rounded-full">
          <span class="mt-2 text-sm color-[#8D93A6]">{{ item.name }}</span>
        </div>
      </div>
      <div class="h-3 bg-[#F6F8FA]" />

      <List :list-data="listData" />
    </div>
    <div v-else class="pb-10">
      <NoLogin />
    </div>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    title: 消息
    showTabBar: true
</route>
