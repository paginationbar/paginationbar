<template>
  <div class="">
    <DemoPanel title="Page sizes control">
      <template #description>
        Enable the <strong>sizes control</strong> by adding
        <code class="lang-js">sizes</code> to the
        <code class="lang-js">layout</code> configuration.
        <p>
          The <strong>select option settings</strong> for displaying the number
          of selectors per page can be configured via
          <code class="lang-js">pageSizes</code>. And you can use
          <code class="lang-js">sizesOptionLabel</code> to customize the label
          content of select options.
        </p>
      </template>

      <SizesPagination />

      <template #code>
        <pre class="lang-markup"><code>{{ formatLibName(CodeRaw) }}</code></pre>
      </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import { formatLibName } from '@/utils'
import SizesPagination from './SizesPagination.vue'
import CodeRaw from './SizesPagination.vue?raw'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BasicUsage',
})
</script>
