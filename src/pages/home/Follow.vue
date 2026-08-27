<script setup lang="ts">
import { followUserLike } from '~/api/follow'
import FollowUserLike from './components/FollowUserLike.vue'
import NoFollow from './components/NoFollow.vue'

const userStore = useUserStore()
const isLogin = computed(() => userStore.isLogin)

const followUserLikeList = ref<API.FollowUserLikeRes['list']>([])
const followUserLikeTotal = ref<API.FollowUserLikeRes['total']>(0)

// 第一次从父组件调用 init
watch(isLogin, init)
async function init() {
  if (isLogin.value) {
    const result = await followUserLike({ pageNum: 1, pageSize: 3 })
    followUserLikeList.value = result.list
    followUserLikeTotal.value = result.total
  }
}
defineExpose({
  init,
})
</script>

<template>
  <div>
    <div v-if="isLogin">
      <NoFollow />
      <FollowUserLike class="mt-7" :list-data="followUserLikeList" />
    </div>

    <div v-else>
      <NoLogin />
    </div>
  </div>
</template>
