import { Account, Player, Prisma } from "@prisma/client"
import { RegisterBody } from "~/server/api/register/index.post"
import { get24hGains, getLiveGameData } from "../accounts/accounts"
import shuffle from "../suffle"
import { getLastXUpdates } from "../lp_updates/lp_updates"

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

export async function getPlayersWithLive() {
  let players: (Player & {
    Account: Account[]
    isLive?: boolean
  })[] = await getPlayers()
  // Suffle to be sure that every players can be fetched
  players = shuffle(players)

  return Promise.all(
    players.map(async player => ({
      ...player,
      isLive: (await getPlayerLiveGame(player.discordId)) ? true : false
    }))
  )
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
  player.name = decodeURI(player.name)
  return prisma.player.create({
    data: player
  })
}

export function updatePlayer(player: Prisma.PlayerUpdateInput) {
  player.name = decodeURI(player.name as string)
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
    return await getLiveGameData(account.id)
  }
}

export async function getPlayersOfTheDay() {
  const accounts = await prisma.account.findMany({
    include: {
      player: {
        select: {
          name: true
        }
      }
    }
  })

  const accountsGain = await Promise.all(
    accounts.map(async account => ({
      gains: await get24hGains(account.id),
      player: account.player.name,
      profileIcon: account.profileIcon
    }))
  )

  return {
    bestPlayer: accountsGain.reduce((prev, current) => (prev.gains > current.gains ? prev : current)),
    worstPlayer: accountsGain.reduce((prev, current) => (prev.gains < current.gains ? prev : current))
  }
}

export async function getLast10Games() {
  const updates = await getLastXUpdates(10)
  return await Promise.all(
    updates.map(async update => {
      const { id, puuid, playerDiscordId, wins, losses, ...account } = await getAccountById(update.accountId)
      const { id: idUpdate, accountId, ...updateResponse } = update
      return {
        ...updateResponse,
        ...account
      }
    })
  )
}

export async function getPlayersAlpha() {
  return await prisma.player.findMany({
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
    },
    orderBy: {
      name: "asc"
    }
  })
}
