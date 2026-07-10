import { Season, Prisma } from "@prisma/client"

// Uniquement les lignes correspondant à une vraie partie jouée : données champion présentes,
// LP réellement modifiés (exclut les resets de saison) et pas un dodge.
const CHAMPION_GAME_FILTER: Prisma.LpUpdateS142WhereInput = {
  championId: { not: null },
  lastUpdateDiff: { not: 0 },
  OR: [{ isDodge: false }, { isDodge: null }]
}

export interface ChampionStat {
  championId: number
  championName: string
  games: number
  wins: number
  losses: number
  winrate: number
  avgKills: number
  avgDeaths: number
  avgAssists: number
  kda: number
  netLp: number
  avgLp: number
  lastPlayed: Date
  /** Résultats des dernières parties sur ce champion, de la plus récente à la plus ancienne (max 5) */
  form: ("W" | "L")[]
  /** Stats du reste de Calibrum sur ce champion (les parties du compte sont exclues) */
  community: { games: number; winrate: number; players: number } | null
}

interface CommunityChampionStat {
  games: number
  wins: number
  players: number
  playerIds: string[]
}

function round(value: number, decimals = 1) {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}

export async function getChampionStatsByAccount(accountId: string, season: Season): Promise<ChampionStat[]> {
  const games = await prisma.lpUpdateS142.findMany({
    where: {
      accountId,
      season,
      ...CHAMPION_GAME_FILTER
    },
    orderBy: { date: "desc" },
    select: {
      championId: true,
      championName: true,
      kill: true,
      death: true,
      assist: true,
      lastUpdateDiff: true,
      date: true
    }
  })

  const byChampion = new Map<
    number,
    {
      championName: string
      games: number
      wins: number
      kills: number
      deaths: number
      assists: number
      netLp: number
      lastPlayed: Date
      form: ("W" | "L")[]
    }
  >()

  for (const game of games) {
    if (game.championId === null) continue
    const isWin = game.lastUpdateDiff > 0
    let champion = byChampion.get(game.championId)
    if (!champion) {
      champion = {
        championName: game.championName ?? "Unknown",
        games: 0,
        wins: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        netLp: 0,
        // les parties sont triées par date décroissante, la première occurrence est donc la plus récente
        lastPlayed: game.date,
        form: []
      }
      byChampion.set(game.championId, champion)
    }
    champion.games++
    if (isWin) champion.wins++
    champion.kills += game.kill ?? 0
    champion.deaths += game.death ?? 0
    champion.assists += game.assist ?? 0
    champion.netLp += game.lastUpdateDiff
    if (champion.form.length < 5) champion.form.push(isWin ? "W" : "L")
  }

  return [...byChampion.entries()]
    .map(([championId, c]) => ({
      championId,
      championName: c.championName,
      games: c.games,
      wins: c.wins,
      losses: c.games - c.wins,
      winrate: round((c.wins / c.games) * 100),
      avgKills: round(c.kills / c.games),
      avgDeaths: round(c.deaths / c.games),
      avgAssists: round(c.assists / c.games),
      kda: round((c.kills + c.assists) / Math.max(1, c.deaths), 2),
      netLp: c.netLp,
      avgLp: round(c.netLp / c.games),
      lastPlayed: c.lastPlayed,
      form: c.form,
      community: null
    }))
    .sort((a, b) => b.games - a.games || b.netLp - a.netLp)
}

export const getCommunityChampionStats = cachedFunction(
  async (season: Season): Promise<Record<number, CommunityChampionStat>> => {
    const games = await prisma.lpUpdateS142.findMany({
      where: {
        season,
        ...CHAMPION_GAME_FILTER
      },
      select: {
        championId: true,
        lastUpdateDiff: true,
        accountId: true
      }
    })

    const byChampion = new Map<number, { games: number; wins: number; playerIds: Set<string> }>()
    for (const game of games) {
      if (game.championId === null) continue
      let champion = byChampion.get(game.championId)
      if (!champion) {
        champion = { games: 0, wins: 0, playerIds: new Set() }
        byChampion.set(game.championId, champion)
      }
      champion.games++
      if (game.lastUpdateDiff > 0) champion.wins++
      champion.playerIds.add(game.accountId)
    }

    const result: Record<number, CommunityChampionStat> = {}
    for (const [championId, c] of byChampion) {
      result[championId] = {
        games: c.games,
        wins: c.wins,
        players: c.playerIds.size,
        playerIds: [...c.playerIds]
      }
    }
    return result
  },
  {
    maxAge: 15 * 60,
    swr: false,
    name: "communityChampionStats",
    getKey: (season: Season) => season
  }
)

/**
 * Fusionne les stats communautaires dans les stats champion d'un compte,
 * en excluant les parties du compte lui-même pour que la comparaison soit
 * vraiment « vous contre le reste de Calibrum ».
 */
export function withCommunityComparison(
  champions: ChampionStat[],
  community: Record<number, CommunityChampionStat>,
  accountId: string
): ChampionStat[] {
  return champions.map((champion) => {
    const communityStat = community[champion.championId]
    if (!communityStat) return champion

    const restGames = communityStat.games - champion.games
    const restWins = communityStat.wins - champion.wins
    const restPlayers = communityStat.playerIds.includes(accountId) ? communityStat.players - 1 : communityStat.players

    if (restGames <= 0 || restPlayers <= 0) return champion

    return {
      ...champion,
      community: {
        games: restGames,
        winrate: round((Math.max(0, restWins) / restGames) * 100),
        players: restPlayers
      }
    }
  })
}
