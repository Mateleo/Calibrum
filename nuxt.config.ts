// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image-edge", "nuxt-scheduler", "nuxt-og-image", "@nuxt/fonts", "@nuxt/icon"],

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
  compatibilityDate: "2025-01-18"
})
