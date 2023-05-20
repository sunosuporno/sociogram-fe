<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <header class="bg-purple-700">
    <Navbar />
  </header>

  <RouterView />
</template>

<style scoped></style>
