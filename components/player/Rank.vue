<script setup lang="ts">
import { LpUpdate } from "@prisma/client"
import dayjs from "dayjs"

interface Props {
    lpUpdate?: Omit<LpUpdate, "id" | "accountId" | "lastUpdateDiff" | "isDodge" | "LPC">
    title?: string
    wins?: number
    losses?: number
}

const props = withDefaults(
    defineProps<Props>(),
    {
        lpUpdate: () => ({
            date: new Date(),
            LP: 1,
            LPC: 1,
            lastUpdateDiff: 1,
            rank: "IV",
            tier: "IRON"
        }),
        title: "123",
        wins: 1,
        losses: 1
    }
)

const { title, losses, wins, lpUpdate } = toRefs(props)

</script>
<template>
    <div>
        <CommonTitleSection :title="title" :padding="false">
            <div class="flex justify-between items-center">
                <NuxtImg :src="`img/emblems/Emblem_${lpUpdate.tier ?? 'IRON'}.png`" class="object-cover w-[155px] h-[95px] opacity-60"></NuxtImg>
                <div class="text-sm text-right p-4 leading-4 flex flex-col justify-center">
                    <p class="font-semibold">{{ lpUpdate.rank }} {{ lpUpdate.tier }}</p>
                    <p class="font-semibold">{{ lpUpdate.LP }} LP</p>
                    <p>{{ wins }}/{{ losses }} ({{ Math.floor(wins / (losses + wins) * 1000) / 10 }}%)</p>
                    <p class="text-white/70">{{ dayjs(lpUpdate.date).format("DD/MM") }}</p>
                </div>
            </div>
        </CommonTitleSection>
    </div>
</template>