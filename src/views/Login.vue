<template>
  <main class="flex h-screen bg-purple-100">
    <div class="w-10/12 m-auto flex flex-row-reverse items-center justify-between">
      <div class="w-5/12 bg-white flex-col items-center rounded-xl py-8 shadow-lg">
        <div class="w-5/12 m-auto flex justify-evenly text-purple-600">
          <div class="mr-4 hover:cursor-pointer flex flex-col items-center">
            <router-link :to="{ name: 'Login' }">Login</router-link>
            <div class="w-10 h-[2px] bg-purple-600"></div>
          </div>
          <div class="hover:cursor-pointer flex flex-col items-center">
            <router-link :to="{ name: 'Signup' }">Signup</router-link>
            <!-- <div class="w-12 h-[2px] bg-purple-600"></div> -->
          </div>
        </div>
        <form @submit.prevent="handleSubmit" class="flex flex-col w-4/5 m-auto pt-8">
          <input
            class="h-14 bg-purple-200 border-2 border-purple-600 rounded-md px-2"
            type="email"
            placeholder="Your Email"
            v-model="email"
          />
          <input
            class="h-14 bg-purple-200 border-2 border-purple-600 rounded-md px-2 my-8"
            type="password"
            placeholder="Your Password"
            v-model="password"
          />
          <button class="h-14 bg-purple-600 rounded-md text-white" type="submit">Submit</button>
          <p v-if="error">{{ error }}</p>
        </form>
      </div>
      <div class="max-w-xl flex flex-col items-start">
        <h1 class="text-purple-600 text-6xl">Sociogram</h1>
        <h4 class="text-purple-600 text-3xl">
          A new way to connect and share with your loved ones.
        </h4>
      </div>
    </div>
  </main>
</template>

<script>
// import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useLogin from '../composables/useLogin'
import { useUserStore } from '../store/useUserStore'
export default {
  components: {},
  setup() {
    const router = useRouter()
    const { error, login, isPending } = useLogin()
    const userStore = useUserStore()
    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      const body = JSON.stringify({
        email: email.value
      })
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      }
      const userData = await fetch('http://localhost:8080/user', options)
      const user = await userData.json()
      console.log('user', user)
      const userObject = {
        name: user.firstname,
        email: user.email,
        userId: user.userid,
        displayPictureUrl: user.profilepicture
      }
      console.log('userObject', userObject)
      userStore.setUser(userObject)
      console.log('login page', userStore.userId)
      if (error.value) {
        console.log(error.value)
      }
      if (!error.value) {
        router.push({ name: 'FeedPage' })
      }
    }
    // onMounted(() => {
    //   console.log('mounted')
    //   if (router.currentRoute.value.path === '/') {
    //     console.log('login')
    //   } else {
    //     console.log('signup')
    //   }
    // })

    return {
      handleSubmit,
      email,
      password,
      isPending,
      error
    }
  }
}
</script>
