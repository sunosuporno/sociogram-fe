<template>
  <div class="bg-purple-100 pt-6 flex items-start">
    <div class="w-[19.4%] mr-2">
      <HomeLeftBar />
    </div>
    <div class="flex flex-col items-center w-[55%] px-2">
      <PostForm />
      <Posts
        :posts="posts"
        v-if="posts.length > 0"
        @like-post="handleLikePost"
        @add-comment="handleComment"
      />
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
      const resPosts = await fetch(`http://localhost:8080/posts/${userStore.userId}`, options)
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

    return { userStore, posts, handleLikePost, handleComment }
  }
}
</script>

<style></style>
