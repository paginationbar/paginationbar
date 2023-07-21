<template>
  <div class="">
    <DemoPanel title="Set maximum number of page buttons">
      <template #description>
        By default, when the total number of pages exceeds <code>7</code>,
        <strong>Pagination</strong> will collapse the extra page number button.
        The maximum number of page number buttons can be set through the
        <code>pagerCount</code> attribute.
      </template>

      <PagerCountPagination />

      <template #code> {{ CodeRaw }} </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import DemoPanel from '../DemoPanel.vue'
import PagerCountPagination from './PagerCountPagination.vue'
import CodeRaw from './PagerCountPagination.vue?raw'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PagerCountUsage',
})
</script>
