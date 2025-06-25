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
      middleware: 'auth' /* Ошибка: Объектный литерал может указывать только известные свойства, но "middleware" не существует в типе "{ cache?: false | { base?: string | undefined; integrity?: any; swr?: boolean | undefined; name?: string | undefined; group?: string | undefined; maxAge?: number | undefined; staleMaxAge?: number | undefined; headersOnly?: boolean | undefined; varies?: (string | undefined)[] | ... 1 more ... | undefined; } | undefin...". Вы хотели записать "appMiddleware"? */
    }
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    'nuxt-auth-utils',
  ],
  nitro: {
    preset: 'node-server',
    routeRules: {
      '/api/**': { cors: true }
    }
  }
});

