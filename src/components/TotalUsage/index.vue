<template>
  <div class="">
    <DemoPanel title="Display the Total Control">
      <template #description>
        Enable the <strong>total control</strong> by adding
        <code class="lang-js">total</code> to the
        <code class="lang-js">layout</code> configuration.
      </template>

      <TotalPagination />

      <template #code>
        <pre class="lang-markup"><code>{{ formatLibName(CodeRaw) }}</code></pre>
      </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import { formatLibName } from '@/utils'
import TotalPagination from './TotalPagination.vue'
import CodeRaw from './TotalPagination.vue?raw'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TotalUsage',
})
</script>
