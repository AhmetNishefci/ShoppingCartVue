<template>
  <div class="container mx-auto p-4">
    <NavbarComponent />
    <router-view></router-view>
  </div>
</template>

<script setup>
import NavbarComponent from './components/NavbarComponent.vue';
</script>

<style>
/* Add any additional styles if needed */
</style>
