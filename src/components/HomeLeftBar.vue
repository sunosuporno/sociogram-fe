<template>
  <div class="bg-white flex flex-col w-full text-[18px] font-semibold rounded-lg min-h-screen">
    <router-link class="flex items-center pt-6" :to="{ name: 'FeedPage' }">
      <img src="../assets/icroundhome1.svg" alt="" class="w-2/12 mx-5" />
      <p>Feed</p>
    </router-link>
    <router-link class="flex items-center pt-6" :to="{ name: 'Profile' }">
      <img src="../assets/icroundhome1.svg" alt="" class="w-2/12 mx-5" />
      <p>Profile</p>
    </router-link>
    <router-link class="flex items-center pt-6" :to="{ name: 'Settings' }">
      <img src="../assets/icbaselinesettings1.svg" alt="" class="w-2/12 mx-5" />
      <p>Settings</p>
    </router-link>
    <router-link class="flex items-center pt-6" :to="{ name: 'FeedPage' }">
      <img src="../assets/mdiquestionmarkcircle.svg" alt="" class="w-2/12 mx-5" />
      <p>Help and Support</p>
    </router-link>
    <router-link class="flex items-center pt-6" :to="{ name: 'FeedPage' }">
      <img src="../assets/evamoonfill.svg" alt="" class="w-2/12 mx-5" />
      <p>Display</p>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
