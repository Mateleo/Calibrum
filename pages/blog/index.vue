<script lang="ts" setup>
import dayjs from "dayjs"

const { data: articles } = await useAsyncData(() => queryCollection("content").order("date", "DESC").all())

const sortedArticles = computed(() => {
  if (!articles.value) return []
  return [...articles.value].sort((a, b) => {
    return dayjs(b.date, "DD/MM/YYYY").unix() - dayjs(a.date, "DD/MM/YYYY").unix()
  })
})
</script>

<template>
  <div class="m-auto w-[94%] max-w-[1500px] pb-12">
    <!-- Header -->
    <header class="mb-12 mt-14">
      <h1 class="text-3xl font-bold text-white">Le Blog de Calibrum</h1>
      <h2 class="mt-2 text-lg text-white/70">Lisez les dernières nouvelles de l'équipe de Dev.</h2>
    </header>

    <main v-if="sortedArticles.length">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="article in sortedArticles" :key="article.path" class="flex h-full flex-col">
          <NuxtLink
            :to="`/blog${article.path}`"
            class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-lg transition-all duration-300 hover:bg-white/[0.08] hover:shadow-sky-900/20 hover:ring-2 hover:ring-sky-500"
          >
            <!-- Image Section: Fixed aspect ratio 16:9 (video) -->
            <div class="w-full overflow-hidden bg-gray-900">
              <img
                :src="`/content/thumbnail/${article.thumbnail}`"
                :alt="article.title"
                class="h-full w-full object-cover duration-500"
              />
            </div>

            <!-- Content Section -->
            <div class="flex flex-1 flex-col p-5">
              <!-- Tag -->
              <div class="mb-3 flex">
                <span
                  class="rounded-md border border-sky-800 bg-sky-950/50 px-2.5 py-1 text-xs font-semibold tracking-wide text-sky-400"
                >
                  {{ article.tag }}
                </span>
              </div>

              <!-- Title -->
              <h3 class="mb-2 text-xl font-bold leading-tight text-white transition-colors group-hover:text-sky-400">
                {{ article.title }}
              </h3>

              <!-- Description with Line Clamp (No fixed height) -->
              <p class="mb-6 line-clamp-3 text-sm font-light leading-relaxed text-white/70">
                {{ article.description }}
              </p>

              <!-- Spacer to push footer to bottom -->
              <div class="mt-auto"></div>

              <!-- Footer: Date & Authors -->
              <div class="flex items-center justify-between border-t border-white/10 pt-4">
                <p class="text-sm font-medium text-white/50">
                  {{ $dayjs(article.date, "DD/MM/YYYY").format("D MMMM YYYY") }}
                </p>

                <!-- Authors Stack -->
                <div class="flex items-center pl-2">
                  <div
                    v-for="(author, index) in article.author.split(',').map((item: string) => item.trim())"
                    :key="author"
                    class="relative -ml-3 first:ml-0"
                    :style="{ zIndex: 10 - index }"
                  >
                    <img
                      :src="`/content/author/${author}.png`"
                      :alt="author"
                      class="size-8 rounded-full object-cover"
                      :title="author"
                    />
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>
    </main>
  </div>
</template>
