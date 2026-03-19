<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useDevices } from '@/composables/useDevices';
import type { DeviceFormData } from '@/types';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import SkeletonLoader from '@/components/ui/SkeletonLoader.vue';
import DeviceForm from '@/components/features/DeviceForm.vue';
import DeleteConfirmation from '@/components/features/DeleteConfirmation.vue';

const { devices, isLoading, error, loadDevices, addDevice, removeDevice, loading } = useDevices();

const showCreateModal = ref(false);
const showDeleteModal = ref(false);
const deviceToDelete = ref<{ id: string; name: string } | null>(null);
const createError = ref<string | null>(null);

onMounted(async () => {
  await loadDevices();
});

async function handleCreateDevice(data: DeviceFormData): Promise<void> {
  try {
    createError.value = null;
    await addDevice(data);
    showCreateModal.value = false;
  } catch (err) {
    createError.value = (err as Error).message;
  }
}

function openDeleteModal(device: { id: string; name: string }): void {
  deviceToDelete.value = device;
  showDeleteModal.value = true;
}

async function handleConfirmDelete(): Promise<void> {
  if (!deviceToDelete.value) return;
  
  try {
    await removeDevice(deviceToDelete.value.id);
    showDeleteModal.value = false;
    deviceToDelete.value = null;
  } catch {
    // Error is handled by the store
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dispositivos</h2>
        <p class="text-gray-600 dark:text-gray-400">
          Gestiona tus dispositivos ESP32
        </p>
      </div>
      
      <BaseButton @click="showCreateModal = true">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Agregar Dispositivo
      </BaseButton>
    </div>

    <div
      v-if="error"
      class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400"
      role="alert"
    >
      {{ error }}
    </div>

    <BaseCard v-if="isLoading">
      <SkeletonLoader variant="card" :lines="5" />
    </BaseCard>

    <template v-else>
      <BaseCard padding="none" v-if="devices.length > 0">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Dispositivo
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ubicación
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Estado
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Última Actualización
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr
                v-for="device in devices"
                :key="device.id"
                class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-gray-900 dark:text-white">
                    {{ device.name }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400 font-mono text-sm">
                  {{ device.device_id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                  {{ device.location }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                      device.is_online
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
                    ]"
                  >
                    <span
                      :class="[
                        'w-2 h-2 rounded-full',
                        device.is_online ? 'bg-green-500' : 'bg-gray-400',
                      ]"
                    />
                    {{ device.is_online ? 'Online' : 'Offline' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400 text-sm">
                  {{ device.last_reading ? formatDate(device.last_reading.timestamp) : 'Sin datos' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    type="button"
                    class="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    :aria-label="`Eliminar ${device.name}`"
                    @click="openDeleteModal({ id: device.id, name: device.name })"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </BaseCard>

      <BaseCard v-else class="text-center py-12">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No hay dispositivos
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">
          Comienza agregando tu primer dispositivo ESP32
        </p>
        <BaseButton @click="showCreateModal = true">
          Agregar Dispositivo
        </BaseButton>
      </BaseCard>
    </template>

    <DeviceForm
      :open="showCreateModal"
      :loading="loading.creating"
      :error="createError"
      @close="showCreateModal = false"
      @submit="handleCreateDevice"
    />

    <DeleteConfirmation
      :open="showDeleteModal"
      :device-name="deviceToDelete?.name || ''"
      :loading="loading.deleting"
      @close="showDeleteModal = false"
      @confirm="handleConfirmDelete"
    />
  </div>
</template>
