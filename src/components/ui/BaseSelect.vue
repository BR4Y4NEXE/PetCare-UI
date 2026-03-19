<script setup lang="ts">
import { computed } from 'vue';

interface Option {
  label: string;
  value: string;
}

interface Props {
  modelValue: string;
  options: Option[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Seleccionar...',
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const selectId = computed(() => `select-${Math.random().toString(36).slice(2, 9)}`);

function handleChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class="space-y-1">
    <label
      v-if="label"
      :for="selectId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
    </label>
    
    <select
      :id="selectId"
      :value="modelValue"
      :disabled="disabled"
      class="input-field cursor-pointer"
      @change="handleChange"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
