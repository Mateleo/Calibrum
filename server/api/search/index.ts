import { getPlayersAlpha } from "~/server/utils/players/players"

export default defineEventHandler(async (event) => {
  return await getPlayersAlpha()
})
