<script lang="ts" setup>
import dayjs from "dayjs";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  scales,
} from "chart.js";
import { type LpUpdateResponse } from "~/utils/types";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement);

interface Props {
  lpUpdates: (LpUpdateResponse & { prediction: boolean })[];
  prediction: number[];
}

const props = defineProps<Props>();

function LPCtoString(LPC: number) {
  let rank = "";
  let tier = "";
  if (LPC > 2800) {
    tier = "MASTER";
    rank = "I";
    LPC -= 2800;
    return `${LPC}LP`;
  } else if (LPC >= 2400) {
    tier = "DIAMOND";
    LPC -= 2400;
  } else if (LPC > 2000) {
    tier = "EMERALD";
    LPC -= 2000;
  } else if (LPC >= 1600) {
    tier = "PLATINUM";
    LPC -= 1600;
  } else if (LPC >= 1200) {
    tier = "GOLD";
    LPC -= 1200;
  } else if (LPC >= 800) {
    tier = "SILVER";
    LPC -= 800;
  } else if (LPC >= 400) {
    tier = "BRONZE";
    LPC -= 400;
  } else {
    tier = "IRON";
  }
  if (LPC > 300) {
    rank = "1";
    LPC -= 300;
  } else if (LPC > 200) {
    rank = "2";
    LPC -= 200;
  } else if (LPC > 100) {
    rank = "3";
    LPC -= 100;
  } else {
    rank = "4";
  }
  return `${tier.charAt(0)}${rank} ${LPC}LP`;
}
</script>
<template>
  <ClientOnly>
    <div class="relative h-full w-full">
      <Line
        id="my-chart-id"
        :data="{
          datasets: [
            {
              data: props.lpUpdates.map((e) => e.LPC),
              borderColor: props.lpUpdates.map((e) => (e.prediction ? '#ff8000' : '#38bdf8')),
              backgroundColor: props.lpUpdates.map((e) => (e.prediction ? '#ff8000' : '#38bdf8')),
              segment: { borderColor: (ctx) => (props.lpUpdates[ctx.p0DataIndex].prediction ? '#ff8000' : undefined) },
              borderWidth: 3,
            },
          ],
          labels: props.lpUpdates.map((e) => dayjs(e.date).format('DD/MM')),
        }"
        :options="{
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              xAlign: 'center',
              yAlign: 'bottom',
              displayColors: false,
              bodyAlign: 'center',
              titleAlign: 'center',
              titleFont: {
                family: 'Poppins',
              },
              bodyFont: {
                family: 'Poppins',
              },
              caretPadding: 8,
              callbacks: {
                title: (TooltipItem) => {
                  // PLEASE UPDATE
                  return `${props.lpUpdates.at(TooltipItem[0].dataIndex)?.tier.charAt(0)} ${
                    props.lpUpdates.at(TooltipItem[0].dataIndex)?.rank
                  }  ${props.lpUpdates.at(TooltipItem[0].dataIndex)?.LP}LP`;
                },
                label: (TooltipItem) => {
                  return TooltipItem.label;
                },
              },
            },
          },
          maintainAspectRatio: false,
          scales: {
            y: {
              ticks: {
                callback: (value, index, ticks) => {
                  return LPCtoString(parseInt(value.toString()));
                },
                stepSize: 50,
              },
              suggestedMax:
                props.lpUpdates.reduce((peakEloUpdate, currentUpdate) =>
                  currentUpdate.LPC > peakEloUpdate.LPC ? currentUpdate : peakEloUpdate
                ).LPC + 15,
            },
          },
          layout: {
            padding: {
              top: 20,
            },
          },
        }"
      />
    </div>
  </ClientOnly>
</template>
