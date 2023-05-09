import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export function getAccountByName(name: string) {
    return prisma.account.findFirst({
        where: {
            name: name
        }
    })
}

export function getAccountById(id: string) {
    return prisma.account.findUnique({
        where: {
            id: id
        }
    })
}

export function createAccount(account: Prisma.AccountCreateInput) {
    return prisma.account.create({
        data: account
    })
}