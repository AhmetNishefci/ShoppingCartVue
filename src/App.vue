<template>
  <div class="container mx-auto p-4">
    <NavbarComponent />
    <Loading :active="loading" :can-cancel="false" :is-full-page="true" color="#000" background-color="#ffffff" />
    <div v-if="!loading">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import NavbarComponent from './components/NavbarComponent.vue';
import { useCartStore } from './stores';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const cartStore = useCartStore();
const loading = computed(() => cartStore.loading);
</script>
