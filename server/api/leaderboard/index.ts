import { Account, Player } from "@prisma/client";
import { getPlayers } from "~/server/utils/players/players";

export default defineEventHandler(async (event) => {
  const players = await getPlayers();

  return players.sort((a, b) => (b.Account[0].LPC ?? 0) - (a.Account[0].LPC ?? 0));
});
