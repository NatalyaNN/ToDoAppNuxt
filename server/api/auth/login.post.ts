// import {z} from 'zod'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, TOKEN_EXPIRES } from '~/server/utils/constants'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// import prisma from '@prisma/client';

/*
const bodySchema = z.object({
   email: z.string().email(),
   password: z.string().min(8),
});
*/

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

   return { user: { id: user.id, email: user.email }, token }
});