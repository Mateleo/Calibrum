<script lang="ts" setup>
import MyOgImage from "~/components/islands/MyOgImage.vue";
import { PlayerWithAccountsReponse } from "~/utils/types"

const route = useRoute()

const selectedAccount = ref(0)

const {
  pending,
  error,
  data: player
} = await useFetch<PlayerWithAccountsReponse>(`/api/player/${route.params.player}`)

defineOgImage({
  component:"MyOgImage",
  name:player.value?.name,
  account:player.value?.accounts[0],
  role:player.value?.role,
  height:630,
  width:1200
})



useSeoMeta({
  title:()=> `${route.params.player}`,
  ogTitle:()=> `${route.params.player}`,
  description:()=> `Learn more about ${route.params.player} stats on Calibrum 🌠 by 4eSport.`,
  ogDescription:()=> `Learn more about ${route.params.player} stats on Calibrum 🌠 by 4eSport.`,
  twitterCard: "summary_large_image",
  themeColor: "#0ea5e9",
  ogUrl: () => `https://calibrum.4esport.fr/player/${route.params.player}`
})
</script>

<template>
  <div>
    <div v-if="player" class="bg m-auto mt-4 flex flex-col md:flex-row w-[95%] max-w-[2000px] gap-4 md:gap-8 lg:w-[85%] xl:w-[75%]">
      <div class="flex flex-col gap-8">
        <PlayerTitle :role="player.role" :profileIcon="player.accounts.at(0)?.profileIcon">
          {{ route.params.player }}
        </PlayerTitle>
        <CommonSection class="hidden md:flex h-full flex-col gap-2 rounded-lg"> </CommonSection>
      </div>
      <div class="flex grow flex-col">
        <div class="flex flex-col">
          <PlayerNavigation :is-live="player.isLive"></PlayerNavigation>
          <div class="mt-4 text-sm font-light">
            <PlayerAccounts
              :accounts="player.accounts"
              :onAccountChange="
                accountIndex => {
                  selectedAccount = accountIndex
                }
              "
            />
          </div>
        </div>
        <PlayerAccount :account="player.accounts.at(selectedAccount)!" />
      </div>
    </div>
    <div v-else class="flex justify-center mt-12">
      <p class="font-bold text-3xl text-white/80">Oops, this player wasn't found !</p>
    </div>
  </div>
</template>
