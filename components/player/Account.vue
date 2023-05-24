<script setup lang="ts">
import { AccountWithLpUpdatesResponse } from '~/utils/types';

export interface AccountProps {
    account: AccountWithLpUpdatesResponse
}

const props = defineProps<AccountProps>()
const { account } = toRefs(props)

</script>
<template>
    <div class="flex mt-4 gap-8">
        <div class="flex flex-col shrink-0">
            <PlayerRank :lpUpdate="account.lpUpdates.at(0)" :title="'Current Rank'" :wins="account.wins ?? 0"
                :losses="account.losses ?? 0" />
            <PlayerRank
                :lpUpdate="account.lpUpdates.reduce((peakEloUpdate, currentUpdate) => (currentUpdate.LPC > peakEloUpdate.LPC ? currentUpdate : peakEloUpdate))"
                :title="'Peak Rank'" :wins="account.wins ?? 0" :losses="account.losses ?? 0" class="mt-8" />
        </div>
        <div class="flex flex-col w-full">
            <CommonTitleSection title="Rank History" class="h-full">
                <LazyPlayerGraph :lp-updates="[...account.lpUpdates].reverse()" />
            </CommonTitleSection>
        </div>
    </div>
</template>