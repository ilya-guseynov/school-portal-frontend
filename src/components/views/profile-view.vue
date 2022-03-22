<script>
import { mapState } from 'pinia'
import { authStore } from '../../stores/auth-store.js'

export default {
  name: 'ProfileView',

  computed: {
    ...mapState(authStore, ['isAuthenticated', 'currentUser']),
  },

  mounted() {
    if (!this.isAuthenticated) {
      this.$router.push('/login')
    }
  },
}
</script>

<template>
  <div>
    <template v-if="isAuthenticated">
      <h1 class="rtu-text-3xl rtu-mb-5">Личный кабинет</h1>
      <div>
        <div class="rtu-flex rtu-items-center rtu-space-x-3">
          <div>ФИО:</div>
          <div>{{ currentUser.firstName }} {{ currentUser.middleName }} {{ currentUser.lastName }}</div>
        </div>
        <div class="rtu-flex rtu-items-center rtu-space-x-3">
          <div>Логин:</div>
          <div>{{ currentUser.login }}</div>
        </div>
        <div class="rtu-flex rtu-items-center rtu-space-x-3">
          <div>Роль:</div>
          <div>{{ currentUser.userType }}</div>
        </div>
      </div>
    </template>
  </div>
</template>
