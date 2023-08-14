import { getPlayersAlpha } from "~/server/utils/players/players"

export default defineEventHandler(event => {
  return getPlayersAlpha()
})
