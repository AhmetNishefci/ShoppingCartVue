<template>
    <div class="container mx-auto p-4">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img :src="product.image" class="w-full h-64 object-cover" alt="Product Image" />
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
  import { computed, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const data = useCartStore();
  const isAdded = ref(false);
  
  const product = computed(() => {
    return data.products.find(p => p.id === parseInt(route.params.productId));
  });
  
  const handleAddToCart = () => {
    data.addToCart(product.value);
    isAdded.value = true;
  };
  
  const handleRemoveFromCart = () => {
    data.removeFromCart(product.value);
    isAdded.value = false;
  };
  
  // Watch the cart items to reset the button state if the item is removed from the cart
  watch(() => data.getCartItems, (newVal) => {
    if (!newVal.find(item => item.id === product.value.id)) {
      isAdded.value = false;
    }
  });
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  