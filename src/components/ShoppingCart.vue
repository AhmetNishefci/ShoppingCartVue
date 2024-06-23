<template>
    <div class="my-4">
      <div class="w-full">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="p-4">
            <table class="w-full table-auto">
              <thead>
                <tr class="bg-gray-200">
                  <th class="px-4 py-2">#</th>
                  <th class="px-4 py-2">Image</th>
                  <th class="px-4 py-2">Name</th>
                  <th class="px-4 py-2">Quantity</th>
                  <th class="px-4 py-2">Price</th>
                  <th class="px-4 py-2">Subtotal</th>
                  <th class="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in data.getCartItems" :key="item.id" class="border-b">
                  <td class="px-4 py-2">{{ item.id }}</td>
                  <td class="px-4 py-2">
                    <img :src="item.image" class="w-15 h-15 rounded" :alt="item.name" />
                  </td>
                  <td class="px-4 py-2">{{ item.name }}</td>
                  <td class="px-4 py-2 flex items-center">
                    <ChevronUpIcon 
                      @click="data.incrementQ(item)"
                      class="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700" 
                    />
                    <span class="mx-2">{{ item.quantity }}</span>
                    <ChevronDownIcon 
                      @click="data.decrementQ(item)"
                      class="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700" 
                    />
                  </td>
                  <td class="px-4 py-2">${{ item.price }}</td>
                  <td class="px-4 py-2">${{ item.price * item.quantity }}</td>
                  <td class="px-4 py-2">
                    <TrashIcon 
                      @click="data.removeFromCart(item)"
                      class="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700" 
                    />
                  </td>
                </tr>
                <tr>
                  <th colspan="3" class="text-center px-4 py-2">Total</th>
                  <td colspan="3" class="text-center px-4 py-2">
                    <span class="bg-red-500 text-white rounded-full px-4 py-1">
                      ${{ data.cartItems.reduce((acc, item) => acc += item.price * item.quantity, 0) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCartStore } from "../stores";
  import { ChevronUpIcon, ChevronDownIcon, TrashIcon } from '@heroicons/vue/solid';
  
  // Get store
  const data = useCartStore();
  </script>
  
  <style>
  /* Add any additional styles if needed */
  </style>
  