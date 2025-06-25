import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
   try {
      const { user } = await requireAuth(event)
      const id = Number(getRouterParam(event, 'id'))
      const body = await readBody(event)

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

      // Проверяем, что задача принадлежит пользователю
      if (existingTask.userId !== user.id) {
         throw createError({
            statusCode: 403,
            statusMessage: 'Нет доступа к этой задаче'
         })
      }

      // Обновляем задачу
      const updatedTask = await prisma.task.update({
         where: { id },
         data: {
            title: body.title,
            description: body.description,
            dueDate: body.dueDate,
            isImportant: body.isImportant,
            isCompleted: body.isCompleted
         }
      })

      return updatedTask
   } catch (error: any) {
      throw createError({
         statusCode: error.statusCode || 500,
         statusMessage: error.message || 'Не удалось обновить задачу'
      })
   }
})