<script lang="ts" setup>
import { type PlayerWithAccountsReponse } from "~/utils/types"

const route = useRoute()

const selectedAccount = ref(0)

const { error, data: player } = await useFetch<PlayerWithAccountsReponse>(`/api/player/${route.params.player}`)

const {
  data: prediction,
  refresh,
  pending
} = await useLazyFetch<number[]>(() => `/api/AI/LPC/${player.value?.accounts[selectedAccount.value].id}`, {
  watch: [selectedAccount]
})
// defineOgImage({
//   component:"MyOgImage",
//   name:player.value?.name,
//   account:player.value?.accounts[0],
//   role:player.value?.role,
//   height:315,
//   width:600,
//   cache:false,
//   cacheTtl:100
// })

useServerSeoMeta({
  title: () => `${player.value?.name}`,
  twitterTitle: () => `${player.value?.name}`,
  ogTitle: () => `${player.value?.name}`,
  description: () => `Learn more about ${player.value?.name} stats on Calibrum 🌠 by 4eSport.`,
  ogDescription: () => `Learn more about ${player.value?.name} stats on Calibrum 🌠 by 4eSport.`,
  twitterDescription: () => `Learn more about ${player.value?.name} stats on Calibrum 🌠 by 4eSport.`,
  ogImage: () =>
    `https://calibrum.4esport.fr/img/new_emblems/${player.value?.accounts[0].tier?.toLocaleLowerCase() ?? "iron"}.png`,
  twitterCard: "summary",
  themeColor: "#0ea5e9",
  ogType: "website",
  ogUrl: "https://calibrum.4esport.fr",
  ogLocale: "fr_FR",
  msapplicationTileColor: "#0ea5e9",
  author: "Mateleo & Turdyo",
  ogSiteName: () => `${player.value?.name}`,
  twitterSite: () => `${player.value?.name}`,
  twitterCreator: "Mateleo & Turdyo",
  mobileWebAppCapable: "yes",
  appleMobileWebAppTitle: () => `${player.value?.name}`,
  ogImageHeight: 256,
  ogImageWidth: 256,
  ogImageType: "image/png"
})
</script>

<template>
  <div>
    <div
      v-if="player"
      class="bg m-auto mt-4 flex w-[95%] max-w-[2000px] flex-col gap-4 md:flex-row md:gap-8 lg:w-[85%] xl:w-[75%]"
    >
      <div class="flex flex-col gap-8">
        <PlayerTitle :role="player.role" :profileIcon="player.accounts.at(0)?.profileIcon">
          {{ route.params.player }}
        </PlayerTitle>
        <CommonSection class="hidden h-full flex-col gap-2 rounded-lg md:flex">
          <h2 class="text-center font-semibold">CalibrumML v2</h2>
          <div
            v-if="prediction?.at(0) && !pending"
            class="flex items-center justify-center gap-1"
            title="prediction in the day to come."
          >
            <p>{{ Math.floor((prediction.at(-1) ?? 0) - (player.accounts[selectedAccount].LPC ?? 0)) }}LP</p>
            <Icon
              v-if="Math.floor((prediction.at(-1) ?? 0) - (player.accounts[selectedAccount].LPC ?? 0)) < 0"
              name="ic:baseline-trending-down"
              color="#f53838"
            ></Icon>
            <Icon v-else name="ic:baseline-trending-up" color="#48f538"></Icon>
          </div>
        </CommonSection>
      </div>
      <div class="flex grow flex-col">
        <div class="flex flex-col">
          <PlayerNavigation :is-live="player.isLive"></PlayerNavigation>
          <div class="mt-4 text-sm font-light">
            <PlayerAccounts
              :accounts="player.accounts"
              :onAccountChange="
                (accountIndex) => {
                  selectedAccount = accountIndex
                }
              "
            />
          </div>
        </div>
        <PlayerAccount v-if="prediction" :account="player.accounts.at(selectedAccount)!" :prediction="prediction" />
      </div>
    </div>
    <div v-else class="mt-12 flex justify-center">
      <p class="text-3xl font-bold text-white/80">Oops, this player wasn't found !</p>
    </div>
  </div>
</template>
