<script setup lang="ts">
import type { TimeRange } from '@/types';

interface Props {
  ranges: TimeRange[];
  modelValue: TimeRange;
}

defineProps<Props>();

const emit = defineEmits<{
  'update:modelValue': [range: TimeRange];
}>();

function selectRange(range: TimeRange): void {
  emit('update:modelValue', range);
}
</script>

<template>
  <div class="flex flex-wrap gap-2" role="group" aria-label="Seleccionar rango de tiempo">
    <button
      v-for="range in ranges"
      :key="range.value"
      type="button"
      :class="[
        'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150',
        modelValue.value === range.value
          ? 'bg-primary-600 text-white'
          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
      ]"
      :aria-pressed="modelValue.value === range.value"
      @click="selectRange(range)"
    >
      {{ range.label }}
    </button>
  </div>
</template>
