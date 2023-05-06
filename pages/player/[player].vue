<script lang="ts" setup>
const route = useRoute();
useSeoMeta({
    title: `${route.params.player} on Calibrum ☄`,
    ogTitle: `${route.params.player} on Calibrum ☄`,
    description: `Learn more about ${route.params.player} stats on Calibrum ☄ by 4eSport.`,
    ogDescription: `Learn more about ${route.params.player} stats on Calibrum ☄ by 4eSport.`,
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
})


const test = false;
</script>
<template>
    <div>
        <div class="text-4xl bg-red-400 hover:bg-red-800 hover:shadow-xl hover:shadow-black"
            :class="test ? 'font-bold' : ''">
            {{ route.params.player }}
        </div>
        <div class="text-4xl font-semibold">{{ route.params.player }}</div>
        <div class="text-4xl">{{ route.params.player }}</div>
        <div class="text-4xl font-light">{{ route.params.player }}</div>
    </div>
</template>
