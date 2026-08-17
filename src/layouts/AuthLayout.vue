<template>
  <main>
    <div class="bg-gradient-surface min-h-screen overflow-hidden">
      <div class="flex min-h-screen items-center justify-center">
        <RouterView v-slot="{ Component }">
          <TransitionFadeScale>
            <component :is="Component" />
          </TransitionFadeScale>
        </RouterView>
      </div>
    </div>
  </main>
</template>

<script setup>
import { TransitionFadeScale } from '@/shared/ui/components'
</script>
