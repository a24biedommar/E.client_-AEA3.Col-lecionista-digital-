<script setup>
// IMPORTACIONS NECESSARIES
import { ref } from "vue";
import SearchBar from "../components/Search/SearchBarComponent.vue";
import SearchCategoryComponent from "../components/Search/SearchCategoryComponent.vue";
import ShowAllItems from "../components/ShowAllItemsComponent.vue";
import ItemCard from "../components/ItemCardComponent.vue";
import {
  getProductsByCategory,
  getProductByID,
} from "../services/communicationManager.js";

// VARIABLES REACTIVES PER A GESTIONAR ELS PRODUCTES DE LA CATEGORIA SELECCIONADA
const categoryProducts = ref([]); // LLISTA D'ITEMS DE LA CATEGORIA ACTUAL
const currentCategory = ref(""); // NOM DE LA CATEGORIA ACTUAL
const isCategoryActive = ref(false); // INDICA SI HI HA UNA CATEGORIA ACTIVA (PER NO MOSTRAR TOTS ELS ITEMS)
const isSearchActive = ref(false); // INDICA SI S'HA REALITZAT UNA CERCA (PER NO MOSTRAR ELS ITEMS DE LA CATEGORIA)
const searchProducts = ref([]); // GUARDA EL RESULTAT DE LA CERCA

// FUNCIO PER A CARREGAR ELS PRODUCTES DE LA CATEGORIA SELECCIONADA (REP LES DADES DEL COMPONENT FILLS (SEARCHCATEGORYCOMPONENT))
async function handleCategoryLoad(category) {
  currentCategory.value = category;
  const response = await getProductsByCategory(category);
  categoryProducts.value = response.data;
  isCategoryActive.value = true;
  isSearchActive.value = false;
}
// FUNCIO QUE SE EXECUTA QUE S'EXECUTA QUAN EL FILL (SEARCHIMPUT) EMET 'SEARCH-DONE'
async function handleSearchActive(id) {
  // Desactivem la categoria activa
  isCategoryActive.value = false;
  // Activem l'estat de cerca
  isSearchActive.value = true;
  // Netejem els productes de cerca
  searchProducts.value = [];

  // Cridem a l afunció del servei per obtenir l'item per ID
  const response = await getProductByID(id);
  // Guardem el resultat a la nostra nova variable (dins d'un array)
  searchProducts.value = [response.data];
}
</script>

<template>
  <div class="search-page-layout">
    <header class="search-header">
      <!-- CATEGORIES DISPONIBLES, AL FER CLICK A UNA ES CARREGUEN ELS ITEMS D'AQUESTA CRIDANT A HANDLECATEGORYLOAD -->
      <SearchCategoryComponent @category-selected="handleCategoryLoad" />
    </header>

    <main class="search-main">
      <!-- INPUT DE CERCA GENERAL -->
      <SearchBar @search="handleSearchActive" />
    </main>

    <section class="search-footer">
      <!-- MOSTRAR ELS ITEMS DE LA CATEGORIA SELECCIONADA (IF) -->
      <div v-if="isCategoryActive" class="category-results">
        <h3>Viendo categoría: {{ currentCategory }}</h3>

        <!-- PASSEM L'ITEM AL COMPONENT ITEMCARD AMB :ITEM -->
        <div class="items-grid-container">
          <ItemCard
            v-for="prod in categoryProducts"
            :key="prod.id"
            :item="prod"
          />
        </div>
      </div>

      <div v-else-if="isSearchActive" class="search-results">
        <h3>Resultat de la cerca:</h3>
        <div class="items-grid-container">
          <ItemCard
            v-for="prod in searchProducts"
            :key="prod.id"
            :item="prod"
          />
        </div>
      </div>

      <!-- MOSTRAR TOTS ELS ITEMS (ELSE) -->
      <ShowAllItems v-else />
    </section>
  </div>
</template>
