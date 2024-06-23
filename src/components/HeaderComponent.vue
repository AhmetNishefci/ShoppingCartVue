<template>
    <nav class="bg-gray-900 text-white p-4 rounded-lg shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <router-link class="text-2xl font-bold" to="/">Ahmet Shopping Cart</router-link>
        <button @click="toggleNav" class="lg:hidden focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <div :class="{'block': isNavOpen, 'hidden': !isNavOpen}" class="lg:flex lg:items-center lg:space-x-4 mt-4 lg:mt-0">
          <router-link class="block lg:inline-block mt-2 lg:mt-0 mr-4 hover:text-gray-400" to="/">Home</router-link>
          <router-link class="block lg:inline-block mt-2 lg:mt-0 hover:text-gray-400" to="/cart">
            <ShoppingCartIcon class="w-6 h-6 inline-block" /> ({{ data.countCartItems }})
          </router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useCartStore } from '../stores';
  import { ShoppingCartIcon } from '@heroicons/vue/solid';
  
  const data = useCartStore();
  const isNavOpen = ref(false);
  const toggleNav = () => {
    isNavOpen.value = !isNavOpen.value;
  };
  </script>
  
  <style>
  /* Add any additional styles if needed */
  </style>
  