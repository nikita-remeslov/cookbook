import { v4 as uuidv4 } from "uuid";
import * as mutations from "./types/mutations";

export default {
  [mutations.SET_RECIPES]: (state, payload) => {
    state.recipes = payload;
  },
  [mutations.EDIT_RECIPE]: (state, payload) => {
    const recipeArchive = { ...state.recipes[payload.id], id: uuidv4() };
    // eslint-disable-next-line
    const { children, versions, ...rest } = recipeArchive;

    state.recipesArchive = {
      ...state.recipesArchive,
      [recipeArchive.id]: {
        ...rest,
      },
    };

    state.recipes = {
      ...state.recipes,
      [payload.id]: {
        ...payload.recipe,
        versions: [...state.recipes[payload.id].versions, recipeArchive.id],
      },
    };
  },
  [mutations.COPY_RECIPE]: (state, id) => {
    const newRecipe = {
      ...state.recipes[id],
      children: [],
      versions: [],
      id: uuidv4(),
      createAt: new Date().toISOString(),
    };

    state.recipes = {
      ...state.recipes,
      [id]: {
        ...state.recipes[id],
        children: [...state.recipes[id].children, newRecipe.id],
      },
      [newRecipe.id]: {
        ...newRecipe,
      },
    };
  },
  [mutations.DELETE_RECIPE]: (state, id) => {
    const recipes = { ...state.recipes };
    if (recipes[id] && recipes[id].versions.length) {
      const recipesArchive = { ...state.recipesArchive };
      recipes[id].versions.forEach((id) => {
        delete recipesArchive[id];
      });
      state.recipesArchive = recipesArchive;
    }

    delete recipes[id];

    state.recipes = recipes;
  },
  [mutations.ADD_RECIPE]: (state, payload) => {
    const newRecipe = {
      ...payload,
      children: [],
      versions: [],
      id: uuidv4(),
      createAt: new Date().toISOString(),
    };
    state.recipes = {
      ...state.recipes,
      [newRecipe.id]: {
        ...newRecipe,
      },
    };
  },
};
