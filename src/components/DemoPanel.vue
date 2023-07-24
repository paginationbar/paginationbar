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

      <div v-show="expand" class="demo-panel__code-content">
        <pre class="language-markup"><code><slot name="code" /></code></pre>
      </div>

      <div class="demo-panel__footer">
        <div
          class="demo-panel__expand"
          :class="{ 'is-expand': expand }"
          @click="handleExpand"
        >
          <ArrowDownIcon
            font-size="14px"
            fill="currentColor"
            class="demo-panel__expand__icon"
          />
          <span v-if="!expand">Expand</span>
          <span v-else>Hide</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'prismjs'
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?component'
import { ref } from 'vue'

withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {}
)

const expand = ref(false)
const handleExpand = () => {
  expand.value = !expand.value
}
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

  &__content {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: 0.2s;
  }

  &__example {
    padding: 16px 12px;
  }

  &__code-content {
    padding: 12px;
  }

  &__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    border-top: 1px solid #eaeefb;
    padding: 14px;
  }

  &__expand {
    display: flex;
    align-items: center;
    color: #909399;
    cursor: pointer;

    &__icon {
      margin-right: 8px;
    }

    &:hover {
      color: var(--theme-primary-color);
    }

    &.is-expand {
      .demo-panel__expand__icon {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
