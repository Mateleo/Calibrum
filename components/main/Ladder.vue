<script setup lang="ts">

const { pending, error, data: players } = await useLazyFetch('/api/leaderboard')

</script>
<template>
    <CommonInnerTitleSection title="Ladder">
        <div class="p-2 px-0 md:px-5">
            <div v-for="(player, index) in players" :key="player.discordId"
                class="border-b-2 border-gray-900 flex flex-nowrap justify-between px-3 my-2"
                :class="index == players?.length ?? 0 - 1 ? ['border-b-0'] : ''">
                <div class="flex items-center py-4">
                    <img class="w-[50px] mr-5 hidden sm:block rounded-lg" :src="player.Account[0].profileIcon" alt="" />
                    <NuxtLink :to="`/player/${player.name}`"
                        class="font-semibold text-lg hover:text-cyan-400 transition-colors ease-in-out w-[170px]">
                        {{ player.name }}
                    </NuxtLink>
                </div>
                <div class="flex sm:justify-between justify-end max-w-[300px] grow items-center">
                    <img class="w-[32px] h-[32px] hidden sm:block" :src="`img/positions/${player.role}.svg`" alt="" />
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
    </CommonInnerTitleSection>
</template>