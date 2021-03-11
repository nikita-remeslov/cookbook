import * as actions from "./types/actions";
import * as mutations from "./types/mutations";

export default {
  [actions.OPEN_MODAL]: ({ commit }, payload) => {
    if (payload) {
      commit(mutations.SET_CURRENT_RECIPE_ID, payload);
    }
    commit(mutations.OPEN_MODAL);
  },
  [actions.CLOSE_MODAL]: ({ commit }) => commit(mutations.CLOSE_MODAL),
};
