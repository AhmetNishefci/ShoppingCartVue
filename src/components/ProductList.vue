<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-4">
    <ProductListItem v-for="product in data.products" :key="product.id" :product="product" />
  </div>
</template>

<script setup>
import ProductListItem from './ProductListItem.vue';
import { useCartStore } from '../stores';

const data = useCartStore();
</script>

<style>
/* Add any additional styles if needed */
</style>
