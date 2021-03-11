<template>
  <div class="m-4 flex flex-wrap gap-4 justify-center">
    <RecipeItem
      v-for="recipe in recipeList"
      :key="recipe.id"
      :recipe="recipe"
    />
  </div>
</template>

<script>
import RecipeItem from "./RecipeItem.vue";
import { mapGetters } from "vuex";
import * as getters from "@/store/modules/recipe/types/getters";

export default {
  name: "RecipeList",
  components: { RecipeItem },
  computed: {
    ...mapGetters("recipe", {
      recipeList: getters.GET_RECIPES,
    }),
  },
};
</script>

<style scoped></style>
