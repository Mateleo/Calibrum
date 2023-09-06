import { computeStreak, getGamesCountByAccountByDay } from "~/server/utils/lp_updates/lp_updates"

export default defineEventHandler(async event => {
  let badges = []
  if (!event.context.params?.accountId) {
    return []
  }
  const account = await prisma.account.findUnique({
    where: {
      id: event.context.params.accountId
    },
    include: {
      LpUpdate: {
        orderBy: {
          date: "asc"
        },
        take: 10
      }
    }
  })
  if (!account) {
    return []
  }
  //check for winning streak
  const streak = computeStreak(account.LpUpdate.map(update => update.lastUpdateDiff))
  if (streak.win) {
    badges.push({ icon: "🔥", count: Math.floor(streak.currentStreak / 3),message:`A gagné plus de ${Math.floor(streak.currentStreak / 3)*3} games d'affilées` })
  } else {
    badges.push({ icon: "😰", count: Math.floor(streak.currentStreak / 3),message:`A perdu plus de ${Math.floor(streak.currentStreak / 3)*3} games d'affilées` })
  }
  //check for shower badge
  const gamesCount = await getGamesCountByAccountByDay(account.id, 1)
  if (gamesCount?._count.LpUpdate) {
    badges.push({ icon: "🚿", count: Math.floor(gamesCount?._count.LpUpdate / 8),message:`A joué plus de ${Math.floor(gamesCount?._count.LpUpdate / 8)*8} games dans la journée`  })
  }
  return badges
})
