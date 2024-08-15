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

const { data: cutoff } = useFetch("/api/cutoff");

interface Props {
  lpUpdates: (LpUpdateResponse & { prediction: boolean })[];
  prediction: number[];
}

const rankColors = {
  IRON: "#3f302c",
  BRONZE: "#471d12",
  SILVER: "#54646e",
  GOLD: "#c58d58",
  PLATINUM: "#206d94",
  EMERALD: "#1f6446",
  DIAMOND: "#4e79d3",
  MASTER: "#742fb9",
  GRANDMASTER: "#8a2030",
  CHALLENGER: "#54d4e6",
};

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
              data: props.lpUpdates
                .filter((e) => !e.prediction)
                .map((e) => e.LPC),
              borderColor: props.lpUpdates.map((e) => rankColors[e.tier]),
              backgroundColor: props.lpUpdates.map((e) => rankColors[e.tier]),
              segment: {
                backgroundColor: (ctx) =>
                  rankColors[props.lpUpdates[ctx.p0DataIndex].tier],
                borderColor: (ctx) =>
                  rankColors[props.lpUpdates[ctx.p0DataIndex].tier],
              },
              borderWidth: 3,
            },
            {
              data: props.lpUpdates.map((e) => (!e.prediction ? null : e.LPC)),
              borderColor: '#67e8f9CC',
              backgroundColor: '#67e8f9CC',
              segment: {
                backgroundColor: '#67e8f9CC',
                borderColor: '#67e8f9CC',
              },
              pointRadius: 0,
              borderWidth: 3,
              borderDash: [4, 4],
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
                  return `${props.lpUpdates
                    .at(TooltipItem[0].dataIndex)
                    ?.tier.charAt(0)} ${
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
                  currentUpdate.LPC > peakEloUpdate.LPC
                    ? currentUpdate
                    : peakEloUpdate
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
