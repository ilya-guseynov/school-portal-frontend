<script>
import { mapState } from 'pinia'
import { authStore } from '../stores/auth-store.js'

export default {
  name: 'TheHeader',

  computed: {
    ...mapState(authStore, ['isAuthenticated', 'currentUser']),
  },
}
</script>

<template>
  <header class="rtu-bg-green-900 rtu-text-white rtu-mb-5">
    <div class="rtu-container rtu-mx-auto rtu-px-[20px] rtu-flex rtu-justify-between rtu-items-center">
      <div class="rtu-font-semibold rtu-text-lg">Школа</div>
      <nav class="rtu-py-4">
        <ul class="rtu-flex rtu-justify-center rtu-items-center rtu-space-x-4">
          <li>
            <router-link
              class="rtu-block rtu-bg-green-700 rtu-p-3 rtu-rounded-md hover:rtu-bg-green-500 rtu-transition-colors rtu-duration-400"
              to="/"
            >Главная</router-link>
          </li>
          <li>
            <router-link
              class="rtu-block rtu-bg-green-700 rtu-p-3 rtu-rounded-md hover:rtu-bg-green-500 rtu-transition-colors rtu-duration-400"
              to="/schedule"
            >Расписание</router-link>
          </li>
          <li>
            <router-link
              class="rtu-block rtu-bg-green-700 rtu-p-3 rtu-rounded-md hover:rtu-bg-green-500 rtu-transition-colors rtu-duration-400"
              to="/classes"
            >Классы</router-link>
          </li>
          <li>
            <router-link
              class="rtu-block rtu-bg-green-700 rtu-p-3 rtu-rounded-md hover:rtu-bg-green-500 rtu-transition-colors rtu-duration-400"
              to="/messages"
            >Сообщения</router-link>
          </li>
          <li v-if="!isAuthenticated">
            <router-link
              class="rtu-block rtu-bg-green-700 rtu-p-3 rtu-rounded-md hover:rtu-bg-green-500 rtu-transition-colors rtu-duration-400"
              to="/login"
            >Войти</router-link>
          </li>
          <li v-if="!isAuthenticated">
            <router-link
              class="rtu-block rtu-bg-green-700 rtu-p-3 rtu-rounded-md hover:rtu-bg-green-500 rtu-transition-colors rtu-duration-400"
              to="/register"
            >Регистрация</router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link
              class="rtu-block rtu-bg-green-700 rtu-p-3 rtu-rounded-md hover:rtu-bg-green-500 rtu-transition-colors rtu-duration-400"
              to="/profile"
            >{{ currentUser.firstName }} {{ currentUser.lastName }}</router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link
              class="rtu-block rtu-bg-green-700 rtu-p-3 rtu-rounded-md hover:rtu-bg-green-500 rtu-transition-colors rtu-duration-400"
              to="/logout"
            >Выйти</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
