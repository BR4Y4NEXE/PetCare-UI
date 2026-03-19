import { computed, type Ref } from 'vue';
import type { ChartDataPoint } from '@/types';

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  tension: number;
  fill: boolean;
}

export function useChartData(rawData: Ref<ChartDataPoint[]>) {
  const labels = computed<string[]>(() => {
    return rawData.value.map((d) => formatTimestamp(d.timestamp));
  });

  const temperatureData = computed<ChartDataset>(() => ({
    label: 'Temperatura (°C)',
    data: rawData.value.map((d) => d.temperature),
    borderColor: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    tension: 0.3,
    fill: true,
  }));

  const humidityData = computed<ChartDataset>(() => ({
    label: 'Humedad (%)',
    data: rawData.value.map((d) => d.humidity),
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    tension: 0.3,
    fill: true,
  }));

  const chartjsData = computed(() => ({
    labels: labels.value,
    datasets: [temperatureData.value, humidityData.value],
  }));

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#6b7280',
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          color: '#9ca3af',
        },
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
  };

  function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return {
    labels,
    temperatureData,
    humidityData,
    chartjsData,
    chartOptions,
    formatTimestamp,
  };
}
