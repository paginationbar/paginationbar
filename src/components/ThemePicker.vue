<template>
  <div class="theme-picker">
    <label for="" class="theme-picker__label">Themes: </label>
    <select v-model="selectedTheme" @change="handleThemeChange">
      <option v-for="v in themes" :key="v.label" :value="v.label">
        {{ v.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const ThemeStore = useThemeStore()

const themes = computed(() => ThemeStore.themes)

const selectedTheme = computed({
  get() {
    return ThemeStore.themeName
  },
  set(value: string) {
    ThemeStore.setThemeName(value)
  },
})

const handleThemeChange = () => {
  const item = themes.value.find((v) => v.label === selectedTheme.value)

  console.log(item)
}
</script>

<style lang="scss" scoped>
.theme-picker {
  font-size: 14px;
  display: flex;
  align-items: center;
  color: var(--theme-text-color);

  &__label {
    margin-right: 10px;
  }

  select {
    display: block;
    border: 1px solid #dcdfe6;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    outline: none;
    padding: 4px 16px 4px 12px;
    cursor: pointer;
    color: var(--theme-text-color--secondary);
    border-radius: 4px;

    &:hover {
      border-color: var(--theme-color);
    }
  }
}
</style>
