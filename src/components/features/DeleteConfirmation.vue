<script setup lang="ts">
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

interface Props {
  open: boolean;
  deviceName: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<{
  close: [];
  confirm: [];
}>();
</script>

<template>
  <BaseModal :open="open" title="Confirmar Eliminación" @close="emit('close')">
    <div class="space-y-4">
      <p class="text-gray-600 dark:text-gray-300">
        ¿Estás seguro de que deseas eliminar el dispositivo
        <span class="font-semibold text-gray-900 dark:text-white">"{{ deviceName }}"</span>?
      </p>
      
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Esta acción no se puede deshacer. Se perderán todos los datos históricos asociados a este dispositivo.
      </p>
    </div>

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
          variant="danger"
          :loading="loading"
          @click="emit('confirm')"
        >
          Eliminar
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>
