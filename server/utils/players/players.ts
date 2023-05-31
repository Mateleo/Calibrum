import { Prisma } from "@prisma/client"
import { RegisterBody } from "~/server/api/register/index.post"
import { get24hGains } from "../accounts/accounts"

export function getPlayers() {
  return prisma.player.findMany({
    where: {
      Account: {
        some: {}
      }
    },
    include: {
      Account: {
        orderBy: {
          LPC: "desc"
        },
        take: 1
      }
    }
  })
}

export function getPlayerByName(name: string) {
  return prisma.player.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive"
      }
    }
  })
}

export function getPlayerByDiscordId(discordId: string) {
  return prisma.player.findUnique({
    where: {
      discordId
    }
  })
}

export function createPlayer(player: Prisma.PlayerCreateInput) {
  return prisma.player.create({
    data: player
  })
}

export function updatePlayer(player: Prisma.PlayerUpdateInput) {
  return prisma.player.update({
    where: {
      discordId: player.discordId as string
    },
    data: player
  })
}

export async function registerOrUpdatePlayer(player: RegisterBody) {
  const { accounts, ...playerWithoutAccounts } = player
  let newPlayer

  if (await getPlayerByDiscordId(player.discordId)) {
    newPlayer = await updatePlayer(playerWithoutAccounts)
  } else {
    newPlayer = await createPlayer(playerWithoutAccounts)
  }

  return newPlayer
}

export async function getPlayerLiveGame(discordId: string) {
  const accounts = await getAccountsByPlayer(discordId)

  for (const account of accounts) {
    try {
      return await getLiveGameDataOrError(account.id)
    } catch (error) {
      continue
    }
  }
  throw createError({
    statusCode: 500,
    statusMessage: `player ${discordId} has no accounts in game`
  })
}

export async function getPlayersOfTheDay() {
  const accounts = await getAccounts()

  const accountsGain = await Promise.all(
    accounts.map(async account => ({
      gains: await get24hGains(account.id),
      account: account.name,
      profileIcon: account.profileIcon
    }))
  )

  return {
    bestPlayer: accountsGain.reduce((prev, current) => (prev.gains > current.gains ? prev : current)),
    worstPlayer: accountsGain.reduce((prev, current) => (prev.gains < current.gains ? prev : current))
  }
}
