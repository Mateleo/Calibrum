<script setup lang="ts">
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import type { ChampionPoolResponse, ChampionStatResponse } from "~/utils/types"

dayjs.extend(relativeTime)

const props = defineProps<{ accountId: string }>()

const {
  data: pool,
  pending,
  error
} = await useLazyFetch<ChampionPoolResponse>(() => `/api/champions/${props.accountId}`, {
  server: false,
  watch: [() => props.accountId]
})

// --- Identité ---

const identity = computed(() => {
  if (!pool.value || pool.value.champions.length === 0) return null
  const main = pool.value.champions[0] // le serveur trie par nombre de parties décroissant
  return {
    ...main,
    displayName: formatChampionName(main.championName),
    share: Math.round((main.games / pool.value.totalGames) * 100)
  }
})

const archetype = computed(() => {
  if (!pool.value || !identity.value) return null
  const effective = pool.value.effectivePoolSize
  if (identity.value.share >= 60)
    return {
      emoji: "🎯",
      label: "One-Trick",
      description: `${identity.value.displayName} isn't a pick, it's a lifestyle.`
    }
  if (effective <= 3.5)
    return { emoji: "🗡️", label: "Specialist", description: "A small pool, sharpened to a fine edge." }
  if (effective <= 6.5)
    return { emoji: "🃏", label: "Versatile", description: "Comfortable on many champions, hard to ban out." }
  return { emoji: "🌪️", label: "Champion Collector", description: "The pool is an ocean. Draft chaos incarnate." }
})

// --- Temps forts ---

interface Highlight {
  key: string
  emoji: string
  label: string
  champion: ChampionStatResponse
  headline: string
  sub: string
  accent: string
}

const highlights = computed<Highlight[]>(() => {
  if (!pool.value) return []
  const champions = pool.value.champions
  const eligible = champions.filter((c) => c.games >= 3)
  const used = new Set<number>()
  const result: Highlight[] = []

  const comfort = champions[0]
  if (comfort && comfort.games >= 3) {
    used.add(comfort.championId)
    result.push({
      key: "comfort",
      emoji: "🛋️",
      label: "Comfort Pick",
      champion: comfort,
      headline: `${comfort.games} games`,
      sub: `${comfort.winrate}% winrate, home sweet home.`,
      accent: "border-sky-400/30"
    })
  }

  const printer = [...eligible].sort((a, b) => b.netLp - a.netLp)[0]
  if (printer && printer.netLp > 0) {
    used.add(printer.championId)
    result.push({
      key: "printer",
      emoji: "🖨️",
      label: "LP Printer",
      champion: printer,
      headline: `+${printer.netLp} LP`,
      sub: `Prints ${printer.avgLp > 0 ? "+" : ""}${printer.avgLp} LP per game. Brrrr.`,
      accent: "border-green-400/30"
    })
  }

  const cursed = [...eligible].sort((a, b) => a.netLp - b.netLp)[0]
  if (cursed && cursed.netLp < 0 && !used.has(cursed.championId)) {
    used.add(cursed.championId)
    result.push({
      key: "cursed",
      emoji: "💀",
      label: "Cursed Pick",
      champion: cursed,
      headline: `${cursed.netLp} LP`,
      sub: "It's not you, it's... okay, it might be you.",
      accent: "border-red-400/30"
    })
  }

  const gem = [...eligible]
    .filter((c) => !used.has(c.championId) && c.winrate >= 60)
    .sort((a, b) => b.winrate - a.winrate)[0]
  if (gem) {
    used.add(gem.championId)
    result.push({
      key: "gem",
      emoji: "💎",
      label: "Hidden Gem",
      champion: gem,
      headline: `${gem.winrate}% WR`,
      sub: `Only ${gem.games} games. Why not more?`,
      accent: "border-purple-400/30"
    })
  }

  const onFire = champions.find(
    (c) =>
      !used.has(c.championId) &&
      c.games >= 5 &&
      c.form.filter((f) => f === "W").length >= 4 &&
      dayjs(c.lastPlayed).isAfter(dayjs().subtract(14, "days"))
  )
  if (onFire) {
    result.push({
      key: "fire",
      emoji: "🔥",
      label: "On Fire",
      champion: onFire,
      headline: `${onFire.form.filter((f) => f === "W").length}/5 recent wins`,
      sub: "Ride the wave while it lasts.",
      accent: "border-orange-400/30"
    })
  }

  return result
})

