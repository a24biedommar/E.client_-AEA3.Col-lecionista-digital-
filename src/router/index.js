import { createRouter, createWebHistory } from "vue-router";

//1. IMPORTEM LES VISTES
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";
import ItemDetailView from "../views/ItemDetailView.vue";
import FavoritesView from "../views/FavoritesView.vue";

//2. DEFINIM LES RUTES, CADA UNA ÉS UN COMPONENT
const routes = [
  { path: "/", component: HomeView },
  { path: "/search", component: SearchView },
  {
    path: "/item/:id",
    component: ItemDetailView,
  },
  { path: "/favorites", component: FavoritesView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
