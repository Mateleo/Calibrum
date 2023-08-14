import { getPlayers, getPlayersWithLive } from "~/server/utils/players/players"

export default cachedEventHandler(
  async _event => {
    const players = await getPlayersWithLive()
    return players.sort((a, b) => (b.Account[0].LPC ?? 0) - (a.Account[0].LPC ?? 0))
  },
  { maxAge: 2*60, swr: false }
)
