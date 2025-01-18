import { getPlayersOfTheDay } from "~/server/utils/players/players"

export default defineEventHandler(async (_event) => {
  return { ...(await getPlayersOfTheDay()) }
})
