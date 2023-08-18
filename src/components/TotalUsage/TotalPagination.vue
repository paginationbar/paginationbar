<template>
  <div ref="paginationBarContainer"></div>
</template>

<script lang="ts" setup>
import { createPaginationBar } from '@/lib/paginationBar'
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
      layout: 'prev,pager,next,total',
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
@/lib/PaginationBar @/lib/PaginationBarClass
