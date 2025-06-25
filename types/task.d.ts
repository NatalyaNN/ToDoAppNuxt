export interface Task {
   id: number
   title: string
   description?: string | null
   dueDate?: Date | null
   isCompleted: boolean
   userId: number
   createdAt: Date
   updatedAt: Date
}