import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/constants'

export default defineEventHandler(async (event) => {
   // Пропускаем аутентификацию для публичных эндпоинтов
   const publicRoutes = ['/api/auth/login', '/api/auth/register']
   if (publicRoutes.includes(event.path)) return

   // Получаем токен из cookies или headers
   const token = getCookie(event, 'auth_token') ||
      getHeader(event, 'Authorization')?.replace('Bearer ', '')

   if (!token) {
      throw createError({
         statusCode: 401,
         statusMessage: 'Требуется авторизация'
      })
   }

   try {
      // Проверяем и декодируем токен
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number }

      // Добавляем пользователя в контекст
      event.context.auth = { user: { id: decoded.id } }
   } catch (err) {
      throw createError({
         statusCode: 401,
         statusMessage: 'Недействительный токен'
      })
   }
})