import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import Cart from '@/components/ShoppingCart.vue';
import EmptyCart from '@/components/EmptyCart.vue';
import { useCartStore } from '@/stores';
import { createPinia, setActivePinia } from 'pinia';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/vue/solid';

describe('Cart.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders cart items correctly', () => {
    const cartStore = useCartStore();
    cartStore.cartItems = [
      { id: 1, name: 'Nike Air Max', price: 150, image: 'image1.jpg', description: 'Desc 1', quantity: 2 },
      { id: 2, name: 'Adidas Ultraboost', price: 180, image: 'image2.jpg', description: 'Desc 2', quantity: 1 },
    ];

    const wrapper = mount(Cart, {
      global: {
        components: {
          EmptyCart,
          TrashIcon,
          PlusIcon,
          MinusIcon
        }
      }
    });

    expect(wrapper.findAll('.flex.justify-between.items-center.py-3.px-6').length).toBe(2);
  });

  it('increments item quantity', async () => {
    const cartStore = useCartStore();
    cartStore.cartItems = [
      { id: 1, name: 'Nike Air Max', price: 150, image: 'image1.jpg', description: 'Desc 1', quantity: 2 },
    ];

    const wrapper = mount(Cart, {
      global: {
        components: {
          EmptyCart,
          TrashIcon,
          PlusIcon,
          MinusIcon
        }
      }
    });

    const incrementButton = wrapper.findComponent(PlusIcon);
    await incrementButton.trigger('click');

    expect(cartStore.cartItems[0].quantity).toBe(3);
  });

  it('calculates and displays the total amount correctly', () => {
    const cartStore = useCartStore();
    cartStore.cartItems = [
      { id: 1, name: 'Nike Air Max', price: 150, image: 'image1.jpg', description: 'Desc 1', quantity: 2 },
      { id: 2, name: 'Adidas Ultraboost', price: 180, image: 'image2.jpg', description: 'Desc 2', quantity: 1 },
    ];

    const wrapper = mount(Cart, {
      global: {
        components: {
          EmptyCart,
          TrashIcon,
          PlusIcon,
          MinusIcon
        }
      }
    });

    const totalAmount = wrapper.find('.bg-blue-500.text-white.rounded-full.px-6.py-2.shadow-lg').text();
    expect(totalAmount).toBe('$480');
  });
});
