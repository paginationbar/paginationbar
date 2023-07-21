<template>
  <div ref="paginationBarContainer"></div>
</template>

<script lang="ts" setup>
// using `import { createPaginationBar } from 'paginationbar'` instead.
import { createPaginationBar } from '@/lib/paginationBar'
// using `import type { PaginationBarInstance } from 'paginationbar'` instead.
import type { PaginationBarInstance } from '@/lib/interfaces/core'
import { onMounted, ref } from 'vue'

const paginationBarContainer = ref<HTMLElement>()
const paginationBar = ref<PaginationBarInstance>()

const init = () => {
  if (paginationBarContainer.value) {
    paginationBar.value = createPaginationBar({
      container: paginationBarContainer.value,
      layout: 'prev,pager,next,jumper',
      total: 300,
    })
  }
}

onMounted(() => {
  init()
})
</script>
