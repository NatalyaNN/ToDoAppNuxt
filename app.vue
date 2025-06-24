<script setup lang="ts">
import { type TaskFormRef } from "~/components/types";
import type { CreateTaskSchema } from "~/schemas/task";

const error = ref("");
const formRef = ref<TaskFormRef>();

const handleSubmit = async (data: CreateTaskSchema) => {
  try {
    await $fetch("/task", {
      method: "POST",
      body: data,
    });
    formRef.value?.handleResetForm();
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    }
  }
};
</script>
<template>
  <NuxtRouteAnnouncer />
  <UApp>
    <NuxtPage/>
  </UApp>
</template>

