<script setup lang="ts">
import { ref, watch } from 'vue';
import type { DeviceFormData } from '@/types';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

interface Props {
  open: boolean;
  loading?: boolean;
  error?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
});

const emit = defineEmits<{
  close: [];
  submit: [data: DeviceFormData];
}>();

const formData = ref<DeviceFormData>({
  name: '',
  location: '',
  device_id: '',
});

const errors = ref<Partial<DeviceFormData>>({
  name: '',
  location: '',
  device_id: '',
});

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) {
      formData.value = { name: '', location: '', device_id: '' };
      errors.value = { name: '', location: '', device_id: '' };
    }
  }
);

function validate(): boolean {
  let isValid = true;
  errors.value = { name: '', location: '', device_id: '' };

  if (!formData.value.name.trim()) {
    errors.value.name = 'El nombre es requerido';
    isValid = false;
  }

  if (!formData.value.location.trim()) {
    errors.value.location = 'La ubicación es requerida';
    isValid = false;
  }

  if (!formData.value.device_id.trim()) {
    errors.value.device_id = 'El ID del dispositivo es requerido';
    isValid = false;
  }

  return isValid;
}

function handleSubmit(): void {
  if (!validate()) return;
  
  emit('submit', {
    name: formData.value.name.trim(),
    location: formData.value.location.trim(),
    device_id: formData.value.device_id.trim(),
  });
}
</script>

<template>
  <BaseModal :open="open" title="Agregar Nuevo Dispositivo" @close="emit('close')">
    <form @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <BaseInput
          v-model="formData.name"
          label="Nombre del dispositivo"
          placeholder="Ej: Comedor Sala"
          required
          :error="errors.name"
          :disabled="loading"
        />

        <BaseInput
          v-model="formData.location"
          label="Ubicación"
          placeholder="Ej: Cocina, Jardín"
          required
          :error="errors.location"
          :disabled="loading"
        />

        <BaseInput
          v-model="formData.device_id"
          label="ID del dispositivo ESP32"
          placeholder="Ej: ESP32-001"
          required
          :error="errors.device_id"
          :disabled="loading"
        />

        <div
          v-if="error"
          class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm"
          role="alert"
        >
          {{ error }}
        </div>
      </div>
    </form>

    <template #footer>
      <div class="flex justify-end gap-3">
        <BaseButton
          variant="secondary"
          :disabled="loading"
          @click="emit('close')"
        >
          Cancelar
        </BaseButton>
        <BaseButton
          :loading="loading"
          @click="handleSubmit"
        >
          Crear Dispositivo
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>
