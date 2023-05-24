<script setup lang="ts">

const { pending, error, data: players } = await useLazyFetch('/api/leaderboard')

const AllTiers = ref([...new Set(players.value?.map(player => player.Account.at(0)?.tier))])

watch(players, (newPlayers) => {
    AllTiers.value = [...new Set(newPlayers?.map(player => player.Account.at(0)?.tier))]
})

</script>
<template>
    <div class="flex flex-col bg-[#22262b5a] rounded-lg p-2">
        <h2 class="font-semibold text-[#08bcd5] mb-2 text-xl">Ladder</h2>
        <div v-for="tier in AllTiers" :key="tier?.toString()">
            <div>
                <div class="flex rounded-lg p-2 justify-center" :class="tier">
                    <h2 class="font-semibold text-white/90">{{ tier }}</h2>
                </div>
                <div class="p-2 px-0 md:px-5 text-white/80">
                    <div v-for="(player) in players?.filter(player => player.Account[0].tier == tier)"
                        :key="player.discordId" class="flex flex-nowrap justify-between px-3 my-2">
                        <div class="flex items-center py-4">
                            <img class="w-[50px] mr-5 hidden sm:block rounded-lg" :src="player.Account[0].profileIcon"
                                alt="" />
                            <NuxtLink :to="`/player/${player.name}`"
                                class="font-semibold text-lg hover:text-cyan-400 transition-colors ease-in-out w-[170px]">
                                {{ player.name }}
                            </NuxtLink>
                        </div>
                        <div class="flex sm:justify-between justify-end max-w-[300px] grow items-center">
                            <img class="w-[32px] h-[32px] hidden sm:block" :src="`img/positions/${player.role}.svg`"
                                alt="" />
                            <div class="flex flex-col justify-center">
                                <img class="object-cover w-[90px] h-[50px] m-auto"
                                    :src="`img/emblems/Emblem_${player.Account[0].tier ?? 'IRON'}.png`" alt="" />
                                <p class="text-md font-semibold text-center leading-none">
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
    background: #7F00FF;
    background: -webkit-linear-gradient(to right, rgba(225, 0, 255, 0.3), rgba(127, 0, 255, 0.3));
    background: linear-gradient(to right, rgba(225, 0, 255, 0.3), rgba(127, 0, 255, 0.3));
}

.DIAMOND {
    background: #7F7FD5;
    background: -webkit-linear-gradient(to right, rgba(145, 234, 228, 0.3), rgba(134, 168, 231, 0.3), rgba(127, 127, 213, 0.3));
    background: linear-gradient(to right, rgba(145, 234, 228, 0.3), rgba(134, 168, 231, 0.3), rgba(127, 127, 213, 0.3));
}

.PLATINUM {
    background: #348F50;
    background: -webkit-linear-gradient(to right, rgba(86, 180, 211, 0.3), rgba(52, 143, 80, 0.3));
    background: linear-gradient(to right, rgba(86, 180, 211, 0.3), rgba(52, 143, 80, 0.3));
}

.GOLD {
    background: #348F50;
    background: -webkit-linear-gradient(to right, rgba(86, 180, 211, 0.3), rgba(52, 143, 80, 0.3));
    background: linear-gradient(to right, rgba(86, 180, 211, 0.3), rgba(52, 143, 80, 0.3));
}

.SILVER {
    background: #BBD2C5;
    background: -webkit-linear-gradient(to right, rgba(83, 105, 118, 0.3), rgba(187, 210, 197, 0.3));
    background: linear-gradient(to right, rgba(83, 105, 118, 0.3), rgba(187, 210, 197, 0.3));
}
</style>