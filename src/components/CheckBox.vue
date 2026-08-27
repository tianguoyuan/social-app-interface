<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** 默认选中 */
  defaultActives: string
  listData: API.RecommendedTagsFindRes['orderList']
  /** 是否多选 */
  multiple: boolean
  /** 最大选择 */
  max: number
}>(), {
  defaultActives: '',
  multiple: false,
  max: 99,
})

const emits = defineEmits<{
  change: [val: string]
}>()

const actives = ref<number[]>(props.defaultActives ? props.defaultActives.split(',').map(v => +v) : [])
// 默认选择
watch(() => props.defaultActives, (val) => {
  actives.value = val ? val.split(',').map(v => +v) : []
})

watch(actives, (val) => {
  emits('change', val.length ? val.map(v => `${v}`).join(',') : '')
}, {
  deep: true,
})
const greaterThenMax = computed(() => {
  return (actives.value.length >= props.max)
})

function changeActives(index: number) {
  const activeIndex = actives.value.indexOf(index)
  if (activeIndex !== -1) {
    actives.value.splice(activeIndex, 1)
  }
  else {
    if (props.multiple) {
      if (!greaterThenMax.value) {
        actives.value.push(index)
      }
    }
    else {
      actives.value = [index]
    }
  }
}
</script>

<template>
  <div>
    <div class="grid grid-cols-4 justify-around gap-2">
      <span v-for="(item, index) in props.listData" :key="item.id" class="line-clamp-1 h-9 w-20 text-ellipsis border-rounded-md bg-[#F6F8FA] text-center line-height-9" :class="{ active: actives.includes(index), isMax: greaterThenMax }" @click="changeActives(index)">
        {{ item.title }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.isMax {
  filter: grayscale(100%);
  opacity: 30%;
}
.active {
  background: #f4f0ff;
  border: 1px solid #5e28ff;
  opacity: 1;
  filter: none;
}
</style>
