<script setup lang="ts">
// const nuxtApp = useNuxtApp()
const credentials = reactive({
  email: '',
  password: '',
})

const email = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
  try {
    const { token } = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: credentials.email,
        password: credentials.password
      }
    })
    
    // Сохраняем токен в localStorage
    localStorage.setItem('auth_token', token)
    useCookie('auth_token').value = token
    
    // Перенаправляем на защищенную страницу
    await navigateTo('/tasks')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<template>
   <header class="header">
        <div class="container header-block">
          <div class="logo">
            <img src="/public/img/logo.png" alt="Logo" width="40px">
            <p class="logo-text">ToDo</p>
          </div>
        </div>
   </header>
   <section class="">
      <div class="container login-section">
         <form @submit.prevent="login" class="login-form">
            <label for="email">Email:</label>
            <input v-model="credentials.email" type="email" placeholder="Email" id="email" />
            <label for="password">Пароль:</label>
            <input v-model="credentials.password" type="password" placeholder="Пароль" id="password" />
            <button type="submit">Вход</button>
            <NuxtLink to="/register">Регистрация</NuxtLink>
         </form>
      </div>
   </section>
  
</template>

<style scoped>
.login-section {
   margin: 0 auto;
   display: flex;
   justify-content: center;
   align-items: center;
}
.login-form {
   display: flex;
   flex-direction: column;
   margin: 10px 0;
   /* align-items: center; */
   width: 300px;
   
}
.login-form input {
   display: flex;
   /* flex-direction: column; */
   /* align-items: center; */
   border: 1px solid #000;
   border-radius: 6px;
   width: 300px;
   margin: 10px 0;
}
.login-form button {
   width: 100px;
   height: 40px;
   background-color: #6C63FF;
   border: 0;
   border-radius: 6px;
   color: #F7F7F7;
   margin: 10px 0;
   cursor: pointer;
}
</style>
