import { verify } from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/constants' // Создайте этот файл с константами

export default defineEventHandler(async (event) => {
   // 1. Получаем токен из cookies или headers
   const token = getCookie(event, 'auth_token') ||
      getHeader(event, 'Authorization')?.split(' ')[1]

   if (!token) {
      throw createError({
         statusCode: 401,
         statusMessage: 'Требуется авторизация'
      })
   }

   // 2. Проверяем токен
   try {
      const decoded = verify(token, JWT_SECRET)
      event.context.auth = { user: decoded }
   } catch (err) {
      throw createError({
         statusCode: 401,
         statusMessage: 'Недействительный токен'
      })
   }
})

/*
export default defineNuxtRouteMiddleware(() => {
   const { loggedIn } = useUserSession()

   // redirect the user to the login screen if they're not authenticated
   if (!loggedIn.value) {
      return navigateTo('/login')
   }
})
*/