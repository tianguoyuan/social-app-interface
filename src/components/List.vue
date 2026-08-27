<script setup lang="ts">
const props = defineProps<{
  listData: API.RecommendedListFindRes['list']
  listLoading: boolean
  finished: boolean
}>()

const emits = defineEmits<{
  load: []
  setLoading: [value: boolean]
}>()
const error = ref(false)
</script>

<template>
  <div>
    <van-list
      v-model:error="error"
      :loading="props.listLoading"
      error-text="请求失败，点击重新加载"
      :finished="props.finished"
      finished-text="没有更多了"
      @update:loading="v => emits('setLoading', v)"
      @load="emits('load')"
    >
      <div class="grid grid-cols-2 justify-around gap-3">
        <div v-for="(item, index) in props.listData" :key="item.id">
          <van-image
            class="h-[200px] w-full"
            :src="item.cover"
            lazy-load
          />
          <p>{{ `${index + 1}: ${item.title}` }}</p>
        </div>
      </div>
    </van-list>
  </div>
</template>

<style scoped>

</style>
