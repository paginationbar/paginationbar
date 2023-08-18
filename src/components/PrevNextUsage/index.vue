<template>
  <div class="">
    <DemoPanel title="Button text of prev and next">
      <template #description>
        You can Specify <code class="lang-js">prevText</code> and
        <code class="lang-js">nextText</code> to Customize the button text of
        prev and next
      </template>

      <PrevNextPagination />

      <template #code>
        <pre class="lang-markup"><code>{{ formatLibName(CodeRaw) }}</code></pre>
      </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import { formatLibName } from '@/utils'
import PrevNextPagination from './PrevNextPagination.vue'
import CodeRaw from './PrevNextPagination.vue?raw'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PrevNextUsage',
})
</script>
