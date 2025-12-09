<script setup>
// Recibimos el item completo para poder guardarlo o borrarlo por ID
const props = defineProps(["item"]);

const store = useFavoritesStore();

// Función que decide si añadir o borrar
function toggleFavorite() {
  if (store.isFavorite(props.item.id)) {
    store.removeFavorite(props.item.id);
  } else {
    store.addFavorite(props.item);
  }
}
</script>

<template>
  <button class="btn-favorite" @click.stop="toggleFavorite">
    <span v-if="store.isFavorite(item.id)" class="heart-filled"> ♥ </span>

    <span v-else class="heart-outline"> ♡ </span>
  </button>
</template>

<style scoped></style>
