<template>
  <main>
    <div class="min-h-screen bg-gradient-surface overflow-hidden">
      <div class="flex justify-center items-center min-h-screen">
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
      </div>
    </div>
  </main>
</template>
