<script lang=ts setup>
import { LpUpdate } from '@prisma/client';
import dayjs from 'dayjs';
import { Line } from 'vue-chartjs'

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

interface Props {
    lpUpdates: LpUpdate[]
}

const props = defineProps<Props>()

</script>
<template>
    <ClientOnly>
        <div class="relative h-full w-full">
            <Line id="my-chart-id" :data="{
                datasets: [{
                    data: props.lpUpdates.map(e => e.LPC).reverse(),
                    borderColor: '#38bdf8',
                    borderWidth: 3,
                }],
                labels:
                    props.lpUpdates.map(e => dayjs(e.date).format('DD/MM')).reverse()

            }" :options="{
    plugins: {
        legend: {
            display: false
        }
    },
    maintainAspectRatio: false
}" />
        </div>
    </ClientOnly>
</template>