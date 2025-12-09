<script setup>
const store = useFavoritesStore();
</script>

<template>
  <NavBarComponent />
  <div class="container py-4">
    <div class="favorites">
      <h1 class="mb-4">Els meus Favorits</h1>

      <p v-if="store.favorites.length === 0" class="alert alert-info">
        No tens cap favorit encara.
      </p>

      <div v-else class="row g-4">
        <div
          v-for="fav in store.favorites"
          :key="fav.id"
          class="col-md-6 col-lg-4 col-xl-3"
        >
          <ItemCardComponent :item="fav">
            <FavoriteButtonComponent :item="fav" />
          </ItemCardComponent>
        </div>
      </div>
    </div>
  </div>
</template>
