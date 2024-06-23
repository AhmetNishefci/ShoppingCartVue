<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <img :src="product.image" class="w-full h-48 object-cover" alt="Product Image" />
    <div class="p-4">
      <h5 class="text-xl font-semibold mb-2">{{ product.name }}</h5>
      <p class="text-gray-700 mb-4">{{ product.description }}</p>
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
        <ButtonComponent
          @click="goToDetails"
          type="secondary"
        >
          <span>Details</span>
        </ButtonComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores'; 
import { ShoppingCartIcon } from '@heroicons/vue/solid';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ButtonComponent from './UI/ButtonComponent.vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const data = useCartStore();
const isAdded = ref(false);
const router = useRouter();

const handleAddToCart = () => {
  data.addToCart(props.product);
  isAdded.value = true;
};

const handleRemoveFromCart = () => {
  data.removeFromCart(props.product);
  isAdded.value = false;
};

const goToDetails = () => {
  router.push({ name: 'product-details', params: { productId: props.product.id } });
};

// Watch the cart items to reset the button state if the item is removed from the cart
watch(() => data.getCartItems, (newVal) => {
  if (!newVal.find(item => item.id === props.product.id)) {
    isAdded.value = false;
  }
});
</script>

<style>
/* Add any additional styles if needed */
</style>
