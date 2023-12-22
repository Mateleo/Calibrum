<script setup lang="ts">
const {data:players} = await useLazyFetch("/api/potd")
</script>
<template>
  <CommonInnerTitleSection title="Players of the day" class="">
    <div class="flex justify-evenly font-semibold">
      <div class="text-center flex flex-col items-center gap-2 justify-center">
        <NuxtLink :to="`/player/${players?.bestPlayer.player}`" class="hover:text-sky-500 transition-all ease-in">{{players?.bestPlayer.player}}</NuxtLink>
        <img class="w-[70px] rounded-lg" :src="players?.bestPlayer.profileIcon" />
        <div
          class="rounded-full py-1 w-[60px] text-center font-semibold text-sm shadow-sm shadow-green-900 transition-colors ease-in-out cursor-pointer"
          :class="
            players?.bestPlayer.gains.toString()[0] != '-'
              ? [
                  'bg-green-500 shadow-green-900 hover:bg-green-800 border-2 hover:border-green-500 border-transparent',
                ]
              : [
                  'bg-red-500 shadow-red-900 hover:bg-red-800 border-2 hover:border-red-400 border-transparent',
                ]
          "
        >
          +{{players?.bestPlayer.gains}} LP
        </div>
      </div>
      <div class="text-center flex flex-col items-center gap-2 justify-center">
        <NuxtLink :to="`/player/${players?.worstPlayer.player}`" class="hover:text-sky-500 transition-all ease-in">{{players?.worstPlayer.player}}</NuxtLink>
        <img class="w-[70px] rounded-lg" :src="players?.worstPlayer.profileIcon" />
        <div
          class="rounded-full py-1 w-[60px] text-center font-semibold text-sm shadow-sm shadow-green-900 transition-colors ease-in-out cursor-pointer"
          :class="
            players?.worstPlayer.gains.toString()[0] != '-'
              ? [
                  'bg-green-500 shadow-green-900 hover:bg-green-800 border-2 hover:border-green-500 border-transparent',
                ]
              : [
                  'bg-red-500 shadow-red-900 hover:bg-red-800 border-2 hover:border-red-400 border-transparent',
                ]
          "
        >
          {{players?.worstPlayer.gains}} LP
        </div>
      </div>
    </div>
  </CommonInnerTitleSection>
</template>
