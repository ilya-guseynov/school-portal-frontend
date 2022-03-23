<script>
import axios from 'axios'
import { mapState } from 'pinia'
import { authStore } from '../stores/auth-store.js'

export default {
  name: 'ClassesView',

  data() {
    return {
      loading: true,
      hasError: false,
      groups: [],
    }
  },

  computed: {
    ...mapState(authStore, ['isAuthenticated', 'currentUser']),
  },

  methods: {
    async loadGroups() {
      this.loading = true
      this.hasError = false

      try {
        const response = await axios.get('http://localhost:4000/api/v1/group')

        if (!response.data.success) {
          this.hasError = true
        } else {
          this.groups = response.data.data.groups
        }
      } catch (error) {
        this.hasError = true
      } finally {
        this.loading = false
      }
    },
  },

  mounted() {
    this.loadGroups()
  },
}
</script>

<template>
  <div>
    <h1 class="rtu-text-3xl rtu-mb-5">Классы</h1>
    <div>
      <div v-if="loading">Загружаю список классов</div>
      <div v-else-if="hasError">Ошибка во время загрузки списка классов</div>
      <div v-else-if="groups.length === 0">Классов пока нет</div>
      <ul v-else>
        <li v-for="group in groups" :key="group._id">{{ group.title }}</li>
      </ul>
    </div>
  </div>
</template>
