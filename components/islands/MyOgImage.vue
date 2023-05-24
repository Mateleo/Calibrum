<script setup lang="ts">
import { Account, Role } from "@prisma/client"

const data = await useFetch(
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"
)

interface Props {
  account?: Pick<Account, "tier" | "rank" | "profileIcon">
  role?: Role
  name: string
  champion: string
}

const props = withDefaults(defineProps<Props>(), {
  account: () => ({
    name: "Undefined",
    tier: "IRON",
    rank: "IV",
    profileIcon: "jkfezifjze"
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
  <div class="relative z-20 h-[600px] w-[1200px] bg-black text-white">
    <NuxtImg :src="url" class="absolute -z-10 w-full opacity-80 blur-[1px]"></NuxtImg>
    <div class="relative z-10 mt-4 flex w-[30%] flex-col items-center">
      <p class="sh z-10 text-6xl font-semibold">{{ props.name }}</p>
      <div class="flex flex-col items-center">
        <NuxtImg :src="`img/emblems/Emblem_${props.account.tier}.png`" class="mt-2 w-[40%]"></NuxtImg>
      </div>
    </div>
  </div>
</template>
<style scoped>
.sh {
  text-shadow: 0px 4px 7px rgba(0, 0, 0, 0.8);
}
</style>
