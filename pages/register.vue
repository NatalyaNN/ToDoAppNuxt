<template>
   <div class="register-container">
     <h1 class="text-xl font-semibold mb-4">Регистрация</h1>
     <form @submit.prevent="register">
       <div class="form-group">
         <label>Имя</label>
         <input v-model="form.name" type="text" required>
       </div>
       
       <div class="form-group">
         <label>Email</label>
         <input v-model="form.email" type="email" required>
       </div>
       
       <div class="form-group">
         <label>Пароль</label>
         <input v-model="form.password" type="password" required>
       </div>
       
       <div class="form-group">
         <label>Подтвердите пароль</label>
         <input v-model="form.password_confirmation" type="password" required>
       </div>
       
       <button type="submit" :disabled="loading">
         {{ loading ? 'Регистрируем...' : 'Зарегистрироваться' }}
       </button>
       
       <p v-if="error" class="error">{{ error }}</p>
       
       <p class="login-link">
         Уже есть аккаунт? <NuxtLink to="/login">Войти</NuxtLink>
       </p>
     </form>
   </div>
 </template>
 
 <script>
 export default {
   auth: 'guest', // Доступно только для неавторизованных
   data() {
     return {
       form: {
         name: '',
         email: '',
         password: '',
         password_confirmation: ''
       },
       loading: false,
       error: null
     }
   },
   methods: {
     async register() {
       if (this.form.password !== this.form.password_confirmation) {
         this.error = 'Пароли не совпадают'
         return
       }
       
       this.loading = true
       this.error = null
       
       try {
         // Используем $auth для регистрации
         await this.$axios.post('/api/auth/register', this.form)
         
         // Автоматический вход после регистрации
         await this.$auth.loginWith('local', {
           data: {
             email: this.form.email,
             password: this.form.password
           }
         })
         
         // Перенаправление после успешной регистрации
         this.$router.push('/dashboard')
         
       } catch (err) {
         this.error = err.response?.data?.message || 'Ошибка регистрации'
       } finally {
         this.loading = false
       }
     }
   }
 }
 </script>
 
 <style scoped>
 .register-container {
   max-width: 400px;
   margin: 0 auto;
   padding: 2rem;
 }
 
 .form-group {
   margin-bottom: 1rem;
 }
 
 .form-group label {
   display: block;
   margin-bottom: 0.5rem;
 }
 
 .form-group input {
   width: 100%;
   padding: 0.5rem;
   border: 1px solid #ddd;
   border-radius: 4px;
 }
 
 button {
   width: 100%;
   padding: 0.75rem;
   background: #4CAF50;
   color: white;
   border: none;
   border-radius: 4px;
   cursor: pointer;
 }
 
 button:disabled {
   background: #cccccc;
 }
 
 .error {
   color: red;
   margin-top: 1rem;
 }
 
 .login-link {
   margin-top: 1rem;
   text-align: center;
 }
 </style>