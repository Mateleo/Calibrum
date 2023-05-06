<script lang=ts setup>

let selected = ref(0)

</script>
<template>
    <div>
        <nav class="flex h-[40px] gap-2 text-sm">
            <CommonNavButton :active="selected==0 ? true : false" @click="selected=0">ACCOUNTS</CommonNavButton>
            <CommonNavButton :active="selected==1 ? true : false" @click="selected=1">LIVE GAME</CommonNavButton>
            <CommonNavButton :active="selected==2 ? true : false" @click="selected=2">BADGES</CommonNavButton>
        </nav>
    </div>
</template>