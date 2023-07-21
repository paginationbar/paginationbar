<template>
  <main class="home-main">
    <div class="features-item">
      <BasicUsage />
    </div>
    <div class="features-item">
      <PagerCountUsage />
    </div>
    <div class="features-item">
      <TotalCountUsage />
    </div>
    <div class="features-item">
      <JumperUsage />
    </div>
  </main>
</template>

<script lang="ts" setup>
import BasicUsage from '@/components/BasicUsage/index.vue'
import PagerCountUsage from '@/components/PagerCountUsage/index.vue'
import TotalCountUsage from '@/components/TotalUsage/index.vue'
import JumperUsage from '@/components/JumperUsage/index.vue'
</script>

<style lang="scss" scoped>
.home-main {
  max-width: 980px;
  margin: 0 auto;
}
</style>
