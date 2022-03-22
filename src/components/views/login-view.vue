<script>
import { mapActions, mapState } from 'pinia'
import axios from 'axios'
import { authStore } from '../../stores/auth-store.js'

export default {
  name: 'LoginView',

  data() {
    return {
      hasError: false,
      loading: false,
      loginInput: '',
      passwordInput: '',
    }
  },

  computed: {
    ...mapState(authStore, ['isAuthenticated']),
  },

  methods: {
    ...mapActions(authStore, ['login']),

    async handleSubmit(event) {
      this.loading = true
      this.hasError = false

      try {
        const response = await axios.post(
          'http://localhost:4000/api/v1/user/login',
          {
            login: this.loginInput,
            password: this.passwordInput,
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
          },
        )

        if (response.data.success) {
          this.login(response.data.data.user)
          this.$router.push('/profile')
        }
      } catch (error) {
        console.log(error)
        this.hasError = true
      } finally {
        this.loading = false
      }
    },
  },

  mounted() {
    if (this.isAuthenticated) {
      this.$router.push('/')
    }
  },
}
</script>

<template>
  <div>
    <h1 class="rtu-text-3xl rtu-mb-5">Вход</h1>
    <div>
      <form class="rtu-space-y-4" @submit.prevent="handleSubmit">
        <div class="rtu-max-w-sm">
          <div class="rtu-text-lg rtu-font-medium">Логин</div>
          <div class="rtu-border-b-2">
            <input
              class="rtu-block rtu-w-full rtu-outline-none"
              :disabled="loading"
              v-model="loginInput"
              type="text"
              name="login-login"
              required
            >
          </div>
        </div>
        <div class="rtu-max-w-sm">
          <div class="rtu-text-lg rtu-font-medium">Пароль</div>
          <div class="rtu-border-b-2">
            <input
              class="rtu-block rtu-w-full rtu-outline-none"
              :disabled="loading"
              v-model="passwordInput"
              type="password"
              minlength="6"
              name="login-password"
              required
            >
          </div>
        </div>
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="rtu-bg-green-600 rtu-text-white rtu-rounded-md rtu-p-3"
          >Войти</button>
        </div>
      </form>
      <div>
        <div class="rtu-text-red-700" v-if="hasError">Произошла ошибка</div>
      </div>
    </div>
  </div>
</template>
