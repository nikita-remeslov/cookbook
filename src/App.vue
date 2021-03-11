<template>
  <Header />
  <router-view />
  <CreateEditRecipeModal />
</template>

<script>
import CreateEditRecipeModal from "@/components/CreateEditRecipeModal.vue";
import Header from "@/components/Header.vue";
import { mapActions } from "vuex";
import * as actions from "@/store/modules/recipe/types/actions";

export default {
  name: "App",
  components: {
    CreateEditRecipeModal,
    Header,
  },
  methods: {
    ...mapActions("recipe", {
      fetchRecipes: actions.FETCH_RECIPES,
    }),
  },
  created() {
    this.fetchRecipes();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
