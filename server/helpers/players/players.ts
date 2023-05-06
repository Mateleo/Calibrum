import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export function getPlayerByName(name: string) {
    return prisma.player.findFirst({
        where: {
            name: name
        }
    })
}

export function getPlayerByDiscordId(discordId: string) {
    return prisma.player.findUnique({
        where: {
            discordId: discordId
        }
    })
}

export function createPlayer(player: Prisma.PlayerCreateInput ) {
    return prisma.player.create({
        data: player
    })
}