// --- Tri du tableau ---

type SortKey = "games" | "winrate" | "kda" | "netLp" | "avgLp"
const sortKey = ref<SortKey>("games")
const sortAsc = ref(false)

function setSort(key: SortKey) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = false
  }
}

// En dessous de ce nombre de parties, les stats sont bruitées (winrates à 0%/100%), repliées par défaut
const MIN_TABLE_GAMES = 5
const showLowSample = ref(false)
watch(
  () => props.accountId,
  () => (showLowSample.value = false)
)

const poolSplit = computed(() => {
  const champions = pool.value?.champions ?? []
  const main = champions.filter((champion) => champion.games >= MIN_TABLE_GAMES)
  // compte tout frais où rien n'atteint le seuil : on affiche tout
  if (main.length === 0) return { main: champions, low: [] }
  return { main, low: champions.filter((champion) => champion.games < MIN_TABLE_GAMES) }
})

const sortChampions = (champions: ChampionStatResponse[]) =>
  [...champions].sort((a, b) => (sortAsc.value ? 1 : -1) * (a[sortKey.value] - b[sortKey.value]))

const visibleChampions = computed(() => [
  ...sortChampions(poolSplit.value.main),
  ...(showLowSample.value ? sortChampions(poolSplit.value.low) : [])
])

const lowSampleSummary = computed(() => {
  const low = poolSplit.value.low
  const games = low.reduce((sum, champion) => sum + champion.games, 0)
  const wins = low.reduce((sum, champion) => sum + champion.wins, 0)
  const netLp = low.reduce((sum, champion) => sum + champion.netLp, 0)
  return {
    count: low.length,
    games,
    winrate: games > 0 ? Math.round((wins / games) * 100) : 0,
    netLp
  }
})

const columns: { key: SortKey; label: string }[] = [
  { key: "games", label: "Games" },
  { key: "winrate", label: "WR" },
  { key: "kda", label: "KDA" },
  { key: "avgLp", label: "LP / game" },
  { key: "netLp", label: "Net LP" }
]

// --- Utilitaires ---

const winrateDelta = (champion: ChampionStatResponse) =>
  champion.community ? Math.round((champion.winrate - champion.community.winrate) * 10) / 10 : null

const formatTimeFromNow = (date: string) => dayjs(date).fromNow()
</script>

