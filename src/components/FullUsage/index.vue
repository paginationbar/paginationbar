<template>
  <div class="">
    <DemoPanel title="Complete usage">
      <template #description>
        <p>
          Set the <code class="lang-js">layout</code> to indicate what needs to
          be displayed, separated by <strong>commas</strong>, and the
          <code class="lang-js">layout</code> prop will be displayed in
          sequence.
        </p>
        <p>
          <code class="lang-js">prev</code> represents the previous page,
          <code class="lang-js">next</code> represents the next page, and
          <code class="lang-js">pager</code> represents a list of page numbers.
          In addition, <code class="lang-js">jumper</code> and
          <code class="lang-js">total</code>,
          <code class="lang-js">sizes</code> are also provided.
          <code class="lang-js">jumper</code> represents
          <strong>jumper</strong> control,
          <code class="lang-js">total</code> represents the total number of
          entries, and <code class="lang-js">sizes</code> is used to set the
          number of page numbers displayed on each page.
        </p>
      </template>

      <FullPagination />

      <template #code>
        <pre class="lang-markup"><code>{{ formatLibName(CodeRaw) }}</code></pre>
      </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import { formatLibName } from '@/utils'
import FullPagination from './FullPagination.vue'
import CodeRaw from './FullPagination.vue?raw'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FullUsage',
})
</script>
