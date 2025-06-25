import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
   try {
      // Проверяем авторизацию
      const { user } = await requireAuth(event)

      // Получаем задачи только для текущего пользователя
      const tasks = await prisma.task.findMany({
         where: { userId: user.id },
         orderBy: { createdAt: 'desc' }
      })

      return tasks
   } catch (error: any) {
      throw createError({
         statusCode: error.statusCode || 500,
         statusMessage: error.message || 'Не удалось загрузить задачи'
      })
   }
})