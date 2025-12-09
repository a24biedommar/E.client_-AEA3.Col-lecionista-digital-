<template>
  <nav class="navbar navbar-expand-lg navbar-light navbar-estore fixed-top">
    <div class="container">
      <NuxtLink class="navbar-brand fw-bold" to="/" style="color: var(--estore-primary);">
        <i class="fas fa-store me-2"></i>Coleccionista Digital
      </NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/" active-class="active">Inici</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/search" active-class="active">Cercador</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/favorites" active-class="active">Favorits</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup></script>
<style scoped></style>
