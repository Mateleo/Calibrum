import type { Account, LpUpdate, Player } from "@prisma/client"

export type PlayerWithAccountsReponse = PlayerResponse & {
  accounts: AccountWithLpUpdatesResponse[]
}

export type PlayerResponse = Omit<Player, "discordId"> & { isLive?: boolean; mostPlayedChamp?: boolean }

export type AccountReponse = Omit<Account, "playerDiscordId">

export type LpUpdateResponse = Omit<LpUpdate, "id" | "accountId">

export type AccountWithLpUpdatesResponse = AccountReponse & {
  lpUpdates: LpUpdateResponse[]
}
