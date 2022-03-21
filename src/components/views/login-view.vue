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
    Login View Component {{ authenticated }}
  </div>
</template>
