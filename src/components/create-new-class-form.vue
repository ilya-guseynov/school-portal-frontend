<script>
import axios from 'axios'
import { mapState } from 'pinia'
import { authStore } from '../stores/auth-store.js'

export default {
  name: 'CreateNewClassForm',

  data() {
    return {
      loading: false,
      errorMessage: null,
      successMessage: null,
      newGroupTitleInput: '',
    }
  },

  computed: {
    ...mapState(authStore, ['currentUser', 'isAuthenticated']),
  },

  methods: {
    async handleCreateGroup() {
      this.errorMessage = null
      this.successMessage = null
      this.loading = true

      try {
        const response = await axios.post(
          'http://localhost:4000/api/v1/group',
          { title: this.newGroupTitleInput },
          {
            headers: {
              'Content-Type': 'application/json'
            },
          },
        )

        if (response.data.success) {
          this.successMessage = `Класс ${ response.data.data.group.title } успешно создан`
        } else {
          this.errorMessage = response.data.data.message
        }
      } catch (error) {
        this.errorMessage = 'Произошла ошибка'
      } finally {
        this.loading = false
        this.newGroupTitleInput = ''
      }
    },
  },
}
</script>

<template>
  <form @submit.prevent="handleCreateGroup">
    <div class="rtu-text-xl rtu-mb-2">Создать новый класс</div>
    <div class="rtu-flex rtu-items-center rtu-space-x-3">
      <div>Название нового класса</div>
      <div>
        <input
          class="rtu-border-b-2 rtu-border-black rtu-outline-none"
          v-model="newGroupTitleInput"
          type="text"
          required
          name="new-group-title"
        >
      </div>
      <div>
        <button
          :disabled="loading"
          class="rtu-bg-green-500 rtu-text-white rtu-p-2 rtu-rounded-md disabled:rtu-bg-green-900 hover:rtu-bg-green-400 rtu-transition-colors rtu-duration-500"
        >Создать</button>
      </div>
      <div>
        <div v-if="errorMessage">{{ errorMessage }}</div>
      </div>
      <div>
        <div v-if="successMessage">{{ successMessage }}</div>
      </div>
    </div>
  </form>
</template>
