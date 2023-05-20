<template>
  <div class="w-full flex flex-col mx-auto bg-white px-4 py-11 rounded-lg">
    <div class="flex items-center">
      <img :src="userStore.displayPictureUrl" class="w-1/12 rounded-full mr-6" alt="" />
      <input
        type="text"
        placeholder="What's on your mind?"
        class="border-[1px] border-black py-4 px-4 w-full rounded-full"
      />
    </div>
    <div class="flex items-center justify-evenly mt-10">
      <div class="flex items-center justify-between">
        <img src="../assets/icbaselinevideocamerafront.svg" alt="" />
        <p>Live Video</p>
      </div>
      <div class="flex items-center justify-between">
        <img src="../assets/icsharpphotolibrary.svg" alt="" />
        <p>Photo/Video</p>
      </div>
      <div class="flex items-center justify-between">
        <img src="../assets/phsmileybold.svg" alt="" />
        <p>Feeling/Activity</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../store/useUserStore'
export default {
  components: {},
  setup() {
    const userStore = useUserStore()
    console.log(userStore.displayPictureUrl)
    return { userStore }
  }
}
</script>

<style></style>
