import { Prisma, Season } from "@prisma/client"
import dayjs from "dayjs"

export function getLpUpdateById(id: string) {
  return prisma.lpUpdateS142.findUnique({
    where: {
      season: useRuntimeConfig().CURRENT_SEASON as Season,
      id: id
    }
  })
}

export function getLpUpdateByAccount(accountId: string) {
  return prisma.lpUpdateS142.findMany({
    where: {
      season: useRuntimeConfig().CURRENT_SEASON as Season,
      accountId: accountId
    },
    orderBy: {
      date: "desc"
    }
  })
}

export function getLpUpdateByAccountByDay(accountId: string, days: number) {
  return prisma.lpUpdateS142.findMany({
    where: {
      season: useRuntimeConfig().CURRENT_SEASON as Season,
      accountId: accountId,
      date: {
        gte: dayjs().subtract(days, "days").toDate()
      }
    },
    orderBy: {
      date: "desc"
    }
  })
}

export function createLpUpdate(lpUpdate: Prisma.LpUpdateCreateInput) {
  return prisma.lpUpdateS142.create({
    data: lpUpdate
  })
}

export function updateLpUpdate(lpUpdate: Prisma.LpUpdateUpdateInput) {
  return prisma.lpUpdateS142.update({
    where: {
      id: lpUpdate.id as string
    },
    data: lpUpdate
  })
}

export function isDodge(LPC: number, diff: number) {
  return [-5, -15].includes(diff) && LPC % 100 !== 0
}

export function getLastXUpdates(amount: number) {
  return prisma.lpUpdateS142.findMany({
    where: {
      season: useRuntimeConfig().CURRENT_SEASON as Season,
      lastUpdateDiff: {
        not: 0
      }
    },
    orderBy: {
      date: "desc"
    },
    take: amount
  })
}

export function computeStreak(arr: number[]) {
  const results = arr.filter((diff) => diff !== 0)
  const latestResult = results.at(-1)

  if (latestResult === undefined) {
    return { win: false, currentStreak: 0 }
  }

  const isWin = latestResult > 0
  let currentStreak = 0

  for (let index = results.length - 1; index >= 0; index--) {
    if (results[index] > 0 !== isWin) break
    currentStreak++
  }

  return { win: isWin, currentStreak }
}

export function getGamesCountByAccountByDay(accountId: string, days: number) {
  return prisma.lpUpdateS142.count({
    where: {
      accountId,
      season: useRuntimeConfig().CURRENT_SEASON as Season,
      date: {
        gte: dayjs().subtract(days, "day").toDate()
      },
      lastUpdateDiff: {
        not: 0
      },
      OR: [{ isDodge: false }, { isDodge: null }]
    }
  })
}
