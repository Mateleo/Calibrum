// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "nuxt-icon",'@nuxt/image-edge'],  
  googleFonts: {
    families: {
      Inter: {
        wght: [100, 400, 600, 700],
      },
    },
  },
  image: {
    dir: 'assets/img',
},
});
