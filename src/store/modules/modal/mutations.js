import * as mutations from "./types/mutations";

export default {
  [mutations.OPEN_MODAL]: (state) => {
    state.isOpen = true;
  },
  [mutations.CLOSE_MODAL]: (state) => {
    state.isOpen = false;
    state.currentRecipeId = "";
  },
  [mutations.SET_CURRENT_RECIPE_ID]: (state, recipeId) => {
    state.currentRecipeId = recipeId;
  },
};
