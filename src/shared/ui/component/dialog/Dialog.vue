<template>
  <dialog
    ref="dialogRef"
    :class="dialogClass"
  >
    <div class="flex flex-col">
      <slot />
    </div>
  </dialog>
</template>

<script setup>
import { computed, nextTick, provide, ref, watch } from "vue";

const open = defineModel({
  default: false,
});

const props = defineProps({
  size: {
    type: String,
    default: "lg",
  },
});

const dialogRef = ref(null);

const sizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-6xl",
};

const dialogClass = computed(() => [
  "m-auto w-[calc(100%-2rem)] sm:w-full rounded-xl bg-card shadow-sm overflow-visible",
  sizes[props.size],
]);

watch(
  open,
  async (value) => {
    await nextTick();

    if (!dialogRef.value) return;

    if (value && !dialogRef.value.open) {
      dialogRef.value.showModal();
    }

    if (!value && dialogRef.value.open) {
      dialogRef.value.close();
    }
  },
  { immediate: true },
);

function close() {
  open.value = false;
}

provide("dialogClose", close);
</script>