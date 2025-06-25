// ~/server/utils/auth.ts
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './constants'

const prisma = new PrismaClient()

export const requireAuth = async (event: any) => {
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
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number }

      // 3. Проверяем существование пользователя в БД
      const user = await prisma.user.findUnique({
         where: { id: decoded.id },
         select: { id: true, email: true, name: true }
      })

      if (!user) {
         throw createError({
            statusCode: 401,
            statusMessage: 'Пользователь не найден'
         })
      }

      return { user }
   } catch (err) {
      throw createError({
         statusCode: 401,
         statusMessage: 'Недействительный токен'
      })
   }
}