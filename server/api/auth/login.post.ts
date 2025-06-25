// import {z} from 'zod'
// import jwt from 'jsonwebtoken'
// import { JWT_SECRET, TOKEN_EXPIRES } from '~/server/utils/constants'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ------------------------------------------------------------

import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../utils/constants'
import { comparePasswords } from '../../utils/password'

export default defineEventHandler(async (event) => {
   const body = await readBody(event)

   // 1. Находим пользователя (пример для Prisma)
   const user = await prisma.user.findUnique({
      where: { email: body.email }
   })

   // 2. Проверяем пароль
   if (!user || !(await comparePasswords(body.password, user.password))) {
      throw createError({
         statusCode: 401,
         statusMessage: 'Неверный email или пароль'
      })
   }

   // 3. Генерируем токен
   const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '2h' }
   )

   // 4. Устанавливаем cookie
   setCookie(event, 'auth_token', token, {
      httpOnly: true,
      maxAge: 7200, // 2 часа
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
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

// ------------------------------------------------------------

/*
const bodySchema = z.object({
   email: z.string().email(),
   password: z.string().min(8),
});
*/

/*
export default defineEventHandler(async (event) => {
   // const {email, password} = await readValidatedBody(event, bodySchema.parse);

   const body = await readBody(event)

   // 1. Проверяем пользователя в БД (пример для Prisma)
   const user = await prisma.user.findUnique({
      where: { email: body.email }
   })

   if (!user || !(await comparePasswords(body.password, user.password))) {
      throw createError({
         statusCode: 401,
         statusMessage: 'Неверный email или пароль'
      })
   }

   // 2. Генерируем токен
   const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES }
   )

   // 3. Устанавливаем cookie
   setCookie(event, 'auth_token', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60, // 2 часа
      sameSite: 'strict'
   })
   return { user: { id: user.id, email: user.email }, token }
});
*/
   /*
   if (email === 'admin@admin.com' && password === 'iamtheadmin') {
      await setUserSession(event, {
         user: {
            name: 'John Doe',
         },
      });
      return {};
   }
   throw createError({
      statusCode: 401,
      message: 'Bad credentials',
   });
   */

