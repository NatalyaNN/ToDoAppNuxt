import { PrismaClient } from '@prisma/client'
import { requireAuth } from '~/server/utils/auth'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
   const session = await requireAuth(event) // auth-хелпер
   const body = await readBody(event)

   if (!body.title) {
      throw createError({ statusCode: 400, message: "Title is required" })
   }

   return prisma.task.create({ /* Ошибка: Не удается найти имя "prisma". */
      data: {
         title: body.title,
         description: body.description,
         userId: session.user.id // Привязка к авторизованному пользователю
      }
   })
})