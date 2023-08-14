<script lang="ts" setup></script>
<template>
  <div class="flex flex-col md:flex-row max-w-[1500px] m-auto mt-12 gap-4 md:gap-12 w-[98%] sm:w-[95%]">
    <MainLadder class="h-min grow" />
    <div class="flex flex-col gap-4 md:w-[40%]">
      <LazyMainPlayersOfTheDay/>
      <LazyMainLastGames />
    </div>
  </div>
</template>
