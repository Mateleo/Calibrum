<script setup lang="ts">
import { type LpUpdate } from "@prisma/client"
import dayjs from "dayjs"

interface Props {
  lpUpdate?: Omit<LpUpdate, "id" | "accountId" | "lastUpdateDiff" | "isDodge" | "LPC">
  title?: string
  wins?: number
  losses?: number
  player?: string
}

const props = withDefaults(defineProps<Props>(), {
  lpUpdate: () => ({
    date: new Date(),
    LP: 1,
    LPC: 1,
    lastUpdateDiff: 1,
    rank: "IV",
    tier: "IRON"
  }),
  title: "Rank",
  wins: 0,
  losses: 0
})

const { title, losses, wins, lpUpdate, player } = toRefs(props)
const winRate = computed(() => {
  const games = wins.value + losses.value
  return games === 0 ? 0 : Math.round((wins.value / games) * 1000) / 10
})
</script>
<template>
  <div>
    <CommonTitleSection :title="title" :padding="false" :player="player">
      <div class="h-[105px] overflow-hidden">
        <Transition name="fade">
          <div class="flex items-center justify-between" :key="lpUpdate.date.toString()">
            <NuxtImg
              :src="`img/new_emblems/${lpUpdate.tier.toLocaleLowerCase() ?? 'iron'}.png`"
              sizes="160px"
              quality="70"
              format="webp"
              class="h-[112px] w-[155px] object-cover opacity-70"
              :alt="`${lpUpdate.tier} rank emblem`"
            ></NuxtImg>
            <div class="flex w-[140px] flex-col justify-center p-4 text-right text-sm leading-4">
              <p class="font-semibold">{{ lpUpdate.rank }} {{ lpUpdate.tier }}</p>
              <p class="font-semibold">{{ lpUpdate.LP }} LP</p>
              <p>{{ wins }}/{{ losses }} ({{ winRate }}%)</p>
              <p class="text-white/70">{{ dayjs(lpUpdate.date).format("DD/MM") }}</p>
            </div>
          </div>
        </Transition>
      </div>
    </CommonTitleSection>
  </div>
</template>
<style scoped>
.fade-enter-active {
  transition: all 0.8s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
