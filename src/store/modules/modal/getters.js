import * as getters from "./types/getters";

export default {
  [getters.GET_MODAL_STATUS]: (state) => state.isOpen,
  [getters.GET_CURRENT_RECIPE_ID]: (state) => state.currentRecipeId,
};
