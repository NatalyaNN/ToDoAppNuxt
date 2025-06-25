<script setup>
import { ref } from 'vue'

// Создание задачи для пользователя с userId=1
await prisma.task.create({
  data: {
    title: "Купить молоко",
    userId: 1,
    isImportant: true
  }
});

const tasks = await prisma.user.findUnique({
  where: { id: 1 },
  include: { tasks: true }
});

const { data: task, status } = await useFetch<Task[]>("/", { /* Ошибка: Выражение доступа к элементу должно принимать аргумент */
  method: "GET",
  default: () => [],
});

const showForm = ref(false)
const taskToEdit = ref(null)

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('ru-RU')
}

function editTask(task) {
  taskToEdit.value = task
  showForm.value = true
}

function handleFormCancel() {
  showForm.value = false
  taskToEdit.value = null
}

function deleteTask(id) {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

async function handleTaskSubmit(taskData) {
  try {
    if (taskData.id) {
      // Обновление задачи
      await $fetch(`/api/tasks/${taskData.id}`, {
        method: 'PUT',
        body: taskData
      })
    } else {
      // Создание новой задачи
      await $fetch('/api/tasks', {
        method: 'POST',
        body: taskData
      })
    }
    
    // Обновляем список задач
    const { data } = await $fetch('/api/tasks')
    tasks.value = data
    showForm.value = false
    taskToEdit.value = null
    
  } catch (error) {
    console.error('Ошибка сохранения задачи:', error)
  }
}

</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <AddTask @click="showForm = true" />

    <TaskForm
      v-if="showForm"
      :editing-task="taskToEdit"
      @submit="handleTaskSubmit"
      @cancel="handleFormCancel"
    />

    <div v-else class="grid gap-4 my-4">
      <div 
        v-for="task in tasks" 
        :key="task.id"
        class="p-4 border rounded-lg hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between">
          <h3 class="font-bold mb-3">{{ task.title }}</h3>
          <Icon v-if="isImportant" class="bg-red-600 text-[32px]" name="material-symbols:bookmark-star" />
        </div>
        <p class="text-gray-600">{{ task.description }}</p>
        <div class="flex justify-between items-center mt-2">
          <span class="text-sm text-gray-500">
            {{ task.dueDate ? formatDate(task.dueDate) : 'Без срока' }}
          </span>
          <div class="space-x-2">
            <button 
              @click="editTask(task)"
              class="text-blue-600 hover:text-blue-800"
            >
              Редактировать
            </button>
            <button 
              @click="deleteTask(task.id)"
              class="text-red-600 hover:text-red-800"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
