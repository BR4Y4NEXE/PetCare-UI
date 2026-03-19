import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useDevicesStore } from '@/stores/devicesStore';

describe('useDevicesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes with empty devices', () => {
    const store = useDevicesStore();
    expect(store.devices).toEqual([]);
    expect(store.selectedDeviceId).toBeNull();
  });

  it('updates selected device id', () => {
    const store = useDevicesStore();
    store.selectDevice('test-id');
    expect(store.selectedDeviceId).toBe('test-id');
  });

  it('clears selection when null is passed', () => {
    const store = useDevicesStore();
    store.selectDevice('test-id');
    store.selectDevice(null);
    expect(store.selectedDeviceId).toBeNull();
  });

  it('updates device status', () => {
    const store = useDevicesStore();
    store.devices.push({
      id: '1',
      device_id: 'ESP001',
      name: 'Test Device',
      location: 'Living Room',
      is_online: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    
    store.updateDeviceStatus('1', false);
    expect(store.devices[0].is_online).toBe(false);
  });

  it('computes online and offline devices correctly', () => {
    const store = useDevicesStore();
    store.devices.push(
      {
        id: '1',
        device_id: 'ESP001',
        name: 'Device 1',
        location: 'Room 1',
        is_online: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        device_id: 'ESP002',
        name: 'Device 2',
        location: 'Room 2',
        is_online: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    );
    
    expect(store.onlineDevices.length).toBe(1);
    expect(store.offlineDevices.length).toBe(1);
  });
});
