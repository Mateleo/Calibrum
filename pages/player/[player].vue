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
    <div class="flex gap-8 max-w-[2000px] m-auto mt-4 w-[95%] lg:w-[85%] xl:w-[70%]">
        <div class="flex flex-col gap-8">
            <PlayerTitle>{{ route.params.player }}</PlayerTitle>
            <CommonSection class="h-full rounded-lg"></CommonSection>
        </div>
        <div class="flex flex-col grow">
            <div class="flex flex-col">
                <PlayerNavigation></PlayerNavigation>
                <div class="text-sm font-light mt-4">
                    <PlayerAccounts></PlayerAccounts>
                </div>
            </div>
            <div class="flex mt-4 gap-8">
                <div class="flex flex-col shrink-0">
                    <PlayerRank :rank="undefined" :title="'Current Rank'"></PlayerRank>
                    <PlayerRank :rank="undefined" :title="'Peak Rank'" class="mt-8"></PlayerRank>
                </div>
                <div class="flex flex-col w-full">
                    <CommonTitleSection title="Rank History" class="h-full"></CommonTitleSection>
                </div>
            </div>
        </div>
    </div>
</template>
