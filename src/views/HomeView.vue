<template>
  <main>
    <div ref="paginationBarContainer"></div>
  </main>
</template>

<script lang="ts" setup>
import { createPaginationBar } from '@/lib'
import { onMounted, ref } from 'vue'

const paginationBarContainer = ref<HTMLElement>()

const init = () => {
  if (paginationBarContainer.value) {
    const paginationbar = createPaginationBar({
      container: paginationBarContainer.value,
      pagerCount: 7,
      currentPage: 8,
      pageSize: 10,
      total: 300,
      onCurrentPageChange(index) {
        console.log(index)
      },
    })

    console.log(paginationbar)

    paginationbar.generatePager()
  }
}

onMounted(() => {
  init()
})
</script>
