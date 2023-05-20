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
          <p class="text-sm">{{ post.timestamp }}</p>
        </div>
      </div>
      <p class="mt-8 mb-6 text-lg">{{ post.caption }}</p>
      <img :src="post.imageurl" alt="" />
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['posts']
}
</script>

<style></style>
