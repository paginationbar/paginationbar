<template>
  <div class="">
    <DemoPanel title="Disabled">
      <template #description>
        Pagination bar can be manually deactivated using the
        <code class="lang-js">disabled</code> attribute. Or using
        <code class="lang-js">disabled()</code> method of
        <strong>pagination bar instance</strong>.
      </template>

      <DisabledPagination />

      <template #code>
        <pre class="lang-markup"><code>{{ formatLibName(CodeRaw) }}</code></pre>
      </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import { formatLibName } from '@/utils'
import DisabledPagination from './DisabledPagination.vue'
import CodeRaw from './DisabledPagination.vue?raw'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DisabledUsage',
})
</script>
