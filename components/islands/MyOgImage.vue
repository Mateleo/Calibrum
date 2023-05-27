<script setup lang="ts">
import { Account, Role } from "@prisma/client"

const data = await useFetch(
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"
)

interface Props {
  account?: Pick<Account, "tier" | "rank" | "profileIcon" | "sumonerLvl" | "LP">
  role?: Role
  name: string
  champion: string
}

const props = withDefaults(defineProps<Props>(), {
  account: () => ({
    name: "Undefined",
    tier: "IRON",
    rank: "IV",
    profileIcon: "jkfezifjze",
    sumonerLvl: 30,
    LP:50
  }),
  role: "mid",
  name: "Undefined",
  champion: "Jhin"
})

const url = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${
  data.data.value.find(e => e.alias === props.champion).id ?? "Jhin"
}/${data.data.value.find(e => e.alias === props.champion).id ?? "202"}002.jpg`
</script>

<template>
  <div class="relative z-20 h-[200px] w-[400px] bg-black text-white">
    <NuxtImg :src="url" class="absolute -z-10 w-full opacity-60 blur-[0.7px]"></NuxtImg>
    <div class="grid h-full w-full grid-cols-2 gap-8">
      <div class="flex flex-col items-center justify-center">
        <PlayerProfileIcon :profile-icon="props.account.profileIcon" class="bg mt-8">
          <template #left>
            <NuxtImg :src="`img/positions/${props.role}.svg`" class="w-[50%]" />
          </template>
          <template #right>
            {{ props.account.sumonerLvl }}
          </template>
        </PlayerProfileIcon>
        <h1 class="mt-2 text-white/90"
        :class="props.name.length<8 ? 'text-3xl' : 'text-xl'"
        >{{ props.name }}</h1>
      </div>
      <div class="flex flex-col justify-center items-center">
        <NuxtImg
              :src="`img/emblems/Emblem_${props.account.tier ?? 'IRON'}.png`"
              class="h-[100px] mt-6 shadow-sm"
            ></NuxtImg>
            <h2 class="text-white/80 text-lg">{{ props.account.tier }} {{ props.account.rank }}</h2>
            <h3 class="text-white/80 text-base -mt-2">{{ props.account.LP }}</h3>
      </div>
    </div>
  </div>
</template>