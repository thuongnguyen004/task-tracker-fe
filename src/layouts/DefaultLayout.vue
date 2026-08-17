<template>
  <div class="bg-gradient-surface flex h-screen flex-col">
    <Header />

    <main class="flex-1 overflow-auto px-6 py-4">
      <RouterView v-slot="{ Component }">
        <TransitionFadeScale>
          <component :is="Component" />
        </TransitionFadeScale>
      </RouterView>
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import { TransitionFadeScale } from '@/shared/ui/components'
</script>
