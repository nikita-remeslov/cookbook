<template>
  <div
    v-if="isModalOpen"
    class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
  >
    <div class="relative my-6 mx-auto w-full max-w-6xl p-4">
      <!--content-->
      <div
        class="sm:min-w-xl min-w-full border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
      >
        <!--header-->
        <div
          class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t"
        >
          <h3 class="text-3xl font-semibold">
            {{ currentRecipeId ? "Edit recipe" : "Create recipe" }}
          </h3>
          <button
            class="p-1 ml-auto bg-transparent border-0 text-black opacity-70 hover:opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            v-on:click="toggleModal()"
          >
            <span
              class="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none"
            >
              ×
            </span>
          </button>
        </div>
        <!--body-->
        <div class="relative p-6 flex-auto">
          <div class="flex flex-col mb-4">
            <label class="leading-loose text-left" for="name"
              >Recipe name</label
            >
            <input
              name="name"
              type="text"
              autocomplete="off"
              v-model="formData.name"
              class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 placeholder-gray-400"
              placeholder="Recipe name"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label class="leading-loose text-left" for="name"
              >Instructions</label
            >
            <textarea
              name="name"
              type="text"
              autocomplete="off"
              v-model="formData.instructions"
              class="px-4 py-2 h-32 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 placeholder-gray-400"
              placeholder="Instructions"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label class="leading-loose text-left" for="name"
              >Recipe image link</label
            >
            <input
              name="img"
              type="text"
              autocomplete="off"
              v-model="formData.img"
              class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 placeholder-gray-400"
              placeholder="https://myimage.com/recipe.png"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label class="leading-loose text-left" for="name"
              >Ingredients</label
            >
            <div class="flex">
              <input
                name="name"
                type="text"
                class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600 placeholder-gray-400"
                placeholder="Push Enter to add"
                autocomplete="off"
                v-model="ingredients"
                @keydown.enter="say(ingredients)"
              />
              <button
                @click="say(ingredients)"
                class="bg-transparent border border-solid border-gray-300 font-bold uppercase text-xl rounded-md outline-none focus:outline-none ml-2 px-3 hover:bg-gray-100 hover:border-gray-100"
              >
                +
              </button>
            </div>
          </div>
          <div
            class="mb-4"
            v-if="formData.ingredients && formData.ingredients.length"
          >
            <div
              v-for="item in formData.ingredients"
              :key="item"
              class="inline-block align-middle bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2 my-1 max-w-15 truncate"
            >
              <button
                class="font-semibold bg-transparent text-black text-xl opacity-60 hover:opacity-100 outline-none focus:outline-none"
                v-on:click="removeIngredient(item)"
              >
                x
              </button>
              {{ item }}
            </div>
          </div>
        </div>
        <!--footer-->
        <div
          class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b"
        >
          <button
            class="w-24 text-red-400 bg-transparent border border-solid border-red-400 hover:bg-red-400 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style="transition: all .15s ease"
            v-on:click="toggleModal()"
          >
            Close
          </button>
          <button
            class="w-24 text-green-400 bg-transparent border border-solid border-green-400 hover:bg-green-400 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style="transition: all .15s ease"
            v-on:click="
              currentRecipeId
                ? onEditRecipe(currentRecipeId, formData)
                : toggleModal()
            "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isModalOpen" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as getters from "@/store/modules/modal/types/getters";
import * as recipeGetters from "@/store/modules/recipe/types/getters";
import * as actions from "@/store/modules/modal/types/actions";
import * as recipeActions from "@/store/modules/recipe/types/actions";

export default {
  name: "CreateEditRecipeModal",
  data() {
    return {
      formData: {},
      ingredients: "",
    };
  },
  computed: {
    ...mapGetters("modal", {
      isModalOpen: getters.GET_MODAL_STATUS,
      currentRecipeId: getters.GET_CURRENT_RECIPE_ID,
    }),
    ...mapGetters("recipe", {
      recipeList: recipeGetters.GET_RECIPES,
    }),
  },
  watch: {
    currentRecipeId: function(val) {
      if (val) {
        this.formData = { ...this.recipeList[this.currentRecipeId] };
      }
    },
  },
  methods: {
    ...mapActions("modal", {
      openModal: actions.OPEN_MODAL,
      closeModal: actions.CLOSE_MODAL,
    }),
    ...mapActions("recipe", {
      editRecipe: recipeActions.EDIT_RECIPE,
    }),
    toggleModal: function() {
      if (this.isModalOpen) {
        this.closeModal();
        this.formData = {};
      } else {
        this.openModal();
      }
    },
    onEditRecipe: function(id, recipe) {
      this.editRecipe({ id, recipe });
      this.toggleModal();
    },
    say: function(ingredient) {
      if (this.formData.ingredients.includes(ingredient.toLowerCase())) {
        return (this.ingredients = "");
      }

      if (ingredient) {
        this.formData.ingredients.push(ingredient.toLowerCase());
        this.ingredients = "";
      }
    },
    removeIngredient: function(ingredient) {
      if (ingredient) {
        this.formData.ingredients = this.formData.ingredients.filter(
          (elem) => elem !== ingredient
        );
      }
    },
  },
};
</script>
