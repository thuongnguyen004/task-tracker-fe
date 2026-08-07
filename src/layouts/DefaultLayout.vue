<template>
  <div class="bg-gradient-surface flex h-screen flex-col overflow-auto">
    <Header class="shrink-0" />

    <main class="px-6 py-4">
      <RouterView v-slot="{ Component }">
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-200 ease-out"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
            mode="out-in"
          >
            <component :is="Component" />
          </Transition>
        </RouterView>
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';

</script>