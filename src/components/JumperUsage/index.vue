<template>
  <div class="">
    <DemoPanel title="Go directly to a certain page number">
      <template #description>
        Enable the <strong>jumper control</strong> by adding
        <code class="lang-js">jumper</code> to the
        <code class="lang-js">layout</code> configuration.
      </template>

      <JumperPagination />

      <template #code> {{ CodeRaw }} </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import DemoPanel from '../DemoPanel.vue'
import JumperPagination from './JumperPagination.vue'
import CodeRaw from './JumperPagination.vue?raw'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'JumperUsage',
})
</script>
