import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const themes = [
      { label: 'element', href: '/' },
      { label: 'material', href: '/themes/material' },
    ]

    const themeName = ref('element')

    const setThemeName = (theme: string) => {
      themeName.value = theme
    }

    return { themeName, themes, setThemeName }
  },
  {
    persist: true,
  }
)
