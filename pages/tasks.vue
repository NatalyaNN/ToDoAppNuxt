<script setup lang="ts">

definePageMeta({
  middleware: ['authenticated'],
})
  
const { user, clear: clearSession } = useUserSession()

async function logout() {
  await clearSession()
  await navigateTo('/login')
}
</script>

<template>
  <div>
      <header class="header">
        <div class="container header-block">
          <div class="logo">
            <img src="/public/img/logo.png" alt="Logo" width="40px">
            <p class="logo-text">ToDo</p>
          </div>
          <div class="authorize">
            <p>Привет, {{ user.name }}!</p>
            <button @click="logout">Выйти</button>
          </div>
        </div>
      </header>

      <section>
        <div class="container">
         <Tasks />
        </div>
      </section>
    </div>
</template>

<style scoped>
.authorize {
   text-align: right;
}

.authorize button {
   cursor: pointer;
   text-decoration: underline;
}
</style>
