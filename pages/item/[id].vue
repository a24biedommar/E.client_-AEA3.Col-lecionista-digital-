<script setup>
const route = useRoute();
const api = useApi();
const { aiResponse, isGenerating, generateCreativeText } = useGemini();

const item = ref(null);
const loading = ref(true);
const error = ref(null);

// Función para obtener los detalles del item
async function fetchItemDetails() {
  loading.value = true;
  error.value = null;

  const response = await api.get(`/products/${route.params.id}`);
  item.value = response.data;

  loading.value = false;
}

function askGemini() {
  if (item.value) {
    generateCreativeText(item.value.title);
  }
}

onMounted(() => {
  fetchItemDetails();
});
</script>

<template>
  <NavBarComponent />
  <div class="container py-4">
    <div class="item-detail-container">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Carregant...</span>
        </div>
        <p class="mt-3">Carregant...</p>
      </div>
      <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-else-if="item" class="item-detail">
        <!-- Header con botón de volver y favoritos -->
        <div class="item-detail-header">
          <NuxtLink to="/search" class="back-link">← Tornar</NuxtLink>
          <FavoriteButtonComponent :item="item" />
        </div>

        <!-- Título del producto -->
        <h1 class="item-title">{{ item.title }}</h1>

        <!-- Sección principal: Imagen y precio -->
        <div class="item-main-section">
          <div class="item-image-section">
            <img
              :src="item.image"
              :alt="item.title"
              class="item-detail-image"
            />
          </div>

          <div class="item-price-section">
            <p class="item-price">{{ item.price }} €</p>

            <div v-if="item.rating" class="item-rating">
              <h3>Valoració</h3>
              <p class="rating-value">{{ item.rating.rate }} / 5</p>
              <p class="rating-count">{{ item.rating.count }} valoracions</p>
            </div>

            <div v-if="item.category" class="item-category">
              <h3>Categoria</h3>
              <p>{{ item.category }}</p>
            </div>
          </div>
        </div>

        <!-- Descripción -->
        <div v-if="item.description" class="item-description">
          <h3>Descripció</h3>
          <p>{{ item.description }}</p>
        </div>

        <!-- Control de IA -->
        <div class="ai-control">
          <button @click="askGemini" :disabled="isGenerating" class="ai-btn">
            {{
              isGenerating ? "Pensant..." : "Preguntar IA sobre aquest producte"
            }}
          </button>

          <div v-if="aiResponse" class="ai-result">
            <h3>Resposta de la IA:</h3>
            <p>{{ aiResponse }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
