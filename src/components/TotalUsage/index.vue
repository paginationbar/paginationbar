<template>
  <div class="">
    <DemoPanel title="Display the Total Control">
      <template #description>
        Enable the <strong>total control</strong> by adding
        <code>total</code> to the <code>layout</code> configuration.
      </template>

      <TotalPagination />

      <template #code> {{ CodeRaw }} </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import DemoPanel from '../DemoPanel.vue'
import TotalPagination from './TotalPagination.vue'
import CodeRaw from './TotalPagination.vue?raw'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TotalUsage',
})
</script>
