<template>
  <div class="border-b-border flex items-center justify-between border-b px-5 py-4 font-semibold">
    <slot />
    <div class="w-fit">
      <DialogClose />
    </div>
  </div>
</template>

<script setup>
import { DialogClose } from '..'
</script>
