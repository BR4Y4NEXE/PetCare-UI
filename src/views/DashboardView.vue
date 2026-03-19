<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useDevices } from '@/composables/useDevices';
import { useSensorData } from '@/composables/useSensorData';
import DeviceCard from '@/components/features/DeviceCard.vue';
import SensorChart from '@/components/features/SensorChart.vue';
import TimeRangeSelector from '@/components/features/TimeRangeSelector.vue';
import SkeletonLoader from '@/components/ui/SkeletonLoader.vue';
import BaseCard from '@/components/ui/BaseCard.vue';

const { devices, isLoading, error, loadDevices, selectDevice } = useDevices();

const selectedDeviceId = ref<string | null>(null);

const { 
  chartData, 
  isLoading: readingsLoading, 
  currentRange, 
  timeRanges, 
  loadReadings, 
  setTimeRange,
  temperatureStats,
  humidityStats,
} = useSensorData(selectedDeviceId.value || '');

watch(selectedDeviceId, (newId) => {
  if (newId) {
    loadReadings();
  }
});

watch(currentRange, () => {
  if (selectedDeviceId.value) {
    loadReadings();
  }
});

onMounted(async () => {
  await loadDevices();
});

function handleDeviceClick(device: { id: string }): void {
  selectedDeviceId.value = device.id;
  selectDevice(device.id);
}

const selectedDeviceData = computed(() => {
  return devices.value.find((d) => d.id === selectedDeviceId.value);
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h2>
      <p class="text-gray-600 dark:text-gray-400">
        Monitorea la temperatura y humedad de tus dispositivos ESP32
      </p>
    </div>

    <div
      v-if="error"
      class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400"
      role="alert"
    >
      <p class="font-medium">Error al cargar dispositivos</p>
      <p class="text-sm">{{ error }}</p>
    </div>

    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <SkeletonLoader v-for="i in 3" :key="i" variant="card" />
    </div>

    <template v-else>
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Dispositivos Registrados
        </h3>
        
        <div v-if="devices.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p class="text-gray-500 dark:text-gray-400 mb-4">No hay dispositivos registrados</p>
          <RouterLink
            to="/devices"
            class="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
          >
            Agregar un dispositivo
          </RouterLink>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DeviceCard
            v-for="device in devices"
            :key="device.id"
            :device="device"
            :selected="selectedDeviceId === device.id"
            @click="handleDeviceClick(device)"
          />
        </div>
      </div>

      <div v-if="selectedDeviceData">
        <BaseCard>
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ selectedDeviceData.name }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Historial de lecturas - {{ selectedDeviceData.location }}
              </p>
            </div>
            
            <TimeRangeSelector
              :ranges="timeRanges"
              :model-value="currentRange"
              @update:model-value="setTimeRange"
            />
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <p class="text-xs text-red-600 dark:text-red-400 font-medium uppercase mb-1">Temp. Min</p>
              <p class="text-xl font-bold text-gray-900 dark:text-white">
                {{ temperatureStats.min.toFixed(1) }}°C
              </p>
            </div>
            <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <p class="text-xs text-red-600 dark:text-red-400 font-medium uppercase mb-1">Temp. Max</p>
              <p class="text-xl font-bold text-gray-900 dark:text-white">
                {{ temperatureStats.max.toFixed(1) }}°C
              </p>
            </div>
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p class="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase mb-1">Humedad Min</p>
              <p class="text-xl font-bold text-gray-900 dark:text-white">
                {{ humidityStats.min.toFixed(1) }}%
              </p>
            </div>
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p class="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase mb-1">Humedad Max</p>
              <p class="text-xl font-bold text-gray-900 dark:text-white">
                {{ humidityStats.max.toFixed(1) }}%
              </p>
            </div>
          </div>

          <SensorChart :data="chartData" :is-loading="readingsLoading" />
        </BaseCard>
      </div>
    </template>
  </div>
</template>
