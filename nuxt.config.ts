// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-icon",
    "@nuxt/image-edge",
    "nuxt-scheduler",
    "nuxt-og-image"
  ],
  googleFonts: {
    families: {
      Inter: {
        wght: [100, 300, 400, 500, 600, 700]
      }
    }
  },
  runtimeConfig: {
    RIOT_API_KEY: process.env.NUXT_RIOT_API_KEY
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Calibrum 🌠"
    }
  },
  ogImage: {
    runtimeBrowser: true,
    siteUrl: "https://dev.calibrum.4esport.fr",
    runtimeCacheStorage:{
      driver: "fs",
      base: './cache/db'
    }
  },
  nitro: {
    node: true,
  }
})
