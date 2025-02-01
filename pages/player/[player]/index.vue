<script lang="ts" setup>
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { type PlayerWithAccountsReponse } from "~/utils/types"

dayjs.extend(relativeTime)

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

useSeoMeta({
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
    <div v-if="player" class="bg m-auto mt-4 flex w-[95%] max-w-[1500px] flex-col gap-4 md:flex-row md:gap-8">
      <div class="flex flex-col gap-8">
        <PlayerTitle :role="player.role" :profileIcon="player.accounts.at(0)?.profileIcon">
          {{ route.params.player }}
        </PlayerTitle>
        <CommonSection class="hidden h-full flex-col gap-2 rounded-lg p-4 md:flex">
          <div class="flex flex-col gap-2 p-2">
            <div
              v-for="lpUpdate in player.accounts.at(selectedAccount)?.lpUpdates.filter((lp) => lp.kill)"
              class="flex items-center justify-between gap-2"
            >
              <div class="flex gap-2">
                <NuxtImg
                  sizes="40px"
                  quality="80"
                  format="webp"
                  v-if="lpUpdate.championId"
                  :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${lpUpdate.championId}.png`"
                  class="size-10 rounded-lg"
                />
                <div class="flex flex-col">
                  <p v-if="lpUpdate.kill" class="font-semibold">
                    {{ lpUpdate.kill }}/{{ lpUpdate.death }}/{{ lpUpdate.assist }}
                  </p>
                  <p class="text-sm text-white/40">
                    {{ dayjs(lpUpdate.date).fromNow() }}
                  </p>
                </div>
              </div>
              <CommonLpBadge :amount="lpUpdate.lastUpdateDiff" />
            </div>
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
