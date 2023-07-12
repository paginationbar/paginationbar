<template>
  <main></main>
</template>

<script lang="ts" setup>
import { PaginationBar } from '@/lib'
import { onMounted } from 'vue'

onMounted(() => {
  const paginationbar = new PaginationBar()

  console.log(paginationbar)

  paginationbar.generatePager()
})
</script>
