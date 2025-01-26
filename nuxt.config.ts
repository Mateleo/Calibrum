// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-scheduler",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxtjs/seo"
  ],

  runtimeConfig: {
    RIOT_API_KEY: process.env.NUXT_RIOT_API_KEY,
    CURRENT_SEASON: "S15"
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Calibrum 🌠"
    }
  },

  // ogImage: {
  //   runtimeBrowser: true,
  //   siteUrl: "https://calibrum.4esport.fr",
  //   runtimeCacheStorage: {
  //     driver: "fs",
  //     base: "./cache/db"
  //   }
  // },
  devtools: {
    enabled: true
  },
  nitro: {
    imports: {
      dirs: ["server/utils/**"]
    }
  },
  image: {
    domains: ["https://raw.communitydragon.org"]
  },
  sitemap: {
    urls: async () => {
      try {
        const response = await fetch("https://calibrum.4esport.fr/api/urls")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const urls = await response.json() // Assuming the response is a JSON array of strings
        console.log(urls)
        return urls
      } catch (error) {
        console.error("Error fetching URLs:", error)
        return [] // Return an empty array or handle the error as needed
      }
    }
  },
  compatibilityDate: "2025-01-18"
})
