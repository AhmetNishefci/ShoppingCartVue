<template>
  <div class="my-4">
    <div class="w-full">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-4">
          <div v-if="data.getCartItems.length > 0">
            <!-- Header Row -->
            <div class="hidden md:flex bg-gray-200 text-gray-950 font-semibold uppercase text-sm leading-normal justify-between py-3 px-6">
              <span class="w-1/12 text-center">ID</span>
              <span class="w-2/12 text-center">Image</span>
              <span class="w-3/12 text-center">Name</span>
              <span class="w-2/12 text-center">Quantity</span>
              <span class="w-2/12 text-center">Price</span>
              <span class="w-2/12 text-center">Subtotal</span>
              <span class="w-1/12 text-center"></span>
            </div>

            <!-- Items -->
            <div v-for="item in data.getCartItems" :key="item.id" class="border-b border-gray-200 hover:bg-gray-100 flex flex-col md:flex-row justify-between items-center py-3 px-6">
              <span class="w-full md:w-1/12 text-center">{{ item.id }}</span>
              <span class="w-full md:w-2/12 text-center my-2 md:my-0">
                <img :src="item.image" class="h-full rounded mx-auto" :alt="item.name" />
              </span>
              <span class="w-full md:w-3/12 text-center">{{ item.name }}</span>
              <span class="w-full md:w-2/12 text-center flex justify-center items-center my-2 md:my-0">
                <PlusIcon 
                  @click="data.incrementQ(item)"
                  class="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-700" 
                />
                <span class="mx-2">{{ item.quantity }}</span>
                <MinusIcon 
                  @click="data.decrementQ(item)"
                  class="h-4 w-4 cursor-pointer text-gray-500 hover:text-gray-700" 
                />
              </span>
              <span class="w-full md:w-2/12 text-center">${{ item.price }}</span>
              <span class="w-full md:w-2/12 text-center">${{ item.price * item.quantity }}</span>
              <span class="w-full md:w-1/12 text-center my-2 md:my-0">
                <TrashIcon 
                  @click="data.removeFromCart(item)"
                  class="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700 mx-auto" 
                />
              </span>
            </div>

            <!-- Total Row -->
            <div class="bg-gray-100 flex flex-col md:flex-row justify-between items-center py-4 px-6 mt-4">
              <span class="text-lg font-bold mb-2 md:mb-0">Total</span>
              <span class="inline-block bg-blue-500 text-white rounded-full px-6 py-2 shadow-lg">
                ${{ data.cartItems.reduce((acc, item) => acc += item.price * item.quantity, 0) }}
              </span>
            </div>
          </div>
          <EmptyCart v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/vue/solid';
import EmptyCart from './EmptyCart.vue';

const data = useCartStore();
</script>
