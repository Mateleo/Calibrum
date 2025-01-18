<script setup lang="ts">
import dayjs from "dayjs"
const { data: predictions } = await useLazyFetch("/api/predictions")

const filtered = computed(() => {
  if (predictions.value) {
    predictions.value.sort((a, b) => a.prediction - b.prediction)

    let bestObjects = predictions.value.slice(-4).reverse() // Get last 4 and reverse to have highest first
    let worstObjects = predictions.value.slice(0, 4) // Get first 4

    let combinedArray = [...bestObjects, ...worstObjects.reverse()]

    return combinedArray
  }
})
</script>

<template>
  <CommonInnerTitleSection title="Predictions (10 days)">
    <div v-if="predictions?.length === 0">No predictions</div>
    <div
      v-else
      v-for="account in filtered"
      class="flex flex-nowrap items-center justify-between border-b-2 border-gray-900 px-3 py-2 last:border-b-0 last:pb-0"
    >
      <div class="py-1">
        <NuxtLink
          :to="`/player/${account.player.name}`"
          class="text-lg font-semibold transition-colors ease-in-out hover:text-cyan-400"
          >{{ account.name }}</NuxtLink
        >
      </div>
      <div
        class="w-[60px] cursor-pointer rounded-full py-1 text-center text-sm font-semibold shadow-sm shadow-green-900 transition-colors ease-in-out"
        :class="
          account.prediction.toString()[0] != '-'
            ? ['bg-green-500 shadow-green-900 hover:border-2 hover:border-green-500 hover:bg-green-800']
            : ['bg-red-500 shadow-red-900 hover:border-2 hover:border-red-400 hover:bg-red-800']
        "
      >
        {{ ["", "+"][+(account.prediction > 0)] + account.prediction }} LP
      </div>
    </div>
  </CommonInnerTitleSection>
</template>
