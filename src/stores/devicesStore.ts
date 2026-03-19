import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Device, DeviceFormData, LoadingState, ErrorState } from '@/types';
import { deviceApi } from '@/api/endpoints';

export const useDevicesStore = defineStore('devices', () => {
  const devices = ref<Device[]>([]);
  const selectedDeviceId = ref<string | null>(null);
  
  const loading = ref<LoadingState>({
    devices: false,
    readings: false,
    creating: false,
    deleting: false,
  });

  const error = ref<ErrorState>({
    devices: null,
    readings: null,
    creating: null,
    deleting: null,
  });

  const selectedDevice = computed(() => {
    if (!selectedDeviceId.value) return null;
    return devices.value.find((d) => d.id === selectedDeviceId.value) || null;
  });

  const onlineDevices = computed(() => devices.value.filter((d) => d.is_online));
  const offlineDevices = computed(() => devices.value.filter((d) => !d.is_online));

  async function fetchDevices(): Promise<void> {
    loading.value.devices = true;
    error.value.devices = null;
    
    try {
      devices.value = await deviceApi.getAll();
    } catch (err) {
      error.value.devices = (err as Error).message;
      throw err;
    } finally {
      loading.value.devices = false;
    }
  }

  async function createDevice(data: DeviceFormData): Promise<Device> {
    loading.value.creating = true;
    error.value.creating = null;
    
    try {
      const newDevice = await deviceApi.create(data);
      devices.value.push(newDevice);
      return newDevice;
    } catch (err) {
      error.value.creating = (err as Error).message;
      throw err;
    } finally {
      loading.value.creating = false;
    }
  }

  async function deleteDevice(deviceId: string): Promise<void> {
    loading.value.deleting = true;
    error.value.deleting = null;
    
    try {
      await deviceApi.delete(deviceId);
      devices.value = devices.value.filter((d) => d.id !== deviceId);
      
      if (selectedDeviceId.value === deviceId) {
        selectedDeviceId.value = null;
      }
    } catch (err) {
      error.value.deleting = (err as Error).message;
      throw err;
    } finally {
      loading.value.deleting = false;
    }
  }

  function selectDevice(deviceId: string | null): void {
    selectedDeviceId.value = deviceId;
  }

  function updateDeviceStatus(deviceId: string, isOnline: boolean): void {
    const device = devices.value.find((d) => d.id === deviceId);
    if (device) {
      device.is_online = isOnline;
    }
  }

  return {
    devices,
    selectedDeviceId,
    selectedDevice,
    onlineDevices,
    offlineDevices,
    loading,
    error,
    fetchDevices,
    createDevice,
    deleteDevice,
    selectDevice,
    updateDeviceStatus,
  };
});
