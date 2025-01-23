<script lang="ts" setup>
import { Chart, registerables } from "chart.js"
import { MatrixController, MatrixElement } from "chartjs-chart-matrix"
import "chartjs-adapter-moment"
import { color } from "chart.js/helpers"

Chart.register(MatrixController, MatrixElement, ...registerables)

// Account name
interface Props {
  name: string
}

const props = defineProps<Props>()

const { data: heatmap } = useFetch(`/api/heatmap/${encodeURI(props.name)}`)

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

const data = {
  datasets: [
    {
      label: "My Matrix",
      data: heatmap.value,
      backgroundColor(c) {
        const value = c.dataset.data[c.dataIndex].v
        const alpha = Math.min(value / 5, 1)
        return value == 0 ? "rgba(0, 0, 0, 0.3)" : color("#08BCD5").alpha(alpha).rgbString()
      },
      borderColor(c) {
        const value = c.dataset.data[c.dataIndex].v
        const alpha = Math.min(value / 5, 1)
        return value == 0 ? "rgba(0, 0, 0, 0.1)" : color("#08BCD5").alpha(alpha).darken(0.3).rgbString()
      },
      borderWidth: 1,
      width(c) {
        const a = c.chart.chartArea || {}
        const cellSize = (a.right - a.left) / 53 // 53 weeks in a year
        const padding = 4 // Adjust padding as needed
        return cellSize - padding
      },
      height(c) {
        const a = c.chart.chartArea || {}
        const cellSize = (a.bottom - a.top) / 7 // 7 days in a week
        const padding = 4 // Adjust padding as needed
        return cellSize - padding
      }
    }
  ]
}

const scales = {
  y: {
    type: "category", // Change from "time" to "category"
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
      drawBorder: false,
      tickLength: 0
    }
  },
  x: {
    type: "time",
    position: "top",
    offset: true,
    time: {
      offsetAfterAutoskip: false,
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
      drawBorder: false,
      tickLength: 0
    }
  }
}

const options = {
  aspectRatio: 6.4,
  plugins: {
    legend: false,
    tooltip: {
      displayColors: false,
      callbacks: {
        title() {
          return ""
        },
        label(context) {
          const v = context.dataset.data[context.dataIndex]
          return v.v === 0
            ? `No game on ${formatDate(new Date(v.d))}.`
            : `${v.v} games on ${formatDate(new Date(v.d))}.`
        }
      }
    }
  },
  scales: scales,
  layout: {
    padding: {
      top: 0
    }
  }
}

const chartRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (chartRef.value) {
    new Chart(chartRef.value, {
      type: "matrix",
      data,
      options
    })
  }
})
</script>
<template>
  <div class="">
    <canvas ref="chartRef" id="chartRef" class=""></canvas>
  </div>
</template>
