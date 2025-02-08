<script lang="ts" setup>
interface Props {
  active: boolean
  disabled?: boolean
}

const props: Props = withDefaults(defineProps<Props>(), {
  active: false,
  disabled: false
})
</script>
<template>
  <button
    class="border-b-[4px] px-2 font-semibold transition-colors ease-in hover:border-cyan-300"
    :class="[
      props.active ? 'border-cyan-300 text-white/90' : 'border-transparent text-white/80',
      disabled ? 'pointer-events-none' : ''
    ]"
    :disabled
  >
    <slot />
  </button>
</template>
