import { shallowMount, mount } from '@vue/test-utils';
import recipeDetail from '@/components/recipe-detail.vue';
// import 'peppermint-logic';

import Vue from 'vue';
import Vuetify from 'vuetify';

jest.mock('peppermint-logic');

Vue.use(Vuetify);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('AddRecipeDialog.vue', () => {
  it('inititalizes with empty data fields', async () => {
    const wrapper = shallowMount(recipeDetail);
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
    const wrapper = shallowMount(recipeDetail, { propsData: { value: true } });
    wrapper.setData({
      recipe: {
        id: 1,
        name: 'Test',
        yield: '2',
        activeTime: '1h',
        totalTime: '2h',
        ingredients: '1 test',
        instructions: '1. mix test',
      },
    });
    const saveButton = wrapper.find('#delete-recipe-button');
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
    const wrapper = shallowMount(recipeDetail, { propsData: { value: true } });
    wrapper.setData({
      recipe: {
        id: 1,
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

  it('should go to recipes, when a recipe is deleted', () => {
    const mocks = {
      $router: {
        push: jest.fn(),
      },
    };
    const wrapper = mount(recipeDetail, {
      mocks,
    });
    const deleteButton = wrapper.find('#delete-recipe-button');
    deleteButton.trigger('click');
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: 'recipes' });
  });

  it('should go to recipes, when back button is pressed', () => {
    const mocks = {
      $router: {
        push: jest.fn(),
      },
    };
    const wrapper = mount(recipeDetail, {
      mocks,
    });
    const deleteButton = wrapper.find('#go-back-to-recipes-button');
    deleteButton.trigger('click');
    expect(mocks.$router.push).toHaveBeenCalledWith({ name: 'recipes' });
  });
});
