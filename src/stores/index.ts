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

const CART_STORAGE_KEY = 'cartItems';

export const useCartStore = defineStore('cart', {
    state: (): State => ({
        products: [
            {
                id: 1,
                name: 'Nike Air Max',
                price: 150,
                image: 'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_640.jpg',
                description: 'The Nike Air Max offers a lightweight design with a comfortable cushioning system, perfect for running and everyday use.'
            },
            {
                id: 2,
                name: 'Adidas Ultraboost',
                price: 180,
                image: 'https://cdn.pixabay.com/photo/2017/07/25/12/57/blue-2537963_640.jpg',
                description: 'The Adidas Ultraboost provides exceptional energy return with its Boost midsole, ideal for long-distance running and high-impact activities.'
            },
            {
                id: 3,
                name: 'Puma RS-X',
                price: 130,
                image: 'https://cdn.pixabay.com/photo/2018/09/27/12/07/puma-3706914_640.jpg',
                description: 'The Puma RS-X combines retro style with modern performance, offering a durable and comfortable fit for all-day wear.'
            },
            {
                id: 4,
                name: 'Reebok Classic',
                price: 100,
                image: 'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_640.jpg',
                description: 'The Reebok Classic features a timeless design with a leather upper and cushioned sole, providing both style and comfort.'
            },
            {
                id: 5,
                name: 'New Balance 990v5',
                price: 175,
                image: 'https://cdn.pixabay.com/photo/2016/11/18/22/29/footwear-1837170_1280.jpg',
                description: 'The New Balance 990v5 offers a blend of cushioning and stability, making it a favorite for both casual and athletic wear.'
            },
            {
                id: 6,
                name: 'Asics Gel-Kayano',
                price: 160,
                image: 'https://cdn.pixabay.com/photo/2015/11/05/22/33/sneaker-1024981_640.jpg',
                description: 'The Asics Gel-Kayano provides superior support and cushioning, ideal for runners seeking a comfortable and stable shoe.'
            },
            {
                id: 7,
                name: 'Air Jordan 1',
                price: 200,
                image: 'https://cdn.pixabay.com/photo/2024/04/05/16/59/ai-generated-8677786_1280.png',
                description: 'The Air Jordan 1 is an iconic sneaker that offers a blend of style, comfort, and performance. It features a premium leather upper and a rubber outsole for excellent traction.'
            },
            {
                id: 8,
                name: 'Converse Chuck Taylor',
                price: 60,
                image: 'https://cdn.pixabay.com/photo/2017/07/08/04/33/converse-2483522_640.jpg',
                description: 'The Converse Chuck Taylor is a classic sneaker with a canvas upper and rubber sole. It is known for its timeless design and versatility.'
            },
            {
                id: 9,
                name: 'Vans Old School',
                price: 70,
                image: 'https://cdn.pixabay.com/photo/2017/10/15/06/03/sneakers-2852607_640.jpg',
                description: 'The Vans Old Skool is a classic skate shoe featuring a durable suede and canvas upper. It offers a comfortable fit and a rubber outsole for superior grip.'
            }
        ],
        cartItems: JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]')
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
        saveCartItems() {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cartItems));
        },
        addToCart(item: Product) {
            const toast = useToast();
            const index = this.cartItems.findIndex(product => product.id === item.id);
            if (index !== -1) {
                this.cartItems[index].quantity += 1;
            } else {
                this.cartItems.push({ ...item, quantity: 1 });
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
        removeFromCart(item: CartItem) {
            const toast = useToast();
            this.cartItems = this.cartItems.filter(product => product.id !== item.id);
            toast.success('Your item has been removed from cart');
            this.saveCartItems();
        }
    }
});
