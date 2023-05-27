<script setup lang="ts">
import { Account, Role } from "@prisma/client"

const data = await useFetch(
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"
)

interface Props {
  account?: Pick<Account, "tier" | "rank" | "profileIcon" | "sumonerLvl">
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
    sumonerLvl: 30
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
  <div class="relative z-20 h-[300px] w-[600px] bg-black text-white">
    <NuxtImg :src="url" class="absolute -z-10 w-full opacity-80 blur-[1px]"></NuxtImg>
    <div class="grid h-full w-full grid-cols-2 gap-10">
      <div class="flex flex-col items-center justify-center">
        <PlayerProfileIcon :profile-icon="props.account.profileIcon" class="border-2 border-sky-600">
          <template #left>
            <NuxtImg :src="`img/positions/${props.role}.svg`" class="w-[50%]" />
          </template>
          <template #right>
            {{ props.account.sumonerLvl }}
          </template>
        </PlayerProfileIcon>
      </div>
    </div>
  </div>
</template>
