<script lang="ts" setup>
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { type PlayerWithAccountsReponse } from "~/utils/types"

dayjs.extend(relativeTime)

const route = useRoute()
const playerName = computed(() => route.params.player as string)

// --- State ---
const selectedAccountIndex = ref(0)
const currentView = ref<string>("accounts")

// --- Data Fetching ---
const { data: player, error } = await useFetch<PlayerWithAccountsReponse>(`/api/player/${playerName.value}`)

const currentAccount = computed(() => player.value?.accounts?.[selectedAccountIndex.value])

const { data: prediction } = await useLazyFetch<number[]>(() => `/api/AI/LPC/${currentAccount.value?.id}`, {
  server: false,
  watch: [currentAccount]
})

// Pre-calculate the account list for the navigation component
const navigationAccounts = computed(
  () =>
    player.value?.accounts.map((account) => ({
      name: account.name,
      profileIcon: account.profileIcon,
      sumonerLvl: account.sumonerLvl
    })) ?? []
)

// Filter and slice LP updates (Logic moved out of template)
const recentLpUpdates = computed(() => {
  if (!currentAccount.value) return []
  return currentAccount.value.lpUpdates
    .filter((lp) => lp.kill) // Filter games with KDA data
    .slice(0, 20)
})

const getChampionIconUrl = (championId: number) =>
  `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`

const formatTimeFromNow = (date: string | Date) => dayjs(date).fromNow()

// --- SEO Configuration ---
const seoImage = computed(
  () => `https://calibrum.4esport.fr/img/new_emblems/${currentAccount.value?.tier?.toLowerCase() ?? "iron"}.png`
)

useSeoMeta({
  title: () => playerName.value,
  twitterTitle: () => playerName.value,
  ogTitle: () => playerName.value,
  description: () => `Learn more about ${playerName.value} stats on Calibrum 🌠 by 4eSport.`,
  ogDescription: () => `Learn more about ${playerName.value} stats on Calibrum 🌠 by 4eSport.`,
  twitterDescription: () => `Learn more about ${playerName.value} stats on Calibrum 🌠 by 4eSport.`,
  ogImage: seoImage,
  twitterCard: "summary",
  themeColor: "#0ea5e9",
  ogType: "website",
  ogUrl: "https://calibrum.4esport.fr",
  ogLocale: "fr_FR",
  msapplicationTileColor: "#0ea5e9",
  author: "Mateleo & Turdyo",
  ogSiteName: () => playerName.value,
  twitterSite: () => playerName.value,
  twitterCreator: "Mateleo & Turdyo",
  mobileWebAppCapable: "yes",
  appleMobileWebAppTitle: () => playerName.value,
  ogImageHeight: 256,
  ogImageWidth: 256,
  ogImageType: "image/png"
})
</script>

<template>
  <div>
    <!-- Main Content -->
    <div v-if="player" class="bg m-auto mt-4 flex w-[94%] max-w-[1500px] flex-col gap-4 md:flex-row md:gap-8">
      <!-- Left Column: Header & Match History -->
      <div class="flex flex-col gap-8">
        <PlayerTitle :role="player.role" :profileIcon="player.accounts.at(0)?.profileIcon">
          {{ playerName }}
        </PlayerTitle>

        <CommonSection class="hidden h-full flex-col gap-2 rounded-lg p-4 md:flex">
          <div class="flex flex-col gap-2 p-2">
            <!-- Loop through computed property instead of complex inline filter -->
            <div v-for="lpUpdate in recentLpUpdates" class="flex items-center justify-between gap-2">
              <div class="flex gap-2">
                <NuxtImg
                  v-if="lpUpdate.championId"
                  :src="getChampionIconUrl(lpUpdate.championId)"
                  sizes="40px"
                  quality="80"
                  format="webp"
                  class="size-10 rounded-lg"
                  alt="Champion Icon"
                />
                <div class="flex flex-col">
                  <p v-if="lpUpdate.kill" class="font-semibold">
                    {{ lpUpdate.kill }}/{{ lpUpdate.death }}/{{ lpUpdate.assist }}
                  </p>
                  <p class="text-sm text-white/40">
                    {{ formatTimeFromNow(lpUpdate.date) }}
                  </p>
                </div>
              </div>
              <CommonLpBadge :amount="lpUpdate.lastUpdateDiff" />
            </div>

            <div v-if="recentLpUpdates.length === 0" class="text-center text-sm text-white/40">
              No recent matches found.
            </div>
          </div>
        </CommonSection>
      </div>

      <!-- Right Column: Navigation & Content -->
      <div class="flex grow flex-col">
        <div class="flex flex-col">
          <PlayerNavigation :is-live="player.isLive" @change="(val) => (currentView = val)" />

          <div v-if="currentView === 'accounts'" class="mt-4 text-sm font-light">
            <PlayerAccounts :accounts="navigationAccounts" v-model:selected="selectedAccountIndex" />
          </div>
        </div>

        <!-- Dynamic View Content -->
        <PlayerAccount
          v-if="prediction && currentView === 'accounts' && currentAccount"
          :account="currentAccount"
          :prediction="prediction"
        />

        <CommonSection v-else-if="currentView === 'wrapped2025'" class="mt-4 rounded-md">
          <PlayerWrapped :playerName="playerName" />
        </CommonSection>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="mt-12 flex justify-center">
      <p class="text-3xl font-bold text-white/80">Oops, this player wasn't found !</p>
    </div>
  </div>
</template>
