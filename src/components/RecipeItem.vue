<template>
  <div
    class="recipe-wrapper relative min-w-xs max-w-md rounded overflow-hidden shadow-lg my-2"
    @click="goToReciptPage(recipe.id)"
  >
    <div
      class="icon-wrapper w-full h-20 p-2 hidden absolute bg-gradient-to-b from-gray-200"
    >
      <EditIcon
        :onClick="onOpenModal"
        :classConfig="'text-white hover:text-gray-500 w-8 h-8'"
      />
      <CopyIcon
        :onClick="onCopyRecipe"
        :classConfig="'text-white hover:text-gray-500 w-10 h-8'"
      />
      <TrashIcon
        :onClick="onDeleteRecipe"
        :classConfig="'text-white hover:text-red-500 w-10 h-8'"
      />
    </div>
    <img
      class="w-full h-80"
      :src="imageUrl"
      @error="imageUrl = require('@/assets/defaultRecipeImg.png')"
      :alt="recipe.name"
    />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 truncate" :title="recipe.name">
        {{ recipe.name }}
      </div>
      <p class="text-grey-darker text-base line-clamp-4 overflow-hidden h-24">
        {{ recipe.instructions }}
      </p>
    </div>
    <div class="px-6 py-4 h-28">
      <span
        class="inline-block max-w-12 truncate bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold m-1"
        v-for="item in recipe.ingredients.slice(0, 4)"
        :key="item"
      >
        {{ item }}
      </span>
    </div>
    <div class="px-6 py-4 flex justify-between">
      <span
        class="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2"
        title="Сopies"
        >{{ recipe.children.length }}</span
      >
      <span class="font-bold ">{{ fotmatedData(recipe.createAt) }}</span>
    </div>
  </div>
</template>

<script>
import * as actions from "@/store/modules/modal/types/actions";
import * as recipeActions from "@/store/modules/recipe/types/actions";
import * as getters from "@/store/modules/recipe/types/getters";
import { mapActions, mapGetters } from "vuex";
import format from "date-fns/format";
import EditIcon from "./icons/EditIcon.vue";
import CopyIcon from "./icons/CopyIcon.vue";
import TrashIcon from "./icons/TrashIcon.vue";

export default {
  components: { EditIcon, CopyIcon, TrashIcon },
  name: "RecipeItem",
  props: ["recipe"],
  data() {
    return {
      currentRecipeId: null,
      imageUrl: this.recipe.img || "",
    };
  },
  computed: {
    ...mapGetters("recipe", {
      recipeArchive: getters.GET_ARCHIVE_RECIPES,
    }),
  },
  methods: {
    ...mapActions("modal", {
      openModal: actions.OPEN_MODAL,
    }),
    ...mapActions("recipe", {
      copyRecipe: recipeActions.COPY_RECIPE,
      deleteRecipe: recipeActions.DELETE_RECIPE,
    }),
    onOpenModal: function() {
      this.openModal(this.recipe.id);
    },
    onCopyRecipe: function() {
      this.copyRecipe(this.recipe.id);
    },
    onDeleteRecipe: function() {
      this.deleteRecipe(this.recipe.id);
    },
    goToReciptPage: function(recipeId) {
      this.$router.push({ path: `/recipe/${recipeId}` });
    },
    fotmatedData: function(date) {
      return format(new Date(date), "dd MMMM yyyy");
    },
  },
};
</script>

<style scoped lang="scss">
.recipe-wrapper {
  &:hover {
    .icon-wrapper {
      display: flex;
    }
  }
}
</style>
