export interface Task {
   id: number
   title: string
   description?: string | null
   isImportant: boolean
   dueDate?: (Date | null) | undefined
   isCompleted: boolean
   userId: number
   createdAt: Date
   updatedAt: Date
}