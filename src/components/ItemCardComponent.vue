<script setup>
// DEFINIM EL PROP QUE REP DE EL COMPONENT PARE (SEARCHVIEW)
defineProps(["item"]);
</script>

<template>
  <!--CARREGUEM EL ITEM QUE ENS ARRIVA PER PROP I LES SEVES CARACTERISTIQUES (IMG, TITOL, PREU)-->
  <div class="item-card">
    <img :src="item.image" :alt="item.title" width="100" class="card-image" />
    <div class="card-info">
      <h4>{{ item.title }}</h4>
      <p>{{ item.price }} €</p>
    </div>

    <div class="card-action">
      <slot></slot>
    </div>
    <hr />
  </div>
</template>
