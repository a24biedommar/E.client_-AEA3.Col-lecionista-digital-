<script setup>
const { results, loading, error, searchAll } = useSearch();

onMounted(async () => {
  await searchAll();
});
</script>

<template>
  <div class="recommendations-container">
    <h3 class="section-title mb-4">Tots els productes disponibles</h3>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregant...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

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
</template>
