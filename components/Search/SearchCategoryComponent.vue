<script setup>
//DEFINIM ELS EVENTS QUE EMET EL COMPONENT AL PARE
const emit = defineEmits(["category-selected"]);

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

function selectCategory(category) {
  //AVISEM AL PARE QUE S'HA SELECCIONAT UNA CATEGORIA
  emit("category-selected", category);
}
</script>

<template>
  <nav class="categories-nav">
    <!-- RECORREM LES CATEGORIES I LES MOSTREM AMB UN ENLLAÇ QUE TRUCA A SELECTCATEGORY AL FER CLICK -->
    <a
      v-for="cat in categories"
      :key="cat"
      href="#"
      @click.prevent="selectCategory(cat)"
      class="btn btn-outline-primary btn-sm text-capitalize"
    >
      {{ cat }}
    </a>
  </nav>
</template>
