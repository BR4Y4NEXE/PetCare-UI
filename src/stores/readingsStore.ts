import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { SensorReading, ChartDataPoint } from '@/types';
import { deviceApi } from '@/api/endpoints';

export const useReadingsStore = defineStore('readings', () => {
  const readings = ref<Map<string, SensorReading[]>>(new Map());
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  async function fetchReadings(deviceId: string, hours: number = 24): Promise<SensorReading[]> {
    loading.value = true;
    error.value = null;
    
    try {
      const data = await deviceApi.getReadings(deviceId, hours);
      readings.value.set(deviceId, data);
      return data;
    } catch (err) {
      error.value = (err as Error).message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function getReadingsByDevice(deviceId: string): SensorReading[] {
    return readings.value.get(deviceId) || [];
  }

  function getChartData(deviceId: string): ChartDataPoint[] {
    const deviceReadings = getReadingsByDevice(deviceId);
    return deviceReadings.map((r) => ({
      timestamp: r.timestamp,
      temperature: r.temperature,
      humidity: r.humidity,
    }));
  }

  function clearReadings(deviceId?: string): void {
    if (deviceId) {
      readings.value.delete(deviceId);
    } else {
      readings.value.clear();
    }
  }

  return {
    readings,
    loading,
    error,
    fetchReadings,
    getReadingsByDevice,
    getChartData,
    clearReadings,
  };
});
