<script setup lang="ts">
import { recommendedBannerList } from '~/api/recommended'
import Banner from './components/Banner.vue'
import ListTag from './components/ListTag.vue'

function init() {

}

defineExpose({
  init,
})

const result = await recommendedBannerList()
const bannerList = result.list.map(item => item.img)
</script>

<template>
  <div class="p-3">
    <!-- fix图片超出banner -->
    <div class="w-full overflow-hidden">
      <Banner :banner-list="bannerList" />
    </div>

    <ListTag />
  </div>
</template>
