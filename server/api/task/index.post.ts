import { createTaskSchema } from "~/schemas/task";
import { db } from "~/server/db";

export default defineEventHandler(async (event) => {
   const body = await readBody(event);

   const bodyParsed = await createTaskSchema.safeParseAsync(body);

   if (!bodyParsed.success) {
      throw createError({
         message: bodyParsed.error.issues[0].message,
         status: 422,
      });
   }

   const task = await db.task.create({
      data: {
         userId: bodyParsed.data.userId,
         title: bodyParsed.data.title,
         dueDate: bodyParsed.data.dueDate,
         isImportant: bodyParsed.data.isImportant,
         isCompleted: bodyParsed.data.isCompleted,
         description: bodyParsed.data.description,
      },
   });

   return task;
});