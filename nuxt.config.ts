// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'ToDoApp',
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'},
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
  routeRules: {
    '/tasks/**': {
      ssr: false,
      appMiddleware: 'authenticated'
    }
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    'nuxt-auth-utils',
    '@pinia/nuxt',
  ],
  nitro: {
    preset: 'node-server',
    routeRules: {
      '/api/**': {
        cors: true,
        headers: { 'Access-Control-Allow-Credentials': 'true' }
      }
    }
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'your-very-secret-key'
  },
});

