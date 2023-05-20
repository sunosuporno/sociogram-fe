<template>
  <div class="bg-purple-100 pt-6 flex items-start">
    <div class="w-[19.4%] mr-2">
      <HomeLeftBar />
    </div>
    <div class="flex flex-col items-center w-[55%] px-2">
      <PostForm />
      <Posts :posts="posts" v-if="posts.length" />
    </div>
    <div class="w-[19%] ml-2">
      <HomeRightBar />
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../store/useUserStore'
import HomeLeftBar from '../components/HomeLeftBar.vue'
import PostForm from '../components/PostForm.vue'
import Posts from '../components/Posts.vue'
import HomeRightBar from '../components/HomeRightBar.vue'
import { onMounted, ref, toRef } from 'vue'
export default {
  components: {
    HomeLeftBar,
    PostForm,
    Posts,
    HomeRightBar
  },
  setup() {
    const userStore = useUserStore()
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const postList = ref([])

    onMounted(async () => {
      const resPosts = await fetch('http://localhost:8080/posts', options)
      postList.value = await resPosts.json()
      console.log('posts', postList.value)

      for (const post of postList.value) {
        const resUser = await fetch(`http://localhost:8080/user/${post.userid}`, options)
        const userData = await resUser.json()
        post.firstName = userData.firstname
        post.profilePicture = userData.profilepicture

        const timestamp = new Date(post.timestamp)
        const formattedDate = timestamp.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long'
        })
        const formattedTime = timestamp.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
        post.timestamp = `${formattedDate} at ${formattedTime}`
      }
    })

    const posts = toRef(postList, 'value')

    onMounted(() => {
      console.log('feed page', userStore.userId)
      console.log(userStore.displayPictureUrl)
      console.log(posts.value)
    })

    return { userStore, posts }
  }
}
</script>

<style></style>
