<script setup>
import { ref } from "vue";
import { getProductByID } from "../../services/communicationManager.js";

//1. DECLAREM LES VARIABLES REACTIVES
const searchId = ref("");
const product = ref(null);

//2. DECLAREM LES FUNCIONS

//FUNCIO PER CERCA PRODUCTE
async function handleSearch() {
  //SI NO HI HA ID, ALERTA I TORNAR
  if (searchId.value == "") {
    alert("Escribe un ID primero");
    return;
  }
  //CRIDAR A LA FUNCIO DE COMMUNICATION MANAGER
  const response = await getProductByID(searchId.value);
  product.value = response.data;
}
</script>

<template>
  <div>
    <div class="search-container">
      <h1>Cercar Producte per ID</h1>

      <div class="controls">
        <input
          v-model="searchId"
          type="number"
          placeholder="Introdueix ID (ex: 1)..."
        />
        <button @click="handleSearch">Cercar</button>
      </div>

      <div v-if="product" class="product-detail">
        <h2>{{ product.title }}</h2>
        <img :src="product.image" :alt="product.title" />
        <p class="category">{{ product.category }}</p>
        <p class="description">{{ product.description }}</p>
        <p class="price">{{ product.price }}€</p>
      </div>
    </div>
  </div>
</template>
