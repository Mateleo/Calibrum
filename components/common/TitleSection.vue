<script setup lang="ts">
interface Props {
  padding?: boolean;
  title: string;
  color?: string;
  player?: string
}

const props = withDefaults(defineProps<Props>(), {
  padding: true,
  color: "#22262b",
});

const { padding, title, color,player } = toRefs(props);
</script>
<template>
  <div class="flex flex-col">
    <div class="flex justify-between mb-2 items-center">
      <CommonTitle class="">{{ title }}</CommonTitle>
      <a v-if="player" target="_blank" :href="`https://www.op.gg/summoners/euw/${player.split('#')[0]}`" class="hover:bg-sky-400 border-sky-400/70 border font-bold text-sm p-1 rounded-sm">OP.GG</a>
    </div>
    <CommonSection class="h-full rounded-lg" :padding="padding" :color="color">
      <slot></slot>
    </CommonSection>
  </div>
</template>
