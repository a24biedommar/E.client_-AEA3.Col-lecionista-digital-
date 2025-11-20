<script setup>
//IMPORTACIONS NECESSARIES
import { ref } from "vue";
import { getProductByID } from "../../services/communicationManager.js";

//DEFINIM ELS EVENTS QUE EMET EL COMPONENT AL PARE (SEARCHVIEW)
const emit = defineEmits(["search-done"]);

//VARIABLES REACTIVES PER A GESTIONAR L'INPUT I EL PRODUCTE TROBAT
const searchId = ref("");
const product = ref(null);

//FUNCIO PER A GESTIONAR LA CERCA DEL PRODUCTE PER ID
async function handleSearch() {
  if (searchId.value == "") {
    alert("Escribe un ID primero");
    return;
  }
  emit("search-done"); //AVISEM AL PARE QUE S'HA INICIAT UNA CERCA

  const response = await getProductByID(searchId.value);
  product.value = response.data;
}
</script>

<template>
  <div class="search-input-wrapper">
    <div class="input-group">
      <!-- CARREGUEM EL INPUT ON BUSCAR I EL SEU BOTO (AQUEST AL FER CLICK TRUCA A HANDLESEARCH)-->
      <input
        v-model="searchId"
        type="number"
        class="main-search-input"
        placeholder="¿Qué estás buscando? (ID)"
      />
      <button @click="handleSearch" class="search-btn">BUSCAR</button>
    </div>
    <!-- MOSTREM ELS DETALLS DEL PRODUCTE TROBAT SI PRODUCTE TÉ VALOR  -->
    <div v-if="product" class="single-product-result">
      <div class="product-content">
        <img :src="product.image" :alt="product.title" class="result-image" />
        <div class="product-details">
          <h2>{{ product.title }}</h2>
          <span class="category-tag">{{ product.category }}</span>
          <p class="description">{{ product.description }}</p>
          <p class="price-tag">{{ product.price }}€</p>
        </div>
      </div>
    </div>
  </div>
</template>
