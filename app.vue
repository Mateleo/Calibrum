<script lang="ts" setup>
useHead({
  title: "Calibrum 🌠",
  meta: [
    {
      name: "description",
      content: "Calibrum : La nouvelle référence pour les joueurs LoL de 4eSport."
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://calibrum.4esport.fr/" },
    { property: "og:title", content: "Phoenix Development" },
    {
      property: "og:description",
      content: "Calibrum : La nouvelle référence pour les joueurs LoL de 4eSport."
    },
    { name: "twitter:title", content: "Calibrum 🌠" },
    {
      name: "twitter:description",
      content: "Calibrum : La nouvelle référence pour les joueurs LoL de 4eSport."
    }
  ],
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.ico"
    }
  ]
})
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  background-color: #12171c;
  color: white;
  font-family: "Inter";
  color-scheme: dark;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.15s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.2rem);
}
</style>
