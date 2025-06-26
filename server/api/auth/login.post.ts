import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../utils/constants'
import { comparePasswords } from '../../utils/password'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
   const body = await readBody(event)

   // Находим пользователя
   const user = await prisma.user.findUnique({
      where: { email: body.email }
   })

   // Проверяем пароль
   if (!user || !(await comparePasswords(body.password, user.password))) {
      throw createError({
         statusCode: 401,
         statusMessage: 'Неверный email или пароль'
      })
   }

   // Генерируем токен
   const token = jwt.sign(
      {
         id: user.id,
         email: user.email
      },
      JWT_SECRET,
      { expiresIn: '2h' }
   )

   // Устанавливаем cookie
   setCookie(event, 'auth_token', token, {
      httpOnly: true,
      maxAge: 7200, // 2 часа
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
   })

   return {
      user: {
         id: user.id,
         email: user.email,
         name: user.name
      },
      token
   }
})
