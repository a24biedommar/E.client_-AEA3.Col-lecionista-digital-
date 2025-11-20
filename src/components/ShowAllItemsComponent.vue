<script setup>
import { ref, onMounted } from "vue";
import { getAllProducts } from "../services/communicationManager.js";
import ItemCard from "./ItemCardComponent.vue";

const products = ref([]);

onMounted(async () => {
  const response = await getAllProducts();
  products.value = response.data;
});
</script>

<template>
  <div class="recommendations-container">
    <h3 class="section-title">Tots els productes disponibles</h3>

    <div class="items-grid-container">
      <ItemCard v-for="prod in products" :key="prod.id" :item="prod" />
    </div>
  </div>
</template>
