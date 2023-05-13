<script lang=ts setup>
import { LpUpdate } from '@prisma/client';
import dayjs from 'dayjs';
import { Bar } from 'vue-chartjs'

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

interface Props {
    lpUpdates: LpUpdate[]
}

const props = defineProps<Props>()

</script>
<template>
    <ClientOnly>
        <Bar id="my-chart-id" :data="{
            datasets: [{
                label: 'LP',
                data: props.lpUpdates.map(e => e.LPC)
            }],
            labels: [
                props.lpUpdates.map(e => dayjs(e.date).format('DD/MM'))
            ]
        }" />
    </ClientOnly>
</template>