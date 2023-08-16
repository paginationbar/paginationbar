<template>
  <div class="">
    <DemoPanel title="Background">
      <template #description>
        Add a background color to the pagination button.
      </template>

      <BackgroundPagination />

      <template #code>
        <pre class="lang-markup"><code>{{ formatLibName(CodeRaw) }}</code></pre>
      </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import BackgroundPagination from './BackgroundPagination.vue'
import CodeRaw from './BackgroundPagination.vue?raw'
import { formatLibName } from '@/utils'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BackgroundUsage',
})
</script>
