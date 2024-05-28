<template>
  <div
    class="flex flex-col min-h-screen font-Roboto bg-weather-primary"
  >
    <Suspense>
      <AsyncCityView />
    </Suspense>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import AsyncCityView from "./components/AsyncCityView.vue";
</script>

<style>
.page-enter-active {
  transition: 600ms ease all;
}

.page-enter-from {
  opacity: 0;
}
</style>
