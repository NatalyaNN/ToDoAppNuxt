export const useAuth = () => {
   const login = async (email: string, password: string) => {
      try {
         const { user, token } = await $fetch('/api/auth/login', {
            method: 'POST',
            body: { email, password }
         })

         // Сохраняем токен в localStorage
         localStorage.setItem('auth_token', token)

         return user
      } catch (error) {
         console.error('Login error:', error)
         throw error
      }
   }

   return { login }
 }