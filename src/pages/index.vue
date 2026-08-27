<script setup lang="ts" name="/">
import { appIntroduceBanner } from '~/api'
import { setScreenBannerStorage } from '~/utils/storage'

const router = useRouter()
const result = await appIntroduceBanner()
const bannerList = ref<API.IAppIntroduceBannerRes['list']>([])

if (result.switch === 'N') {
  goHome()
}
else if (result.switch === 'Y') {
  bannerList.value = result.list
}

function goHome() {
  router.replace('/home')
  setScreenBannerStorage(true)
}
</script>

<template>
  <div id="dashboard" class="flex">
    <van-swipe class="flex-1" indicator-color="#5F2AFF" :loop="false">
      <van-swipe-item v-for="(item, index) in bannerList" :key="item.name" class="relative flex flex-col">
        <div v-if="index === bannerList.length - 1" class="skip-btn absolute right-10 top-10 rounded-2xl px-2 text-xs" @click="goHome">
          跳过
        </div>
        <div class="pl-12 pt-18">
          <div class="relative text-4xl font-bold">
            <span>{{ item.name }}</span>

            <span class="absolute top-0 pl-3 text-18 color-[#5F2AFF]">”</span>
          </div>
          <div class="text-sm">
            {{ item.desc }}
          </div>
        </div>

        <div class="pb-ios mt-6 flex-1 overflow-hidden px-6">
          <van-image
            draggable="false"
            class="m-auto h-full w-full"
            fit="cover"
            :src="item.img"
            lazy-load
          >
            <template #loading>
              <div class="flex flex-col items-center">
                <van-loading type="spinner" size="20" />
                <p class="mt-1 text-3">
                  加载中...
                </p>
              </div>
            </template>
          </van-image>

          <!-- <img class="m-auto h-full w-full object-cover" :src="item.img" alt="" draggable="false"> -->
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped>
.skip-btn {
  background-color: rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 0.7);
}
::v-deep(.van-swipe__indicator) {
  background-color: #000;
}
#dashboard {
  height: 100vh;
}

/* Avoid Chrome to see Safari hack */
@supports (-webkit-touch-callout: none) {
  #dashboard {
    /* The hack for Safari */
    height: -webkit-fill-available;
  }
}
</style>

<route lang="yaml">
  meta:
    layout: false
    title: 开屏广告
</route>
