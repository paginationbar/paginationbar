<template>
  <div class="">
    <DemoPanel title="Basic usage">
      <template #description>
        Set the <code>layout</code> to indicate what needs to be displayed,
        separated by <code>commas</code>, and the layout elements will be
        displayed in sequence. <code>prev</code> represents the previous page,
        <code>next</code> represents the next page, and
        <code>pager</code> represents a list of page numbers. In addition,
        <code>jumper</code> and <code>total</code>, <code>sizes</code> are also
        provided. <code>jumper</code> represents skip elements,
        <code>total</code> represents the total number of entries, and
        <code>sizes</code> is used to set the number of page numbers displayed
        on each page.
      </template>

      <BasicPagination />

      <template #code> {{ BasicPaginationRaw }} </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import DemoPanel from '../DemoPanel.vue'
import BasicPagination from './BasicPagination.vue'
import BasicPaginationRaw from './BasicPagination.vue?raw'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BasicUsage',
})
</script>
