import * as actions from "./types/actions";
import * as mutations from "./types/mutations";

export default {
  [actions.FETCH_RECIPES]: async ({ commit }) => {
    const response = await fetch("/data.json")
      .then((r) => r.json())
      .then((response) => response);

    if (response) {
      const sortedRecipe = response.recipes.sort((firstElem, secondElem) =>
        firstElem.name.localeCompare(secondElem.name)
      );

      const recipes = sortedRecipe.reduce(
        (results, recipe) => ((results[recipe.id] = recipe), results),
        {}
      );

      commit(mutations.SET_RECIPES, recipes);
    }
  },
  [actions.EDIT_RECIPE]: async ({ commit }, payload) => {
    commit(mutations.EDIT_RECIPE, payload);
  },
  [actions.COPY_RECIPE]: async ({ commit }, payload) => {
    commit(mutations.COPY_RECIPE, payload);
  },
  [actions.DELETE_RECIPE]: async ({ commit }, payload) => {
    commit(mutations.DELETE_RECIPE, payload);
  },
};
