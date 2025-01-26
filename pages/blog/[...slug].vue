<script lang="ts" setup>
import dayjs from "dayjs"

const route = useRoute()
const articlePath = route.path.substring(5)
const { data: page } = await useAsyncData(articlePath, () => {
  return queryCollection("content").path(articlePath).first()
})

const { data: articles } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("content", ["date", "description"])
})

const givenDate = dayjs(page.value?.date, "DD/MM/YYYY")

// we need this bc of calibrum subfolder.
// Not the best options (we suppose calibrum's articles are in the first item)
// Ideal would be to flatten every list from "children"
const allArticles = computed(() =>
  articles.value ? [...articles.value.slice(1), ...articles.value.at(0).children] : []
)

// Find the closest previous and next articles
const previousArticle = computed(() => {
  if (!allArticles.value) return null
  const previous = allArticles.value
    .filter((article) => dayjs(article.date, "DD/MM/YYYY").isBefore(givenDate))
    .sort((a, b) => dayjs(b.date, "DD/MM/YYYY").diff(dayjs(a.date, "DD/MM/YYYY")))[0]

  return previous || null
})

const nextArticle = computed(() => {
  if (!allArticles.value) return null
  const next = allArticles.value
    .filter((article) => dayjs(article.date, "DD/MM/YYYY").isAfter(givenDate))
    .sort((a, b) => dayjs(a.date, "DD/MM/YYYY").diff(dayjs(b.date, "DD/MM/YYYY")))[0]

  return next || null
})

// A delete si possible, je n'ai pas accès aux sections directement (cachés derrière <ContentRenderer>)
// Manuellement ajouter et retirer les watchers pour déterminer quelle section est la plus "visible"
// J'ai fait un watch mais sectionIds ne sera jamais réactif (Mardown -> Static) aka useless
function useScrollspy(sectionIds: Ref<string[]>) {
  const activeSection = ref<string | null>(null)
  let observer: IntersectionObserver | null = null
  const entriesMap = new Map<string, IntersectionObserverEntry>()

  const updateObserver = async (newIds: string[], oldIds: string[] = []) => {
    await nextTick() // Wait for DOM updates
    if (!observer) return

    // Unobserve old elements
    oldIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer?.unobserve(el)
      entriesMap.delete(id)
    })

    // Observe new elements
    newIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) {
        observer?.observe(el)
      }
    })
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id
          entry.isIntersecting ? entriesMap.set(id, entry) : entriesMap.delete(id)
        })

        const visibleEntries = Array.from(entriesMap.values())
        if (!visibleEntries.length) return

        const mostVisible = visibleEntries.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b))
        activeSection.value = mostVisible.target.id
      },
      {
        rootMargin: "-5% 0px -80% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    )

    watch(
      sectionIds,
      (newIds, oldIds) => {
        updateObserver(newIds, oldIds)
      },
      { immediate: true }
    )
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return activeSection
}

// Each link can have a "children" property with even more links. (Recursive lol)
const flattenLinks = (links: any[]) => {
  return links.reduce((acc, link) => {
    acc.push(link.id)
    if (link.children && link.children.length > 0) {
      acc.push(...flattenLinks(link.children))
    }
    return acc
  }, [])
}

const sectionIds = computed(() => {
  return flattenLinks(page.value?.body?.toc?.links ?? [])
})

const activeSection = useScrollspy(sectionIds)

useSeoMeta({
  title: () => `${page.value?.title ?? "Calibrum"}`,
  titleTemplate: () => `${page.value?.title ?? "Calibrum"}`,
  twitterTitle: () => `${page.value?.title ?? "Calibrum"}`,
  ogTitle: () => `${page.value?.title ?? "Calibrum"}`,
  description: `${page.value?.description}`,
  ogDescription: `${page.value?.description}`,
  twitterDescription: `${page.value?.description}`,
  ogImage: () => `/content/thumbnail/${page.value?.thumbnail}`,
  twitterImage: `/content/thumbnail/${page.value?.thumbnail}`,
  twitterCard: "summary_large_image",
  themeColor: "#00eaff",
  ogType: "website",
  ogUrl: "https://calibrum.4esport.fr/",
  ogLocale: "fr_FR",
  msapplicationTileColor: "#00eaff",
  author: "Mateleo",
  ogSiteName: "Calibrum",
  twitterSite: "Calibrum",
  twitterCreator: "Mateleo",
  mobileWebAppCapable: "yes",
  appleMobileWebAppTitle: "Calibrum",
  ogImageHeight: 1200,
  ogImageWidth: 630,
  ogImageType: "image/png"
})
</script>

