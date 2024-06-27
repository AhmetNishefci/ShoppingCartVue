<template>
  <button
    :class="[
      'inline-flex items-center px-4 py-2 text-sm font-medium rounded focus:outline-none transition ease-in-out duration-150',
      {
        'bg-blue-600 text-white hover:bg-blue-700': type === 'primary',
        'bg-red-600 text-white hover:bg-red-700': type === 'danger',
        'bg-gray-600 text-white hover:bg-gray-700': type === 'secondary',
        'opacity-50 cursor-not-allowed': disabled,
      },
      customClass
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot name="icon" />
    <span v-if="$slots.default" :class="{ 'ml-2': $slots.icon }"><slot /></span>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

type ButtonProps = {
  type: 'primary' | 'danger' | 'secondary';
  disabled?: boolean;
  customClass?: string;
};

const props = defineProps<ButtonProps>();

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent): void => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>
