import { Prisma } from "@prisma/client"
import dayjs from "dayjs"

export function getLpUpdateById(id: string) {
  return prisma.lpUpdate.findUnique({
    where: {
      id: id
    }
  })
}

export function getLpUpdateByAccount(accountId: string) {
  return prisma.lpUpdate.findMany({
    where: {
      accountId: accountId
    },
    orderBy: {
      date: "desc"
    }
  })
}

export function getLpUpdateByAccountByDay(accountId: string, days: number) {
  return prisma.lpUpdate.findMany({
    where: {
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
  return prisma.lpUpdate.create({
    data: lpUpdate
  })
}

export function updateLpUpdate(lpUpdate: Prisma.LpUpdateUpdateInput) {
  return prisma.lpUpdate.update({
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
  return prisma.lpUpdate.findMany({
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
    if (arr[i] > side && (side < 0 ? arr[i] < 0 : "")) {
      // Positive value, increment current streak
      currentStreak++
    } else {
      // Zero value, reset streak
      break
    }
  }
  return { win: side == -1000000 ? 0 : 1, currentStreak: currentStreak }
}

export async function getGamesCountByAccountByDay(accountId: string, days: number) {
  return await prisma.account.findUnique({
    where: {
      id: accountId
    },
    include: {
      _count: true
    }
  })
}
