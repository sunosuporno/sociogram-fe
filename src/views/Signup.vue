<template>
  <main class="flex h-screen bg-purple-100">
    <div class="w-10/12 m-auto flex flex-row-reverse items-center justify-between">
      <div class="w-5/12 bg-white flex-col items-center rounded-xl py-8 shadow-lg">
        <div class="w-5/12 m-auto flex justify-evenly text-purple-600">
          <div class="mr-4 hover:cursor-pointer flex flex-col items-center">
            <router-link :to="{ name: 'Login' }">Login</router-link>
            <!-- <div class="w-10 h-[2px] bg-purple-600"></div> -->
          </div>
          <div class="hover:cursor-pointer flex flex-col items-center">
            <router-link :to="{ name: 'Signup' }">Signup</router-link>
            <div class="w-12 h-[2px] bg-purple-600"></div>
          </div>
        </div>
        <form @submit.prevent="handleSubmit" class="flex flex-col w-4/5 m-auto pt-8">
          <input
            class="h-14 bg-purple-200 border-2 border-purple-600 rounded-md px-2"
            type="text"
            placeholder="Your Name"
            v-model="name"
          />
          <input
            class="h-14 bg-purple-200 border-2 border-purple-600 rounded-md px-2 mt-8"
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
          <input
            class="h-14 bg-purple-200 border-2 border-purple-600 rounded-md px-2 mb-8"
            type="password"
            placeholder="Confirm Password"
            v-model="confirmPassword"
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
import useSignup from '../composables/useSignup'
import { useUserStore } from '../store/useUserStore'
export default {
  components: {},
  setup() {
    const userStore = useUserStore()
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const router = useRouter()
    const { error, signup, isPending } = useSignup()
    // onMounted(() => {
    //   console.log('mounted')
    //   if (router.currentRoute.value.path === '/') {
    //     console.log('login')
    //   } else {
    //     console.log('signup')
    //   }
    // })

    const handleSubmit = async () => {
      console.log('submit')
      const res = await signup(email.value, password.value, name.value)
      console.log('res', res.user.email)
      const body = JSON.stringify({
        name: name.value,
        email: email.value
      })
      const options = {
        method: 'POST',
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
        id: user.userid,
        displayPictureUrl: user.profilepicture
      }
      userStore.setUser(userObject)
      if (error.value) {
        console.log(error.value)
      }
      if (!error.value) {
        router.push({ name: 'FeedPage' })
      }
    }

    return {
      handleSubmit,
      name,
      email,
      password,
      confirmPassword,
      isPending,
      error
    }
  }
}
</script>
