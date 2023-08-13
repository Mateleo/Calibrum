<script lang="ts" setup></script>
<template>
  <div class="my-12 flex justify-evenly gap-12 px-12">
    <MainLadder class="h-min flex-grow" />
    <div class="flex flex-col gap-4">
      <LazyMainPlayersOfTheDay />
      <LazyMainLastGames />
    </div>
  </div>
</template>
