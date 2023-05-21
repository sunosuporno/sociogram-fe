<template>
  <div class="bg-purple-200 flex w-full h-screen mx-auto">
    <div class="flex flex-col w-10/12 bg-white mx-auto mt-8 rounded-xl">
      <p class="text-xl pt-4 pl-4">Hello Admin</p>
      <div
        class="bg-slate-900 text-white px-5 py-4 rounded-lg mt-3 flex justify-evenly w-9/12 mx-auto"
      >
        <div
          v-for="post in posts"
          :key="post.postid"
          class="bg-[#FF9019] p-3 text-black rounded-md"
        >
          <p>Post Id: {{ post.postid }}</p>
          <p class="text-xl">Post Title</p>
          <div class="w-[95%] h-[2px] bg-black"></div>
          <p class="">{{ post.caption }}</p>
          <p>Not reported</p>
          <p>Posted by: {{ post.firstName }}</p>
          <div class="bg-amber-800 px-2 py-1 rounded-md text-white my-3 hover:cursor-pointer">
            Send Warning
          </div>
          <div class="bg-red-500 px-2 py-1 rounded-md text-white hover:cursor-pointer">
            Restrict User
          </div>
          <div
            class="bg-red-800 px-2 py-1 rounded-md text-white mt-3 hover:cursor-pointer"
            @click="handleDelete(post.postid)"
          >
            Delete Post
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, toRef, reactive } from 'vue'
export default {
  setup() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const postList = ref([])
    const deletedPostCount = reactive({ count: 0 })

    onMounted(async () => {
      const resPosts = await fetch(`http://localhost:8080/posts/335`, options)
      postList.value = await resPosts.json()
      console.log('posts', postList.value)
    })

    const posts = toRef(postList, 'value')

    const handleDelete = async (id) => {
      const res = await fetch(`http://localhost:8080/deletePost/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(res)

      if (res.status === 200) {
        deletedPostCount.count++
      }
    }

    return { posts, handleDelete }
  }
}
</script>

<style></style>
