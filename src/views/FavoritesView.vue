<script setup>
import { useFavoritesStore } from "../stores/favoritesStore";
import ItemCard from "../components/ItemCardComponent.vue";
// Accedemos a los datos globales
const store = useFavoritesStore();
</script>

<template>
  <div class="favorites">
    <h1>Els meus Favorits</h1>

    <p v-if="store.favorites.length === 0">No tens cap favorit encara.</p>

    <div class="items-grid-container" v-else>
      <ItemCard v-for="fav in store.favorites" :key="fav.id" :item="fav">
      </ItemCard>
    </div>
  </div>
</template>
