import { getAccountsByPlayer } from "~/server/helpers/accounts/accounts"
import { getLpUpdateByAccount } from "~/server/helpers/lp_updates/lp_updates"
import { getPlayerByName } from "~/server/helpers/players/players"

export default defineEventHandler(async (event) => {
    const params = event.context.params

    if (!params) {
        throw createError({
            statusCode: 500,
            statusMessage: `params not found`
        })
    }

    const player = await getPlayerByName(params.player)

    if (!player) {
        throw createError({
            statusCode: 500,
            statusMessage: `player ${params.player} not found`
        })
    }

    const accounts = await getAccountsByPlayer(player.discordId)

    const accountsWithLpUpdates = await Promise.all(accounts.map(async (account) => {
        const lpUpdates = await getLpUpdateByAccount(account.id)
        return {
            ...account,
            lpUpdates: lpUpdates
        }
    }))

    return {
        ...player,
        accounts: accountsWithLpUpdates
    }
})