<script lang="ts" setup>
const selected = ref<"accounts" | "liveGame" | "badges">("accounts")

interface Props {
  isLive?: boolean | null
}

const props = withDefaults(defineProps<Props>(), {
  isLive: false
})
</script>
<template>
  <nav class="flex h-[40px] gap-2 text-sm">
    <CommonNavButton :active="selected == 'accounts'" @click="selected = 'accounts'"> ACCOUNTS </CommonNavButton>
    <CommonNavButton class="flex items-center" :active="selected == 'liveGame'" @click="selected = 'liveGame'" disabled>
      LIVE GAME
      <span class="relative ml-[2px] mt-1 flex h-2 w-2 self-start" v-if="isLive">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
        <span class="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
      </span>
    </CommonNavButton>
    <CommonNavButton :active="selected == 'badges'" @click="selected = 'badges'" disabled> BADGES </CommonNavButton>
  </nav>
</template>
