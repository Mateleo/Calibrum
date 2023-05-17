import { getPlayers } from "~/server/utils/players/players";

export default defineEventHandler(async (event) => {
    const players = await getPlayers()

    return players
  });
  