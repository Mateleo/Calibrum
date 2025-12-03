<script setup lang="ts">
import { type Account, Role } from "@prisma/client"

defineOptions({
  inheritAttrs: false
})

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
  championId: 101
})

const url = ref(
  `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${props.championId}/${props.championId}002.jpg`
)
</script>

<template>
  <div
    class="relative h-[315px] w-[600px] text-white"
    :style="[
      {
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${url})`,
        backgroundSize: '600px 100%',
        backgroundRepeat: 'no-repeat'
      }
    ]"
  >
    <div class="flex h-full w-full justify-center">
      <div class="flex flex-col items-center justify-center">
        <h1 class="mt-2 text-white/90" :class="props.name.length < 8 ? 'text-3xl' : 'text-xl'">
          {{ props.name }}
        </h1>
      </div>
      <div class="mb-6 flex flex-col items-center justify-center">
        <img
          :src="`/img/new_emblems/${props.account.tier?.toLocaleLowerCase() ?? 'iron'}.png`"
          class="h-[100px] w-[100px] shadow-sm"
          :alt="`${props.account.tier ?? 'Iron'} rank emblem`"
        />
        <h2 class="mt-1 text-xl text-white">{{ props.account.tier }} {{ props.account.rank }}</h2>
      </div>
    </div>
  </div>
</template>
