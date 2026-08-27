<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="dark:gray-200 px-4 py-10 text-center text-teal-700">
    <div class="text-4xl">
      <div class="i-carbon-warning inline-block" />
    </div>
    <RouterView />
    <div>
      <button class="m-3 mt-8 text-sm btn" @click="router.replace('/')">
        go home
      </button>
    </div>
  </main>
</template>
