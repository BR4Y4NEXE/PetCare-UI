import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { useChartData } from '@/composables/useChartData';
import type { ChartDataPoint } from '@/types';

describe('useChartData', () => {
  it('generates correct labels from timestamps', () => {
    const mockData = ref<ChartDataPoint[]>([
      { timestamp: '2024-01-15T10:30:00', temperature: 25.5, humidity: 60 },
      { timestamp: '2024-01-15T11:30:00', temperature: 26.0, humidity: 58 },
    ]);
    
    const { labels } = useChartData(mockData);
    expect(labels.value.length).toBe(2);
    expect(labels.value[0]).toContain('15/1');
  });

  it('extracts temperature data correctly', () => {
    const mockData = ref<ChartDataPoint[]>([
      { timestamp: '2024-01-15T10:30:00', temperature: 25.5, humidity: 60 },
      { timestamp: '2024-01-15T11:30:00', temperature: 26.0, humidity: 58 },
    ]);
    
    const { temperatureData } = useChartData(mockData);
    expect(temperatureData.value.data).toEqual([25.5, 26.0]);
    expect(temperatureData.value.label).toBe('Temperatura (°C)');
  });

  it('extracts humidity data correctly', () => {
    const mockData = ref<ChartDataPoint[]>([
      { timestamp: '2024-01-15T10:30:00', temperature: 25.5, humidity: 60 },
      { timestamp: '2024-01-15T11:30:00', temperature: 26.0, humidity: 58 },
    ]);
    
    const { humidityData } = useChartData(mockData);
    expect(humidityData.value.data).toEqual([60, 58]);
    expect(humidityData.value.label).toBe('Humedad (%)');
  });

  it('generates chartjs data structure correctly', () => {
    const mockData = ref<ChartDataPoint[]>([
      { timestamp: '2024-01-15T10:30:00', temperature: 25.5, humidity: 60 },
    ]);
    
    const { chartjsData } = useChartData(mockData);
    expect(chartjsData.value.labels).toHaveLength(1);
    expect(chartjsData.value.datasets).toHaveLength(2);
    expect(chartjsData.value.datasets[0].label).toBe('Temperatura (°C)');
    expect(chartjsData.value.datasets[1].label).toBe('Humedad (%)');
  });

  it('handles empty data', () => {
    const mockData = ref<ChartDataPoint[]>([]);
    const { chartjsData } = useChartData(mockData);
    expect(chartjsData.value.labels).toHaveLength(0);
    expect(chartjsData.value.datasets[0].data).toHaveLength(0);
  });
});
