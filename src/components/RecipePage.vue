<template>
  <div>
    <div class="flex justify-between p-4">
      <label class="flex items-center">
        <span class="text-gray-700 mr-2">Recipe version</span>
        <select
          class="px-4 py-2 w-40 overflow-hidden truncate border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 placeholder-gray-400"
          v-model="selected"
        >
          <option :value="id">
            default version
          </option>
          <option
            v-for="option in recipeVersions"
            :key="option.id"
            :value="option.id"
          >
            {{ option.name }}
          </option>
        </select>
      </label>
      <div class="flex items-center" v-if="selected === id">
        <EditIcon
          :onClick="onOpenModal"
          :classConfig="'text-main hover:text-gray-500 w-8 h-8'"
        />
        <CopyIcon
          :onClick="onCopyRecipe"
          :classConfig="'text-main hover:text-gray-500 w-10 h-8'"
        />
        <TrashIcon
          :onClick="onDeleteRecipe"
          :classConfig="'text-main hover:text-red-500 w-10 h-8'"
        />
      </div>
    </div>
    <div class="w-full flex justify-center flex-col">
      <div class="p-4">
        <div class="flex">
          <img
            class="max-w-xl"
            :src="imageUrl"
            @error="imageUrl = require('@/assets/defaultRecipeImg.png')"
            alt="Sunset in the mountains"
          />
          <div>
            <h1 class="text-2xl font-bold uppercase">
              {{ currentRecipe.name }}
            </h1>
            <p class="mt-2 px-10 text-lg">{{ currentRecipe.instructions }}</p>
          </div>
        </div>
        <div class="mt-4">
          <h2 class="text-left text-md font-bold uppercase">Ingredients:</h2>
          <div class="flex flex-wrap">
            <div
              v-for="item in currentRecipe.ingredients"
              :key="item"
              class="inline-block bg-gray-100 rounded-full px-5 py-3 text-md font-semibold mr-2 my-1"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="m-4 flex flex-col flex-wrap gap-4">
        <h2 class="text-left text-xl font-bold uppercase">Recipe copies:</h2>
        <div class="flex flex-wrap justify-center gap-4">
          <RecipeItem
            v-for="recipe in recipeCopies"
            :key="recipe.id"
            :recipe="recipe"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeItem from "./RecipeItem.vue";
import EditIcon from "./icons/EditIcon.vue";
import CopyIcon from "./icons/CopyIcon.vue";
import TrashIcon from "./icons/TrashIcon.vue";
import { mapGetters, mapActions } from "vuex";
import * as getters from "@/store/modules/recipe/types/getters";
import * as actions from "@/store/modules/modal/types/actions";
import * as recipeActions from "@/store/modules/recipe/types/actions";

export default {
  name: "RecipePage",
  components: { RecipeItem, EditIcon, CopyIcon, TrashIcon },
  props: ["id"],
  data() {
    return {
      recipeVersions: null,
      recipeCopies: null,
      currentRecipe: null,
      imageUrl: null,
      selected: this.id,
    };
  },
  computed: {
    ...mapGetters("recipe", {
      recipeList: getters.GET_RECIPES,
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
    updateState: function() {
      this.recipeVersions = Object.values(this.recipeArchive).filter((elem) =>
        this.recipeList[this.id].versions.includes(elem.id)
      );
      this.recipeCopies = Object.values(this.recipeList).filter((elem) =>
        this.recipeList[this.id].children.includes(elem.id)
      );
      this.currentRecipe = this.recipeList[this.id];
      this.imageUrl = this.currentRecipe.img;
      this.selected = this.id;
    },
    onOpenModal: function() {
      this.openModal(this.id);
    },
    onCopyRecipe: function() {
      this.copyRecipe(this.id);
    },
    onDeleteRecipe: function() {
      this.deleteRecipe(this.recipe.id);
    },
  },
  created() {
    this.updateState();
    this.selected = this.currentRecipe.id;
  },
  watch: {
    selected: function(val) {
      if (val === this.id) {
        this.currentRecipe = this.recipeList[this.id];
      } else {
        const { name, ingredients, instructions, img } = this.recipeArchive[
          val
        ];
        this.currentRecipe = {
          ...this.currentRecipe,
          name,
          ingredients,
          instructions,
          img,
        };
      }
    },
    id: function() {
      this.updateState();
    },
    recipeList: function() {
      this.updateState();
    },
  },
};
</script>

<style scoped></style>
