import { computeStreak, getGamesCountByAccountByDay } from "~/server/utils/lp_updates/lp_updates"

export default defineEventHandler(async (event) => {
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
          date: "desc"
        },
        take: 10
      }
    }
  })
  if (!account) {
    return []
  }
  //check for winning streak
  const streak = computeStreak(account.LpUpdate.map((update) => update.lastUpdateDiff).reverse())
  if (streak.win) {
    badges.push({
      icon: "🔥",
      count: Math.floor(streak.currentStreak / 3),
      message: `A gagné ${streak.currentStreak} games d'affilées`
    })
  } else {
    badges.push({
      icon: "😰",
      count: Math.floor(streak.currentStreak / 3),
      message: `A perdu ${streak.currentStreak} games d'affilées`
    })
  }
  //check for shower badge
  const gamesCount = await getGamesCountByAccountByDay(account.id, 1)
  if (gamesCount?._count.LpUpdate) {
    badges.push({
      icon: "🚿",
      count: Math.floor(gamesCount?._count.LpUpdate / 6),
      message: `A joué ${gamesCount._count.LpUpdate} games dans la journée`
    })
  }

  const isChallengerThisSeason = await prisma.lpUpdateS142.findFirst({
    where: {
      accountId: event.context.params.accountId,
      tier: "CHALLENGER",
      season: "S15"
    }
  })

  if (isChallengerThisSeason) {
    badges.push({
      icon: "⚜️",
      count: 1,
      message: `Est passé Challenger cette saison, rien que ça !`
    })
  }

  return badges
})
