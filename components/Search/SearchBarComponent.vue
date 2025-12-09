<script setup>
//Definim l'event que emetrem al component pare (SearchView), aquest cas "search"
const emit = defineEmits(["search"]);

//Variable reactiva per emmagatzemar el valor de l'input (inicialment buida)
const searchQuery = ref("");

function submitSearch() {
  // Si el input no està buit, enviem l'event "search" amb el valor de l'input
  if (searchQuery.value !== "") {
    emit("search", searchQuery.value);
  }
}
</script>

<template>
  <div class="search-bar-container">
    <div class="input-group">
      <input
        v-model="searchQuery"
        type="number"
        placeholder="Introdueix ID..."
        class="form-control"
        @keyup.enter="submitSearch"
      />
      <button @click="submitSearch" class="btn btn-primary">Cercar</button>
    </div>
  </div>
</template>
