<script setup lang="ts">
import type { Task } from '~/types/task'

const showForm = ref(false)
const taskToEdit = ref<Task | null>(null)
const tasks = ref<Task[]>([])

// Загрузка задач
const { data, pending, error } = await useFetch<Task[]>('/api/tasks', {
  method: 'GET',
  default: () => []
})

// Инициализация задач после загрузки
if (data.value) {
  tasks.value = data.value
}

// Форматирование даты
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ru-RU')
}

// Редактирование задачи
function editTask(task: Task) {
  taskToEdit.value = task
  showForm.value = true
}

// Удаление задачи
async function deleteTask(id: number) {
  try {
    await $fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    })
    tasks.value = tasks.value.filter(task => task.id !== id)
  } catch (err) {
    console.error('Ошибка удаления:', err)
  }
}

// Обработка сохранения задачи
async function handleTaskSubmit(taskData: Task) {
  try {
    if (taskData.id) {
      // Обновление существующей задачи
      const updatedTask = await $fetch(`/api/tasks/${taskData.id}`, {
        method: 'PUT',
        body: taskData
      })
      tasks.value = tasks.value.map(t => t.id === updatedTask.id ? updatedTask : t)
    } else {
      // Создание новой задачи
      const newTask = await $fetch('/api/tasks', {
        method: 'POST',
        body: taskData
      })
      tasks.value.unshift(newTask)
    }
    
    showForm.value = false
    taskToEdit.value = null
    
  } catch (error) {
    console.error('Ошибка сохранения:', error)
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <button 
      @click="showForm = true"
      class="my-4 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
    >
      + Добавить задачу
    </button>

    <TaskForm
      v-if="showForm"
      :editing-task="taskToEdit"
      @submit="handleTaskSubmit"
      @cancel="() => { showForm = false; taskToEdit = null }"
    />

    <div v-if="pending" class="text-center py-4">Загрузка задач...</div>
    <div v-else-if="error" class="text-red-500">Ошибка загрузки: {{ error.message }}</div>
    
    <div v-else class="grid gap-4">
      <div 
        v-for="task in tasks" 
        :key="task.id"
        class="p-4 border rounded-lg hover:shadow-md transition-shadow"
        :class="{ 'border-red-200': task.isImportant }"
      >
        <div class="flex justify-between">
          <h3 class="font-bold">{{ task.title }}</h3>
          <Icon 
            v-if="task.isImportant" 
            name="material-symbols:bookmark" 
            class="text-yellow-500 text-xl" 
          />
        </div>
        <p v-if="task.description" class="text-gray-600 mt-2">{{ task.description }}</p>
        <div class="flex justify-between items-center mt-3">
          <span class="text-sm text-gray-500">
            {{ task.dueDate ? formatDate(task.dueDate.toDateString()) : 'Без срока' }}
          </span>
          <div class="space-x-2">
            <button 
              @click="editTask(task)"
              class="text-blue-600 hover:text-blue-800 text-sm"
            >
              Редактировать
            </button>
            <button 
              @click="deleteTask(task.id)"
              class="text-red-600 hover:text-red-800 text-sm"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>