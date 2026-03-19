<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  error?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  error: '',
  required: false,
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const inputId = computed(() => props.id || `input-${Math.random().toString(36).slice(2, 9)}`);

function handleInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class="space-y-1">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ label }}
      <span v-if="required" class="text-red-500" aria-hidden="true">*</span>
    </label>
    
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${inputId}-error` : undefined"
      :class="[
        'input-field',
        error && 'border-red-500 focus:ring-red-500',
      ]"
      @input="handleInput"
    />
    
    <p
      v-if="error"
      :id="`${inputId}-error`"
      class="text-sm text-red-500"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>
