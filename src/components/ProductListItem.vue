<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <img :src="product.image" class="w-full h-48 object-cover" alt="Product Image" />
    <div class="p-4">
      <h5 class="text-xl font-semibold mb-2">{{ product.name }}</h5>
      <p class="text-gray-700 mb-4">{{ product.description }}</p>
      <div class="flex flex-col space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0 w-full">
        <ButtonComponent
          @click="handleAddToCart"
          :disabled="isAdded"
          type="primary"
          class="w-full md:w-auto"
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
          class="w-full md:w-auto"
        >
          <template #icon>
            <TrashIcon class="h-5 w-5 mr-2" />
          </template>
          <span>Remove</span>
        </ButtonComponent>
        <ButtonComponent
          @click="goToDetails"
          type="secondary"
          class="w-full md:w-auto"
        >
          <template #icon>
            <InformationCircleIcon class="h-5 w-5 mr-2" />
          </template>
          <span>Details</span>
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores'; 
import { InformationCircleIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/vue/solid';
import ButtonComponent from './UI/ButtonComponent.vue';

// Define the types for props
import type { Product } from '../stores';

const props = defineProps<{
  product: Product;
}>();

const data = useCartStore();
const router = useRouter();

const isAdded = computed<boolean>(() => {
  return data.cartItems.some(item => item.id === props.product.id);
});

const handleAddToCart = (): void => {
  data.addToCart(props.product);
};

const handleRemoveFromCart = (): void => {
  data.removeFromCart(props.product.id);
};

const goToDetails = (): void => {
  router.push({ name: 'product-details', params: { productId: props.product.id } });
};
</script>
