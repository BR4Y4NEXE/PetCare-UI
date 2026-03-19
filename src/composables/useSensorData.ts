import { ref, computed, watch } from 'vue';
import { useReadingsStore } from '@/stores/readingsStore';
import type { SensorReading, TimeRange, ChartDataPoint } from '@/types';

const TIME_RANGES: TimeRange[] = [
  { label: '24 horas', value: '24h', hours: 24 },
  { label: '7 días', value: '7d', hours: 168 },
  { label: '30 días', value: '30d', hours: 720 },
  { label: 'Personalizado', value: 'custom' },
];

export function useSensorData(deviceId: string) {
  const store = useReadingsStore();
  
  const currentRange = ref<TimeRange>(TIME_RANGES[0]);
  const isLoading = computed(() => store.loading);
  const error = computed(() => store.error);

  const readings = computed<SensorReading[]>(() => {
    return store.getReadingsByDevice(deviceId);
  });

  const chartData = computed<ChartDataPoint[]>(() => {
    return store.getChartData(deviceId);
  });

  const latestReading = computed(() => {
    if (readings.value.length === 0) return null;
    return readings.value[readings.value.length - 1];
  });

  const temperatureStats = computed(() => {
    if (readings.value.length === 0) {
      return { min: 0, max: 0, avg: 0 };
    }
    
    const temps = readings.value.map((r) => r.temperature);
    return {
      min: Math.min(...temps),
      max: Math.max(...temps),
      avg: temps.reduce((a, b) => a + b, 0) / temps.length,
    };
  });

  const humidityStats = computed(() => {
    if (readings.value.length === 0) {
      return { min: 0, max: 0, avg: 0 };
    }
    
    const humids = readings.value.map((r) => r.humidity);
    return {
      min: Math.min(...humids),
      max: Math.max(...humids),
      avg: humids.reduce((a, b) => a + b, 0) / humids.length,
    };
  });

  async function loadReadings(): Promise<void> {
    if (!deviceId) return;
    
    const hours = currentRange.value.hours || 24;
    await store.fetchReadings(deviceId, hours);
  }

  function setTimeRange(range: TimeRange): void {
    currentRange.value = range;
  }

  function getTimeRanges(): TimeRange[] {
    return TIME_RANGES;
  }

  watch(
    () => deviceId,
    (newDeviceId) => {
      if (newDeviceId) {
        loadReadings();
      }
    },
    { immediate: true }
  );

  return {
    readings,
    chartData,
    latestReading,
    temperatureStats,
    humidityStats,
    currentRange,
    timeRanges: TIME_RANGES,
    isLoading,
    error,
    loadReadings,
    setTimeRange,
    getTimeRanges,
  };
}
