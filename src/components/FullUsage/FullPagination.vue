<template>
  <div ref="paginationBarContainer"></div>
</template>

<script lang="ts" setup>
import { createPaginationBar } from '@/lib/PaginationBarClass'
import type { PaginationBarInstance } from '@/lib/interfaces/core'
import { computed, onMounted, ref, watch } from 'vue'
import { useThemeStore } from '@/stores/theme'

const ThemeStore = useThemeStore()

const theme = computed(() => ThemeStore.themeName)

const paginationBarContainer = ref<HTMLElement>()
const paginationBar = ref<PaginationBarInstance>()

const init = () => {
  if (paginationBarContainer.value) {
    paginationBar.value = createPaginationBar({
      container: paginationBarContainer.value,
      layout: 'total,sizes,prev,pager,next,jumper',
      total: 300,
      theme: theme.value,
      onCurrentPageChange(index) {
        console.log('current page', index)
      },
      onPageSizeChange(size) {
        console.log('page size', size)
      },
    })
  }
}

watch(theme, (themeName) => {
  paginationBar.value?.setTheme(themeName)
})

onMounted(() => {
  init()
})
</script>

