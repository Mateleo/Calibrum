<script setup lang="ts">
import type { Rank, Tier } from "@prisma/client"
import dayjs from "dayjs"
import type { AccountWithLpUpdatesResponse, LpUpdateResponse } from "~/utils/types"

export interface AccountProps {
  account: AccountWithLpUpdatesResponse
  prediction?: number[]
}

function LPCtoObject(LPC: number) {
  let tier = ""
  let rank = ""

  if (LPC >= 2800) {
    tier = "MASTER"
    rank = "I"
    LPC -= 2800
  } else if (LPC >= 2400) {
    tier = "DIAMOND"
    LPC -= 2400
  } else if (LPC >= 2000) {
    tier = "EMERALD"
    LPC -= 2000
  } else if (LPC >= 1600) {
    tier = "PLATINUM"
    LPC -= 1600
  } else if (LPC >= 1200) {
    tier = "GOLD"
    LPC -= 1200
  } else if (LPC >= 800) {
    tier = "SILVER"
    LPC -= 800
  } else if (LPC >= 400) {
    tier = "BRONZE"
    LPC -= 400
  } else {
    tier = "IRON"
  }

  if (tier !== "MASTER") {
    if (LPC >= 300) {
      rank = "I"
      LPC -= 300
    } else if (LPC >= 200) {
      rank = "II"
      LPC -= 200
    } else if (LPC >= 100) {
      rank = "III"
      LPC -= 100
    } else {
      rank = "IV"
    }
  }

  return {
    tier: tier,
    rank: rank,
    LP: LPC
  }
}

const props = withDefaults(defineProps<AccountProps>(), {
  prediction: () => []
})
const { account } = toRefs(props)

const currentRankUpdate = computed(() => {
  const latestUpdate = account.value.lpUpdates.at(0)
  if (latestUpdate) return latestUpdate

  if (account.value.tier && account.value.rank) {
    return {
      date: new Date(),
      tier: account.value.tier,
      rank: account.value.rank,
      LP: account.value.LP ?? 0
    }
  }
})

const peakRankUpdate = computed(() => {
  const [firstUpdate, ...otherUpdates] = account.value.lpUpdates
  if (!firstUpdate) return currentRankUpdate.value

  return otherUpdates.reduce(
    (peakUpdate, currentUpdate) => (currentUpdate.LPC > peakUpdate.LPC ? currentUpdate : peakUpdate),
    firstUpdate
  )
})

const chartUpdates = computed<(LpUpdateResponse & { prediction: boolean })[]>(() => {
  const lpUpdates = [...account.value.lpUpdates].reverse().map((update) => ({ ...update, prediction: false }))
  const latestUpdate = lpUpdates.at(-1)

  if (!latestUpdate || lpUpdates.length <= 20) return lpUpdates

  const predictedUpdates = props.prediction.map((prediction, index) => {
    const predictedRank = LPCtoObject(prediction)

    return {
      ...latestUpdate,
      date: dayjs(latestUpdate.date)
        .add(index + 1, "day")
        .toDate(),
      tier: predictedRank.tier as Tier,
      rank: predictedRank.rank as Rank,
      LP: Math.floor(predictedRank.LP),
      LPC: prediction,
      lastUpdateDiff: 0,
      isDodge: null,
      championName: null,
      championId: null,
      matchId: null,
      kill: null,
      death: null,
      assist: null,
      prediction: true
    }
  })

  return [...lpUpdates, ...predictedUpdates]
})
</script>
<template>
  <div class="mt-4 flex flex-col gap-4">
    <div class="flex flex-col gap-8 md:flex-row">
      <div class="flex shrink-0 flex-col">
        <PlayerRank
          :lpUpdate="currentRankUpdate"
          :title="'Current Rank'"
          :wins="account.wins ?? 0"
          :losses="account.losses ?? 0"
          :player="account.name"
        />
        <PlayerRank
          :lpUpdate="peakRankUpdate"
          :title="'Peak Rank'"
          :wins="account.wins ?? 0"
          :losses="account.losses ?? 0"
          class="mt-8"
        />
      </div>
      <div class="flex w-full flex-col">
        <CommonTitleSection title="Rank History" class="h-[250px] md:h-full">
          <ClientOnly v-if="chartUpdates.length > 0">
            <LazyPlayerGraph :lp-updates="chartUpdates" />
          </ClientOnly>
          <p v-else class="flex h-full items-center justify-center text-sm text-white/40">No ranked history yet.</p>
        </CommonTitleSection>
      </div>
    </div>
    <div class="flex flex-col gap-8 md:flex-row">
      <CommonTitleSection title="Account Activity" class="size-full">
        <LazyHeatmap :key="props.account.id" :id="props.account.id"></LazyHeatmap>
      </CommonTitleSection>
    </div>
  </div>
</template>
