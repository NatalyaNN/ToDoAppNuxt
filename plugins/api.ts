export default defineNuxtPlugin(() => {
   const fetch = $fetch.create({
      async onRequest({ request, options }) {
         // Получаем токен (только на клиенте)
         const token = process.client ? localStorage.getItem('auth_token') : null

         if (token) {
            // Создаем новый объект заголовков
            const headers = new Headers(options.headers)
            headers.set('Authorization', `Bearer ${token}`)
            options.headers = headers
         }
      },
      onResponseError({ response }) {
         if (process.client && response?.status === 401) {
            navigateTo('/login')
         }
      }
   })

   return {
      provide: {
         api: fetch
      }
   }
})