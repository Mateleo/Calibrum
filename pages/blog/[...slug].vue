<script lang="ts" setup>
const route = useRoute()
const articlePath = route.path.substring(5)
const { data: page } = await useAsyncData(articlePath, () => {
  return queryCollection("content").path(articlePath).first()
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

const sectionIds = computed(() => page.value?.body?.toc?.links?.map((link: any) => link.id) ?? [])

const activeSection = useScrollspy(sectionIds)
</script>

<template>
  <main v-if="page" class="m-auto w-[98%] max-w-[1500px] md:w-[95%]">
    <BlogHeadline
      :date="page.date"
      :title="page.title"
      :description="page.description"
      :author="page.author"
      :tag="page.tag"
    ></BlogHeadline>
    <div class="grid grid-cols-9">
      <div class="col-span-9 lg:col-span-7 lg:pr-8">
        <ContentRenderer id="scroll" v-if="page" :value="page" class="text-md text-justify text-gray-300" />
        <div class="mt-12 flex items-center justify-between border-b border-white/20 pb-12">
          <NuxtLink to="/blog" class="flex items-center">← Back to Blog</NuxtLink>
          <div>Socials WIP</div>
        </div>
        <div class="my-12 grid grid-cols-2 gap-12">
          <div class="h-[150px] rounded-xl border border-white/20">Previous article</div>
          <div class="h-[150px] rounded-xl border border-white/20">Next article</div>
        </div>
      </div>
      <div class="hidden flex-col lg:col-span-2 lg:flex">
        <div class="sticky right-0 top-[60px]">
          <p class="text-sm font-semibold text-white">Table des matières</p>
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
  @apply mb-4 text-4xl font-bold text-white;
  scroll-margin-top: 80px;
}
main :where(h2):not(.custom) {
  @apply mb-4 mt-10 text-2xl font-bold text-white;
  scroll-margin-top: 80px;
}
main :where(h3):not(.custom) {
  @apply mb-4 mt-8 text-xl font-semibold text-white;
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
  @apply mb-4 rounded-md border border-white/20 bg-white/5 p-4 text-[14px];
}
main :where(pre > code) {
  font-family: "Fira Code";
}
main :where(p):not(.custom) {
  @apply mb-4 text-[16px] leading-7 tracking-tight;
}
main :where(img):not(.custom) {
  @apply m-auto w-full max-w-[700px];
}
main :where(ol li):not(.custom) {
  @apply mb-6 ml-8 list-decimal text-[15px] leading-7;
}

main :where(ul li):not(.custom) {
  @apply mb-2 ml-8 list-disc text-[15px] leading-7;
}
</style>
