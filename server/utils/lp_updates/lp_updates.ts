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
  let currentStreak = 0
  //@ts-ignore
  let side = arr.at(-1) > 0 ? 0 : -1000000
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] > side && arr[i] != 0) {
      if (side != 0 && arr[i] < 0) {
        currentStreak++
      } else if (side == 0 && arr[i] > 0) {
        currentStreak++
      } else {
        break
      }
    } else {
      break
    }
  }
  return { win: side == -1000000 ? 0 : 1, currentStreak: currentStreak }
}

export async function getGamesCountByAccountByDay(accountId: string, days: number) {
  const last24hours = new Date().setHours(new Date().getHours() - 24)
  return await prisma.account.findUnique({
    where: {
      id: accountId
    },
    select: {
      _count: {
        select: {
          LpUpdate: {
            where: {
              date: {
                gte: dayjs().subtract(22, "hours").toDate(),
                lt: dayjs().add(2, "hours").toDate()
              }
            }
          }
        }
      }
    }
  })
}
