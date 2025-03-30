<script setup lang="ts">
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
const { data: lastGames } = await useFetch("/api/lastgames")
dayjs.extend(relativeTime)
</script>

<template>
  <CommonInnerTitleSection title="Last Games">
    <div v-if="lastGames?.length === 0">No latest updates</div>
    <div
      v-else
      v-for="game in lastGames"
      class="my-2 flex flex-nowrap items-center justify-between border-b-2 border-gray-900 px-3 pb-2 last:border-b-0 last:pb-0"
    >
      <div class="flex items-center gap-4">
        <NuxtImg
          sizes="48px"
          quality="80"
          format="webp"
          v-if="game.championId"
          :src="`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${game.championId}.png`"
          class="size-12 rounded-lg"
        />
        <div>
          <NuxtLink
            :to="`/player/${game.player.name}`"
            class="text-lg font-semibold transition-colors ease-in-out hover:text-cyan-400"
            >{{ game.name }}</NuxtLink
          >
          <ClientOnly>
            <p class="text-sm text-white/40">
              {{ dayjs(game.date).fromNow() }}
            </p>
          </ClientOnly>
        </div>
      </div>
      <CommonLpBadge :amount="game.lastUpdateDiff" />
    </div>
  </CommonInnerTitleSection>
</template>
