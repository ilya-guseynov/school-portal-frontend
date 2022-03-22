import { defineStore } from 'pinia'

const LOCAL_STORGARE_USER = 'LOCAL_STORGARE_USER'

export const authStore = defineStore('authStore', {
  state: () => {
    let user = null

    const localStorageUserString = localStorage.getItem(LOCAL_STORGARE_USER)

    if (localStorageUserString) {
      user = JSON.parse(localStorageUserString)
    }

    return {
      user,
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
      localStorage.setItem(LOCAL_STORGARE_USER, JSON.stringify(user))
      this.user = user
    },

    logout() {
      localStorage.removeItem(LOCAL_STORGARE_USER)
      this.user = null
    },
  },
})
