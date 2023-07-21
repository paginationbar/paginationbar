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
</script>

<style lang="scss" scoped>
.home-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 120px;

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
    a {
      margin-left: 16px;
    }
  }
}
</style>
