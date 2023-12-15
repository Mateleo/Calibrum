<script lang="ts" setup>
import dayjs from "dayjs";
import { PlayerWithAccountsReponse } from "~/utils/types";

const route = useRoute();

const selectedAccount = ref(0);

const {
  pending,
  error,
  data: player,
} = await useFetch<PlayerWithAccountsReponse>(`/api/player/${route.params.player}`);


const { data: prediction, refresh } = await useLazyFetch(()=>
  `/api/AI/LPC/${player.value?.accounts[selectedAccount.value].id}`,{
    watch:[selectedAccount]
  }
);
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
  description: () =>
    `Learn more about ${player.value?.name} stats on Calibrum 🌠 by 4eSport.`,
  ogDescription: () =>
    `Learn more about ${player.value?.name} stats on Calibrum 🌠 by 4eSport.`,
  twitterDescription: () =>
    `Learn more about ${player.value?.name} stats on Calibrum 🌠 by 4eSport.`,
  ogImage: () =>
    `https://calibrum.4esport.fr/img/new_emblems/${
      player.value?.accounts[0].tier?.toLocaleLowerCase() ?? "iron"
    }.png`,
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
  ogImageType: "image/png",
});
</script>

<template>
  <div>
    <div
      v-if="player"
      class="bg m-auto mt-4 flex flex-col md:flex-row w-[95%] max-w-[2000px] gap-4 md:gap-8 lg:w-[85%] xl:w-[75%]"
    >
      <div class="flex flex-col gap-8">
        <PlayerTitle
          :role="player.role"
          :profileIcon="player.accounts.at(0)?.profileIcon"
        >
          {{ route.params.player }}
        </PlayerTitle>
        <CommonSection class="hidden md:flex h-full flex-col gap-2 rounded-lg">
          <h2 class="text-center font-semibold">CalibrumML</h2>
          <div v-if="route.params.player==='Jiah'" class="text-center">
            D1 soon 🐶
          </div>
          <div v-else
            class="flex gap-1 items-center justify-center"
            title="prediction in the hour to come."
          >
            <p>{{ Math.round(prediction) }}LP</p>
            <Icon
              v-if="prediction < 0"
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
                  selectedAccount = accountIndex;
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
