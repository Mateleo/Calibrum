<script lang="ts" setup>
import { LpUpdate } from '@prisma/client';

const route = useRoute();
const { pending, error, data: player } = await useLazyFetch(`/api/player/${route.params.player}`)

const selectedAccountIndex = ref(0)

type Response = Omit<LpUpdate, "accountId" | "id"> | undefined

const lastUpdate = ref(player.value?.accounts.at(0)?.lpUpdates.at(0) as Response)

watch(selectedAccountIndex, (newIndex) => {
    lastUpdate.value = player.value?.accounts.at(newIndex)?.lpUpdates.at(0) as Response

    console.log(lastUpdate)
})




// var peakEloUpdate = player.value?.accounts.at(selectedAccountIndex.value)?.lpUpdates.reduce((peakEloUpdate, currentUpdate) => (
//     currentUpdate.LPC > peakEloUpdate.LPC ? currentUpdate : peakEloUpdate
// )) as unknown as Omit<LpUpdate, "accountId" | "id"> | undefined

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
    <div v-if="player" class="flex gap-8 max-w-[2000px] m-auto mt-4 w-[95%] lg:w-[85%] xl:w-[75%]">
        <div class="flex flex-col gap-8">
            <PlayerTitle :role="player.role">{{ route.params.player }}</PlayerTitle>
            <CommonSection class="h-full rounded-lg"></CommonSection>
        </div>
        <div class="flex flex-col grow">
            <div class="flex flex-col">
                <PlayerNavigation />
                <div class="text-sm font-light mt-4">
                    <PlayerAccounts :accounts="player.accounts" :onAccountChange="(accountIndex) => {
                        selectedAccountIndex = accountIndex
                    }" />
                </div>
            </div>
            <div class="flex mt-4 gap-8">
                <div class="flex flex-col shrink-0">
                    <PlayerRank :lpUpdate="lastUpdate" :title="'Current Rank'" :wins=100 :losses=150 />
                    <PlayerRank :title="'Peak Rank'" class="mt-8" />
                </div>
                <div class="flex flex-col w-full">
                    <CommonTitleSection title="Rank History" class="h-full"></CommonTitleSection>
                </div>
            </div>
        </div>
    </div>
</template>
