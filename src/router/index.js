import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/recipe/:id",
    name: "Recipe",
    component: () => import("../views/Recipe.vue"),
  },
  {
    path: "/error404",
    name: "Error404",
    component: () => import("../views/Error404.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "Error404" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
