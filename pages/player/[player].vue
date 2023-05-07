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

</script>

<template>
    <div class="flex m-4 gap-8">
        <div>
            <PlayerTitle>{{ route.params.player}}</PlayerTitle>
        </div>
        <div class="flex flex-col grow">
            <PlayerNavigation></PlayerNavigation>
            <div class="text-sm font-light mt-4">
                <PlayerAccounts></PlayerAccounts>
            </div>
        </div>
    </div>
</template>
