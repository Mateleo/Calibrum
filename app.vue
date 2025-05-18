<script lang="ts" setup>
useSeoMeta({
  title: "Calibrum 🌠",
  titleTemplate: "Calibrum 🌠",
  twitterTitle: "Calibrum 🌠",
  ogTitle: "Calibrum 🌠",
  description: "Calibrum : La nouvelle référence pour les joueurs LoL de 4eSport.",
  ogDescription: "Calibrum : La nouvelle référence pour les joueurs LoL de 4eSport.",
  twitterDescription: "Calibrum : La nouvelle référence pour les joueurs LoL de 4eSport.",
  themeColor: "#0EA5E9",
  ogImage: "https://calibrum.4esport.fr/img/logo.png",
  ogType: "website",
  twitterCard: "summary",
  twitterImage: "https://calibrum.4esport.fr/img/logo.png",
  ogUrl: "https://calibrum.4esport.fr",
  ogLocale: "fr_FR",
  msapplicationTileColor: "#0EA5E9",
  author: "Mateleo",
  ogSiteName: "Calibrum 🌠",
  twitterSite: "Calibrum 🌠",
  twitterCreator: "Mateleo",
  appleMobileWebAppTitle: "Calibrum 🌠"
})

useHead({
  htmlAttrs: {
    lang: "en"
  },
  bodyAttrs: {
    class: "dark bg-[#12171c]"
  },
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
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>

<style>
:root {
  background-color: #12171c;
  color: white;
  font-family: "Poppins";
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
