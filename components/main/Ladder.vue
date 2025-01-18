<script setup lang="ts">
const { pending, error, data: players } = await useLazyFetch("/api/leaderboard")

const { data: cutoff } = useLazyFetch("/api/cutoff")

const AllTiers = ref([...new Set(players.value?.map((player) => player.Account.at(0)?.tier))])

watch(players, (newPlayers) => {
  AllTiers.value = [...new Set(newPlayers?.map((player) => player.Account.at(0)?.tier))]
})
</script>
<template>
  <div class="flex flex-col rounded-lg bg-[#22262b5a] p-2">
    <div class="flex justify-between">
      <h2 class="mb-2 text-xl font-semibold text-[#08bcd5]">Ladder</h2>
      <div class="flex gap-8 font-semibold">
        <div class="flex gap-2">
          <img :src="`img/new_emblems/challenger.png`" class="h-8 w-8" />
          <span>{{ cutoff?.chall }} LP</span>
        </div>
        <div class="flex gap-2">
          <img :src="`img/new_emblems/grandmaster.png`" class="h-8 w-8" />
          <span>{{ cutoff?.gm }} LP</span>
        </div>
      </div>
    </div>
    <div v-for="tier in AllTiers" :key="tier?.toString()">
      <div>
        <div class="flex justify-center rounded-lg p-2" :class="tier ?? 'UNRANKED'">
          <h2 class="font-semibold text-white/90">{{ tier ?? "UNRANKED" }}</h2>
        </div>
        <div class="p-2 px-0 text-white/80 md:px-5">
          <div
            v-for="player in players?.filter((player) => player.Account[0].tier == tier)"
            :key="player.discordId"
            class="my-2 flex flex-nowrap justify-between px-3"
          >
            <div class="flex items-center py-4">
              <img class="mr-5 hidden w-[50px] rounded-lg sm:block" :src="player.Account[0].profileIcon" alt="" />
              <LeaderboardPlayer
                :name="player.name"
                :is-live="player.isLive"
                :main-account-id="player.Account[0].id"
                :unranked="player.Account.at(0)?.rank == null ? true : false"
              ></LeaderboardPlayer>
            </div>
            <div class="flex max-w-[300px] grow items-center justify-end sm:justify-between">
              <img class="hidden h-[32px] w-[32px] sm:block" :src="`img/positions/${player.role}.svg`" alt="" />
              <div class="flex flex-col justify-center">
                <img
                  class="m-auto h-[50px] w-[90px] object-cover"
                  :src="`img/new_emblems/${player.Account[0].tier?.toLocaleLowerCase() ?? 'silver'}.png`"
                  alt=""
                />
                <p v-if="player.Account[0].rank" class="text-md text-center font-semibold leading-none">
                  {{ player.Account[0].rank }} - {{ player.Account[0].LP }}
                </p>
                <p v-else class="text-md text-center font-semibold leading-none">Unranked</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.GRANDMASTER {
  background: rgb(86, 17, 27);
  background: linear-gradient(90deg, rgba(86, 17, 27, 1) 0%, rgba(142, 62, 44, 1) 100%);
}
.MASTER {
  background: #7f00ff;
  background: -webkit-linear-gradient(to right, rgba(225, 0, 255, 0.3), rgba(127, 0, 255, 0.3));
  background: linear-gradient(to right, rgba(225, 0, 255, 0.3), rgba(127, 0, 255, 0.3));
}

.DIAMOND {
  background: #262e61;
  background: linear-gradient(to right, rgb(38, 46, 97), rgb(78, 121, 211, 0.8));
}

.EMERALD {
  background: #348f50;
  background: linear-gradient(to right, rgb(17, 61, 46), rgba(31, 100, 70));
}

.PLATINUM {
  background: #348f50;
  background: linear-gradient(to right, rgb(19, 59, 75), rgb(32, 109, 148, 0.8));
}

.GOLD {
  background: #ffd700;
  background: linear-gradient(to right, rgb(87, 59, 32), rgba(197, 141, 88, 0.7));
}

.SILVER {
  background: #bbd2c5;
  background: linear-gradient(to right, rgba(83, 105, 118, 0.3), rgb(84, 100, 110));
}

.BRONZE {
  background: #b87333; /* Solid Copper Color */
  background: linear-gradient(to right, rgba(183, 115, 51, 0.4), rgba(209, 109, 15, 0.603)); /* Gradient */
}

.UNRANKED {
  background: #bbd2c5;
  background: linear-gradient(to right, rgba(83, 105, 118, 0.3), rgb(84, 100, 110));
}
</style>
