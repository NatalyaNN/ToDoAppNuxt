import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../../utils/password'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
   const body = await readBody(event)

   // Валидация
   if (!body.email || !body.password) {
      throw createError({
         statusCode: 400,
         statusMessage: 'Email и пароль обязательны'
      })
   }

   // Проверка на существующего пользователя
   const existingUser = await prisma.user.findUnique({
      where: { email: body.email }
   })

   if (existingUser) {
      throw createError({
         statusCode: 400,
         statusMessage: 'Пользователь с таким email уже существует'
      })
   }

   // Создание пользователя
   const user = await prisma.user.create({
      data: {
         email: body.email,
         password: await hashPassword(body.password),
         name: body.name || ''
      }
   })

   return {
      id: user.id,
      email: user.email,
      name: user.name
   }
})