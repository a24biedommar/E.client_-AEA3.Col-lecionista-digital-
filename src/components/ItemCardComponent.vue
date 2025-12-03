<script setup>
import { useGemini } from "../composables/useGemini.js";

const { aiResponse, isGenerating, generateCreativeText } = useGemini();

function askGemini() {
  generateCreativeText(props.item.title);
}
// DEFINIM EL PROP QUE REP DE EL COMPONENT PARE (SEARCHVIEW)
const props = defineProps(["item"]);
</script>

<template>
  <!--CARREGUEM EL ITEM QUE ENS ARRIVA PER PROP I LES SEVES CARACTERISTIQUES (IMG, TITOL, PREU)-->
  <div class="item-card">
    <img :src="item.image" :alt="item.title" width="100" class="card-image" />

    <div>
      <h4>{{ props.item.title }}</h4>
      <p>{{ props.item.price }} €</p>
    </div>

    <div class="card-action">
      <slot></slot>
    </div>

    <br />

    <div class="ai-control">
      <button @click="askGemini" :disabled="isGenerating" class="ai-btn">
        {{ isGenerating ? "Pensant..." : "Preguntar IA" }}
      </button>

      <div v-if="aiResponse" class="ai-result">
        <p>{{ aiResponse }}</p>
      </div>
    </div>

    <hr />
  </div>
</template>
