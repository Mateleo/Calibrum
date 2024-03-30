<script setup lang="ts">
import type { AccountWithLpUpdatesResponse } from "~/utils/types"

export interface AccountProps {
  account: AccountWithLpUpdatesResponse
}

const props = defineProps<AccountProps>()
const { account } = toRefs(props)
</script>
<template>
  <div class="mt-4 flex flex-col md:flex-row gap-8">
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
      <CommonTitleSection title="Rank History" class="md:h-full h-[250px]">
        <LazyPlayerGraph :lp-updates="[...account.lpUpdates].reverse()" />
      </CommonTitleSection>
    </div>
  </div>
</template>
