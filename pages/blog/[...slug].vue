<script lang="ts" setup>
const route = useRoute()
const articlePath = route.path.substring(5)
const { data: page } = await useAsyncData(articlePath, () => {
  return queryCollection("content").path(articlePath).first()
})
</script>

<template>
  <main v-if="page" class="m-auto w-[98%] max-w-[1300px] md:w-[95%]">
    <BlogHeadline
      :date="page.date"
      :title="page.title"
      :description="page.description"
      :author="page.author"
      :tag="page.tag"
    ></BlogHeadline>
    <div class="grid grid-cols-9">
      <ContentRenderer
        v-if="page"
        :value="page"
        class="text-md col-span-9 text-justify text-gray-300 lg:col-span-7 lg:pr-8"
      />
      <div class="hidden flex-col lg:col-span-2 lg:flex">
        <div class="sticky right-0 top-[60px]">
          <p class="text-sm font-semibold text-white">Table des matières</p>
          <BlogNavigation class="text-sm" :toc="page.body?.toc"></BlogNavigation>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main :where(h1):not(.custom) {
  @apply mb-4 text-4xl font-bold text-white;
  scroll-margin-top: 60px;
}
main :where(h2):not(.custom) {
  @apply mb-4 mt-10 text-2xl font-bold text-white;
  scroll-margin-top: 60px;
}
main :where(h3):not(.custom) {
  @apply mb-4 mt-8 text-xl font-bold text-white;
  scroll-margin-top: 60px;
}
main :where(a) {
  @apply font-medium text-[#00DC82];
}
main :where(hr) {
  @apply my-8;
}
main :where(h2 a, h3 a, h1 a) {
  @apply font-bold text-white;
}
main :where(div ul li a) {
  @apply font-normal text-white/80;
}
main :where(code:not(pre code)) {
  @apply rounded-md border border-white/20 bg-white/[5%] px-[6px] pb-[3px] pt-[1px] font-medium text-white;
}
main :where(pre) {
  @apply mb-4 rounded-md border border-white/20 bg-white/5 p-4 text-xs;
}
main :where(pre > code) {
  font-family: "Fira Code";
}
main :where(p):not(.custom) {
  @apply mb-4 leading-7 tracking-tight;
}
main :where(ol li):not(.custom) {
  @apply mb-6 ml-8 list-decimal leading-7;
}

main :where(ul li):not(.custom) {
  @apply mb-2 ml-8 list-disc leading-7;
}
</style>
