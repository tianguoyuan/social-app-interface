<script setup lang="ts">
import { ZIndexEnum } from '~/enums/ZIndexEnum'

const props = defineProps<{
  tagIndex: number
}>()
const emits = defineEmits<{
  setTagIndex: [val: number, setTagIndex: boolean]
}>()

const tagList = [
  {
    title: '关注',
  },
  {
    title: '推荐',
  },
  {
    title: '附近',
  },
]
const activeTagIndex = computed(() => props.tagIndex)
function changeActiveTagIndex(index: number) {
  emits('setTagIndex', index, true)
}
</script>

<template>
  <div class="navbarBox">
    <VanNavBar title="标题" left-text="返回" placeholder safe-area-inset-top left-arrow fixed border :z-index="ZIndexEnum.HOME_NAVBAR">
      <template #left>
        <AddressSelect />
      </template>
      <template #title>
        <span v-for="(item, index) in tagList" :key="item.title" class="tagItem px-3 text-sm transition-all color-gray" :class="{ activeTag: index === activeTagIndex }" @click="changeActiveTagIndex(index)">
          <span>{{ item.title }}</span>
          <span class="line transition-width" />
        </span>
      </template>
      <template #right>
        <RouterLink to="/home/search">
          <VanIcon name="search" size="18" color="black" />
        </RouterLink>
      </template>
    </VanNavBar>
  </div>
</template>

<style scoped lang="scss">
.tagItem {
  vertical-align: bottom;
  .line {
    position: absolute;
    bottom: -3px;
    width: 0px;
    height: 3px;
    left: 0;
    right: 0;
    margin: auto;
    background: transparent;
    border-radius: 2px 2px 2px 2px;
  }
}
.activeTag {
  font-size: 18px;
  color: #0b1526;
  position: relative;
  .line {
    width: 18px;
    background: #5f2aff;
  }
}

.navbarBox {
  ::v-deep(.van-ellipsis) {
    overflow: unset;
  }
}
</style>
