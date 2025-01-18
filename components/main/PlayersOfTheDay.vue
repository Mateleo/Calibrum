<script setup lang="ts">
const { data: players } = await useLazyFetch("/api/potd")
</script>
<template>
  <CommonInnerTitleSection title="Players of the day" class="">
    <div class="flex justify-evenly font-semibold">
      <div class="flex flex-col items-center justify-center gap-2 text-center">
        <NuxtLink :to="`/player/${players?.bestPlayer.player}`" class="transition-all ease-in hover:text-sky-500">{{
          players?.bestPlayer.player
        }}</NuxtLink>
        <img class="w-[70px] rounded-lg" :src="players?.bestPlayer.profileIcon" />
        <div
          class="w-[60px] cursor-pointer rounded-full py-1 text-center text-sm font-semibold shadow-sm shadow-green-900 transition-colors ease-in-out"
          :class="
            players?.bestPlayer.gains.toString()[0] != '-'
              ? ['border-2 border-transparent bg-green-500 shadow-green-900 hover:border-green-500 hover:bg-green-800']
              : ['border-2 border-transparent bg-red-500 shadow-red-900 hover:border-red-400 hover:bg-red-800']
          "
        >
          +{{ players?.bestPlayer.gains }} LP
        </div>
      </div>
      <div class="flex flex-col items-center justify-center gap-2 text-center">
        <NuxtLink :to="`/player/${players?.worstPlayer.player}`" class="transition-all ease-in hover:text-sky-500">{{
          players?.worstPlayer.player
        }}</NuxtLink>
        <img class="w-[70px] rounded-lg" :src="players?.worstPlayer.profileIcon" />
        <div
          class="w-[60px] cursor-pointer rounded-full py-1 text-center text-sm font-semibold shadow-sm shadow-green-900 transition-colors ease-in-out"
          :class="
            players?.worstPlayer.gains.toString()[0] != '-'
              ? ['border-2 border-transparent bg-green-500 shadow-green-900 hover:border-green-500 hover:bg-green-800']
              : ['border-2 border-transparent bg-red-500 shadow-red-900 hover:border-red-400 hover:bg-red-800']
          "
        >
          {{ players?.worstPlayer.gains }} LP
        </div>
      </div>
    </div>
  </CommonInnerTitleSection>
</template>
