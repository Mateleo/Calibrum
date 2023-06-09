import { Prisma } from "@prisma/client";
import { RegisterBody } from "~/server/api/register.post";

export function getPlayers() {
  return prisma.player.findMany({
    where: {
      Account: {
        some: {},
      },
    },
    include: {
      Account: {
        orderBy: {
          LPC: "desc",
        },
        take: 1,
      },
    },
  });
}

export function getPlayerByName(name: string) {
  return prisma.player.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });
}

export function getPlayerByDiscordId(discordId: string) {
  return prisma.player.findUnique({
    where: {
      discordId: discordId,
    },
  });
}

export function createPlayer(player: Prisma.PlayerCreateInput) {
  return prisma.player.create({
    data: player,
  });
}

export function updatePlayer(player: Prisma.PlayerUpdateInput) {
  return prisma.player.update({
    where: {
      discordId: player.discordId as string,
    },
    data: player,
  });
}

export async function registerOrUpdatePlayer(player: RegisterBody) {
  const { accounts, ...playerWithoutAccounts } = player;

  if (await getPlayerByDiscordId(player.discordId)) {
    var newPlayer = await updatePlayer(playerWithoutAccounts);
  } else {
    var newPlayer = await createPlayer(playerWithoutAccounts);
  }

  return newPlayer;
}
