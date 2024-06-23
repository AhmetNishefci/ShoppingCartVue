<template>
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img :src="product.image" class="h-full  object-cover" alt="Product Image" />
        <div class="p-4">
          <h2 class="text-2xl font-semibold mb-2">{{ product.name }}</h2>
          <p class="text-gray-700 mb-4">{{ product.description }}</p>
          <p class="text-xl font-bold mb-4">${{ product.price }}</p>
          <div class="flex space-x-2">
            <ButtonComponent
              @click="handleAddToCart"
              :disabled="isAdded"
              type="primary"
            >
              <template #icon>
                <ShoppingCartIcon class="h-5 w-5 mr-2" />
              </template>
              <span>{{ isAdded ? 'Added to Cart' : 'Add to Cart' }}</span>
            </ButtonComponent>
            <ButtonComponent
              v-if="isAdded"
              @click="handleRemoveFromCart"
              type="danger"
            >
              <span>Remove from Cart</span>
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCartStore } from '../stores';
  import { ShoppingCartIcon } from '@heroicons/vue/solid';
  import ButtonComponent from './UI/ButtonComponent.vue';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const data = useCartStore();
  
  const product = computed(() => {
    return data.products.find(p => p.id === parseInt(route.params.productId));
  });
  
  const isAdded = computed(() => {
    return data.cartItems.some(item => item.id === product.value?.id);
  });
  
  const handleAddToCart = () => {
    if (product.value) {
      data.addToCart(product.value);
    }
  };
  
  const handleRemoveFromCart = () => {
    if (product.value) {
      data.removeFromCart(product.value);
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  