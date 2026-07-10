import { Season } from "@prisma/client"
import {
  getChampionStatsByAccount,
  getCommunityChampionStats,
  withCommunityComparison
} from "~/server/utils/champions/champions"

export default defineEventHandler(async (event) => {
  const accountId = getRouterParam(event, "accountId")
  if (!accountId) {
    throw createError({
      statusCode: 400,
      statusMessage: "accountId is required"
    })
  }

  const season = useRuntimeConfig().CURRENT_SEASON as Season

  const [accountChampions, communityChampions] = await Promise.all([
    getChampionStatsByAccount(accountId, season),
    getCommunityChampionStats(season)
  ])

  const champions = withCommunityComparison(accountChampions, communityChampions ?? {}, accountId)

  const totalGames = champions.reduce((sum, champion) => sum + champion.games, 0)
  const wins = champions.reduce((sum, champion) => sum + champion.wins, 0)
  const kills = champions.reduce((sum, champion) => sum + champion.avgKills * champion.games, 0)
  const deaths = champions.reduce((sum, champion) => sum + champion.avgDeaths * champion.games, 0)
  const assists = champions.reduce((sum, champion) => sum + champion.avgAssists * champion.games, 0)

  // Taille effective du pool (inverse de l'indice de Herfindahl) : combien de champions
  // le joueur joue *vraiment*, pondéré par la fréquence à laquelle il les choisit.
  const effectivePoolSize =
    totalGames > 0 ? 1 / champions.reduce((sum, champion) => sum + (champion.games / totalGames) ** 2, 0) : 0

  return {
    totalGames,
    wins,
    losses: totalGames - wins,
    winrate: totalGames > 0 ? Math.round((wins / totalGames) * 1000) / 10 : 0,
    kda: totalGames > 0 ? Math.round(((kills + assists) / Math.max(1, deaths)) * 100) / 100 : 0,
    poolSize: champions.length,
    effectivePoolSize: Math.round(effectivePoolSize * 10) / 10,
    champions
  }
})
