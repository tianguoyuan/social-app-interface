<script setup lang="ts">
import { rubbish } from '~/assets/images'

const emits = defineEmits<{
  setSearchMsg: [val: string]
}>()
const historySearch = useLocalStorage(('historySearch'), ['读书', '求职日记', '超NICE小组', '葡萄柚', '有氧运动', '大话职场生活'])
const isRemoveFlag = ref(false)

function removeAllHistory() {
  historySearch.value = []
}
function historyItemClick(index: number) {
  if (!isRemoveFlag.value) {
    emits('setSearchMsg', historySearch.value[index])
  }
  else {
    historySearch.value.splice(index, 1)
  }
}
</script>

<template>
  <div v-if="historySearch.length" class="mx-4 mt-4">
    <div class="flex justify-between">
      <span class="color-[#0B1526]">历史搜索</span>
      <div>
        <img v-show="!isRemoveFlag" :src="rubbish" alt="" class="w-3" @click="isRemoveFlag = true">
        <div v-show="isRemoveFlag" class="text-3">
          <span class="color-[#8D93A6]" @click="removeAllHistory">全部删除</span>
          <span class="px-2">|</span>
          <span class="color-red" @click="isRemoveFlag = false">完成</span>
        </div>
      </div>
    </div>

    <div class="mt-3 flex flex-wrap">
      <div v-for="(item, index) in historySearch" :key="item" class="mb-2 mr-2 flex-shrink-0 rounded-2 bg-[#F6F8FA] px-4 py-2 text-3 color-[#0B1526]" @click="historyItemClick(index)">
        <span>{{ item }}</span>
        <van-icon v-if="isRemoveFlag" name="cross" class="pl-1 color-[#8D93A6]" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
