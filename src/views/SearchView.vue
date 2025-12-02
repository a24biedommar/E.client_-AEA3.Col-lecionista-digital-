<script setup>
// IMPORTACIONS NECESSARIES
import { ref } from "vue";
import SearchBar from "../components/Search/SearchBarComponent.vue";
import SearchCategoryComponent from "../components/Search/SearchCategoryComponent.vue";
import ShowAllItems from "../components/ShowAllItemsComponent.vue";
import ItemCard from "../components/ItemCardComponent.vue";
import FavoriteButton from "../components/FavoriteButtonComponent.vue";
import { useSearch } from "../composables/userSearch.js";

// VARIABLES REACTIVES PER A GESTIONAR ELS PRODUCTES DE LA CATEGORIA SELECCIONADA
const currentCategory = ref(""); // NOM DE LA CATEGORIA ACTUAL
const isCategoryActive = ref(false); // INDICA SI HI HA UNA CATEGORIA ACTIVA (PER NO MOSTRAR TOTS ELS ITEMS)
const isSearchActive = ref(false); // INDICA SI S'HA REALITZAT UNA CERCA (PER NO MOSTRAR ELS ITEMS DE LA CATEGORIA)
// --- GESTIÓ DE L'ESTAT (COMPOSABLE) ---
const { query, results, loading, error, searchId, searchByCategory } =
  useSearch();

// FUNCIO PER A CARREGAR ELS PRODUCTES DE LA CATEGORIA SELECCIONADA (REP LES DADES DEL COMPONENT FILLS (SEARCHCATEGORYCOMPONENT))
async function handleCategoryLoad(category) {
  currentCategory.value = category;
  await searchByCategory(category);
  isCategoryActive.value = true;
  isSearchActive.value = false;
}

// FUNCIO QUE SE EXECUTA QUE S'EXECUTA QUAN EL FILL (SEARCHIMPUT) EMET 'SEARCH-DONE'
async function handleSearchActive(valor) {
  //Desactivem la categoria
  isCategoryActive.value = false;

  //Activem el mode cerca
  isSearchActive.value = true;

  //Passem el valor al composable (query)
  query.value = valor;

  //Executem la funció search del composable
  await searchId();
}
</script>

<template>
  <div class="search-page-layout">
    <header class="search-header">
      <SearchCategoryComponent @category-selected="handleCategoryLoad" />
    </header>

    <main class="search-main">
      <SearchBar @search="handleSearchActive" />

      <div v-if="loading" class="loading-message">Carregant...</div>
      <div v-if="error" class="error-message">{{ error }}</div>
    </main>

    <section class="search-footer" v-if="!loading">
      <div v-if="isCategoryActive" class="category-results">
        <h3>Viendo categoría: {{ currentCategory }}</h3>
        <div class="items-grid-container">
          <ItemCard v-for="prod in results" :key="prod.id" :item="prod">
            <FavoriteButton :item="prod" />
          </ItemCard>
        </div>
      </div>

      <div v-else-if="isSearchActive" class="search-results">
        <h3>Resultat de la cerca:</h3>
        <div class="items-grid-container">
          <ItemCard v-for="prod in results" :key="prod.id" :item="prod">
            <FavoriteButton :item="prod" />
          </ItemCard>
        </div>
      </div>

      <ShowAllItems />
    </section>
  </div>
</template>
