import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
    email: '',
    name: '',
    displayPictureUrl: ''
  }),
  getters: {
    isLoggedIn: (state) => state.userId !== ''
  },
  actions: {
    setUser({ userId, email, name, displayPictureUrl }) {
      this.userId = userId
      this.email = email
      this.name = name
      this.displayPictureUrl = displayPictureUrl
    },
    clearUser() {
      this.userId = ''
      this.email = ''
      this.name = ''
      this.displayPictureUrl = ''
    }
  }
})
