import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
   try {
      const { user } = await requireAuth(event)
      const id = Number(getRouterParam(event, 'id'))

      // Проверяем существование задачи
      const existingTask = await prisma.task.findUnique({
         where: { id }
      })

      if (!existingTask) {
         throw createError({
            statusCode: 404,
            statusMessage: 'Задача не найдена'
         })
      }

      // Проверяем принадлежность задачи
      if (existingTask.userId !== user.id) {
         throw createError({
            statusCode: 403,
            statusMessage: 'Нет доступа к этой задаче'
         })
      }

      // Удаляем задачу
      await prisma.task.delete({
         where: { id }
      })

      return { success: true }
   } catch (error: any) {
      throw createError({
         statusCode: error.statusCode || 500,
         statusMessage: error.message || 'Не удалось удалить задачу'
      })
   }
})