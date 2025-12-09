<script setup>
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
  <NavBarComponent />
  <div class="container py-4">
    <div class="search-page-layout">
      <h1 class="mb-4">Cercador</h1>
      <header class="search-header mb-4">
        <SearchCategoryComponent @category-selected="handleCategoryLoad" />
      </header>

      <main class="search-main mb-4">
        <SearchBarComponent @search="handleSearchActive" />

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Carregant...</span>
          </div>
          <p class="mt-3">Carregant...</p>
        </div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
      </main>

      <section class="search-footer" v-if="!loading">
        <div v-if="isCategoryActive" class="category-results">
          <h3 class="mb-4">Veient categoría: {{ currentCategory }}</h3>
          <div class="row g-4">
            <div
              v-for="prod in results"
              :key="prod.id"
              class="col-md-6 col-lg-4 col-xl-3"
            >
              <ItemCardComponent :item="prod">
                <FavoriteButtonComponent :item="prod" />
              </ItemCardComponent>
            </div>
          </div>
        </div>

        <div v-else-if="isSearchActive" class="search-results">
          <h3 class="mb-4">Resultat de la cerca:</h3>

          <p v-if="results.length === 0" class="alert alert-info">
            No s'han trobat resultats!
          </p>

          <div v-else class="row g-4">
            <div
              v-for="prod in results"
              :key="prod.id"
              class="col-md-6 col-lg-4 col-xl-3"
            >
              <ItemCardComponent :item="prod">
                <FavoriteButtonComponent :item="prod" />
              </ItemCardComponent>
            </div>
          </div>
        </div>

        <ShowAllItemsComponent v-if="!isCategoryActive && !isSearchActive" />
      </section>
    </div>
  </div>
</template>
