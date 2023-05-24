<script setup lang="ts">
import { Account, Role } from "@prisma/client";

const data = await useFetch(
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"
);
console.log(data.data);

interface Props {
  account?: Pick<Account, "tier" | "rank">;
  role?: Role,
  name: string,
  champion: string
}

const props = withDefaults(defineProps<Props>(), {
  account: () => ({
    name: "Undefined",
    tier: "IRON",
    rank: "IV"
  }),
  role: "mid",
  name: "Undefined",
  champion: "Jhin"
});

const url = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${data.data.value.find(e => e.alias === props.champion).id ?? 'Jhin'}/${data.data.value.find(e => e.alias === props.champion).id ?? '202'}002.jpg`


</script>

<template>
  <div class="relative w-[600px] h-[300px] text-white">
    <NuxtImg :src="url" class="absolute -z-10 w-full blur-[1px]"></NuxtImg>
    <div class="relative w-[40%] flex flex-col items-center z-10 mt-4">
      <p class="font-semibold text-6xl sh">{{ props.name }}</p>
      <div class="flex flex-col items-center">
        <NuxtImg :src="`img/emblems/Emblem_${props.account.tier}.png`" class=" mt-2 w-[40%]"></NuxtImg>
      </div>
    </div>
  </div>
</template>
<style scoped>
.sh {
  text-shadow: 0px 4px 7px rgba(0, 0, 0, 0.8);
}
</style>
