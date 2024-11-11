// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/style/global.css'],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL,
      apiKey: process.env.API_KEY,
    },
  },
  app: {
    baseURL: '/yumemi-vue/',
    head: {
      title: '人口推移グラフ',
      htmlAttrs: {
        lang: 'ja',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/yumemi-vue/favicon.ico' },
      ],
    },
  },
  typescript: {
    tsConfig: {
      extends: '@tsconfig/strictest/tsconfig.json',
      compilerOptions: {
        noImplicitReturns: false, // For middleware
      },
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    exposeConfig: true,
    configPath: 'tailwind.config',
  },
});
