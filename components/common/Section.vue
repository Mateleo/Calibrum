<script setup lang="ts">
interface Props {
  color?: string
  padding?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: "#22262b",
  padding: true
})
const { color, padding } = toRefs(props)
</script>
<template>
  <div class="min-w-min" :style="`background-color: ${color}; ${padding ? 'padding: 8px' : ''}`">
    <slot></slot>
  </div>
</template>
