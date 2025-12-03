import { PrismaClient, Season } from "@prisma/client"
import fs from "fs"
import path from "path"

const prisma = new PrismaClient()

// Configuration de la saison (Ajuster selon besoin)
const CURRENT_SEASON = Season.S15

// Interface des statistiques brutes
interface PlayerRawStats {
  playerName: string
  totalGamesPlayed: number
  winRate: number
  avgKDA: number
  highestKDAGame: number
  totalLPGained: number
  highestRankValue: number
  highestRankLabel: string // e.g., "Diamond II"
  longestWinStreak: number
  championDiversity: number
  totalDodges: number
}

interface PlayerWrapped {
  pseudo: string
  resume: {
    activite: StatCard // Games, Dodges
    skill: StatCard // KDA, Winrate
    progression: StatCard // LP, Rank
    mental: StatCard // Streak, Diversity
  }
}

interface StatCard {
  label: string
  stats: StatLine[]
}

interface StatLine {
  nom: string // e.g., "Taux de Victoire"
  valeur: string | number
  topPourcent: number // e.g., 5 (Top 5%), 50 (Average), etc.
  message: string // Message comparatif
}

function computeLongestWinStreak(diffHistory: number[]): number {
  let maxStreak = 0
  let currentStreak = 0
  for (const diff of diffHistory) {
    if (diff > 0) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      currentStreak = 0
    }
  }
  return maxStreak
}

// Fonction utilitaire pour calculer le percentile (Top X%)
function getPercentile(value: number, sortedDataset: number[]): number {
  if (sortedDataset.length === 0) return 50

  // countAbove = nombre de valeurs STRICTEMENT supérieures
  const countAbove = sortedDataset.filter((v) => v > value).length

  // Percentile calculation: pourcentage de joueurs qui ont mieux
  const percentile = (countAbove / sortedDataset.length) * 100

  return Math.max(1, Math.round(percentile))
}

// Helper pour générer le message "X% des joueurs ont fait mieux"
function getCompMsg(percentile: number, actionText: string): string {
  if (percentile <= 1) return `Tu es dans le top 1%, quasi personne n'a ${actionText} que toi.`
  return `${percentile}% des joueurs ont ${actionText} que toi.`
}

async function computePlayerStats(): Promise<PlayerRawStats[]> {
  const players = await prisma.player.findMany({
    include: { Account: { select: { id: true } } }
  })

  const allRawStats: PlayerRawStats[] = []

  console.log(`🔍 Analyse des données pour ${players.length} joueurs...`)

  for (const player of players) {
    const accountIds = player.Account.map((acc) => acc.id)
    if (accountIds.length === 0) continue

    const updates = await prisma.lpUpdateS142.findMany({
      where: {
        season: CURRENT_SEASON,
        accountId: { in: accountIds },
        date: { lt: new Date("2025-12-01T00:00:00.000Z") }
      },
      orderBy: { date: "asc" },
      select: {
        lastUpdateDiff: true,
        kill: true,
        death: true,
        assist: true,
        championId: true,
        tier: true,
        rank: true,
        LP: true,
        isDodge: true,
        LPC: true
      }
    })

    if (updates.length < 2) continue

    // --- Calculs Bruts ---
    const totalGamesPlayed = updates.length
    const wins = updates.filter((u) => u.lastUpdateDiff > 0).length
    const winRate = (wins / totalGamesPlayed) * 100

    let totalKA = 0
    let highestKDAGame = 0
    updates.forEach((u) => {
      if (u.kill !== null && u.death !== null && u.assist !== null) {
        const kda = (u.kill + u.assist) / Math.max(u.death, 1)
        totalKA += kda
        highestKDAGame = Math.max(highestKDAGame, kda)
      }
    })
    const avgKDA = totalKA / totalGamesPlayed

    const totalLPGained = updates.reduce((sum, u) => sum + Math.max(u.lastUpdateDiff, 0), 0)

    // On trouve l'update qui a le LPC le plus élevé
    const peakUpdate = updates.reduce((max, current) => {
      return (current.LPC ?? -Infinity) > (max.LPC ?? -Infinity) ? current : max
    }, updates[0])

    const highestRankValue = peakUpdate.LPC ?? 0
    const highestRankLabel = `${peakUpdate.tier} ${peakUpdate.rank}`

    const longestWinStreak = computeLongestWinStreak(updates.map((u) => u.lastUpdateDiff))

    const uniqueChampions = new Set(updates.map((u) => u.championId).filter((id) => id !== null))
    const championDiversity = uniqueChampions.size
    const totalDodges = updates.filter((u) => u.isDodge === true).length

    allRawStats.push({
      playerName: player.name,
      totalGamesPlayed,
      winRate,
      avgKDA,
      highestKDAGame,
      totalLPGained,
      highestRankValue,
      highestRankLabel,
      longestWinStreak,
      championDiversity,
      totalDodges
    })
  }

  return allRawStats
}

