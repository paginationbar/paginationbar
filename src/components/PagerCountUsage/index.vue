<template>
  <div class="">
    <DemoPanel title="Set maximum number of page buttons">
      <template #description>
        By default, when the total number of pages exceeds
        <code class="lang-js">7</code>. <strong>Pagination</strong> will
        collapse the extra page number button. The maximum number of page number
        buttons can be set through the
        <code class="lang-js">pagerCount</code> attribute.
      </template>

      <PagerCountPagination />

      <template #code>
        <pre class="lang-markup"><code>{{ formatLibName(CodeRaw) }}</code></pre>
      </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import { formatLibName } from '@/utils'
import PagerCountPagination from './PagerCountPagination.vue'
import CodeRaw from './PagerCountPagination.vue?raw'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PagerCountUsage',
})
</script>
