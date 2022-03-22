<script>
import { mapState } from 'pinia'
import { authStore } from '../stores/auth-store.js'

export default {
  name: 'ClassesView',

  computed: {
    ...mapState(authStore, ['isAuthenticated', 'currentUser']),
  },
}
</script>

<template>
  <div>
    <h1 class="rtu-text-3xl rtu-mb-5">Классы</h1>
    <div>
      <div v-if="isAuthenticated && currentUser.userType === 'administrator'">
        <h2>Создать новый класс</h2>
        <div></div>
      </div>
    </div>
  </div>
</template>
 