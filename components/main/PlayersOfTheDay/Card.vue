<script setup lang="ts">
const props = defineProps<{
  player: string
  gains: number
  profileIcon: string
  shortHisto: Array<{ lastUpdateDiff: number; date: string }>
  mode: "best" | "worst"
}>()

const wins = computed<number>(() => props.shortHisto.filter((game) => game.lastUpdateDiff > 0).length)
const losses = computed<number>(() => props.shortHisto.filter((game) => game.lastUpdateDiff < 0).length)
</script>
<template>
  <div class="flex flex-col items-center justify-center gap-4 text-center">
    <NuxtLink :to="`/player/${player}`" class="group flex items-center gap-4 text-[#d0d1d2]">
      <NuxtImg sizes="120px" quality="70" format="webp" class="size-[70px] rounded-lg" :src="profileIcon" />
      <div class="flex flex-col items-start gap-2">
        <p class="transition-all ease-in group-hover:text-sky-500">
          {{ player }}
        </p>
        <p class="text-sm">
          <span class="text-green-500"> {{ wins }}W </span>
          <span class="text-red-500">{{ losses }}L</span>
        </p>
      </div>
    </NuxtLink>
    <div class="flex items-center gap-4">
      <CommonLpBadge :amount="gains" />

      <!-- <div class="flex items-center">
        <div
          v-for="(game, index) in shortHisto"
          :key="`shorthisto-${index}-${mode}`"
          class="flex flex-col items-center"
          :class="game.lastUpdateDiff > 0 ? 'text-green-500' : 'text-red-500'"
        >
          <Icon :name="game.lastUpdateDiff > 0 ? 'lucide:check' : 'lucide:x'" size="24" />
          <p class="text-sm">
            {{ Math.abs(game.lastUpdateDiff) }}
          </p>
        </div>
      </div> -->
    </div>
  </div>
</template>
