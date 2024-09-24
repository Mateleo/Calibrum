// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@nuxt/image-edge", "nuxt-scheduler", "nuxt-og-image", "@nuxt/fonts"],

  runtimeConfig: {
    RIOT_API_KEY: process.env.NUXT_RIOT_API_KEY,
    CURRENT_SEASON: 'S142'
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Calibrum 🌠",
    },
  },

  // ogImage: {
  //   runtimeBrowser: true,
  //   siteUrl: "https://calibrum.4esport.fr",
  //   runtimeCacheStorage: {
  //     driver: "fs",
  //     base: "./cache/db"
  //   }
  // },

  nitro: {
    node: true,
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  typescript: {
    shim: false,
  },
});
