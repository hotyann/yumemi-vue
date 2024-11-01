// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_BASE_URL: 'https://yumemi-frontend-engineer-codecheck-api.vercel.app',
    },
    API_KEY: '8FzX5qLmN3wRtKjH7vCyP9bGdEaU4sYpT6cMfZnJ',
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
