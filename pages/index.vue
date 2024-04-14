<script lang="ts" setup></script>
<template>
  <div class="flex flex-col max-w-[1500px] m-auto w-[98%] sm:w-[95%]">
    <LazyMainModal class=""></LazyMainModal>
    <div class="flex flex-col md:flex-row gap-4 md:gap-12 mt-12">
    <MainLadder class="h-min grow" />
    <div class="flex flex-col gap-4 md:w-[40%]">
      <LazyMainPlayersOfTheDay/>
      <LazyMainLastGames />
      <LazyMainPredictions />
    </div>
  </div></div>
</template>
