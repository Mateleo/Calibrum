<script setup lang="ts">
import { Account, Role } from "@prisma/client";

defineOptions({
  inheritAttrs: false,
})

interface Props {
  account?: Pick<Account, "tier" | "rank" | "profileIcon" | "sumonerLvl" | "LP">;
  role?: Role;
  name: string;
  championId?: number;
}

const props = withDefaults(defineProps<Props>(), {
  account: () => ({
    name: "Undefined",
    tier: "IRON",
    rank: "IV",
    profileIcon: "jkfezifjze",
    sumonerLvl: 30,
    LP: 50,
  }),
  role: "mid",
  name: "Undefined",
  championId: 202,
});

const url = ref(
  `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${props.championId}/${props.championId}002.jpg`
);
</script>

<template>
  <div
    class="relative h-[315px] w-[600px] text-white"
    :style="[
      {
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    ]"
  >
    <div class="h-full w-full flex justify-center gap-28 backdrop-blur-[2px]">
      <div class="flex flex-col items-center justify-center">
        <PlayerProfileIcon :profile-icon="props.account.profileIcon" class="">
          <template #left>
            <NuxtImg :src="`img/positions/${props.role}.svg`" class="w-[50%]" />
          </template>
          <template #right>
            <p class="text-sky-100">
              {{ props.account.sumonerLvl }}
            </p>
          </template>
        </PlayerProfileIcon>
        <h1
          class="mt-2 text-white/90"
          :class="props.name.length < 8 ? 'text-3xl' : 'text-xl'"
        >
          {{ props.name }}
        </h1>
      </div>
      <div class="mb-6 flex flex-col items-center justify-center">
        <NuxtImg
          :src="`img/new_emblems/${
            props.account.tier?.toLocaleLowerCase() ?? 'iron'
          }.png`"
          class="h-[115px] shadow-sm"
        ></NuxtImg>
        <h2 class="mt-1 text-xl text-white">
          {{ props.account.tier }} {{ props.account.rank }}
        </h2>
      </div>
    </div>
  </div>
</template>
