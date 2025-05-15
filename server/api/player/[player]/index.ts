import { Season, type Player } from "@prisma/client"

export default defineEventHandler(async (event) => {
  const params = event.context.params

  if (!params) {
    throw createError({
      statusCode: 500,
      statusMessage: `params not found`
    })
  }

  let player:
    | (Player & {
        isLive?: boolean
        mostPlayedChamp?: number
      })
    | null = await getPlayerByName(decodeURI(params.player))

  if (!player) {
    throw createError({
      statusCode: 500,
      statusMessage: `player ${params.player} not found`
    })
  }

  player.isLive = (await getPlayerLiveGame(player?.discordId)) ? true : false

  const accounts = await getAccountsByPlayer(player.discordId)
  // player.mostPlayedChamp = accounts.length>0 ? await getMostPlayedChampByAccount(accounts[0].puuid ?? "test", accounts[0].name) : undefined

  const accountsWithLpUpdates = await Promise.all(
    accounts.map(async (account) => {
      const lpUpdatesRaw = await prisma.lpUpdateS142.findMany({
          where: {
            season: useRuntimeConfig().CURRENT_SEASON as Season,
            accountId: account.id
          },
          orderBy: {
            date: "desc"
          },
          take: 20
        })
      console.log(account.name, lpUpdatesRaw.length)
      const lpUpdates = lpUpdatesRaw.map((lpupdate) => {
        const { id, accountId, ...lpupdateReponse } = lpupdate
        return lpupdateReponse
      })
      const { playerDiscordId, ...accountWithoutDiscordId } = account
      return {
        ...accountWithoutDiscordId,
        lpUpdates
      }
    })
  )

  const { discordId, ...playerWithoutDiscordId } = player

  return {
    ...playerWithoutDiscordId,
    accounts: accountsWithLpUpdates
  }
})
