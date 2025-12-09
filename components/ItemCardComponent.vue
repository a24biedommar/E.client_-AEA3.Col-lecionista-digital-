<script setup>
const { aiResponse, isGenerating, generateCreativeText } = useGemini();

function askGemini() {
  generateCreativeText(props.item.title);
}

// DEFINIM EL PROP QUE REP DE EL COMPONENT PARE (SEARCHVIEW)
const props = defineProps(["item"]);

// Función para navegar a la página de detalles
function goToItemDetail() {
  navigateTo(`/item/${props.item.id}`);
}
</script>

<template>
  <!--CARREGUEM EL ITEM QUE ENS ARRIVA PER PROP I LES SEVES CARACTERISTIQUES (IMG, TITOL, PREU)-->
  <div class="card card-estore h-100" @click="goToItemDetail">
    <div class="position-relative">
      <img
        :src="item.image"
        :alt="item.title"
        class="card-img-top"
        style="
          height: 200px;
          object-fit: contain;
          padding: 1rem;
          background: #f8f9fa;
        "
      />
      <div class="position-absolute top-0 end-0 p-2" @click.stop>
        <slot></slot>
      </div>
    </div>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ props.item.title }}</h5>
      <p class="card-text text-primary fw-bold fs-5 mb-3">
        {{ props.item.price }} €
      </p>
      <div class="mt-auto">
        <div class="ai-control" @click.stop>
          <button
            @click="askGemini"
            :disabled="isGenerating"
            class="btn btn-sm btn-success w-100"
          >
            {{ isGenerating ? "Pensant..." : "Preguntar IA" }}
          </button>
          <div v-if="aiResponse" class="alert alert-info mt-2 mb-0 p-2 small">
            <p class="mb-0 small">{{ aiResponse }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