<template>
  <main v-if="page" class="m-auto w-[94%] max-w-[1500px]">
    <BlogHeadline
      :date="page.date"
      :title="page.title"
      :description="page.description"
      :author="page.author"
      :tag="page.tag"
    ></BlogHeadline>
    <div class="grid grid-cols-9">
      <div class="col-span-9 lg:col-span-7 lg:pr-8">
        <ContentRenderer id="scroll" v-if="page" :value="page" class="text-md text-gray-300 md:text-justify" />
        <div class="mt-12 flex items-center justify-between border-b border-white/20 pb-12">
          <NuxtLink to="/blog" class="flex items-center">← Back to Blog</NuxtLink>
          <div>Socials WIP</div>
        </div>
        <div class="my-12 flex flex-col gap-12 md:grid md:grid-cols-2">
          <NuxtLink
            :to="`/blog${nextArticle.path}`"
            v-if="nextArticle"
            class="group flex h-[150px] flex-col rounded-xl border border-white/20 p-4 hover:bg-white/[2%]"
          >
            <div class="mb-2 flex">
              <Icon
                name="material-symbols:keyboard-double-arrow-left-rounded"
                size="2.5em"
                class="-ml-[6px] text-white/80 group-hover:text-[#00eaff]"
              ></Icon>
            </div>
            <div>
              <p class="custom font-semibold text-white">{{ nextArticle.title }}</p>
              <p class="custom mt-1 text-xs font-normal text-gray-400">{{ nextArticle.description }}</p>
            </div>
          </NuxtLink>
          <NuxtLink
            :to="`/blog${previousArticle.path}`"
            v-if="previousArticle"
            class="group col-start-2 flex h-[150px] flex-col rounded-xl border border-white/20 p-4 hover:bg-white/[2%]"
          >
            <div class="mb-2 flex flex-row-reverse">
              <Icon
                name="material-symbols:keyboard-double-arrow-right-rounded"
                size="2.5em"
                class="-ml-[6px] text-white/80 group-hover:text-[#00eaff]"
              ></Icon>
            </div>
            <div class="text-right">
              <p class="custom font-semibold text-white">{{ previousArticle.title }}</p>
              <p class="custom mt-1 text-xs font-normal text-gray-400">{{ previousArticle.description }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="hidden flex-col lg:col-span-2 lg:flex">
        <div class="sticky right-0 top-[60px]">
          <p class="custom mb-4 text-sm font-semibold text-white">Table des matières</p>
          <BlogNavigation class="text-sm" :toc="page.body?.toc" :activeSection="activeSection"></BlogNavigation>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main,
#scroll {
  scroll-behavior: smooth;
}
main :where(h1):not(.custom) {
  @apply mb-4 text-3xl font-bold text-white md:text-4xl;
  scroll-margin-top: 80px;
}
main :where(h2):not(.custom) {
  @apply mb-4 mt-10 text-xl font-bold text-white md:text-2xl;
  scroll-margin-top: 80px;
}
main :where(h3):not(.custom) {
  @apply mb-4 mt-8 text-lg font-semibold text-gray-200;
  scroll-margin-top: 80px;
}
main :where(a):not(.custom) {
  @apply font-medium text-[#00eaff];
}
main :where(hr) {
  @apply my-8;
}
main :where(h2 a, h3 a, h1 a):not(.custom) {
  @apply font-semibold text-white;
}
main :where(code:not(pre code)) {
  @apply truncate rounded-md border border-white/20 bg-white/[5%] px-[6px] pb-[3px] pt-[1px] font-medium text-white;
}
main :where(pre) {
  @apply mb-4 w-full rounded-md border border-white/20 bg-white/5 p-4;
}
main :where(pre > code) {
  font-family: "Fira Code";
  display: flex;
  flex-wrap: wrap;
}
main :where(pre > code > span) {
  display: flex;
  flex-wrap: wrap;
}
main :where(p):not(.custom) {
  @apply mb-4 text-[15px] leading-7 tracking-tight text-gray-400 md:text-[16px];
}
main :where(img):not(.custom) {
  @apply m-auto h-auto max-h-[400px] w-full max-w-[700px] object-contain;
}
main :where(ol li):not(.custom) {
  @apply mb-6 ml-8 list-decimal text-[15px] leading-7;
}

main :where(ul li):not(.custom) {
  @apply mb-2 ml-8 list-disc text-[15px] leading-7;
}
</style>
