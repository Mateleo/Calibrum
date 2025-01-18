<script lang="ts" setup></script>
<template>
  <div class="m-auto flex w-[98%] max-w-[1500px] flex-col sm:w-[95%]">
    <LazyMainModal class=""></LazyMainModal>
    <div class="mt-12 flex flex-col gap-4 md:flex-row md:gap-12">
      <MainLadder class="h-min grow" />
      <div class="flex flex-col gap-4 md:w-[40%]">
        <LazyMainPlayersOfTheDay />
        <LazyMainLastGames />
        <LazyMainPredictions />
      </div>
    </div>
  </div>
</template>
