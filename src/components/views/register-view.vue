<script>
import { mapState, mapActions } from 'pinia'
import axios from 'axios'
import { authStore } from '../../stores/auth-store.js'

export default {
  name: 'LoginView',

  data() {
    return {
      hasError: false,
      loading: false,
      userType: 'student',
      firstName: '',
      lastName: '',
      middleName: '',
      loginInput: '',
      password: '',
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
          'http://localhost:4000/api/v1/user/register',
          {
            userType: this.userType,
            login: this.loginInput,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            middleName: this.middleName,
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
        this.hasError = true
      } finally {
        this.loading = false
      }
    },
  },

  mounted() {
    if (this.isAuthenticated) {
      this.$router.push('/logout')
    }
  },
}
</script>

<template>
  <div>
    <h1 class="rtu-text-3xl rtu-mb-5">Регистрация</h1>
    <div>
      <form class="rtu-space-y-4" @submit.prevent="handleSubmit">
        <div class="rtu-max-w-sm">
          <div class="rtu-text-lg rtu-font-medium">Тип пользователя</div>
          <div>
            <select class="rtu-w-full rtu-p-2" v-model="userType" name="login-usertype">
              <option value="student">Ученик</option>
              <option value="teacher">Учитель</option>
              <option value="parent">Родитель</option>
              <option value="administrator">Администратор</option>
            </select>
          </div>
        </div>
        <div class="rtu-max-w-sm">
          <div class="rtu-text-lg rtu-font-medium">Имя</div>
          <div class="rtu-border-b-2">
            <input
              class="rtu-block rtu-w-full rtu-outline-none"
              :disabled="loading"
              v-model="firstName"
              type="text"
              name="login-name"
              required
            >
          </div>
        </div>
        <div class="rtu-max-w-sm">
          <div class="rtu-text-lg rtu-font-medium">Фамилия</div>
          <div class="rtu-border-b-2">
            <input
              class="rtu-block rtu-w-full rtu-outline-none"
              :disabled="loading"
              v-model="lastName"
              type="text"
              name="login-lastname"
              required
            >
          </div>
        </div>
        <div class="rtu-max-w-sm">
          <div class="rtu-text-lg rtu-font-medium">Отчество</div>
          <div class="rtu-border-b-2">
            <input
              class="rtu-block rtu-w-full rtu-outline-none"
              :disabled="loading"
              v-model="middleName"
              type="text"
              name="login-middlename"
              required
            >
          </div>
        </div>
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
              v-model="password"
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
          >Зарегистрироваться</button>
        </div>
      </form>
      <div>
        <div class="rtu-text-red-700" v-if="hasError">Произошла ошибка</div>
      </div>
    </div>
  </div>
</template>
