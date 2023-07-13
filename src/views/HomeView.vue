<template>
  <main></main>
</template>

<script lang="ts" setup>
import { PaginationBar } from '@/lib'
import { onMounted } from 'vue'

onMounted(() => {
  const paginationbar = new PaginationBar({
    pagerCount: 7,
    currentPage: 8,
    pageSize: 10,
    total: 300,
  })

  console.log(paginationbar)

  paginationbar.generatePager()
})
</script>
