import type { Account, LpUpdate, LpUpdateS142, Player } from "@prisma/client"

export type PlayerWithAccountsReponse = PlayerResponse & {
  accounts: AccountWithLpUpdatesResponse[]
}

export type PlayerResponse = Omit<Player, "discordId"> & { isLive?: boolean; mostPlayedChamp?: boolean }

export type AccountReponse = Omit<Account, "playerDiscordId">

export type LpUpdateResponse = Omit<LpUpdateS142, "id" | "accountId">

export type AccountWithLpUpdatesResponse = AccountReponse & {
  lpUpdates: LpUpdateResponse[]
}

export type ChampionStatResponse = {
  championId: number
  championName: string
  games: number
  wins: number
  losses: number
  winrate: number
  avgKills: number
  avgDeaths: number
  avgAssists: number
  kda: number
  netLp: number
  avgLp: number
  lastPlayed: string
  form: ("W" | "L")[]
  community: { games: number; winrate: number; players: number } | null
}

export type ChampionPoolResponse = {
  totalGames: number
  wins: number
  losses: number
  winrate: number
  kda: number
  poolSize: number
  effectivePoolSize: number
  champions: ChampionStatResponse[]
}
