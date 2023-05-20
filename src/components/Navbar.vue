<template>
  <div class="w-5/6 m-auto py-4 flex justify-between items-center">
    <div>
      <h1 class="text-white text-5xl">Sociogram</h1>
    </div>
    <div v-if="userStore.isLoggedIn" class="flex items-center">
      <img src="../assets/vector1.svg" class="mr-4" alt="notification bell" />
      <div class="relative">
        <button @click="toggleDropdown" class="flex items-center space-x-2 text-white">
          <img src="../assets/profile.png" class="w-12 rounded-3xl" alt="user" />
        </button>

        <div
          v-if="isDropdownOpen"
          class="absolute right-0 w-24 mx-auto mt-5 bg-white rounded shadow"
        >
          <ul class="flex flex-col items-center">
            <li
              class="w-full flex flex-col items-center hover:bg-purple-700 hover:cursor-pointer hover:text-white rounded"
            >
              <router-link :to="{ name: 'Profile' }">Profile</router-link>
              <hr />
            </li>
            <li
              class="w-full flex flex-col items-center hover:bg-purple-700 hover:cursor-pointer hover:text-white rounded"
              @click="handleSignOut"
            >
              Sign Out
            </li>
            <li
              class="w-full flex flex-col items-center hover:bg-purple-700 hover:cursor-pointer hover:text-white rounded"
            >
              <router-link :to="{ name: 'Settings' }">Settings</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { auth } from '../firebase/config'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/useUserStore'
export default {
  components: {},
  setup() {
    const isDropdownOpen = ref(false)
    const router = useRouter()
    const userStore = useUserStore()

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    const handleSignOut = () => {
      auth.signOut()
      router.push({ name: 'Login' })
      userStore.clearUser()
    }

    return { userStore, isDropdownOpen, toggleDropdown, handleSignOut }
  }
}
</script>

<style></style>
