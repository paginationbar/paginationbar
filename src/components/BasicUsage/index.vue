<template>
  <div class="">
    <DemoPanel title="Basic usage">
      <template #description>
        Just create a pagination bar instance via
        <code class="lang-js">createPaginationBar</code>.
      </template>

      <BasicPagination />

      <template #code>
        <pre class="lang-markup"><code>{{ formatLibName(CodeRaw) }}</code></pre>
      </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import BasicPagination from './BasicPagination.vue'
import CodeRaw from './BasicPagination.vue?raw'
import { formatLibName } from '@/utils'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BasicUsage',
})
</script>
