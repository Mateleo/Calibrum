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

  const now = new Date()
  const heatmap = []

  for (
    var d = new Date(new Date().setDate(new Date(lpupdates[0].date).getDate() - 363));
    d <= now;
    d.setDate(d.getDate() + 1)
  ) {
    const iso = d.toISOString().substring(0, 10)
    const dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][d.getDay()]
    heatmap.push({
      x: iso,
      y: dayOfWeek,
      d: iso,
      v: lpupdates.filter((e) => new Date(e.date).toDateString() === d.toDateString()).length
    })
  }
  return heatmap
})
