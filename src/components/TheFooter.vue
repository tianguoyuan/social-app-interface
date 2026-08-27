<script lang="ts" setup>
const { toggleDark } = useAppDark()
</script>

<template>
  <nav class="mt-6 inline-flex gap-2 text-xl">
    <button class="icon-btn" @click="toggleDark()">
      <div class="i-carbon-sun dark:i-carbon-moon" />
    </button>

    <a
      i-carbon-logo-github icon-btn
      rel="noreferrer"
      href="https://github.com/antfu/vitesse-lite"
      target="_blank"
      title="GitHub"
    />
  </nav>
</template>
