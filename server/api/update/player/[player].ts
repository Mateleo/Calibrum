import { fetchAccountData, getAccountsByPlayer } from "~/server/helpers/accounts/accounts"
import { getPlayerByName } from "~/server/helpers/players/players"

export default defineEventHandler(async (event) => {
    const params = event.context.params

    if (!params) {
        setResponseStatus(event, 500, "params not found")
        return { error: "parameters not found" }
    }

    const player = await getPlayerByName(params.player)

    if (!player) {
        setResponseStatus(event, 500, "player not found")
        return { error: "player not found" }
    }

    const accounts = await getAccountsByPlayer(player.discordId)

    if (!accounts) {
        setResponseStatus(event, 500, "accounts not found")
        return { error: `no account found for ${player.name}` }
    }

    for (const account of accounts) {
        await fetchAccountData(account.id)
    }

    return {
        response: `player ${params.player} accounts updated`,
        accounts: accounts.map(account => ({ name: account.name }))
    }
})