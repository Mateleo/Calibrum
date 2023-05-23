<script lang="ts" setup>
import { PlayerWithAccountsReponse } from "~/utils/types"

const route = useRoute();

const selectedAccount = ref(0)

const { pending, error, data: player } = await useLazyFetch<PlayerWithAccountsReponse>(`/api/player/${route.params.player}`)

useSeoMeta({
    title: `${route.params.player}`,
    ogTitle: `${route.params.player}`,
    description: `Learn more about ${route.params.player} stats on Calibrum 🌠 by 4eSport.`,
    ogDescription: `Learn more about ${route.params.player} stats on Calibrum 🌠 by 4eSport.`,
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
    themeColor: "#0ea5e9",
    ogUrl: () => `https://dev.calibrum.4esport.fr/player/${route.params.player}`
})
</script>

<template>
    <div v-if="player" class="flex gap-8 max-w-[2000px] m-auto mt-4 w-[95%] lg:w-[85%] xl:w-[75%]">
        <div class="flex flex-col gap-8">
            <PlayerTitle :role="player.role" :profileIcon="player.accounts.at(0)?.profileIcon">{{ route.params.player }}
            </PlayerTitle>
            <CommonSection class="h-full rounded-lg" />
        </div>
        <div class="flex flex-col grow">
            <div class="flex flex-col">
                <PlayerNavigation />
                <div class="text-sm font-light mt-4">
                    <PlayerAccounts :accounts="player.accounts" :onAccountChange="(accountIndex) => {
                        selectedAccount = accountIndex
                    }" />
                </div>
            </div>
            <PlayerAccount :account="player.accounts.at(selectedAccount)!" />
        </div>
    </div>
</template>

