<script setup lang="ts">
const { pending, error, data: players } = await useLazyFetch("/api/leaderboard")

const AllTiers = ref([...new Set(players.value?.map(player => player.Account.at(0)?.tier))])

watch(players, newPlayers => {
  AllTiers.value = [...new Set(newPlayers?.map(player => player.Account.at(0)?.tier))]
})
</script>
<template>
  <div class="flex flex-col rounded-lg bg-[#22262b5a] p-2">
    <h2 class="mb-2 text-xl font-semibold text-[#08bcd5]">Ladder</h2>
    <div v-for="tier in AllTiers" :key="tier?.toString()">
      <div>
        <div class="flex justify-center rounded-lg p-2" :class="tier">
          <h2 class="font-semibold text-white/90">{{ tier }}</h2>
        </div>
        <div class="p-2 px-0 text-white/80 md:px-5">
          <div
            v-for="player in players?.filter(player => player.Account[0].tier == tier)"
            :key="player.discordId"
            class="my-2 flex flex-nowrap justify-between px-3"
          >
            <div class="flex items-center py-4">
              <img class="mr-5 hidden w-[50px] rounded-lg sm:block" :src="player.Account[0].profileIcon" alt="" />
              <LeaderboardPlayer :name="player.name"></LeaderboardPlayer>
            </div>
            <div class="flex max-w-[300px] grow items-center justify-end sm:justify-between">
              <img class="hidden h-[32px] w-[32px] sm:block" :src="`img/positions/${player.role}.svg`" alt="" />
              <div class="flex flex-col justify-center">
                <img
                  class="m-auto h-[50px] w-[90px] object-cover"
                  :src="`img/emblems/Emblem_${player.Account[0].tier ?? 'IRON'}.png`"
                  alt=""
                />
                <p class="text-md text-center font-semibold leading-none">
                  {{ player.Account[0].rank }} - {{ player.Account[0].LP }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.MASTER {
  background: #7f00ff;
  background: -webkit-linear-gradient(to right, rgba(225, 0, 255, 0.3), rgba(127, 0, 255, 0.3));
  background: linear-gradient(to right, rgba(225, 0, 255, 0.3), rgba(127, 0, 255, 0.3));
}

.DIAMOND {
  background: #7f7fd5;
  background: -webkit-linear-gradient(
    to right,
    rgba(145, 234, 228, 0.3),
    rgba(134, 168, 231, 0.3),
    rgba(127, 127, 213, 0.3)
  );
  background: linear-gradient(to right, rgba(145, 234, 228, 0.3), rgba(134, 168, 231, 0.3), rgba(127, 127, 213, 0.3));
}

.PLATINUM {
  background: #348f50;
  background: -webkit-linear-gradient(to right, rgba(86, 180, 211, 0.3), rgba(52, 143, 80, 0.3));
  background: linear-gradient(to right, rgba(86, 180, 211, 0.3), rgba(52, 143, 80, 0.3));
}

.GOLD {
background: #ffd700;
background: -webkit-linear-gradient(to right, rgba(255, 215, 0, 0.3), rgba(218, 165, 32, 0.3));
background: linear-gradient(to right, rgba(255, 215, 0, 0.3), rgba(218, 165, 32, 0.3));
}

.SILVER {
  background: #bbd2c5;
  background: -webkit-linear-gradient(to right, rgba(83, 105, 118, 0.3), rgba(187, 210, 197, 0.3));
  background: linear-gradient(to right, rgba(83, 105, 118, 0.3), rgba(187, 210, 197, 0.3));
}
</style>
