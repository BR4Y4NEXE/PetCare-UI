import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '@/components/ui/BaseButton.vue';

describe('BaseButton', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Click me' },
    });
    
    expect(wrapper.text()).toBe('Click me');
  });

  it('emits click event', async () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Click me' },
    });
    
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('is disabled when loading', () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true },
      slots: { default: 'Loading' },
    });
    
    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
  });

  it('shows spinner when loading', () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true },
      slots: { default: 'Loading' },
    });
    
    expect(wrapper.find('.animate-spin').exists()).toBe(true);
  });
});
