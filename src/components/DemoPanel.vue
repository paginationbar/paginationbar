<template>
  <div class="demo-panel">
    <div class="demo-panel__header">
      <div class="demo-panel__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="demo-panel__description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>

    <div class="demo-panel__content">
      <div class="demo-panel__example">
        <slot name="default" />
      </div>

      <div class="demo-panel__code-content">
        <pre class="language-markup"><code><slot name="code" /></code></pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'prismjs'

withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {}
)
</script>

<style lang="scss" scoped>
.demo-panel {
  margin-bottom: 30px;

  &__header {
    font-size: 22px;
    padding: 55px 0 20px;
    color: #1f2f3d;
  }

  &__title {
    margin-bottom: 12px;
  }

  &__description {
    font-size: 14px;
    color: #5e6d82;
    line-height: 26px;
  }

  &__example {
    padding: 16px 0;
  }

  &__content {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: 0.2s;
    padding: 12px;
  }
}
</style>
