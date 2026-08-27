<script setup lang="ts">
import { emptyData } from '~/assets/images'

function init() {
}

defineExpose({
  init,
})
</script>

<template>
  <div>
    <van-empty
      :image="emptyData"
      image-size="80"
      description="正在开发中..."
    />
  </div>
</template>
