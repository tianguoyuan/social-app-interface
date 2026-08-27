<script setup lang="ts" name="/search/">
import { searchDefaultMsgFind } from '~/api/search'
import HistorySearch from './components/HistorySearch.vue'
import HotSearch from './components/HotSearch.vue'

const router = useRouter()
function back() {
  router.replace('/home')
}
const searchMsg = ref('')

const result = (await searchDefaultMsgFind())
const placeholderSearch = ref(result.searchDefault)
function search(val?: string) {
  let copySearchMsg = ''
  if (val) {
    copySearchMsg = val
  }
  else if (!searchMsg.value) {
    copySearchMsg = placeholderSearch.value
  }

  // 搜索接口
  router.push(`/home/search/${encodeURIComponent(copySearchMsg)}`)
}
</script>

<template>
  <div>
    <van-nav-bar placeholder fixed>
      <template #left>
        <van-icon name="arrow-left" color="#0B1526" @click="back" />
      </template>
      <template #title>
        <van-search
          v-model="searchMsg"
          class="search-box h-[46px]"
          :placeholder="placeholderSearch"
        />
      </template>

      <template #right>
        <span class="color-[#8D93A6]" @click="search()">搜索</span>
      </template>
    </van-nav-bar>

    <!-- 历史搜索 -->
    <HistorySearch @set-search-msg="search" />

    <!-- 热门搜索 -->
    <HotSearch @set-search-msg="search" />
  </div>
</template>

<style lang="scss" scoped>
::v-deep(.van-nav-bar__title) {
  width: calc(100vw - 120px);
  max-width: none;

  .van-search__field {
    padding: 0;
  }
  .van-search {
    padding: 0;
  }

  .search-box {
    .van-nav-bar,
    .van-icon {
      color: #8d93a6;
    }
  }
}
</style>

<route lang="yaml">
  meta:
    title: 搜索文章
</route>
