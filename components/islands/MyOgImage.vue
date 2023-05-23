<script setup lang="ts">

const data = await useFetch("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json")
console.log(data.data)

</script>

<template>
  <div class="w-[1200px] h-[600px] flex gap-12 bg text-white bg-white p-6">
    <p class="font-semibold text-4xl">Mateleo</p>
  </div>
</template>
<style scoped>
.bg{
  background-image: url('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/202/202002.jpg');
  background-size: cover;
  background-position: center;
}

</style>