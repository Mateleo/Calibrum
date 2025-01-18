<script setup lang="ts">
interface Props {
  padding?: boolean
  title: string
  color?: string
  player?: string
}

const props = withDefaults(defineProps<Props>(), {
  padding: true,
  color: "#22262b"
})

const { padding, title, color, player } = toRefs(props)
</script>
<template>
  <div class="flex flex-col">
    <div class="mb-2 flex items-center justify-between">
      <CommonTitle class="">{{ title }}</CommonTitle>
      <a
        v-if="player"
        target="_blank"
        :href="`https://www.op.gg/summoners/euw/${player.split('#').at(0)}-${player.split('#').at(1)}`"
        class="rounded-sm border border-sky-400/70 p-1 text-sm font-bold hover:bg-sky-400"
        >OP.GG</a
      >
    </div>
    <CommonSection class="h-full rounded-lg" :padding="padding" :color="color">
      <slot></slot>
    </CommonSection>
  </div>
</template>
