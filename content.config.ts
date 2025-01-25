import { defineContentConfig, defineCollection, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        tag: z.string(),
        date: z.string(),
        author: z.string(),
        thumbnail: z.string()
      })
    })
  }
})
