<script lang=ts setup>

let selected = ref<"accounts" | "liveGame" | "badges">("accounts")

</script>
<template>
    <nav class="flex h-[40px] gap-2 text-sm">
        <CommonNavButton :active="selected == 'accounts'" @click="selected = 'accounts'">ACCOUNTS</CommonNavButton>
        <CommonNavButton :active="selected == 'liveGame'" @click="selected = 'liveGame'">LIVE GAME</CommonNavButton>
        <CommonNavButton :active="selected == 'badges'" @click="selected = 'badges'">BADGES</CommonNavButton>
    </nav>
</template>