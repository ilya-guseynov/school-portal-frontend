<script>
import { mapState } from 'pinia'
import { authStore } from '../../stores/auth-store.js'

export default {
  name: 'LogoutView',

  computed: {
    ...mapState(authStore, ['authenticated']),
  },
}
</script>

<template>
  <div>
    Logout View Component {{ authenticated }}
  </div>
</template>
