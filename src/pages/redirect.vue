<script setup lang="ts">
import { parseRedirectPath } from '~/utils'

const { query } = useRoute('/redirect')
const redirectPath = query.redirectPath ? parseRedirectPath(query.redirectPath as string) : ''

const router = useRouter()
router.replace(redirectPath || '/')
</script>

<template>
  <div />
</template>
