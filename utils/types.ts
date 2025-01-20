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
