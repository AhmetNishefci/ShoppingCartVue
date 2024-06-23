import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import NavBar from '@/components/NavbarComponent.vue';
import { createPinia, setActivePinia } from 'pinia';
import { RouterLinkStub } from '@vue/test-utils';
import { createMemoryHistory, createRouter } from 'vue-router';

describe('NavBar.vue', () => {
  let router;

  beforeEach(() => {
    setActivePinia(createPinia());
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
        { path: '/cart', name: 'cart', component: { template: '<div>Cart</div>' } }
      ]
    });
  });

  it('renders navigation bar and elements correctly', () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router],
        components: {
          RouterLink: RouterLinkStub
        }
      }
    });

    expect(wrapper.text()).toContain('Ahmet Kickzz');
    expect(wrapper.find('svg').exists()).toBe(true);
    expect(wrapper.findAll('a').length).toBe(3); // Ahmet Kickzz, Home, Cart
  });

  it('toggles navigation menu on mobile', async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router],
        components: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const toggleButton = wrapper.find('button');
    const navMenu = wrapper.find('div.lg\\:flex');

    expect(navMenu.classes()).toContain('hidden');

    await toggleButton.trigger('click');
    expect(navMenu.classes()).not.toContain('hidden');
    expect(navMenu.classes()).toContain('flex');

    await toggleButton.trigger('click');
    expect(navMenu.classes()).toContain('hidden');
  });
});
