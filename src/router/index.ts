import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import ProductDetails from '../components/ProductDetails.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
  {
    path: '/',
    redirect: '/products'
  },
  {
    path: '/products',
    name: 'home',
    component: HomePage
  },
  {
    path: '/cart',
    name: 'cart',
    component: ShoppingCart
  },
  {
    path: '/product/:productId',
    name: 'product-details',
    component: ProductDetails,
    props: true
  },
  // Catch-all route to handle undefined paths
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
