import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/constants'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
   // Пропускаем аутентификацию для публичных эндпоинтов
   const publicRoutes = ['/api/auth/login', '/api/auth/register', '/', '/login', '/register', '/api/__nuxt_error']
   if (publicRoutes.includes(event.path)) return

   // Получаем токен из cookies или headers
   const token = getCookie(event, 'auth_token') ||
      getHeader(event, 'Authorization')?.replace('Bearer ', '').trim()

   if (!token) {
      throw createError({
         statusCode: 401,
         message: 'Требуется авторизация'
      })
   }

   try {
      // Проверяем и декодируем токен
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number, email: string }

      const user = await prisma.user.findUnique({
         where: { id: decoded.id },
         select: { id: true, email: true, name: true }
      })

      if (!user) {
         throw createError({
            statusCode: 401,
            message: 'Пользователь не найден'
         })
       }

      // Добавляем пользователя в контекст
      event.context.auth = { user }
   } catch (err) {
      console.error('JWT Error:', err)
      throw createError({
         statusCode: 401,
         message: 'Недействительный токен'
      })
   }
})