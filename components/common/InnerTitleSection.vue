<script setup lang="ts">
interface Props {
  padding?: boolean
  title: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  padding: true,
  color: "#22262b"
})

const { color, padding, title } = toRefs(props)
</script>

<template>
  <CommonSection :color="`${color}5a`" class="rounded-lg">
    <h2 class="mb-2 text-xl font-semibold text-[#08bcd5]">{{ title }}</h2>
    <CommonSection class="rounded-lg" :padding="padding" :color="color">
      <slot></slot>
    </CommonSection>
  </CommonSection>
</template>
