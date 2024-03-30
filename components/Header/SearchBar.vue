<script lang="ts" setup>
import type { Account, Player } from "@prisma/client"
import Fuse from "fuse.js"

let search = ref("")
let results = ref<
  | (Player & {
      Account: Account[]
    })[]
>([])
const { pending, error, data: players } = await useFetch("/api/search")

const options = {
  includeScore: true,
  keys: ["name", "Account.name"]
}

function fuzzySearch() {
  const fuse = new Fuse(players.value ?? [], options)
  results.value = fuse.search(search.value).map(item => item.item)
}

</script>

<template>
  <div class="lg:col-span-4 flex flex-col items-center">
    <div
      class="w-full max-w-[500px] rounded-lg border-2 border-gray-600 p-2 focus-within:border-2 focus-within:border-sky-400 focus-within:shadow-lg focus-within:shadow-black/40 focus-within:outline-none"
      :class="results.length > 0 ? 'bg-[#22262b]/70 shadow-md shadow-black/60 backdrop-blur-[6px]' : ''"
    >
      <div class="flex items-center">
        <input
          @keyup.enter="results.length > 0 ? (navigateTo(`/player/${results.at(0)?.name}`), (search = '', results=[])) : ''"
          @focusout="search = '', results=[]"
          @input="fuzzySearch"
          v-model="search"
          placeholder="Search..."
          class="block w-full bg-[#22262b] text-lg font-semibold placeholder:text-base placeholder:font-normal focus:outline-none"
        />
        <Icon name="material-symbols:search" size="1.6em"></Icon>
      </div>
      <div v-if="players && results.length > 0" class="mt-2">
        <button
          @click="navigateTo(`/player/${player.name}`)"
          v-for="(player, index) in results.slice(0, 4)"
          class="flex w-full rounded-md p-1 focus-within:bg-white/5 hover:bg-white/5"
        >
          <div class="flex items-center py-2">
            <img class="mr-5 hidden w-[50px] rounded-lg sm:block" :src="player.Account[0].profileIcon" alt="" />
            <LeaderboardPlayer :name="player.name" :is-live="false"></LeaderboardPlayer>
          </div>
          <div class="flex max-w-[300px] grow items-center justify-end">
            <!-- <div class="flex flex-col justify-center">
              <img
                class="m-auto h-[50px] w-[90px] object-cover"
                :src="`img/new_emblems/${player.Account[0].tier ?? 'IRON'}.png`"
                alt=""
              />
              <p class="text-md text-center font-semibold leading-none">
                {{ player.Account[0].rank }} - {{ player.Account[0].LP }}
              </p>
            </div> -->
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
