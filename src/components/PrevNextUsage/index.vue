<template>
  <div class="">
    <DemoPanel title="Customizing the button next of prev and next">
      <template #description>
        You can Specify <code class="lang-js">prevText</code> and
        <code class="lang-js">nextText</code> to Customize the button text of
        prev and next
      </template>

      <PrevNextPagination />

      <template #code> {{ CodeRaw }} </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import DemoPanel from '../DemoPanel.vue'
import PrevNextPagination from './PrevNextPagination.vue'
import CodeRaw from './PrevNextPagination.vue?raw'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PrevNextUsage',
})
</script>
