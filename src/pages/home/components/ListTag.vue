<script setup lang="ts">
import type { DropdownMenuInstance } from 'vant'
import { recommendedListFind, recommendedTagsFind } from '~/api/recommended'

const kindList = ref<API.RecommendedTagsFindRes['kindList']>([])
const tagList = ref<API.RecommendedTagsFindRes['tagList']>([])
const orderList = ref<API.RecommendedTagsFindRes['orderList']>([])
const list = ref<API.RecommendedListFindRes['list']>([])
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)
const listLoading = ref(true) // 列表是否加载中-上拉刷新
const refreshing = ref(false) // 下拉刷新loading

const finished = computed(() => {
  if (listLoading.value || total.value === 0)
    return false
  return (pageNum.value * pageSize.value) >= total.value
})
const tagIndex = ref<number>(0)
const orderIndex = ref<string>('0')
const kindIndex = ref<string>('0')
// 列表标签切换
function setTagIndex(index: number) {
  if (tagIndex.value !== index) {
    tagIndex.value = index
    findList(true)
  }
}

// 查询tagList
recommendedTagsFind({}).then((data) => {
  kindList.value = data.kindList
  tagList.value = data.tagList
  orderList.value = data.orderList
  findList(true)
})

// 查询列表
function findList(initPage?: boolean) {
  listLoading.value = true
  if (initPage) {
    pageNum.value = 1
  }
  else {
    pageNum.value += 1
  }

  const orderIds = orderIndex.value ? orderIndex.value.split(',').map(v => orderList.value[+v].id).join(',') : ''
  const kindIds = kindIndex.value ? kindIndex.value.split(',').map(v => kindList.value[+v].id).join(',') : ''

  recommendedListFind({
    kindId: kindIds || '',
    orderId: orderIds || '',
    tagId: tagList.value[tagIndex.value]?.id || '',
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
    nextTick(() => {
      listLoading.value = false
      refreshing.value = false
    })
  })
}

// 记录筛选项， 取消还原
const dropdownMenuRef = ref<DropdownMenuInstance | null>(null)
const dialogOrderIndex = ref<string>(orderIndex.value)
const dialogKindIndex = ref<string>(kindIndex.value)
async function closeDropMenu() {
  const copyOrderIndex = orderIndex.value
  const copyKindIndex = kindIndex.value

  dialogOrderIndex.value = copyOrderIndex
  dialogKindIndex.value = copyKindIndex

  orderIndex.value = ''
  kindIndex.value = ''

  await nextTick()
  orderIndex.value = copyOrderIndex
  kindIndex.value = copyKindIndex

  dropdownMenuRef.value?.close()
}
function saveDropMenu() {
  orderIndex.value = dialogOrderIndex.value
  kindIndex.value = dialogKindIndex.value

  findList(true)
  dropdownMenuRef.value?.close()
}
</script>

<template>
  <div class="listTag">
    <div class="relative min-h-[42px] flex items-center py-3">
      <div class="flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap">
        <span v-for="(item, index) in tagList" :key="item.id" class="mr-3 flex-shrink-0 line-height-[18px] transition-all color-gray" :class="{ active: index === tagIndex }" @click="setTagIndex(index)">
          {{ item.title }}
        </span>
      </div>
      <div class="w-10 flex-shrink-0">
        <van-dropdown-menu ref="dropdownMenuRef" auto-locate>
          <van-dropdown-item teleport="body" @close="closeDropMenu">
            <template #title>
              <van-icon name="list-switch" class="translate-y-[2px]" />
            </template>
            <template #default>
              <div class="p-3">
                <div>
                  <p class="color-[#0B1526]">
                    排序
                  </p>
                  <CheckBox :multiple="false" :max="1" :list-data="orderList" class="pt-3" :default-actives="orderIndex" @change="v => dialogOrderIndex = v" />
                </div>

                <div class="pt-3">
                  <p class="color-[#0B1526]">
                    分类
                  </p>
                  <CheckBox :list-data="kindList" class="pt-3" multiple :max="3" :default-actives="kindIndex" @change="v => dialogKindIndex = v" />
                </div>

                <div class="mt-8 flex text-center line-height-11">
                  <span class="mr-2 h-11 flex-1 border-rounded-md bg-[#F6F8FA]" @click="closeDropMenu">取消</span>
                  <span class="h-11 flex-1 border-rounded-md bg-[#5F2AFF] color-white" @click="saveDropMenu">确定</span>
                </div>
              </div>
            </template>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="findList(true)">
      <List :list-data="list" :list-loading="listLoading" :finished="finished" @load="findList" />
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="scss">
.listTag {
  .active {
    color: #0b1526;
    font-size: 18px;
  }

  ::v-deep(.van-dropdown-menu__bar) {
    box-shadow: none;
    background-color: transparent;
  }
  ::v-deep(.van-dropdown-menu__bar) {
    height: auto;
  }
}
</style>
