import { shallowMount, mount } from '@vue/test-utils';
import RecipePreviewCard from '@/components/recipe-preview-card.vue';

import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

describe('RecipePreviewCard.vue', () => {
  it('should correctly display a recipe', () => {
    const testRecipe = {
      calories: 420,
      name: 'daD',
      yield: 'ASD',
      activeTime: 'ASD',
      totalTime: 'ASD',
      ingredients: 'ASD',
      instructions: 'AD',
      id: 8,
    };
    const wrapper = shallowMount(RecipePreviewCard, {
      propsData: {
        recipe: testRecipe,
      },
    });
    const titleText = wrapper.find('v-card-title-stub').text();
    const caloriesText = wrapper.find('.calories-chip').text();
    const totalTimeText = wrapper.find('.total-time-chip').text();
    expect(titleText).toBe(testRecipe.name);
    expect(caloriesText).toBe(`${testRecipe.calories} cal`);
    expect(totalTimeText).toBe(`${testRecipe.totalTime} min`);
  });

  it('should navigate to its recipe detail page', async () => {
    const wrapper = mount(RecipePreviewCard, {
      propsData: {
        recipe: {
          id: 8,
        },
      },
      stubs: ['router-link'],
    });
    const link = wrapper.find('.v-card').props().to;
    expect(link.name).toBe('recipe');
    expect(link.params.id).toBe(8);
  });

  it('should not display info, that is not provieded', () => {
    const testRecipe = {
      name: 'daD',
      calories: 420,
      id: 8,
    };
    const wrapper = shallowMount(RecipePreviewCard, {
      propsData: {
        recipe: testRecipe,
      },
    });
    const titleText = wrapper.find('v-card-title-stub').text();
    const caloriesText = wrapper.find('.calories-chip').text();

    expect(titleText).toBe(testRecipe.name);
    expect(caloriesText).toContain(`${testRecipe.calories}`);
    expect(wrapper.contains('.total-time-chip')).toBe(false);
  });
});
