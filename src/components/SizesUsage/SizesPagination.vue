<template>
  <div ref="paginationBarContainer"></div>
</template>

<script lang="ts" setup>
// using `import { createPaginationBar } from 'paginationbar'` instead.
import { createPaginationBar } from '@/lib/paginationBar'
// using `import type { PaginationBarInstance } from 'paginationbar'` instead.
import type { PaginationBarInstance } from '@/lib/interfaces/core'
import { onMounted, ref, computed, watch } from 'vue'
import { useThemeStore } from '@/stores/theme'

const ThemeStore = useThemeStore()

const theme = computed(() => ThemeStore.themeName)

const paginationBarContainer = ref<HTMLElement>()
const paginationBar = ref<PaginationBarInstance>()

const init = () => {
  if (paginationBarContainer.value) {
    paginationBar.value = createPaginationBar({
      container: paginationBarContainer.value,
      layout: 'sizes,prev,pager,next',
      total: 300,
      theme: theme.value,
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
