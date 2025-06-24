<script setup lang="ts">
 import { ref, watch } from 'vue'

//  import { type Task } from "@prisma/client"

 // ------------------------------------------------------------
 
 // импортируем схему, типы и методы из vee-validate
import {
  CREATE_TASK_MAX_LENGTH,
  createTaskSchema,
  type CreateTaskSchema
} from "~/schemas/task";

// import type { ThoughtInputRef } from "./props";

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

/*
// инициализируем Props, чтобы потом отобразить ошибку
interface Props {
  error?: string;
}

defineProps<Props>();
*/

/*
// инициализируем emit, чтобы прослушивать submit в компоненте-родителе
const emit = defineEmits<{
  (event: "submit", data: CreateTaskSchema): void;
}>();
*/

// инициализируем форму vee-validate
const formVal = useForm({
  validationSchema: toTypedSchema(createTaskSchema),
  // title: '',
  // description: '',
  // dueDate: '',
  // isImportant: false,
});

/*
const handleSubmit = form.handleSubmit((data) => {
  emit("submit", data);
});
*/
 
 // ------------------------------------------------------------
 
 const props = defineProps({
   editingTask: {
     type: Object,
     default: null
   }
 })
 
 const emit = defineEmits(['submit', 'cancel'])
 

 const form = ref({
   title: '',
   description: '',
   dueDate: '',
   isImportant: false
 });

 
 const isSubmitting = ref(false)
 
 // Заполняем форму при редактировании
 watch(() => props.editingTask, (task) => {
   if (task) {
     form.value = {
       title: task.title,
       description: task.description,
       dueDate: task.dueDate?.split('T')[0] || '',
       isImportant: task.isImportant || false
     }
   } else {
     resetForm()
   }
 }, { immediate: true })
 
 function resetForm() {
   form.value = {
     title: '',
     description: '',
     dueDate: '',
     isImportant: false
   }
 }

import type { TaskFormRef } from "./types";
import type { Task } from '@prisma/client';

// defineExpose<TaskInputRef>({
//   handleResetForm: () => {
//     form.resetForm();
//   },
// });
 
 async function handleSubmit() {
   isSubmitting.value = true
   try {
     await emit('submit', {
       ...form.value,
       id: props.editingTask?.id
     })
     resetForm()
   } finally {
     isSubmitting.value = false
   }
 }
 </script>

<template>
   <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
     <h2 class="text-xl font-semibold mb-4">
       {{ editingTask ? 'Редактировать задачу' : 'Добавить новую задачу' }}
     </h2>
     
     <form @submit.prevent="handleSubmit">
       <div class="mb-4">
         <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
           Название задачи *
         </label>
         <input
           id="title"
           v-model="form.title"
           type="text"
           required
           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
           placeholder="Название задачи"
         >
       </div>
 
       <div class="mb-4">
         <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
           Описание
         </label>
         <textarea
           id="description"
           v-model="form.description"
           rows="3"
           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
           placeholder="Описание задачи"
         ></textarea>
       </div>
 
       <div class="mb-4">
         <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-1">
           Срок выполнения
         </label>
         <input
           id="dueDate"
           v-model="form.dueDate"
           type="date"
           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
         >
       </div>
 
       <div class="flex items-center mb-4">
         <input
           id="important"
           v-model="form.isImportant"
           type="checkbox"
           class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
         >
         <label for="important" class="ml-2 block text-sm text-gray-700">
           Важная задача
         </label>
       </div>
 
       <div class="flex justify-end space-x-3">
         <button
           type="button"
           @click="$emit('cancel')"
           class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
         >
           Отмена
         </button>
         <button
           type="submit"
           :disabled="isSubmitting"
           class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-blue-300"
         >
           {{ isSubmitting ? 'Сохранение...' : 'Сохранить' }}
         </button>
       </div>
     </form>
   </div>
 </template>
