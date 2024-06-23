<template>
    <div class="flex flex-wrap my-4">
      <ProductListItem 
        v-for="product in data.products" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </template>
  
  <script setup>
  import ProductListItem from './ProductListItem.vue'
  import { useCartStore } from '../stores'
  
  // Get products from store
  const data = useCartStore();
  </script>
  
  <style>
  /* Add any additional styles if needed */
  </style>
  