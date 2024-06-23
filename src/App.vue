<template>
  <div class="container mx-auto p-4">
    <HeaderComponent />
    <router-view></router-view>
  </div>
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
</script>

<style>
/* Add any additional styles if needed */
</style>
