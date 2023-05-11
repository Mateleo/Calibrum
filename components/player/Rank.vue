<script setup lang="ts">
interface props {
    rank: string
    tier: string
    LP: number
    LPC: number
    wins: number
    losses: number
    lastUpdated: string
}

const props = withDefaults(
    defineProps<{ rank: props, title: string }>(),
    {
        rank: {
            //@ts-ignore
            rank: "Challenger",
            tier: "IV",
            LP: 0,
            LPC: 0,
            wins: 0,
            losses: 0,
            lastUpdated: "0/0"
        },
        title: "Title Rank"
    }
)

const { rank, tier, LP, LPC, wins, losses, lastUpdated } = toRefs(props.rank)
const { title } = toRefs(props)


const image = `emblems/Emblem_${tier.value}.png`

</script>
<template>
    <div>
        <CommonTitleSection :title="title" :padding="false">
            <div class="flex justify-between items-center">
                <NuxtImg :src="image" class="object-cover w-[155px] h-[95px] opacity-60"></NuxtImg>
                <div class="text-sm text-right p-4 leading-4 flex flex-col justify-center">
                    <p class="font-semibold">{{ rank }} {{ tier }}</p>
                    <p class="font-semibold">{{ LP }} LP</p>
                    <p>{{ wins }}/{{ losses }} ({{ Math.floor(wins/(losses+wins)*1000)/10}}%)</p>
                    <p class="text-white/70">{{ lastUpdated }}</p>
                </div>
            </div>
        </CommonTitleSection>
    </div>
</template>