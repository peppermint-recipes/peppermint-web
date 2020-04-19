import { shallowMount } from '@vue/test-utils';
import RecipeList from '@/components/recipe-list.vue';

import Vue from 'vue';
import Vuetify from 'vuetify';

jest.mock('@/services/recipeService');

Vue.use(Vuetify);

describe('RecipeList.vue', () => {
  it('display all recipes', async () => {
    const wrapper = shallowMount(RecipeList);
    await wrapper.vm.$nextTick();
    const amountOfRecipes = wrapper.vm.$data.recipes.length;
    const cards = wrapper.findAll('.recipe-preview-card');
    expect(cards.length).toBe(amountOfRecipes);
    expect(amountOfRecipes > 0);
  });
});
