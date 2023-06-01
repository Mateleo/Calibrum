<script lang="ts" setup>
const selected = ref<"accounts" | "liveGame" | "badges">("accounts")

interface Props {
  live: boolean
}

const props = withDefaults(defineProps<Props>(), {
  live: false
})

</script>
<template>
  <nav class="flex h-[40px] gap-2 text-sm">
    <CommonNavButton
      :active="selected == 'accounts'"
      @click="selected = 'accounts'"
      :class="selected == 'accounts' ? 'text-white/90' : ''"
      >ACCOUNTS</CommonNavButton
    >
    <CommonNavButton
    class="flex items-center"
      :active="selected == 'liveGame'"
      @click="selected = 'liveGame'"
      :class="selected == 'liveGame' ? 'text-white/90' : ''"
      >LIVE GAME
      <span class="relative flex h-2 w-2 self-start mt-1 ml-[2px]" v-if="live">
      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
      <span class="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
    </span>
      </CommonNavButton
    >
    <CommonNavButton
      :active="selected == 'badges'"
      @click="selected = 'badges'"
      :class="selected == 'badges' ? 'text-white/90' : ''"
      >BADGES</CommonNavButton
    >
  </nav>
</template>
