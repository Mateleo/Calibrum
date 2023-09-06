<script setup lang="ts">
import dayjs from "dayjs"
const {data:lastGames} = await useLazyFetch("/api/lastgames")



</script>


<template>
  <CommonInnerTitleSection title="Last Games">
    <div v-if="lastGames?.length === 0">
        No latest updates
    </div>
    <div
        v-else
        v-for="(game) in lastGames"
        class="border-b-2 border-gray-900 flex flex-nowrap justify-between px-3 my-2 items-center pb-2 last:border-b-0 last:pb-0"
      >
        <div>
          <NuxtLink :to="`/player/${game.player.name}`" class="font-semibold text-lg hover:text-cyan-400 transition-colors ease-in-out">{{
            game.name
          }}</NuxtLink>
          <p class="text-white/40 text-sm">
            ({{ dayjs(game.date).format("DD/MM à HH:mm") }})
          </p>
        </div>
        <div
          class="rounded-full py-1 w-[60px] text-center font-semibold text-sm shadow-sm shadow-green-900 transition-colors ease-in-out cursor-pointer"
          :class="
            game.lastUpdateDiff.toString()[0] != '-'
              ? [
                  'bg-green-500 shadow-green-900 hover:bg-green-800 hover:border-2 hover:border-green-500',
                ]
              : [
                  'bg-red-500 shadow-red-900 hover:bg-red-800 hover:border-2 hover:border-red-400',
                ]
          "
        >
          {{ ["", "+"][+(game.lastUpdateDiff > 0)] + game.lastUpdateDiff }} LP
        </div>
      </div>
  </CommonInnerTitleSection>
</template>
