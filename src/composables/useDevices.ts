import { computed } from 'vue';
import { useDevicesStore } from '@/stores/devicesStore';
import type { Device, DeviceFormData } from '@/types';

export function useDevices() {
  const store = useDevicesStore();

  const devices = computed(() => store.devices);
  const selectedDevice = computed(() => store.selectedDevice);
  const isLoading = computed(() => store.loading.devices);
  const error = computed(() => store.error.devices);
  const onlineDevices = computed(() => store.onlineDevices);
  const offlineDevices = computed(() => store.offlineDevices);

  async function loadDevices(): Promise<void> {
    await store.fetchDevices();
  }

  async function addDevice(data: DeviceFormData): Promise<Device> {
    return await store.createDevice(data);
  }

  async function removeDevice(deviceId: string): Promise<void> {
    await store.deleteDevice(deviceId);
  }

  function selectDevice(deviceId: string | null): void {
    store.selectDevice(deviceId);
  }

  function getDeviceById(deviceId: string): Device | undefined {
    return devices.value.find((d) => d.id === deviceId);
  }

  return {
    devices,
    selectedDevice,
    isLoading,
    error,
    loading: store.loading,
    onlineDevices,
    offlineDevices,
    loadDevices,
    addDevice,
    removeDevice,
    selectDevice,
    getDeviceById,
  };
}
