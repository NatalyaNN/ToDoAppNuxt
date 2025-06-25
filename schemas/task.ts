import { z } from "zod/v4";

export const CREATE_TASK_MAX_LENGTH = 200; // эту константу используем в форме

export const createTaskSchema = z.object({
   title: z
      .string({
         message: "Введите заголовок задачи",
      })
      .max(255, {
         message: "Максимальная длина 255 знаков",
      }),
   userId: z
      .int(),
   dueDate: z
      .date(),
   isImportant: z
      .boolean(),
   isCompleted: z
      .boolean(),
   description: z
      .string(),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;