<script setup lang="ts">
import { computed } from 'vue';
import type { Device } from '@/types';
import BaseCard from '@/components/ui/BaseCard.vue';

interface Props {
  device: Device;
  selected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  selected: false,
});

defineEmits<{
  click: [device: Device];
}>();

const lastUpdateFormatted = computed(() => {
  if (!props.device.last_reading) return 'Sin datos';
  
  const date = new Date(props.device.last_reading.timestamp);
  return date.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
});

const temperature = computed(() => {
  return props.device.last_reading?.temperature.toFixed(1) ?? '--';
});

const humidity = computed(() => {
  return props.device.last_reading?.humidity.toFixed(1) ?? '--';
});
</script>

<template>
  <BaseCard
    hover
    :class="[
      'cursor-pointer transition-all duration-200',
      selected && 'ring-2 ring-primary-500',
    ]"
    @click="$emit('click', device)"
  >
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="font-semibold text-gray-900 dark:text-white text-lg">
          {{ device.name }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ device.location }}
        </p>
      </div>
      
      <span
        :class="[
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
          device.is_online
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
        ]"
        role="status"
        :aria-label="device.is_online ? 'En línea' : 'Fuera de línea'"
      >
        <span
          :class="[
            'w-2 h-2 rounded-full',
            device.is_online ? 'bg-green-500' : 'bg-gray-400',
          ]"
        />
        {{ device.is_online ? 'Online' : 'Offline' }}
      </span>
    </div>
    
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
        <div class="flex items-center gap-2 text-red-600 dark:text-red-400 mb-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
          </svg>
          <span class="text-xs font-medium uppercase">Temp</span>
        </div>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ temperature }}
          <span class="text-sm font-normal text-gray-500">°C</span>
        </p>
      </div>
      
      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
        <div class="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <span class="text-xs font-medium uppercase">Humedad</span>
        </div>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ humidity }}
          <span class="text-sm font-normal text-gray-500">%</span>
        </p>
      </div>
    </div>
    
    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-500 dark:text-gray-400">
        ID: {{ device.device_id }}
      </span>
      <span class="text-gray-400 dark:text-gray-500">
        {{ lastUpdateFormatted }}
      </span>
    </div>
  </BaseCard>
</template>
