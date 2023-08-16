<template>
  <div>
    <DemoHeader
      logoText="PB"
      title="Pagination Bar"
      :title-link="LINKS.repo"
      :right-links="rightLinks"
    >
      <template #right><ThemePicker /></template>
    </DemoHeader>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { LINKS } from '@/settings'

import ThemePicker from '@/components/ThemePicker.vue'
import type { DemoHeader } from 'demoify'

const rightLinks = [
  { href: LINKS.repo, title: 'Documentation' },
  { href: LINKS.changelog, title: 'Changelog' },
  { href: LINKS.repo, title: 'Github' },
]
</script>
