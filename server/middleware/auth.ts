// ~/server/middleware/auth.ts
import jwt from 'jsonwebtoken'
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
      const decoded = jwt.verify(token, JWT_SECRET)
      event.context.auth = { user: decoded }
   } catch (err) {
      throw createError({
         statusCode: 401,
         statusMessage: 'Недействительный токен'
      })
   }
})

/*
export default defineEventHandler(async (event) => {
   const { auth } = event.context
   if (!auth?.user?.id) {
      throw createError({ statusCode: 401, message: "Unauthorized" })
   }
   return auth.user
})
*/
/*
export default defineEventHandler(async (event) => {
  const user = await requireAuth(event) // Теперь работает
  const body = await readBody(event)
  
  return prisma.task.create({
    data: {
      ...body,
      userId: user.id
    }
  })
})
*/