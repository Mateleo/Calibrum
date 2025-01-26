<script lang="ts" setup>
import { PlayerRank } from "#components"
import type { Account, Player } from "@prisma/client"
import Fuse from "fuse.js"

let search = ref("")
let results = ref<
  (Player & {
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
  results.value = fuse.search(search.value).map((item) => item.item)
}

const target = ref(null)
const target2 = ref(null)

const { x, y, isOutside } = useMouseInElement(target)
const { focused } = useFocus(target2)

function flush() {
  results.value = []
  search.value = ""
}

watch(focused, () => {
  if (isOutside.value && !focused.value) {
    flush()
  }
})

watch(isOutside, () => {
  if (isOutside.value && !focused.value) {
    flush()
  }
})
</script>

<template>
  <div class="relative flex justify-center lg:col-span-4">
    <div class="absolute flex h-full w-full flex-col justify-center">
      <div class="h-[42px]">
        <div
          ref="target"
          class="relative m-auto w-full max-w-[350px] rounded-lg border-2 border-gray-600 pr-2 focus-within:border-2 focus-within:border-sky-400 focus-within:shadow-lg focus-within:shadow-black/40 focus-within:outline-none"
          :class="results.length > 0 ? 'bg-[#22262b]/70 shadow-md shadow-black/60 backdrop-blur-[6px]' : ''"
        >
          <div class="flex items-center">
            <input
              ref="target2"
              @keyup.enter="results.length > 0 ? (navigateTo(`/player/${results.at(0)?.name}`), flush()) : ''"
              @input="fuzzySearch"
              v-model="search"
              placeholder="Search..."
              class="block w-full rounded-md bg-[#22262b] p-2 text-sm font-semibold placeholder:text-sm placeholder:font-normal focus:outline-none"
            />
            <Icon name="material-symbols:search" size="1.2em"></Icon>
          </div>
          <div v-if="players && results.length > 0" class="mt-2">
            <button
              @click="(navigateTo(`/player/${player.name}`), flush())"
              v-for="(player, index) in results.slice(0, 4)"
              class="flex w-full rounded-md p-1 focus-within:bg-white/5 hover:bg-white/5"
            >
              <div class="flex items-center p-2">
                <NuxtImg
                  sizes="50px"
                  quality="80"
                  format="webp"
                  class="mr-5 hidden w-[50px] rounded-lg sm:block"
                  :src="player.Account[0].profileIcon"
                  alt=""
                />
                <div>
                  {{ player.Account[0].name }}
                </div>
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
    </div>
  </div>
</template>
