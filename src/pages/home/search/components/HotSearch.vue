<script setup lang="ts">
import { searchHotFind, searchHotTagFind } from '~/api/search'

const emits = defineEmits<{
  setSearchMsg: [val: string]
}>()
const hotTagList = ref<API.SearchHotTagFindRes['list']>([])
const hotList = ref<API.SearchHotFindRes['list']>([])

const hotTagCurrentIndex = ref(0)

hotTagList.value = (await searchHotTagFind()).list

getList()
async function getList() {
  if (hotTagList.value.length) {
    hotList.value = (await searchHotFind({ pageNum: 1, pageSize: 10, hotTagId: hotTagList.value[hotTagCurrentIndex.value].id })).list
  }
}

function changeHotTag(index: number) {
  hotTagCurrentIndex.value = index
  getList()
}

function setSearchMsg(val: string) {
  emits('setSearchMsg', val)
}
</script>

<template>
  <div class="relative">
    <div class="hotList absolute left-0 right-0 top-0 mt-4" />
    <div class="flex flex-nowrap px-4 py-3">
      <div v-for="(item, index) in hotTagList" :key="index" class="relative mr-4 mt-[14px] color-[#8D93A6]">
        <span class="transition-all" :class="{ hotTagActive: hotTagCurrentIndex === index }" @click="changeHotTag(index)">{{ item.name }}</span>
        <span v-if="hotTagCurrentIndex === index" class="absolute bottom--2 left-0 right-0 m-auto h-[3px] w-6 rounded-[2px] bg-[#5F2AFF]" />
      </div>
    </div>

    <div class="px-4">
      <div v-for="(item, index) in hotList" :key="item.id" class="mt-5 flex line-height-5" @click="setSearchMsg(item.name)">
        <span
          class="h-5 w-5 flex-shrink-0 rounded-1 bg-[#D0D3DE] text-center text-xs color-white line-height-5" :class="{
            'bg-[#F44336]': index === 0,
            'bg-[#FFAC32]': index === 1,
            'bg-[#D4B490]': index === 2,
          }"
        >{{ index + 1 }}</span>
        <span class="line-clamp-1 pl-3">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hotList {
  background: linear-gradient(180deg, #5f2aff 0%, rgba(95, 42, 255, 0.0001) 100%);
  border-radius: 12px 12px 0px 0px;
  height: 45px;
  opacity: 0.1011;
}

.hotTagActive {
  color: #0b1526;
  font-size: 16px;
}
</style>
