<script setup lang="ts">
const { data: players } = await useLazyFetch("/api/potd")
</script>
<template>
  <CommonInnerTitleSection v-if="players" title="Players of the day">
    <div class="flex items-start justify-evenly font-semibold">
      <MainPlayersOfTheDayCard
        :player="players.bestPlayer.player"
        :gains="players.bestPlayer.gains"
        :profile-icon="players.bestPlayer.profileIcon"
        :short-histo="players.bestPlayer.shortHisto"
        mode="best"
      />
      <MainPlayersOfTheDayCard
        :player="players.worstPlayer.player"
        :gains="players.worstPlayer.gains"
        :profile-icon="players.worstPlayer.profileIcon"
        :short-histo="players.worstPlayer.shortHisto"
        mode="worst"
      />
    </div>
  </CommonInnerTitleSection>
</template>
