<template>
  <div class="mt-5">
    <div
      v-for="post in posts"
      :key="post.postid"
      class="w-full flex flex-col mx-auto bg-white px-4 py-7 rounded-lg mt-2"
    >
      <div class="flex items-center">
        <img :src="post.profilePicture" class="w-12 rounded-full mr-4" alt="" />
        <div>
          <p class="font-medium">{{ post.firstName }}</p>
          <p class="text-xs">{{ post.timestamp }}</p>
        </div>
      </div>
      <p class="mt-3 mb-1 text-md">{{ post.caption }}</p>
      <img :src="post.imageurl" alt="" />
      <div class="flex items-center mt-4">
        <img
          @click="handleUnlike(post.postid)"
          v-if="post.isLiked"
          src="../assets/liked.png"
          alt=""
          class="w-9"
        />
        <img
          @click="handleLike(post.postid)"
          v-else
          src="../assets/vector4.svg"
          class="w-8"
          alt=""
        />
        <img src="../assets/vector5.svg" class="w-8 mx-3" alt="" />
        <img src="../assets/vector6.svg" class="w-8" alt="" />
      </div>
      <p>{{ post.likes }} likes</p>
      <form @submit.prevent="handleSubmit" class="flex items-center justify-between mt-2">
        <input
          type="text"
          placeholder="Say something you want"
          class="w-10/12 border-[2px] border-black rounded-lg px-3 py-2"
        />
        <button class="bg-purple-500 rounded-lg px-8 py-3 text-white">Submit</button>
      </form>
      <div v-if="post.comments.length > 0">
        <p class="mt-3 text-lg font-semibold mb-1">Check out the comments</p>
        <div v-for="comment in post.comments" :key="comment.commentid" class="flex items-center">
          <img :src="comment.profilePicture" class="w-8 rounded-full mr-3" alt="" />
          <div class="flex flex-col items-start">
            <p class="text-sm">{{ comment.content }}</p>
            <p class="text-xs text-slate-400">{{ comment.timestamp }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../store/useUserStore'
export default {
  props: ['posts'],
  setup(props, { emit }) {
    const userStore = useUserStore()
    const handleSubmit = () => {
      console.log('submit')
    }

    const handleLike = async (postId) => {
      const response = await fetch(`http://localhost:8080/likePost/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userStore.token}`
        },
        body: JSON.stringify({
          userId: userStore.userId
        })
      })
      const data = await response.json()
      console.log(data)
      const updatedLikeCount = data.likeCount
      emit('like-post', postId, true, updatedLikeCount)
    }

    const handleUnlike = async (postId) => {
      const response = await fetch(`http://localhost:8080/unlikePost/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userStore.token}`
        },
        body: JSON.stringify({
          userId: userStore.userId
        })
      })
      const data = await response.json()
      console.log(data)
      const updatedLikeCount = data.likeCount
      emit('like-post', postId, false, updatedLikeCount)
    }

    return { handleSubmit, handleLike, handleUnlike }
  }
}
</script>

<style></style>
