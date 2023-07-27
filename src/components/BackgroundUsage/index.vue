<template>
  <div class="">
    <DemoPanel title="Background">
      <template #description>
        Add a background color to the pagination button.
      </template>

      <BackgroundPagination />

      <template #code> {{ CodeRaw }} </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import DemoPanel from '../DemoPanel.vue'
import BackgroundPagination from './BackgroundPagination.vue'
import CodeRaw from './BackgroundPagination.vue?raw'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BackgroundUsage',
})
</script>
