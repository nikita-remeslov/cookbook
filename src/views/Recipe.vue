<template>
  <div class="w-full flex justify-center">
    <RecipePage :id="$route.params.id" />
  </div>
</template>

<script>
import RecipePage from "@/components/RecipePage.vue";

export default {
  name: "Recipe",
  components: {
    RecipePage,
  },
};
</script>

<style scoped></style>
