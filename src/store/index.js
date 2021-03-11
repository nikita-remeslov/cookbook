import { createStore } from "vuex";
import modal from "./modules/modal";
import recipe from "./modules/recipe";

export default createStore({
  modules: {
    modal,
    recipe,
  },
});
