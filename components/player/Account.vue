<script setup lang="ts">
import type { Rank, Tier } from "@prisma/client"
import dayjs from "dayjs"
import type { AccountWithLpUpdatesResponse, LpUpdateResponse } from "~/utils/types"

export interface AccountProps {
  account: AccountWithLpUpdatesResponse
  prediction: number[]
}

function LPCtoObject(LPC: number) {
  let tier = ""
  let rank = ""

  if (LPC > 2800) {
    tier = "MASTER"
    rank = "I"
    LPC -= 2800
  } else if (LPC >= 2400) {
    tier = "DIAMOND"
    LPC -= 2400
  } else if (LPC > 2000) {
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
    if (LPC > 300) {
      rank = "I"
      LPC -= 300
    } else if (LPC > 200) {
      rank = "II"
      LPC -= 200
    } else if (LPC > 100) {
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

const props = defineProps<AccountProps>()
const { account } = toRefs(props)

const lastDate = account.value.lpUpdates.at(0)?.date

function updateWithPrediction() {
  const lpUpdates = computed(() => [...account.value.lpUpdates].reverse())
  if (lpUpdates.value.length > 20) {
    props.prediction.map((prediction, index) => {
      lpUpdates.value.push({
        ...lpUpdates.value.at(-1),
        //@ts-ignore
        prediction: true
      })
      lpUpdates.value.push({
        date: dayjs(lastDate)
          .add(index + 1, "day")
          .toDate(),
        tier: LPCtoObject(prediction).tier as Tier,
        rank: LPCtoObject(prediction).rank as Rank,
        LP: Math.floor(LPCtoObject(prediction).LP),
        LPC: prediction,
        lastUpdateDiff: 0,
        isDodge: null,
        //@ts-ignore
        prediction: true
      })
    })
  }
  let trimmedArray = lpUpdates.value
  // if (lpUpdates.value.length > 100) {
  //   trimmedArray = lpUpdates.value.slice(-100);
  // } else {
  //   trimmedArray = lpUpdates.value;
  // }
  return trimmedArray as (LpUpdateResponse & { prediction: boolean })[]
}
</script>
<template>
  <div class="mt-4 flex flex-col gap-8 md:flex-row">
    <div class="flex shrink-0 flex-col">
      <PlayerRank
        :lpUpdate="account.lpUpdates.at(0)"
        :title="'Current Rank'"
        :wins="account.wins ?? 0"
        :losses="account.losses ?? 0"
        :player="account.name"
      />
      <PlayerRank
        :lpUpdate="
          account.lpUpdates.reduce((peakEloUpdate, currentUpdate) =>
            currentUpdate.LPC > peakEloUpdate.LPC ? currentUpdate : peakEloUpdate
          )
        "
        :title="'Peak Rank'"
        :wins="account.wins ?? 0"
        :losses="account.losses ?? 0"
        class="mt-8"
      />
    </div>
    <div class="flex w-full flex-col">
      <CommonTitleSection title="Rank History" class="h-[250px] md:h-full">
        <ClientOnly>
          <LazyPlayerGraph :lp-updates="updateWithPrediction()" :prediction="props.prediction" />
        </ClientOnly>
      </CommonTitleSection>
    </div>
  </div>
</template>
