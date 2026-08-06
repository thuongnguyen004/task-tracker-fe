<template>
  <div class="flex items-center justify-between px-5 py-4 font-semibold border-b border-b-border">
    <slot />
    <div class="w-fit">
      <DialogClose />
    </div>
  </div>
</template>

<script setup>
import { DialogClose } from '..'
</script>
