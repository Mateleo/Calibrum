<script setup lang="ts">
const props = defineProps<{
  amount: number
}>()

const win = computed<boolean>(() => props.amount > 0)
</script>
<template>
  <div
    class="w-[65px] rounded-full border-2 border-transparent py-1 text-center text-sm font-semibold shadow-sm transition-colors ease-in-out"
    :class="win ? 'bg-green-500 shadow-green-900' : 'bg-red-500 shadow-red-900'"
  >
    {{ win ? "+" : "" }}{{ amount }} LP
  </div>
</template>
