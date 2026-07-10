<script lang="ts" setup>
import { Chart, registerables, type ChartData, type ChartOptions, type ScriptableContext } from "chart.js"
import { MatrixController, MatrixElement } from "chartjs-chart-matrix"
import "chartjs-adapter-moment"
import { color } from "chart.js/helpers"

Chart.register(MatrixController, MatrixElement, ...registerables)

// Account name
interface Props {
  id: string
}

const props = defineProps<Props>()

const { data: heatmap } = await useFetch(`/api/heatmap/${props.id}`)
const mostGamesInADay = computed(() => (heatmap.value ? Math.max(...heatmap.value.map((e) => e.v), 5) : 5))

interface HeatmapPoint {
  x: string
  y: string
  d: string
  v: number
}

const getHeatmapPoint = (context: ScriptableContext<"matrix">) => context.raw as HeatmapPoint

function formatDate(date: Date): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  const month = monthNames[date.getMonth()]
  const day = date.getDate()

  let daySuffix: string
  if (day % 10 === 1 && day !== 11) {
    daySuffix = "st"
  } else if (day % 10 === 2 && day !== 12) {
    daySuffix = "nd"
  } else if (day % 10 === 3 && day !== 13) {
    daySuffix = "rd"
  } else {
    daySuffix = "th"
  }

  return `${month} ${day}${daySuffix}`
}

// function generateDataModern(): { x: string; y: string; d: string; v: number }[] {
//   const data: { x: string; y: string; d: string; v: number }[] = []
//   const end = new Date()
//   end.setHours(0, 0, 0, 0)
//   let dt = new Date(new Date().setDate(end.getDate() - 365))

//   while (dt <= end) {
//     const iso = dt.toISOString().substr(0, 10)
//     const dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][dt.getDay()]
//     data.push({
//       x: iso,
//       y: dayOfWeek,
//       d: iso,
//       v: Math.floor(Math.random() * 16)
//     })
//     dt.setDate(dt.getDate() + 1)
//   }

//   return data
// }

const data: ChartData<"matrix", HeatmapPoint[]> = {
  datasets: [
    {
      label: "My Matrix",
      data: heatmap.value ?? [],
      backgroundColor(context) {
        const value = getHeatmapPoint(context).v
        const alpha = Math.min(value / mostGamesInADay.value, 1)
        return value == 0 ? "rgba(0, 0, 0, 0.3)" : color("#00fafa").alpha(alpha).rgbString()
      },
      borderColor(context) {
        const value = getHeatmapPoint(context).v
        const alpha = Math.min(value / mostGamesInADay.value, 1)
        return value == 0 ? "rgba(0, 0, 0, 0.1)" : color("#00fafa").alpha(alpha).darken(0.3).rgbString()
      },
      borderWidth: 1,
      width(context) {
        const chartArea = context.chart.chartArea
        if (!chartArea) return 0
        const cellSize = (chartArea.right - chartArea.left) / 53 // 53 weeks in a year
        const padding = 4 // Adjust padding as needed
        return cellSize - padding
      },
      height(context) {
        const chartArea = context.chart.chartArea
        if (!chartArea) return 0
        const cellSize = (chartArea.bottom - chartArea.top) / 7 // 7 days in a week
        const padding = 4 // Adjust padding as needed
        return cellSize - padding
      }
    }
  ]
}

const options: ChartOptions<"matrix"> = {
  aspectRatio: 6.4,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        title() {
          return ""
        },
        label(context) {
          const point = context.raw as HeatmapPoint
          return point.v === 0
            ? `No game on ${formatDate(new Date(point.d))}.`
            : `${point.v} games on ${formatDate(new Date(point.d))}.`
        }
      }
    }
  },
  scales: {
    y: {
      type: "category",
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      position: "left",
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        padding: 4,
        font: {
          size: 12
        }
      },
      reverse: false,
      offset: true,
      grid: {
        display: false,
        tickLength: 0
      }
    },
    x: {
      type: "time",
      position: "top",
      offset: true,
      time: {
        unit: "week",
        round: "week",
        isoWeekday: false,
        displayFormats: {
          week: "MMMM"
        }
      },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        padding: 4,
        font: {
          size: 12
        }
      },
      grid: {
        display: false,
        tickLength: 0
      }
    }
  },
  layout: {
    padding: {
      top: 0
    }
  }
}

const chartRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (chartRef.value) {
    new Chart<"matrix", HeatmapPoint[]>(chartRef.value, {
      type: "matrix",
      data,
      options
    })
  }
})
</script>
<template>
  <div v-if="heatmap && heatmap.length > 0">
    <canvas ref="chartRef" id="chartRef" class=""></canvas>
  </div>
  <div v-else>Oops there is an issue with this chart :(</div>
</template>
