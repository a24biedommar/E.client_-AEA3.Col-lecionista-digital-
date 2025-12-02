<script setup>
import { useGemini } from "../composables/useGemini";

const { aiResponse, isGenerating, generateCreativeText } = useGemini();
</script>
<template>
  <div class="item-detail">
    <h1>Detall de l'Element</h1>
    <!-- Mostrem l'ID que ve per la URL per comprovar que funciona -->
    <p>
      Estàs visualitzant la informació de l'ID:
      <strong>{{ $route.params.id }}</strong>
    </p>
  </div>
</template>
