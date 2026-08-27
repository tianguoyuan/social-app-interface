<script setup lang="ts" name="/home/">
import Navbar from './components/Navbar.vue'
import Follow from './Follow.vue'
import Nearby from './Nearby.vue'
import Recommended from './Recommended.vue'

const followRef = ref<null | InstanceType<typeof Follow>>(null)
const recommendedRef = ref<null | InstanceType<typeof Recommended>>(null)
const nearbyRef = ref<null | InstanceType<typeof Nearby>>(null)

const tagIndex = ref(1)
const isPageArr = ref<number[]>([tagIndex.value])

function setTagIndex(index: number) {
  if (!isPageArr.value.includes(index)) {
    isPageArr.value.push(index)
  }
  tagIndex.value = index
}

function firstRendered(index: number) {
  // 默认1 不会再次触发
  if (index === 1)
    return
  const currentRef = [followRef, recommendedRef, nearbyRef][index]
  currentRef.value?.init()
}
</script>

<template>
  <div>
    <Navbar :tag-index="tagIndex" @set-tag-index="setTagIndex" />

    <van-tabs
      v-model:active="tagIndex" :show-header="false" lazy-render animated
      @rendered="firstRendered"
    >
      <van-tab>
        <Follow ref="followRef" class="mh-container" />
      </van-tab>
      <van-tab>
        <Recommended ref="recommendedRef" class="mh-container" />
      </van-tab>
      <van-tab>
        <Nearby ref="nearbyRef" class="mh-container" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<route lang="yaml">
  meta:
    title: 推荐
    showTabBar: true
</route>
