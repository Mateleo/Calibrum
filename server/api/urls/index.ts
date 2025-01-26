export default defineEventHandler(async (event) => {
  const players = await prisma.player.findMany({
    select: {
      name: true
    },
    where: {
      Account: {
        some: {
          LpUpdate: {
            some: {
              season: "S15"
            }
          }
        }
      }
    }
  })
  if (!players) {
    return []
  }
  return players.map((player) => `https://calibrum.4esport.fr/player/${encodeURI(player.name)}`)
})
