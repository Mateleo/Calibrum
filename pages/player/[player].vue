<script lang="ts" setup>
const route = useRoute();

const test = false;
</script>
<template>
    <div class="text-4xl bg-red-400 hover:bg-red-800 hover:shadow-xl hover:shadow-black" :class="test ? 'font-bold' : ''">
        {{ route.params.player }}
    </div>
    <div class="text-4xl font-semibold">{{ route.params.player }}</div>
    <div class="text-4xl">{{ route.params.player }}</div>
    <div class="text-4xl font-light">{{ route.params.player }}</div>
</template>
