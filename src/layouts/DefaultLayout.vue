<template>
  <div class="min-h-screen bg-gradient-surface">
    <Header />

    <main class="px-6 py-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';

</script>