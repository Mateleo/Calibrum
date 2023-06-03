<script setup lang="ts">
import { Account, Role } from "@prisma/client"

interface Props {
  account?: Pick<Account, "tier" | "rank" | "profileIcon" | "sumonerLvl" | "LP">
  role?: Role
  name: string
  championId?: number
}

const props = withDefaults(defineProps<Props>(), {
  account: () => ({
    name: "Undefined",
    tier: "IRON",
    rank: "IV",
    profileIcon: "jkfezifjze",
    sumonerLvl: 30,
    LP: 50
  }),
  role: "mid",
  name: "Undefined",
  championId: 202
})

const url = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${props.championId}/${props.championId}002.jpg`
</script>

<template>
  <div class="relative z-20 h-[200px] w-[400px] bg-black text-white">
    <NuxtImg :src="url" class="absolute -z-10 w-full opacity-50 blur-[0.7px]"></NuxtImg>
    <div class="grid h-full w-full grid-cols-2 gap-8">
      <div class="flex flex-col items-center justify-center">
        <PlayerProfileIcon :profile-icon="props.account.profileIcon" class="bg mt-8">
          <template #left>
            <NuxtImg :src="`img/positions/${props.role}.svg`" class="w-[50%]" />
          </template>
          <template #right>
            <p class="text-sky-100">
            {{ props.account.sumonerLvl }}
          </p>
          </template>
        </PlayerProfileIcon>
        <h1 class="mt-2 text-white/90" :class="props.name.length < 8 ? 'text-3xl' : 'text-xl'">{{ props.name }}</h1>
      </div>
      <div class="flex flex-col items-center justify-center">
        <NuxtImg
          :src="`img/emblems/Emblem_${props.account.tier ?? 'IRON'}.png`"
          class="mt-4 h-[100px] shadow-sm"
        ></NuxtImg>
        <h2 class="text-xl text-white/80">{{ props.account.tier }} {{ props.account.rank }}</h2>
      </div>
    </div>
  </div>
</template>
