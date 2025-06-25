export default defineNuxtPlugin(() => {
   const $fetch = globalThis.$fetch.create({
      async onRequest({ options }) {
         // Добавляем токен к каждому запросу
         const token = process.client ? localStorage.getItem('auth_token') : null

         if (token) {
            options.headers = {
               ...options.headers as unknown as Record<string, string>, // Приводим к нужному типу
               Authorization: `Bearer ${token}`
            }
         }
      },
      onResponseError({ response }) {
         // Перенаправляем на логин при 401 ошибке
         if (response?.status === 401 && process.client) {
            navigateTo('/login')
         }
      }
   })

   // Делаем $fetch доступным через useNuxtApp()
   return {
      provide: {
         api: $fetch
      }
   }
})