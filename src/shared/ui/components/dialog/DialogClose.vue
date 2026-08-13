<template>
  <BaseButton variant="transparent" type="button" @click="close">
    <X class="text-primary h-4 w-4" />
  </BaseButton>
</template>

<script setup>
import { X } from '@lucide/vue'
import { BaseButton } from '..'
import { inject } from 'vue'

const close = inject('dialogClose')
</script>