<template>
  <div class="mt-4 flex flex-col gap-4">
    <!-- Chargement -->
    <template v-if="pending">
      <div class="h-52 animate-pulse rounded-lg bg-[#22262b]"></div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 3" :key="i" class="h-28 animate-pulse rounded-lg bg-[#22262b]"></div>
      </div>
      <div class="h-64 animate-pulse rounded-lg bg-[#22262b]"></div>
    </template>

    <!-- Erreur -->
    <CommonSection v-else-if="error" class="rounded-lg p-8 text-center">
      <p class="text-lg font-semibold text-white/80">Couldn't load champion stats 😥</p>
      <p class="mt-1 text-sm text-white/40">Please try again in a moment.</p>
    </CommonSection>

    <!-- État vide -->
    <CommonSection v-else-if="!pool || pool.totalGames === 0" class="rounded-lg p-10 text-center">
      <p class="text-4xl">🧬</p>
      <p class="mt-3 text-lg font-semibold text-white/80">No champion DNA yet this season</p>
      <p class="mt-1 text-sm text-white/40">Play a ranked game and come back, we'll be watching. 👀</p>
    </CommonSection>

    <template v-else>
      <!-- Carte d'identité -->
      <div v-if="identity" class="relative overflow-hidden rounded-lg bg-[#16181c]">
        <img
          :src="getChampionSplashUrl(identity.championId)"
          alt=""
          class="absolute inset-0 size-full object-cover object-top opacity-30"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-[#16181c] via-[#16181c]/70 to-transparent"></div>
        <div class="relative z-10 flex flex-col gap-4 p-6 md:p-8">
          <p class="text-xs font-bold uppercase tracking-[0.3em] text-sky-400">Champion DNA</p>
          <h2 class="text-2xl font-black leading-tight md:text-4xl">
            You are a <span class="text-sky-400">{{ identity.share }}%</span> {{ identity.displayName }} player
          </h2>
          <div v-if="archetype" class="flex flex-wrap items-center gap-3">
            <span
              class="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sm font-semibold text-sky-300"
            >
              {{ archetype.emoji }} {{ archetype.label }}
            </span>
            <p class="text-sm italic text-white/60">{{ archetype.description }}</p>
          </div>
          <div class="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            <p>
              <span class="font-bold text-white">{{ pool.totalGames }}</span> games
            </p>
            <p>
              <span class="font-bold text-white">{{ pool.winrate }}%</span> winrate
            </p>
            <p>
              <span class="font-bold text-white">{{ pool.kda }}</span> season KDA
            </p>
            <p>
              <span class="font-bold text-white">{{ pool.poolSize }}</span> champions played
            </p>
            <p :title="'Pool size weighted by how often you actually pick each champion'">
              <span class="font-bold text-white">{{ pool.effectivePoolSize }}</span> effective pool
            </p>
          </div>
        </div>
      </div>

      <!-- Temps forts -->
      <div v-if="highlights.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <CommonSection
          v-for="highlight in highlights"
          :key="highlight.key"
          class="rounded-lg border transition-colors"
          :class="highlight.accent"
          :padding="false"
        >
          <div class="flex items-center gap-4 p-4">
            <NuxtImg
              :src="getChampionIconUrl(highlight.champion.championId)"
              sizes="56px"
              quality="80"
              format="webp"
              class="size-14 shrink-0 rounded-lg"
              :alt="formatChampionName(highlight.champion.championName)"
            />
            <div class="min-w-0">
              <p class="text-xs font-bold uppercase tracking-wider text-white/50">
                {{ highlight.emoji }} {{ highlight.label }}
              </p>
              <p class="truncate font-semibold">
                {{ formatChampionName(highlight.champion.championName) }}
                <span class="ml-1 text-sm font-bold text-sky-400">{{ highlight.headline }}</span>
              </p>
              <p class="truncate text-xs text-white/40">{{ highlight.sub }}</p>
            </div>
          </div>
        </CommonSection>
      </div>

      <!-- Tableau des champions -->
      <CommonTitleSection title="Champion Pool" :padding="false">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[720px] text-sm">
            <thead>
              <tr class="border-b border-white/5 text-left text-xs uppercase tracking-wider text-white/40">
                <th class="p-3 font-semibold">Champion</th>
                <th
                  v-for="column in columns"
                  :key="column.key"
                  class="cursor-pointer select-none p-3 text-right font-semibold transition-colors hover:text-white/80"
                  :class="sortKey === column.key ? 'text-sky-400' : ''"
                  @click="setSort(column.key)"
                >
                  {{ column.label }}
                  <span v-if="sortKey === column.key">{{ sortAsc ? "▲" : "▼" }}</span>
                </th>
                <th class="p-3 text-center font-semibold" title="Last 5 games, most recent first">Form</th>
                <th class="p-3 text-right font-semibold">vs Calibrum</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="champion in visibleChampions"
                :key="champion.championId"
                class="border-b border-white/5 transition-colors last:border-none hover:bg-white/5"
                :class="champion.games < MIN_TABLE_GAMES ? 'opacity-60' : ''"
              >
                <td class="p-3">
                  <div class="flex items-center gap-3">
                    <NuxtImg
                      :src="getChampionIconUrl(champion.championId)"
                      sizes="40px"
                      quality="80"
                      format="webp"
                      class="size-10 rounded-lg"
                      :alt="formatChampionName(champion.championName)"
                    />
                    <div>
                      <p class="font-semibold">{{ formatChampionName(champion.championName) }}</p>
                      <p class="text-xs text-white/40">{{ formatTimeFromNow(champion.lastPlayed) }}</p>
                    </div>
                  </div>
                </td>
                <td class="p-3 text-right font-medium">
                  {{ champion.games }}
                  <span class="block text-xs text-white/40">{{ champion.wins }}W {{ champion.losses }}L</span>
                </td>
                <td
                  class="p-3 text-right font-semibold"
                  :class="champion.winrate >= 50 ? 'text-green-400' : 'text-red-400'"
                >
                  {{ champion.winrate }}%
                </td>
                <td class="p-3 text-right">
                  <span class="font-semibold">{{ champion.kda }}</span>
                  <span class="block text-xs text-white/40">
                    {{ champion.avgKills }} / {{ champion.avgDeaths }} / {{ champion.avgAssists }}
                  </span>
                </td>
                <td class="p-3 text-right font-medium" :class="champion.avgLp > 0 ? 'text-green-400' : 'text-red-400'">
                  {{ champion.avgLp > 0 ? "+" : "" }}{{ champion.avgLp }}
                </td>
                <td class="p-3 text-right">
                  <span
                    class="inline-block w-[60px] rounded-full py-1 text-center text-xs font-semibold"
                    :class="champion.netLp >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'"
                  >
                    {{ champion.netLp > 0 ? "+" : "" }}{{ champion.netLp }} LP
                  </span>
                </td>
                <td class="p-3">
                  <div class="flex justify-center gap-1">
                    <span
                      v-for="(result, index) in champion.form"
                      :key="index"
                      class="size-2 rounded-full"
                      :class="result === 'W' ? 'bg-green-500' : 'bg-red-500'"
                      :title="result === 'W' ? 'Win' : 'Loss'"
                    ></span>
                  </div>
                </td>
                <td class="p-3 text-right">
                  <template v-if="champion.community">
                    <span
                      class="font-semibold"
                      :class="winrateDelta(champion)! >= 0 ? 'text-green-400' : 'text-red-400'"
                      :title="`The rest of Calibrum: ${champion.community.winrate}% WR over ${champion.community.games} games (${champion.community.players} players)`"
                    >
                      {{ winrateDelta(champion)! >= 0 ? "▲ +" : "▼ " }}{{ winrateDelta(champion) }}%
                    </span>
                    <span class="block text-xs text-white/40">{{ champion.community.winrate }}% others</span>
                  </template>
                  <span
                    v-else
                    class="text-xs font-semibold text-amber-400"
                    title="No one else on Calibrum plays this champion"
                  >
                    Signature pick 👑
                  </span>
                </td>
              </tr>
              <tr v-if="poolSplit.low.length > 0" class="cursor-pointer" @click="showLowSample = !showLowSample">
                <td
                  colspan="8"
                  class="p-3 text-center text-xs font-medium text-white/40 transition-colors hover:text-white/70"
                >
                  <template v-if="showLowSample">▲ Hide champions with fewer than {{ MIN_TABLE_GAMES }} games</template>
                  <template v-else>
                    ▼ {{ lowSampleSummary.count }} more champion{{ lowSampleSummary.count > 1 ? "s" : "" }} with fewer
                    than {{ MIN_TABLE_GAMES }} games · {{ lowSampleSummary.games }} games ·
                    {{ lowSampleSummary.winrate }}% WR · {{ lowSampleSummary.netLp > 0 ? "+" : ""
                    }}{{ lowSampleSummary.netLp }} LP
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CommonTitleSection>
    </template>
  </div>
</template>
