import dayjs from "dayjs"

export default defineEventHandler(async (event) => {
  const accountId = getRouterParam(event, "account")
  if (!accountId) {
    return []
  }
  const lpupdatesS142 = await prisma.lpUpdateS142.findMany({
    where: {
      account: {
        id: accountId
      }
    },
    select: {
      date: true
    }
  })
  const lpupdatesS141 = await prisma.lpUpdateS14.findMany({
    where: {
      account: {
        id: accountId
      }
    },
    select: {
      date: true
    }
  })
  const lpupdates = lpupdatesS142.concat(lpupdatesS141)
  if (lpupdates.length === 0 || !lpupdates[0].date) {
    return []
  }

  const startDate = dayjs().subtract(363, "day").startOf("day")
  const gamesByDate = new Map<string, number>()

  for (const update of lpupdates) {
    const date = dayjs(update.date).format("YYYY-MM-DD")
    gamesByDate.set(date, (gamesByDate.get(date) ?? 0) + 1)
  }

  const heatmap = []
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  for (let offset = 0; offset < 364; offset++) {
    const date = startDate.add(offset, "day")
    const iso = date.format("YYYY-MM-DD")
    heatmap.push({
      x: iso,
      y: dayNames[date.day()],
      d: iso,
      v: gamesByDate.get(iso) ?? 0
    })
  }
  return heatmap
})
