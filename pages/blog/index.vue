<script lang="ts" setup>
const { data: articles } = await useAsyncData(() => queryCollection("content").order("date", "DESC").all())
</script>
<template>
  <div class="m-auto w-[94%] max-w-[1500px] pb-12">
    <h1 class="mt-14 text-3xl font-bold">Le Blog de Calibrum</h1>
    <h2 class="mt-2 text-white/70">Lisez les dernières nouvelles de l'équipe de Dev.</h2>
    <main v-if="articles" class="mt-12">
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div
          v-for="article in articles.sort(
            (a, b) => $dayjs(b.date, 'DD/MM/YYYY').unix() - $dayjs(a.date, 'DD/MM/YYYY').unix()
          )"
          :key="article.path"
        >
          <NuxtLink
            :to="`/blog${article.path}`"
            class="group flex aspect-[9/10] flex-col rounded-xl border border-white/10 bg-white/[0.04] shadow-lg shadow-black/50 hover:bg-white/[1%] hover:outline hover:outline-[3px] hover:outline-sky-500"
          >
            <div
              class="h-[45%] w-full rounded-t-xl"
              :style="{
                backgroundImage: `url(/content/thumbnail/${article.thumbnail})`,
                backgroundPosition: 'center',
                backgroundSize: 'contain'
              }"
            ></div>
            <div class="flex h-[55%] flex-col p-4 pb-2">
              <div
                class="m-auto mb-2 ml-0 rounded-lg border border-sky-800 bg-sky-950/40 px-2 py-[3px] text-xs font-semibold text-sky-400 lg:mb-3"
              >
                {{ article.tag }}
              </div>
              <h3 class="font-semibold leading-6 lg:text-[20px]">{{ article.title }}</h3>
              <p class="mt-2 h-[40px] overflow-hidden text-[13px] font-light leading-4 text-white/70">
                {{ article.description }}
              </p>
              <div class="grow"></div>
              <div class="flex items-center justify-between">
                <p class="lg:text-md text-sm text-white/60">
                  {{ $dayjs(article.date, "DD/MM/YYYY").format("D MMMM YYYY") }}
                </p>
                <div class="flex">
                  <div
                    v-for="(author, index) in article.author.split(',').map((item: string) => item.trim())"
                    :class="index !== article.author.split(',').length - 1 ? '-mr-2' : ''"
                    :style="{ zIndex: article.author.split(',').length - index }"
                    class=""
                  >
                    <img
                      :src="`/content/author/${author}.png`"
                      alt=""
                      class="size-[32px] rounded-full border-2 border-[#1B2025] group-hover:border-[#151A1F]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>
