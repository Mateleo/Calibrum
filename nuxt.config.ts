// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-scheduler",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@vueuse/nuxt",
    "dayjs-nuxt",
    "nuxt-shiki",
    "@nuxtjs/seo",
    "@nuxt/content"
  ],

  runtimeConfig: {
    RIOT_API_KEY: process.env.NUXT_RIOT_API_KEY,
    CURRENT_SEASON: "S15"
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" }
  },

  // ogImage: {
  //   runtimeBrowser: true,
  //   siteUrl: "https://calibrum.4esport.fr",
  //   runtimeCacheStorage: {
  //     driver: "fs",
  //     base: "./cache/db"<
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
        const urls = await response.json()
        return urls
      } catch (error) {
        console.error("Error fetching URLs:", error)
        return []
      }
    }
  },
  site: {
    url: "https://calibrum.4esport.fr",
    name: "Calibrum"
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
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3
        }
      }
    }
  },
  shiki: {
    defaultTheme: {
      dark: "ayu-dark",
      light: "ayu-dark"
    },
    bundledLangs: ["sh", "js", "ts"]
  },
  hooks: {
    close: (nuxt) => {
      if (!nuxt.options._prepare) process.exit()
    }
  },
  compatibilityDate: "2025-01-18"
})
