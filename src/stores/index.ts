import { defineStore } from 'pinia';
import { useToast } from 'vue-toast-notification';

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Iphone 12',
        price: 700,
        image: 'https://cdn.pixabay.com/photo/2016/11/20/08/33/camera-1842202__480.jpg'
      },
      {
        id: 2,
        name: 'Samsung s10',
        price: 400,
        image: 'https://cdn.pixabay.com/photo/2016/03/27/19/43/samsung-1283938__340.jpg'
      },
      {
        id: 3,
        name: 'Samsung Tv',
        price: 1200,
        image: 'https://cdn.pixabay.com/photo/2019/06/30/18/19/tv-4308538__480.jpg'
      },
      {
        id: 4,
        name: 'Huwawei Mate',
        price: 900,
        image: 'https://cdn.pixabay.com/photo/2017/08/11/14/19/honor-2631271__340.jpg'
      }
    ],
    cartItems: []
  }),
  getters: {
    countCartItems() {
      return this.cartItems.length;
    },
    getCartItems() {
      return this.cartItems;
    }
  },
  actions: {
    addToCart(item) {
      const toast = useToast();
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
        toast.success('Your item has been updated');
      } else {
        item.quantity = 1;
        this.cartItems.push(item);
        toast.success('Your item has been saved');
      }
    },
    incrementQ(item) {
      const toast = useToast();
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
        toast.success('Your item has been updated');
      }
    },
    decrementQ(item) {
      const toast = useToast();
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity -= 1;
        if (this.cartItems[index].quantity === 0) {
          this.cartItems = this.cartItems.filter(product => product.id !== item.id);
        }
        toast.success('Your item has been updated');
      }
    },
    removeFromCart(item) {
      const toast = useToast();
      this.cartItems = this.cartItems.filter(product => product.id !== item.id);
      toast.success('Your item has been removed');
    }
  }
});
