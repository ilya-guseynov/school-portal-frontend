<script>
import axios from 'axios'
import { mapState } from 'pinia'
import { authStore } from '../../stores/auth-store.js'

export default {
  name: 'MessagesView',

  data() {
    return {
      loading: true,
      hasError: false,
      users: [],
    }
  },

  computed: {
    ...mapState(authStore, ['isAuthenticated', 'currentUser'])
  },

  methods: {
    async loadAllUsers() {
      this.loading = true

      try {
        const response = await axios.get('http://localhost:4000/api/v1/user')

        if (response.data.success === false) {
          throw new Error('Failed to load users')
        }

        this.users = response.data.data.users
      } catch (error) {
        this.hasError = true
      } finally {
        this.loading = false
      }
    },
  },

  mounted() {
    this.loadAllUsers()
  },
}
</script>

<template>
  <div>
    <h1 class="rtu-text-3xl rtu-mb-5">Сообщения</h1>
    <div>
      <div v-if="loading">Загружаю список пользователей</div>
      <div v-else-if="hasError">Не удалось загрузить пользователей</div>
      <div v-else>
        <ul class="rtu-space-y-4" v-if="users.length > 0">
          <li
            v-for="user of users" :key="user._id"
            class="rtu-bg-green-100 rtu-flex rtu-justify-between rtu-items-center rtu-p-4"
          >
            <div class="rtu-space-y-2">
              <div class="rtu-text-lg">{{ user.firstName }} {{ user.middleName }} {{ user.lastName }}</div>
              <div>{{ user.login }} ({{ user.userType }})</div>
            </div>
            <div>
              <router-link
                v-if="isAuthenticated && currentUser.login !== user.login"
                class="rtu-bg-green-200 rtu-p-5 rtu-rounded-lg hover:rtu-bg-green-400 rtu-transition-colors rtu-duration-500"
                to="/messages"
              >Перейти к чату</router-link>
              <div
                class="rtu-bg-green-200 rtu-p-5 rtu-rounded-lg"
                v-else-if="isAuthenticated && currentUser.login == user.login">Это вы</div>
            </div>
          </li>
        </ul>
        <div v-else>Пользователей нет</div>
      </div>
    </div>
  </div>
</template>
