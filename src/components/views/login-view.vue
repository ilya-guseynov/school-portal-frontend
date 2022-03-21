<script>
import { mapState } from 'pinia'
import { authStore } from '../../stores/auth-store.js'

export default {
  name: 'LoginView',

  computed: {
    ...mapState(authStore, ['authenticated']),
  },
}
</script>

<template>
  <div>
    <h1 class="rtu-text-3xl rtu-mb-5">Войти / Регистрация</h1>
    <div>Контент</div>
  </div>
</template>
