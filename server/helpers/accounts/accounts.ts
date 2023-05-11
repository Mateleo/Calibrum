import { Prisma, Rank, Tier } from "@prisma/client";
import { prisma } from "../prisma";
import { fetchAccountByName, fetchRankedInfo } from "../riot_connector/riot_connector";
import { createLpUpdate } from "../lp_updates/lp_updates";

// Low level functions

export function getAccountByName(name: string) {
    return prisma.account.findFirst({
        where: {
            name: {
                equals: name,
                mode: "insensitive"
            },
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

export function getAccountsByPlayer(discordId: string) {
    return prisma.account.findMany({
        where: {
            playerDiscordId: discordId
        },
        orderBy: {
            LPC: "desc"
        }
    })
}

export function getAccounts() {
    return prisma.account.findMany()
}

export function createAccount(account: Prisma.AccountCreateInput) {
    return prisma.account.create({
        data: account
    })
}

export function updateAccount(account: Prisma.AccountUpdateInput) {
    return prisma.account.update({
        where: {
            id: account.id as string
        },
        data: account
    })
}


// High level functions

export async function registerAccount(name: string, discordId: string) {
    if (await getAccountByName(name)) return

    const accountData = (await fetchAccountByName(name)).data

    return createAccount({
        id: accountData.id,
        name: accountData.name,
        profileIcon: getProfileIconUrl(accountData.profileIconId),
        sumonerLvl: accountData.summonerLevel,
        player: {
            connect: {
                discordId: discordId
            }
        }
    })
}

export async function fetchAccountData(accountId: string) {
    const rankedInfo = (await fetchRankedInfo(accountId)).data.filter(league => league.queueType === "RANKED_SOLO_5x5").at(0)

    if (!rankedInfo) return

    const newAccountData = (await fetchAccountByName(rankedInfo?.summonerName)).data

    const oldLPC = (await getAccountById(accountId))?.LPC ?? 0
    const newLPC = getLPC(rankedInfo.tier, rankedInfo.rank, rankedInfo.leaguePoints)

    if (newLPC !== 0 && oldLPC !== newLPC) {
        await createLpUpdate({
            LP: newLPC,
            date: new Date().toISOString(),
            account: {
                connect: {
                    id: accountId
                }
            }
        })
    }

    return updateAccount({
        id: accountId,
        name: rankedInfo.summonerName,
        profileIcon: getProfileIconUrl(newAccountData.profileIconId),
        sumonerLvl: newAccountData.summonerLevel,
        wins: rankedInfo.wins,
        losses: rankedInfo.losses,
        tier: rankedInfo.tier,
        rank: rankedInfo.rank,
        LP: rankedInfo.leaguePoints,
        LPC: newLPC
    })
}


// Utils

function getProfileIconUrl(profileIconId: number) {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${profileIconId}.jpg`
}


function getLPC(tier: Tier, rank: Rank, LP: number) {
    if (tier === Tier.MASTER || tier === Tier.GRANDMASTER || tier === Tier.CHALLENGER) {
        return TierLPC[tier] + LP
    } else {
        return TierLPC[tier] + RankLPC[rank] + LP
    }
}

enum TierLPC {
    IRON = 0,
    BRONZE = 400,
    SILVER = 800,
    GOLD = 1200,
    PLATINUM = 1600,
    DIAMOND = 2000,
    MASTER = 2400,
    GRANDMASTER = 2900,
    CHALLENGER = 3300
}

enum RankLPC {
    IV = 0,
    III = 100,
    II = 200,
    I = 300
}
