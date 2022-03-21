import { defineStore } from 'pinia'

export const authStore = defineStore('authStore', {
  state: () => {
    return {
      authenticated: false,
      userType: null,
      user: null,
    }
  },
})
