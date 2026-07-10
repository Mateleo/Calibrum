import { Season } from "@prisma/client"
import { computeStreak, getGamesCountByAccountByDay } from "~/server/utils/lp_updates/lp_updates"

export default defineEventHandler(async (event) => {
  const accountId = getRouterParam(event, "accountId")
  if (!accountId) return []

  const currentSeason = useRuntimeConfig().CURRENT_SEASON as Season
  const account = await prisma.account.findUnique({
    where: { id: accountId },
    select: { id: true }
  })
  if (!account) return []

  const [recentUpdates, gamesCount, isChallengerThisSeason] = await Promise.all([
    prisma.lpUpdateS142.findMany({
      where: {
        accountId,
        season: currentSeason,
        lastUpdateDiff: { not: 0 },
        OR: [{ isDodge: false }, { isDodge: null }]
      },
      orderBy: { date: "desc" },
      take: 20,
      select: { lastUpdateDiff: true }
    }),
    getGamesCountByAccountByDay(accountId, 1),
    prisma.lpUpdateS142.findFirst({
      where: {
        accountId,
        tier: "CHALLENGER",
        season: currentSeason
      },
      select: { id: true }
    })
  ])

  const badges: Array<{ icon: string; count: number; message: string }> = []
  const streak = computeStreak(recentUpdates.map((update) => update.lastUpdateDiff).reverse())

  if (streak.currentStreak >= 3 && streak.win) {
    badges.push({
      icon: "🔥",
      count: Math.floor(streak.currentStreak / 3),
      message: `A gagné ${streak.currentStreak} games d'affilées`
    })
  } else if (streak.currentStreak >= 3) {
    badges.push({
      icon: "😰",
      count: Math.floor(streak.currentStreak / 3),
      message: `A perdu ${streak.currentStreak} games d'affilées`
    })
  }

  if (gamesCount >= 6) {
    badges.push({
      icon: "🚿",
      count: Math.floor(gamesCount / 6),
      message: `A joué ${gamesCount} games dans les dernières 24 heures`
    })
  }

  if (isChallengerThisSeason) {
    badges.push({
      icon: "⚜️",
      count: 1,
      message: `Est passé Challenger cette saison, rien que ça !`
    })
  }

  return badges
})
