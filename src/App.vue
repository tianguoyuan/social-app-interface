<script lang="ts" setup>
const { isDark } = useAppDark()
</script>

<template>
  <main
    class="bg-gray-150 font-sans dark:bg-gray-200"
  >
    <Suspense>
      <VanConfigProvider :theme="isDark ? 'dark' : 'light'">
        <RouterView />
      </VanConfigProvider>
    </Suspense>
  </main>
</template>
