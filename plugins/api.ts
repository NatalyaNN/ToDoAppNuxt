export default defineNuxtPlugin(() => {
   const $fetch = globalThis.$fetch.create({
      onRequest({ options }) {
         // Добавляем токен к каждому запросу
         const token = localStorage.getItem('auth_token')
         if (token) {
            options.headers = {
               ...options.headers,
               Authorization: `Bearer ${token}`
            }
         }
      },
      onResponseError({ response }) {
         // Перенаправляем на логин при 401 ошибке
         if (response.status === 401) {
            navigateTo('/login')
         }
      }
   })
})