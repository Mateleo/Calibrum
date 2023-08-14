<script setup lang="ts">
const players = (await useFetch("/api/potd")).data
</script>

`
<template>
  <CommonInnerTitleSection title="Players of the day" class="">
    <div class="flex justify-evenly font-semibold">
      <div class="text-center flex flex-col items-center gap-3">
        {{ players?.worstPlayer.account === "Mateleo" ? "Matelow" : players?.worstPlayer.account }}
        <img class="w-20 rounded-full" :src="players?.worstPlayer.profileIcon" />
        <div class="px-2 bg-red-500 rounded-lg">
          - {{ players?.worstPlayer.gains.toString().substring(1) }}
        </div>
      </div>
      <div class="text-center flex flex-col items-center gap-3">
        {{ players?.bestPlayer.account }}
        <img class="w-20 rounded-full" :src="players?.bestPlayer.profileIcon" />
        <div class="px-2 bg-green-500 rounded-lg">
          + {{ players?.bestPlayer.gains }}
        </div>
      </div>
    </div>
  </CommonInnerTitleSection>
</template>
