import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import ProductListItem from '@/components/ProductListItem.vue';
import { useCartStore } from '@/stores';
import { createPinia, setActivePinia } from 'pinia';
import { RouterLinkStub } from '@vue/test-utils';

describe('ProductListItem.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders product details', () => {
    const product = {
      id: 1,
      name: 'Nike Air Max',
      price: 150,
      image: 'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_640.jpg',
      description: 'The Nike Air Max offers a lightweight design with a comfortable cushioning system, perfect for running and everyday use.'
    };

    const wrapper = mount(ProductListItem, {
      props: { product },
      global: {
        components: {
          RouterLink: RouterLinkStub
        }
      }
    });

    expect(wrapper.text()).toContain(product.name);
    expect(wrapper.text()).toContain(product.description);
  });

  it('handles add to cart', async () => {
    const product = {
      id: 1,
      name: 'Nike Air Max',
      price: 150,
      image: 'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_640.jpg',
      description: 'The Nike Air Max offers a lightweight design with a comfortable cushioning system, perfect for running and everyday use.'
    };

    const wrapper = mount(ProductListItem, {
      props: { product },
      global: {
        components: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const cartStore = useCartStore();
    expect(cartStore.countCartItems).toBe(0);

    await wrapper.find('button').trigger('click');
    expect(cartStore.countCartItems).toBe(1);
  });
});
