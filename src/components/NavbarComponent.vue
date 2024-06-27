<template>
  <nav class="bg-gray-900 text-white p-4 rounded-lg shadow-md relative">
    <div class="container mx-auto flex justify-between items-center">
      <router-link class="text-2xl font-bold" to="/">Ahmet Kickzz</router-link>
      <button @click="toggleNav" class="lg:hidden focus:outline-none">
        <MenuIcon v-if="!isNavOpen" class="w-6 h-6" />
        <XIcon v-else class="w-6 h-6" />
      </button>
      <div :class="{'flex justify-between items-center': isNavOpen, 'hidden': !isNavOpen}" class="lg:flex lg:items-center lg:space-x-4 mt-4 lg:mt-0 w-full lg:w-auto absolute lg:static top-10 left-0 right-0 bg-gray-900 lg:bg-transparent p-4 lg:p-0 rounded-b-lg lg:rounded-none z-50">
        <router-link class="block lg:inline-block mt-2 lg:mt-0 mr-4 hover:text-gray-400 font-semibold" to="/">Home</router-link>
        <router-link class="block lg:inline-block mt-2 lg:mt-0 hover:text-gray-400" to="/cart">
          <ShoppingCartIcon class="w-6 h-6 inline-block" /> ({{ data.countCartItems }})
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../stores';
import { MenuIcon, XIcon, ShoppingCartIcon } from '@heroicons/vue/solid';

const data = useCartStore();
const isNavOpen = ref(false);
const toggleNav = (): void => {
  isNavOpen.value = !isNavOpen.value;
};
</script>
