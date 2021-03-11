<template>
  <div class="home">
    <RecipeList />
  </div>
</template>

<script>
import RecipeList from "@/components/RecipeList.vue";

export default {
  name: "Home",
  components: {
    RecipeList,
  },
};
</script>
