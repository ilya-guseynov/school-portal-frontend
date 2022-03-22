import { defineStore } from 'pinia'

export const authStore = defineStore('authStore', {
  state: () => {
    return {
      user: null,
    }
  },

  getters: {
    isAuthenticated(state) {
      return state.user !== null
    },

    userType(state) {
      if (!state.user) {
        return 'guest'
      }

      return state.user.userType
    },

    currentUser(state) {
      return state.user
    },
  },

  actions: {
    login(user) {
      this.user = user
    },

    logout() {
      this.user = null
    },
  },
})
