import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const themes = [
      { label: 'material', href: '/themes/material' },
      { label: 'element', href: '/' },
    ]

    const themeName = ref('material')

    const setThemeName = (theme: string) => {
      themeName.value = theme
    }

    return { themeName, themes, setThemeName }
  },
  {
    persist: true,
  }
)
