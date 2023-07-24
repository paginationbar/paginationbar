<template>
  <div>
    <div class="home-header">
      <div class="home-header__left">
        <div class="logo">
          <span>PB</span>
        </div>
        <div class="title">
          <a :href="LINKS.repo" target="_blank">Pagination Bar</a>
        </div>
      </div>

      <div class="home-header__right">
        <ThemePicker />
        <a :href="LINKS.repo" target="_blank">Documentation</a>
        <a :href="LINKS.changelog" target="_blank">Changelog</a>
        <a :href="LINKS.repo" target="_blank">Github</a>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { LINKS } from '@/settings'

import ThemePicker from '@/components/ThemePicker.vue'
</script>

<style lang="scss" scoped>
.home-header {
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 120px;
  position: sticky;
  left: 0;
  top: 0;

  .logo {
    width: 40px;
    height: 40px;
    background: linear-gradient(180deg, #f36c45 20%, #e75755);
    border-radius: 2px;
    color: #fff;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    line-height: 1.2em;
    font-weight: bold;
    font-style: italic;
  }

  a {
    &:any-link {
      color: var(--theme-text-color);
      text-decoration: none;
      font-family: var(--theme-font-family);
    }

    &:hover {
      text-decoration: underline;
    }
  }

  &__left {
    display: flex;
    align-items: center;

    .title {
      margin-left: 20px;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    a {
      margin-left: 16px;
    }
  }
}
</style>
