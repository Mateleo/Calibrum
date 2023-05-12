import { LpUpdate, Prisma } from "@prisma/client";
import { prisma } from "../prisma";

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

export function isDodge(lpUpdate: LpUpdate) {
    return true
}