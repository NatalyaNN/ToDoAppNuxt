export default defineEventHandler(async (event) => {
   const { auth } = event.context
   if (!auth?.user?.id) {
      throw createError({ statusCode: 401, message: "Unauthorized" })
   }
   return auth.user
})

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