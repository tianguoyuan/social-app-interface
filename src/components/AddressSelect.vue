<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
</script>

<template>
  <RouterLink to="/home/locationCity">
    <span class="text-xs">{{ userStore.address }}</span>
    <VanIcon name="play" class="rotate-90" color="black" size="12" />
  </RouterLink>
</template>

<style scoped>

</style>
