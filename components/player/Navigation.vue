<script lang=ts setup>

const selected = ref<"accounts" | "liveGame" | "badges">("accounts")

</script>
<template>
    <nav class="flex h-[40px] gap-2 text-sm">
        <CommonNavButton :active="selected == 'accounts'" @click="selected = 'accounts'" :class="selected=='accounts' ? 'text-white/90': ''">ACCOUNTS</CommonNavButton>
        <CommonNavButton :active="selected == 'liveGame'" @click="selected = 'liveGame'" :class="selected=='liveGame' ? 'text-white/90': ''">LIVE GAME</CommonNavButton>
        <CommonNavButton :active="selected == 'badges'" @click="selected = 'badges'" :class="selected=='badges' ? 'text-white/90': ''">BADGES</CommonNavButton>
    </nav>
</template>