<script setup>
import { onMounted } from "vue";
import ItemCard from "./ItemCardComponent.vue";

import FavoriteButton from "./FavoriteButtonComponent.vue";

import { useSearch } from "../composables/userSearch.js";

const { results, loading, error, searchAll } = useSearch();

onMounted(async () => {
  await searchAll();
});
</script>

<template>
  <div class="recommendations-container">
    <h3 class="section-title">Tots els productes disponibles</h3>

    <div class="items-grid-container">
      <ItemCard v-for="prod in results" :key="prod.id" :item="prod">
        <FavoriteButton :item="prod" />
      </ItemCard>
    </div>
  </div>
</template>
