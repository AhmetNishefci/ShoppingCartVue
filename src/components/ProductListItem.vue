<template>
    <div class="w-full md:w-1/3 mb-4">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img :src="product.image" class="w-full h-48 object-cover" alt="Product Image" />
        <div class="p-4">
          <h5 class="text-xl font-semibold mb-2">{{ product.name }}</h5>
          <p class="text-gray-700 mb-4">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button 
            @click="data.addToCart(product)"
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
            <ShoppingCartIcon class="h-5 w-5 mr-2" /> add to cart
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCartStore } from '../stores'
  import { ShoppingCartIcon } from '@heroicons/vue/solid'
  
  //get props
  const props = defineProps({
    product: {
      type: Object,
      required: true
    }
  });
  
  //get store
  const data = useCartStore();
  </script>
  
  <style>
  /* Add any additional styles if needed */
  </style>
  