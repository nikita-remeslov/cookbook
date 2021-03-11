import * as getters from "./types/getters";

export default {
  [getters.GET_RECIPES]: (state) => state.recipes,
  [getters.GET_ARCHIVE_RECIPES]: (state) => state.recipesArchive,
};
