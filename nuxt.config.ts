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
  /*
  auth: {
    // Включаем глобальный middleware для защиты всех маршрутов
    enableGlobalAppMiddleware: true,
    // Базовый URL вашего API (используем mock-сервер для примера)
    baseURL: 'http://localhost:3001/api/auth'
  },
  */
  /*
  auth: {
    // Используем 'session' для Nuxt 3 (вместо 'local' или 'authjs')
    session: {
      // Включить сессии (нужно для работы)
      enable: true,
    },
    provider: {
      type: 'authjs', // Используем 'authjs' как основной провайдер
    },
    globalMiddleware: true, // Глобальный middleware для защиты маршрутов
    baseURL: '/api/auth', // Базовый URL для API аутентификации
    endpoints: {
      signIn: { path: '/login', method: 'post' },
      signOut: { path: '/logout', method: 'post' },
      signUp: { path: '/register', method: 'post' },
      getSession: { path: '/user', method: 'get' }
    },
    redirect: {
      login: '/login',   // Куда перенаправлять для входа
      logout: '/',       // Куда перенаправлять после выхода
      // home: '/dashboard' // Куда перенаправлять после успешного входа
    }
  },
  */
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    'nuxt-auth-utils',
  ],
});