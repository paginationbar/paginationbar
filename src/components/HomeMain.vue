<template>
  <main class="home-main">
    <div class="features-item">
      <BasicUsage />
    </div>
    <div class="features-item">
      <BackgroundUsage />
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
    <div class="features-item">
      <SizesUsage />
    </div>
    <div class="features-item">
      <PrevNextUsage />
    </div>
    <div class="features-item">
      <DisabledUsage />
    </div>
    <div class="features-item">
      <FullUsage />
    </div>
  </main>
</template>

<script lang="ts" setup>
import BasicUsage from '@/components/BasicUsage/index.vue'
import PagerCountUsage from '@/components/PagerCountUsage/index.vue'
import TotalCountUsage from '@/components/TotalUsage/index.vue'
import JumperUsage from '@/components/JumperUsage/index.vue'
import PrevNextUsage from '@/components/PrevNextUsage/index.vue'
import SizesUsage from '@/components/SizesUsage/index.vue'
import FullUsage from '@/components/FullUsage/index.vue'
import DisabledUsage from '@/components/DisabledUsage/index.vue'
import BackgroundUsage from '@/components/BackgroundUsage/index.vue'
</script>

<style lang="scss" scoped>
.home-main {
  max-width: 980px;
  margin: 0 auto;
}
</style>
