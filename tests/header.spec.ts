import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';

import LayoutComponent from '../layouts/header.vue';

describe('Header Layout', () => {
  test('renders the header with the correct text', () => {
    const wrapper = mount(LayoutComponent);
    const header = wrapper.find('header p');

    expect(header.exists()).toBe(true);
    expect(header.text()).toBe('人口推移グラフ');
  });

  test('renders slot content correctly', () => {
    const wrapper = mount(LayoutComponent, {
      slots: {
        default: '<div class="slot-content">Slot Content</div>',
      },
    });

    const slotContent = wrapper.find('.slot-content');
    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe('Slot Content');
  });

  test('has the correct class structure for layout', () => {
    const wrapper = mount(LayoutComponent);
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.classes()).toContain('flex-col');
  });
});
