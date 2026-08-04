<template>
  <div class="flex items-center justify-between px-3 py-3 font-semibold border-b border-b-input">
    <slot />
    <DialogClose />
  </div>
</template>

<script setup >
import { DialogClose } from '..'
</script>