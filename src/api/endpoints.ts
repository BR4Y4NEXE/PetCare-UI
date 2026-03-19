import apiClient from './client';
import type { Device, SensorReading, DeviceFormData } from '@/types';

export const deviceApi = {
  async getAll(): Promise<Device[]> {
    const response = await apiClient.get<Device[]>('/api/devices');
    return response.data;
  },

  async getById(deviceId: string): Promise<Device> {
    const response = await apiClient.get<Device>(`/api/devices/${deviceId}`);
    return response.data;
  },

  async create(data: DeviceFormData): Promise<Device> {
    const response = await apiClient.post<Device>('/api/devices', data);
    return response.data;
  },

  async delete(deviceId: string): Promise<void> {
    await apiClient.delete(`/api/devices/${deviceId}`);
  },

  async getReadings(deviceId: string, hours: number = 24): Promise<SensorReading[]> {
    const response = await apiClient.get<SensorReading[]>(
      `/api/devices/${deviceId}/readings`,
      { params: { hours } }
    );
    return response.data;
  },
};

export { apiClient };
