import { getAccountsByPlayer } from "~/server/helpers/accounts/accounts"
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
        return { error: `player ${params.player} not found` }
    }

    var accounts = await getAccountsByPlayer(player.discordId)

    return {
        ...player,
        accounts: accounts
    }
})