async function generateWrapped() {
  const rawStats = await computePlayerStats()

  if (rawStats.length === 0) {
    console.log("❌ Aucune donnée trouvée.")
    return
  }

  // --- Préparation des tableaux pour comparaison ---
  const datasets = {
    games: rawStats.map((p) => p.totalGamesPlayed).sort((a, b) => a - b),
    winRate: rawStats.map((p) => p.winRate).sort((a, b) => a - b),
    kda: rawStats.map((p) => p.avgKDA).sort((a, b) => a - b),
    highestKda: rawStats.map((p) => p.highestKDAGame).sort((a, b) => a - b),
    lp: rawStats.map((p) => p.totalLPGained).sort((a, b) => a - b),
    rank: rawStats.map((p) => p.highestRankValue).sort((a, b) => a - b),
    streak: rawStats.map((p) => p.longestWinStreak).sort((a, b) => a - b),
    diversity: rawStats.map((p) => p.championDiversity).sort((a, b) => a - b),
    dodges: rawStats.map((p) => p.totalDodges).sort((a, b) => a - b)
  }

  const wrappedList: PlayerWrapped[] = []

  for (const p of rawStats) {
    // Calcul des percentiles
    const pGames = getPercentile(p.totalGamesPlayed, datasets.games)
    const pWinrate = getPercentile(p.winRate, datasets.winRate)
    const pKDA = getPercentile(p.avgKDA, datasets.kda)
    const pHighKDA = getPercentile(p.highestKDAGame, datasets.highestKda)
    const pLP = getPercentile(p.totalLPGained, datasets.lp)
    const pRank = getPercentile(p.highestRankValue, datasets.rank)
    const pStreak = getPercentile(p.longestWinStreak, datasets.streak)
    const pDiversity = getPercentile(p.championDiversity, datasets.diversity)
    const pDodges = getPercentile(p.totalDodges, datasets.dodges)

    const wrapped: PlayerWrapped = {
      pseudo: p.playerName,
      resume: {
        activite: {
          label: "Temps Passé",
          stats: [
            {
              nom: "Parties Jouées",
              valeur: p.totalGamesPlayed,
              topPourcent: pGames,
              message: getCompMsg(pGames, "joué plus de parties")
            },
            {
              nom: "Dodges Tactiques",
              valeur: p.totalDodges,
              topPourcent: pDodges,
              message: getCompMsg(pDodges, "dodge plus")
            }
          ]
        },
        skill: {
          label: "Niveau de Jeu",
          stats: [
            {
              nom: "KDA Moyen",
              valeur: p.avgKDA.toFixed(2),
              topPourcent: pKDA,
              message: getCompMsg(pKDA, "un meilleur KDA")
            },
            {
              nom: "Meilleure Game (KDA)",
              valeur: p.highestKDAGame.toFixed(1),
              topPourcent: pHighKDA,
              message: getCompMsg(pHighKDA, "fait une meilleure game")
            }
          ]
        },
        progression: {
          label: "Ascension",
          stats: [
            {
              nom: "Taux de Victoire",
              valeur: `${p.winRate.toFixed(1)}%`,
              topPourcent: pWinrate,
              message: getCompMsg(pWinrate, "un meilleur taux de victoire")
            },
            {
              nom: "LP Gagnés (Total)",
              valeur: p.totalLPGained,
              topPourcent: pLP,
              message: getCompMsg(pLP, "gagné plus de LP")
            },
            {
              nom: "Peak Rank",
              valeur: p.highestRankLabel,
              topPourcent: pRank,
              message: getCompMsg(pRank, "atteint un rang plus élevé")
            }
          ]
        },
        mental: {
          label: "Mental & Style",
          stats: [
            {
              nom: "Plus longue série de victoires",
              valeur: p.longestWinStreak,
              topPourcent: pStreak,
              message: getCompMsg(pStreak, "fait une plus longue série")
            },
            {
              nom: "Diversité de Champions",
              valeur: p.championDiversity,
              topPourcent: pDiversity,
              message: getCompMsg(pDiversity, "joué plus de champions différents")
            }
          ]
        }
      }
    }

    wrappedList.push(wrapped)
  }

  // --- Sauvegarde ---
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  const outputPath = path.join(dataDir, "wrapped_recap_fr.json")
  fs.writeFileSync(outputPath, JSON.stringify(wrappedList, null, 2))

  console.log(`✅ Récapitulatif généré pour ${wrappedList.length} joueurs.`)
  console.log(`📂 Fichier sauvegardé : ${outputPath}`)
}

// Exécution
generateWrapped()
  .catch((e) => {
    console.error("Erreur fatale :", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
