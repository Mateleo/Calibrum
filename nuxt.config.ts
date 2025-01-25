// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-scheduler",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxt/content",
    "dayjs-nuxt",
    "nuxt-shiki"
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
  dayjs: {
    locales: ["en"],
    plugins: ["relativeTime", "utc", "timezone", "customParseFormat"],
    defaultLocale: "en",
    defaultTimezone: "Europe/Paris"
  },
  fonts: {
    defaults: {
      weights: [200, 300, 400, 500, 600, 700]
    }
  },
  // content: {
  //   build: {
  //     markdown: {
  //       highlight: {
  //         theme: "dracula"
  //       }
  //     }
  //   }
  // },
  shiki: {
    defaultTheme: {
      dark: "ayu-dark",
      light: "ayu-dark"
    },
    bundledLangs: ["sh", "js", "ts"]
  },
  compatibilityDate: "2025-01-18"
})
