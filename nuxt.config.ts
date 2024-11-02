// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseURL: 'https://yumemi-frontend-engineer-codecheck-api.vercel.app',
      apiKey: '8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ',
    },
  },
  app: {
    baseURL: '/yumemi-vue/',
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
