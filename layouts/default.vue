<script setup lang="ts">
import {
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_SPEED,
  PATTERN_BACKGROUND_VARIANT,
  PatternBackground
} from "@/components/ui/pattern-background"
</script>
<template>
  <div>
    <LazyHeader></LazyHeader>
    <PatternBackground
      :animate="false"
      :direction="PATTERN_BACKGROUND_DIRECTION.TopRight"
      :variant="PATTERN_BACKGROUND_VARIANT.Dot"
      :speed="PATTERN_BACKGROUND_SPEED.Slow"
    >
      <main class="z-20 pb-[50px]">
        <slot />
      </main>
    </PatternBackground>
    <Footer></Footer>
  </div>
</template>
<style>
body {
  position: relative;
  min-height: 100vh;
}
</style>
