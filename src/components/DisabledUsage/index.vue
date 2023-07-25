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

      <template #code> {{ CodeRaw }} </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import DemoPanel from '../DemoPanel.vue'
import DisabledPagination from './DisabledPagination.vue'
import CodeRaw from './DisabledPagination.vue?raw'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DisabledUsage',
})
</script>
