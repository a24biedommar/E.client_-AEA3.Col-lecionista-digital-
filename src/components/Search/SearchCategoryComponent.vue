<script setup>
import { ref } from "vue";

// Importamos la función del communicationManager
import { getProductsByCategory } from "../../services/communicationManager.js";

const products = ref([]);
const currentCategory = ref("");

// Lista manual de categorías de la API
const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

// Función para cargar productos al hacer clic
async function loadCategory(category) {
  currentCategory.value = category;

  // Llamada directa a la API
  const response = await getProductsByCategory(category);
  products.value = response.data;
}
</script>

<template>
  <div>
    <div class="category-page">
      <h1>Categories</h1>

      <!-- Enlaces de categorías en la misma línea -->
      <div class="category-links">
        <a
          v-for="cat in categories"
          :key="cat"
          href="#"
          @click.prevent="loadCategory(cat)"
          :class="{ active: currentCategory === cat }"
        >
          {{ cat }} |
        </a>
      </div>

      <!-- Lista de productos resultantes -->
      <div class="products-grid">
        <div v-for="prod in products" :key="prod.id" class="product-card">
          <img :src="prod.image" :alt="prod.title" />
          <h3>{{ prod.title }}</h3>
          <p>{{ prod.price }} €</p>
        </div>
      </div>
    </div>
  </div>
</template>
