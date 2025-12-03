<script lang="ts" setup>
const props = defineProps<{ playerName: string }>()

const { error, pending, data: wrappedData } = await useFetch(`/api/wrapped/${props.playerName}`)

/**
 * Calculates width based on Top%.
 * If you are Top 1%, you are better than 99%, so bar is 99% full.
 * If you are Top 90%, you are better than 10%, so bar is 10% full.
 * Min-width 15% for visual aesthetics.
 */
const getWinRateWidth = (topPourcent: number) => {
  const percentageBeaten = 100 - topPourcent
  return Math.max(15, Math.min(percentageBeaten, 95))
}

const getTheme = (key: string) => {
  const themes: Record<string, { gradient: string; textColor: string }> = {
    activite: {
      gradient: "from-yellow-400 to-orange-500",
      textColor: "text-orange-400"
    },
    skill: {
      gradient: "from-green-400 to-emerald-600",
      textColor: "text-green-400"
    },
    progression: {
      gradient: "from-pink-500 to-rose-600",
      textColor: "text-pink-400"
    },
    mental: {
      gradient: "from-blue-400 to-indigo-500",
      textColor: "text-blue-400"
    },
    // Default fallback
    default: {
      gradient: "from-gray-400 to-gray-600",
      textColor: "text-gray-400"
    }
  }
  return themes[key] || themes.default
}
</script>
<template>
  <div class="relative min-h-screen w-full text-white">
    <!-- Loading State -->
    <div v-if="pending" class="relative z-10 flex h-screen w-full flex-col items-center justify-center gap-6">
      <div class="size-16 animate-spin rounded-full border-4 border-[#1ed760] border-t-transparent"></div>
      <h2
        class="animate-pulse bg-gradient-to-r from-[#1ed760] to-cyan-400 bg-clip-text text-2xl font-black uppercase tracking-widest text-transparent"
      >
        Analysing 2025
      </h2>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="relative z-10 flex h-screen w-full items-center justify-center p-4">
      <div class="max-w-md rounded-2xl border-2 border-red-500 bg-red-950/50 p-8 text-center backdrop-blur-md">
        <h3 class="mb-2 text-3xl font-black text-red-500">OOPS.</h3>
        <p class="text-gray-300">Something went wrong fetching your wrapped data.</p>
      </div>
    </div>

    <!-- WRAPPED CONTENT -->
    <div v-else-if="wrappedData" class="relative z-10 mx-auto max-w-3xl px-4 py-12 md:py-20">
      <!-- Intro / Header -->
      <header class="mb-24 flex flex-col gap-4 text-center">
        <div
          class="mx-auto inline-block rotate-[-2deg] rounded-full bg-[#1ed760] px-6 py-2 text-sm font-black uppercase tracking-widest text-black"
        >
          Player Wrapped
        </div>
        <h1 class="text-7xl font-black uppercase leading-[0.85] tracking-tighter md:text-[9rem]">
          <span class="block bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">2025</span>
          <span class="block text-[#00eaff]">{{ wrappedData.pseudo }}</span>
        </h1>
        <p class="mt-4 text-xl font-medium text-gray-400">
          Les chiffres sont là ! Voici comment vous avez dominé la faille.
        </p>
      </header>

      <!-- Vertical Flow Layout -->
      <div class="flex flex-col gap-12 md:gap-24">
        <article v-for="(category, key, index) in wrappedData.resume" :key="key" class="group relative">
          <!-- Decoration Number -->
          <div
            class="absolute -left-4 -top-12 -z-10 text-[10rem] font-black leading-none text-white/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:-left-20"
          >
            0{{ index + 1 }}
          </div>

          <!-- Category Header -->
          <div class="mb-8 flex items-center gap-4">
            <div :class="`h-12 w-3 rounded-full bg-gradient-to-b ${getTheme(key as string).gradient}`"></div>
            <h2 class="text-5xl font-black uppercase tracking-tight md:text-6xl">
              {{ category.label }}
            </h2>
          </div>

          <!-- Stats Grid -->
          <div class="grid gap-6">
            <div
              v-for="stat in category.stats"
              :key="stat.nom"
              class="relative overflow-hidden rounded-lg border border-white/5 bg-[#121212] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/10 hover:shadow-2xl hover:shadow-purple-900/10"
            >
              <!-- Stat Header -->
              <div class="mb-6 flex items-end justify-between">
                <div>
                  <span class="mb-1 block text-sm font-bold uppercase tracking-widest text-gray-500">{{
                    stat.nom
                  }}</span>
                  <div class="text-4xl font-black text-white md:text-5xl">{{ stat.valeur }}</div>
                </div>
                <!-- Context Message -->
                <div class="max-w-[50%] text-right">
                  <p :class="`text-sm font-bold italic leading-tight ${getTheme(key as string).textColor}`">
                    "{{ stat.message }}"
                  </p>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <!-- Bar Container -->
                <div class="relative flex h-14 w-full overflow-hidden rounded-xl bg-gray-800">
                  <!-- Left Side (YOU / Cyan) -->
                  <!-- Width logic: If top 10%, you beat 90% of people. So width is 90%. -->
                  <div
                    class="relative z-10 flex items-center justify-end px-4 shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-1000 ease-out"
                    :style="{
                      width: `${getWinRateWidth(stat.topPourcent)}%`,
                      background: 'linear-gradient(90deg, #22d3ee 0%, #0891b2 100%)'
                    }"
                  >
                    <span class="text-lg font-black text-black">YOU</span>
                  </div>

                  <!-- Right Side (THEM / Purple) -->
                  <div class="relative flex flex-1 items-center bg-[#4c1d95] px-4">
                    <!-- Slanted divider visual trick -->
                    <div class="absolute -left-4 bottom-0 top-0 w-8 origin-bottom -skew-x-12 bg-[#4c1d95]"></div>
                  </div>
                </div>

                <!-- Labels under bar -->
                <div class="flex items-center justify-between px-1">
                  <span class="text-xs font-bold uppercase tracking-widest text-cyan-400"
                    >Meilleur que {{ 100 - stat.topPourcent }}%</span
                  >
                  <div class="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1">
                    <span class="text-xs text-gray-400">TOP</span>
                    <span class="text-sm font-black text-white">{{ stat.topPourcent }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Footer -->
      <footer class="mt-32 flex flex-col items-center justify-center gap-6 text-center">
        <div class="text-xs font-medium text-gray-500">Stats by Calibrum, made by Mateleo</div>
      </footer>
    </div>
  </div>
</template>
