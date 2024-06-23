import { defineStore } from 'pinia';
import { useToast } from 'vue-toast-notification';

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };

type CartItem = Product & {
    quantity: number;
  };

type State = {
    products: Product[];
    cartItems: CartItem[];
  };

export const useCartStore = defineStore('cart', {
  state: (): State => ({
    products: [
      {
        id: 1,
        name: 'Iphone 12',
        price: 700,
        image: 'https://cdn.pixabay.com/photo/2016/11/20/08/33/camera-1842202__480.jpg',
        description: 'The iPhone 12 features a 6.1-inch OLED display, A14 Bionic chip, and 5G capability. It comes with a dual-camera system with Night mode and an improved design for better durability.'
      },
      {
        id: 2,
        name: 'Samsung s10',
        price: 400,
        image: 'https://cdn.pixabay.com/photo/2016/03/27/19/43/samsung-1283938__340.jpg',
        description: 'The Samsung S10 boasts a 6.1-inch Dynamic AMOLED display. It offers a sleek design with an in-display fingerprint sensor and wireless PowerShare feature.'
      },
      {
        id: 3,
        name: 'Samsung Tv',
        price: 1200,
        image: 'https://cdn.pixabay.com/photo/2019/06/30/18/19/tv-4308538__480.jpg',
        description: 'This Samsung TV delivers stunning 4K resolution with HDR support. It features a 65-inch screen, smart TV capabilities, and a sleek, modern design to enhance your viewing experience.'
      },
      {
        id: 4,
        name: 'Huwawei Mate',
        price: 900,
        image: 'https://cdn.pixabay.com/photo/2017/08/11/14/19/honor-2631271__340.jpg',
        description: 'The Huawei Mate features a 6.47-inch OLED display, Kirin 990 processor, and a versatile quad-camera setup. It offers 5G connectivity, a large battery, and fast charging capabilities.'
      }
    ],
    cartItems: []
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
    addToCart(item: Product) {
      const toast = useToast();
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
      } else {
        this.cartItems.push({ ...item, quantity: 1 });
        toast.success('Your item has been added to cart');
      }
    },
    incrementQ(item: CartItem) {
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
      }
    },
    decrementQ(item: CartItem) {
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity -= 1;
        if (this.cartItems[index].quantity === 0) {
          this.cartItems = this.cartItems.filter(product => product.id !== item.id);
        }
      }
    },
    removeFromCart(item: CartItem) {
      const toast = useToast();
      this.cartItems = this.cartItems.filter(product => product.id !== item.id);
      toast.success('Your item has been removed from cart');
    }
  }
});
