<script>
import { mapState } from 'pinia'
import { authStore } from '../stores/auth-store.js'

export default {
  name: 'LogoutView',

  computed: {
    ...mapState(authStore, ['isAuthenticated', 'logout']),
  },

  methods: {
    handleLogout() {
      this.logout()
      this.$router.push('/login')
    },
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
    <h1 class="rtu-text-3xl rtu-mb-5">Выйти</h1>
    <div>
      <div class="rtu-mb-4">Вы уверены что хотите выйти?</div>
      <div>
        <button
          class="rtu-bg-green-600 rtu-text-white rtu-rounded-md rtu-p-3"
          @click="handleLogout"
        >Да, выйти</button>
      </div>
    </div>
  </div>
</template>
