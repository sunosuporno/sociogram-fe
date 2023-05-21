<template>
  <div class="bg-purple-100 pt-6 flex items-start">
    <div class="w-[19.4%] mr-2">
      <HomeLeftBar />
    </div>
    <div class="w-[80%] flex flex-col items-center">
      <div class="flex flex-col-reverse w-[98%] mx-auto items-start px-4 py-5 bg-white rounded-2xl">
        <div class="flex items-center w-full">
          <div class="w-[98%] flex items-center">
            <img
              src="https://firebasestorage.
googleapis.com/v0/b/sociogram-1d15a.appspot.com/o/artworks-aVpUAguSORW5l9V4-B5oiIw-t500x500.jpg?alt=media&token=fb7e2
c8a-c2fc-488c-b2d6-f7f4d70a5a78"
              class="w-1/12 rounded-full -mt-9 mr-4"
              alt=""
            />
            <p class="text-xl">Suporno</p>
          </div>
          <div class="bg-purple-500 px-2 py-1 rounded-lg text-white">
            <p>Following</p>
          </div>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/sociogram-1d15a.appspot.com/o/kzNIFbdmc
Pta67CoMrd1x93h9o0.webp?alt=media&token=09285469-5944-4a82-8036-d2ea94d82c69"
          class="w-full rounded-2xl"
          alt=""
        />
      </div>
      <div class="w-full flex items-start justify-between">
        <div class="w-[33%] bg-white p-3 rounded-lg mt-5 ml-4">
          <p class="text-xl font-medium">Bio</p>
          <div class="w-[60%] h-[2px] bg-black"></div>
          <p class="text-sm mt-3">
            Wake up to reality. Nothing ever goes as planned in this accursed world.
          </p>
        </div>
        <div class="w-[65%] px-2">
          <Posts
            :posts="posts"
            v-if="posts.length"
            @like-post="handleLikePost"
            @add-comment="handleComment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../store/useUserStore'
import { onMounted, ref, toRef } from 'vue'
import HomeLeftBar from '../components/HomeLeftBar.vue'
import Posts from '../components/Posts.vue'
export default {
  props: ['id'],
  components: {
    HomeLeftBar,
    Posts
  },
  setup(props) {
    const userStore = useUserStore()

    console.log(props.id)
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const postList = ref([])

    onMounted(async () => {
      console.log('profile page', userStore.userId)
      const resPosts = await fetch('http://localhost:8080/posts/335', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: userStore.userId
        })
      })
      postList.value = await resPosts.json()
      console.log('posts', postList.value)
    })

    const handleLikePost = (postId, isLiked, likeCount) => {
      const postIndex = posts.value.findIndex((post) => post.postid === postId)
      if (postIndex !== -1) {
        posts.value[postIndex].isLiked = isLiked
        posts.value[postIndex].likes = likeCount
        postList.value[postIndex].isLiked = isLiked
        postList.value[postIndex].likes = likeCount
      }
    }

    const handleComment = async (postId, comments) => {
      const postIndex = posts.value.findIndex((post) => post.postid === postId)
      if (postIndex !== -1) {
        for (const comment of comments) {
          const resUser = await fetch(`http://localhost:8080/user/${comment.userid}`, options)
          const userData = await resUser.json()
          comment.firstName = userData.firstname
          comment.profilePicture = userData.profilepicture
          const c_timestamp = new Date(comment.c_timestamp)
          const formattedDate = c_timestamp.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long'
          })
          const formattedTime = c_timestamp.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })
          comment.timestamp = `${formattedDate} at ${formattedTime}`
        }
        posts.value[postIndex].comments = comments
      }
    }

    const posts = toRef(postList, 'value')

    onMounted(() => {
      console.log('feed page', userStore.userId)
      console.log(userStore.displayPictureUrl)
      console.log(posts.value)
    })

    return { userStore, posts, props, handleLikePost, handleComment }
  }
}
</script>

<style></style>
