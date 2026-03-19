<script setup lang="ts">
import { computed, toRef } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useChartData } from '@/composables/useChartData';
import type { ChartDataPoint } from '@/types';
import SkeletonLoader from '@/components/ui/SkeletonLoader.vue';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  data: ChartDataPoint[];
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
});

const dataRef = toRef(props, 'data');
const { chartjsData, chartOptions } = useChartData(dataRef);

const hasData = computed(() => props.data.length > 0);
</script>

<template>
  <div class="w-full h-80">
    <SkeletonLoader v-if="isLoading" variant="chart" />
    
    <div v-else-if="!hasData" class="flex items-center justify-center h-full">
      <div class="text-center text-gray-500 dark:text-gray-400">
        <svg class="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p>No hay datos disponibles para el período seleccionado</p>
      </div>
    </div>
    
    <Line
      v-else
      :data="chartjsData"
      :options="chartOptions as any"
      role="img"
      aria-label="Gráfica de temperatura y humedad"
    />
  </div>
</template>
