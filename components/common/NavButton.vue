<script lang="ts" setup>
interface Props {
  active: boolean
}

const props: Props = withDefaults(defineProps<Props>(), {
  active: false
})
</script>
<template>
  <button
    class="border-b-[4px] px-2 font-semibold text-white/80 transition-colors ease-in hover:border-cyan-300"
    :class="props.active ? 'border-cyan-300' : 'border-transparent'"
  >
    <slot></slot>
  </button>
</template>
