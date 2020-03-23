import { shallowMount } from '@vue/test-utils';
import AddRecipeDialog from '@/components/add-recipe-dialog.vue';

import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

describe('AddRecipeDialog.vue', () => {
  it('inititalizes with empty data fields', () => {
    const wrapper = shallowMount(AddRecipeDialog, { propsData: { value: true } });
    const nameField = wrapper.find('#recipe-name-field');
    const yieldField = wrapper.find('#recipe-yield-field');
    const timeActiveField = wrapper.find('#recipe-active-time-field');
    const timeTotalField = wrapper.find('#recipe-total-time-field');
    const ingredientsField = wrapper.find('#recipe-ingredients-field');
    const instructionsField = wrapper.find('#recipe-instructions-field');
    expect(nameField.attributes('value')).toBe('');
    expect(yieldField.attributes('value')).toBe('');
    expect(timeActiveField.attributes('value')).toBe('');
    expect(timeTotalField.attributes('value')).toBe('');
    expect(ingredientsField.attributes('value')).toBe('');
    expect(instructionsField.attributes('value')).toBe('');
  });

  it('remove data after close', () => {
    const wrapper = shallowMount(AddRecipeDialog, { propsData: { value: true } });
    wrapper.setData({
      recipe: {
        name: 'Test',
        yield: '2',
        activeTime: '1h',
        totalTime: '2h',
        ingredients: '1 test',
        instructions: '1. mix test',
      },
    });
    const saveButton = wrapper.find('#close-recipe-button');
    saveButton.trigger('click');
    setTimeout(() => {
      expect(wrapper.vm.name).toBe('');
      expect(wrapper.vm.yield).toBe('');
      expect(wrapper.vm.activeTime).toBe('');
      expect(wrapper.vm.totalTime).toBe('');
      expect(wrapper.vm.ingredients).toBe('');
      expect(wrapper.vm.instructions).toBe('');
    }, 400);
  });

  it('remove data after save', () => {
    const wrapper = shallowMount(AddRecipeDialog, { propsData: { value: true } });
    wrapper.setData({
      recipe: {
        name: 'Test',
        yield: '2',
        activeTime: '1h',
        totalTime: '2h',
        ingredients: '1 test',
        instructions: '1. mix test',
      },
    });
    const saveButton = wrapper.find('#save-recipe-button');
    saveButton.trigger('click');
    setTimeout(() => {
      expect(wrapper.vm.name).toBe('');
      expect(wrapper.vm.yield).toBe('');
      expect(wrapper.vm.activeTime).toBe('');
      expect(wrapper.vm.totalTime).toBe('');
      expect(wrapper.vm.ingredients).toBe('');
      expect(wrapper.vm.instructions).toBe('');
    }, 400);
  });
});
