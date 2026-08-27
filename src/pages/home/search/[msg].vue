<script setup lang="ts">
import { recommendedListFind } from '~/api/recommended'
import { searchDefaultMsgFind } from '~/api/search'
import { parseRedirectPath } from '~/utils'

const router = useRouter()
const appStore = useAppStore()
function back() {
  router.replace(appStore.prePath || '/home')
}

const route = useRoute('/home/search/[msg]')
const searchMsg = ref(parseRedirectPath(route.params.msg))

watch(() => route.fullPath, () => searchMsg.value = parseRedirectPath(route.params.msg))

const result = (await searchDefaultMsgFind())
const placeholderSearch = ref(result.searchDefault)

const list = ref<API.RecommendedListFindRes['list']>([])
const listLoading = ref(true) // 列表是否加载中-上拉刷新
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)
const finished = computed(() => {
  if (listLoading.value || total.value === 0)
    return false
  return (pageNum.value * pageSize.value) >= total.value
})

// 默认请求
if (searchMsg.value) {
  findList(true)
}
// 查询列表
function findList(initPage?: boolean) {
  listLoading.value = true
  if (initPage) {
    pageNum.value = 1
  }
  else {
    pageNum.value += 1
  }
  recommendedListFind({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  }).then((data) => {
    total.value = data.total
    if (initPage) {
      list.value = data.list
    }
    else {
      list.value = list.value.concat(data.list)
    }
    listLoading.value = false
  })
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
        <span class="color-[#8D93A6]" @click="findList(true)">搜索</span>
      </template>
    </van-nav-bar>
    <div class="p-4">
      <List :list-data="list" :list-loading="listLoading" :finished="finished" @load="findList" />
    </div>
  </div>
</template>

<style scoped lang="scss">
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
    title: 搜索结果
</route>
