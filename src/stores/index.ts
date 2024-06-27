import { defineStore } from 'pinia';
import { useToast } from 'vue-toast-notification';

// Types
export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export type CartItem = Product & {
  quantity: number;
};

type State = {
  products: Product[];
  cartItems: CartItem[];
  loading: boolean;
};

const CART_STORAGE_KEY = 'cartItems';

export const useCartStore = defineStore('cart', {
  state: (): State => ({
    products: [],
    cartItems: JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]'),
    loading: false
  }),
  getters: {
    countCartItems(state: State): number {
      return state.cartItems.length;
    },
    getCartItems(state: State): CartItem[] {
      return state.cartItems;
    }
  },
  actions: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await fetch('/products.json');
        const products: Product[] = await response.json();
        this.products = products;
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        this.loading = false;
      }
    },
    saveCartItems() {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cartItems));
    },
    addToCart(item: Product) {
      const toast = useToast();
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
      } else {
        const newItem: CartItem = { ...item, quantity: 1 };
        this.cartItems.push(newItem);
        toast.success('Your item has been added to cart');
      }
      this.saveCartItems();
    },
    incrementQ(item: CartItem) {
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
        this.saveCartItems();
      }
    },
    decrementQ(item: CartItem) {
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity -= 1;
        if (this.cartItems[index].quantity === 0) {
          this.cartItems = this.cartItems.filter(product => product.id !== item.id);
        }
        this.saveCartItems();
      }
    },
    removeFromCart(productId: number) {
      const toast = useToast();
      this.cartItems = this.cartItems.filter(product => product.id !== productId);
      this.saveCartItems();
      toast.success('Your item has been removed from cart');
    }
  }
});
