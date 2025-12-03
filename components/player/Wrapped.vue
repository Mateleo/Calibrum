<script lang="ts" setup>
import { useIntersectionObserver } from "@vueuse/core"
import type { ComponentPublicInstance } from "vue"

const props = defineProps<{ playerName: string }>()

const { error, pending, data: wrappedData } = await useFetch(`/api/wrapped/${props.playerName}`)

// Animation state
const showIntro = ref(false)
const activeSection = ref(-1)

// Trigger intro animation after mount
onMounted(() => {
  setTimeout(() => (showIntro.value = true), 200)
})

const getTierTheme = (topPourcent: number) => {
  if (topPourcent <= 1)
    return { text: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", bar: "bg-amber-400" }
  if (topPourcent <= 5)
    return { text: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20", bar: "bg-purple-400" }
  if (topPourcent <= 15)
    return { text: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", bar: "bg-blue-400" }
  if (topPourcent <= 30)
    return { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", bar: "bg-emerald-400" }
  return { text: "text-neutral-400", bg: "bg-neutral-400/10", border: "border-neutral-400/20", bar: "bg-neutral-400" }
}

const getTierLabel = (topPourcent: number) => {
  if (topPourcent <= 1) return "Légendaire"
  if (topPourcent <= 5) return "Élite"
  if (topPourcent <= 15) return "Exceptionnel"
  if (topPourcent <= 30) return "Excellent"
  if (topPourcent <= 50) return "Bon"
  return "Standard"
}

const getCircleProgress = (topPourcent: number) => {
  const percentage = 100 - topPourcent
  const radius = 40
  const circumference = 2 * Math.PI * radius
  return {
    radius,
    circumference,
    offset: circumference - (percentage / 100) * circumference
  }
}

/**
 * Category Icons (Lucide)
 */
const getCategoryIcon = (key: string) => {
  const icons: Record<string, string> = {
    activite: "lucide:activity",
    skill: "lucide:crosshair",
    progression: "lucide:trending-up",
    mental: "lucide:brain"
  }
  return icons[key] || "lucide:layers"
}

/**
 * Setup intersection observer
 */
const sectionRefs = ref<(HTMLElement | null)[]>([])
const setupObserver = (index: number) => {
  return (el: Element | ComponentPublicInstance | null) => {
    if (el && el instanceof HTMLElement) {
      sectionRefs.value[index] = el
      useIntersectionObserver(
        el,
        ([{ isIntersecting }]) => {
          if (isIntersecting && activeSection.value < index) {
            activeSection.value = index
          }
        },
        { threshold: 0.3 }
      )
    }
  }
}

const formatStatValue = (value: string | number) => {
  if (typeof value === "number") return value.toLocaleString("fr-FR")
  return value
}
</script>

<template>
  <div class="min-h-screen w-full">
    <!-- Loading State -->
    <div v-if="pending" class="relative z-10 flex h-screen w-full flex-col items-center justify-center gap-4">
      <div class="size-12 animate-spin rounded-full border-2 border-neutral-800 border-t-white"></div>
      <p class="animate-pulse text-sm font-medium uppercase tracking-widest text-neutral-500">Analyse des données...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="relative z-10 flex h-screen w-full items-center justify-center p-6">
      <div class="w-full max-w-md rounded-xl border border-red-900/50 bg-red-950/10 p-8 text-center backdrop-blur-sm">
        <Icon name="lucide:alert-circle" class="mx-auto mb-4 size-10 text-red-500" />
        <h3 class="mb-2 text-xl font-bold text-white">Erreur de chargement</h3>
        <p class="text-sm text-neutral-400">Impossible de récupérer vos statistiques. Veuillez réessayer plus tard.</p>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div v-else-if="wrappedData" class="relative z-10 mx-auto max-w-5xl pb-32">
      <!-- HERO HEADER -->
      <header class="mt-8 flex flex-col items-center justify-center text-center">
        <div
          class="transform transition-all duration-1000 ease-out"
          :class="showIntro ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'"
        >
          <!-- Badge -->
          <div
            class="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5 backdrop-blur-md"
          >
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span class="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Wrapped 2025</span>
          </div>

          <!-- Title -->
          <h1 class="mb-6 text-5xl font-bold tracking-tight text-white md:text-8xl lg:text-9xl">
            {{ wrappedData.pseudo }}
          </h1>

          <!-- Subtitle -->
          <p class="mx-auto max-w-2xl text-xl font-light leading-relaxed text-neutral-400">
            Les stats sont là ! Ton année 2025 sur la faille avec Calibrum
          </p>
        </div>
      </header>

      <!-- STATS SECTIONS -->
      <div class="mt-40 flex flex-col gap-28">
        <section
          v-for="(category, key, index) in wrappedData.resume"
          :key="key"
          :ref="setupObserver(index)"
          class="scroll-mt-24 transition-all duration-1000 ease-out"
          :class="activeSection >= index ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'"
        >
          <!-- Section Header -->
          <div class="mb-2 flex items-center gap-4 border-b border-neutral-800 pb-6">
            <div
              class="flex size-12 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-white"
            >
              <Icon :name="getCategoryIcon(key as string)" class="size-6" />
            </div>
            <div>
              <span class="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-500">
                Chapitre 0{{ index + 1 }}
              </span>
              <h2 class="text-3xl font-bold capitalize tracking-tight text-white">{{ category.label }}</h2>
            </div>
          </div>

          <!-- BENTO GRID LAYOUT -->
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <article
              v-for="(stat, statIndex) in category.stats"
              :key="stat.nom"
              class="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 transition-all duration-500 hover:border-neutral-700 hover:bg-neutral-900/80"
            >
              <!-- Top Row: Label & Rank Badge -->
              <div class="mb-8 flex items-start justify-between">
                <h3 class="text-sm font-bold uppercase tracking-wider text-neutral-400">
                  {{ stat.nom }}
                </h3>
                <span
                  class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors duration-300"
                  :class="[
                    getTierTheme(stat.topPourcent).bg,
                    getTierTheme(stat.topPourcent).text,
                    getTierTheme(stat.topPourcent).border
                  ]"
                >
                  {{ getTierLabel(stat.topPourcent) }}
                </span>
              </div>

              <div class="flex items-end justify-between gap-8">
                <!-- Left: Big Number & Message -->
                <div class="flex-1">
                  <div class="mb-2 text-3xl font-bold tracking-tighter text-white md:text-4xl">
                    {{ formatStatValue(stat.valeur) }}
                  </div>
                  <p class="max-w-[200px] text-sm font-medium leading-relaxed text-neutral-500">
                    {{ stat.message }}
                  </p>
                </div>

                <!-- Right: Clean Circular Chart -->
                <div class="relative flex-shrink-0">
                  <div class="relative size-24">
                    <svg class="size-full -rotate-90 transform" viewBox="0 0 100 100">
                      <!-- Track -->
                      <circle
                        cx="50"
                        cy="50"
                        :r="getCircleProgress(stat.topPourcent).radius"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="6"
                        class="text-neutral-800"
                      />
                      <!-- Indicator -->
                      <circle
                        cx="50"
                        cy="50"
                        :r="getCircleProgress(stat.topPourcent).radius"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="6"
                        stroke-linecap="round"
                        :stroke-dasharray="getCircleProgress(stat.topPourcent).circumference"
                        :stroke-dashoffset="
                          activeSection >= index
                            ? getCircleProgress(stat.topPourcent).offset
                            : getCircleProgress(stat.topPourcent).circumference
                        "
                        class="transition-all duration-[3s] ease-out"
                        :class="getTierTheme(stat.topPourcent).text"
                      />
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                      <span class="text-xl font-bold text-white">Top</span>
                      <span class="text-lg font-bold" :class="getTierTheme(stat.topPourcent).text"
                        >{{ stat.topPourcent }}%</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bottom: Linear Comparison -->
              <div class="mt-8 border-t border-neutral-800/50 pt-6">
                <div class="mb-2 flex justify-between text-xs text-neutral-500">
                  <span>Performance globale</span>
                  <span class="font-medium text-neutral-300">Meilleur que {{ 100 - stat.topPourcent }}%</span>
                </div>
                <div class="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
                  <div
                    class="h-full rounded-full transition-all duration-[3s] ease-out"
                    :class="getTierTheme(stat.topPourcent).bar"
                    :style="{ width: activeSection >= index ? `${100 - stat.topPourcent}%` : '0%' }"
                  ></div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure smooth font rendering */
div {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
