export interface Device {
  id: string;
  device_id: string;
  name: string;
  location: string;
  is_online: boolean;
  last_reading?: SensorReading;
  created_at: string;
  updated_at: string;
}

export interface SensorReading {
  id: string;
  device_id: string;
  temperature: number;
  humidity: number;
  timestamp: string;
}

export interface TimeRange {
  label: string;
  value: '24h' | '7d' | '30d' | 'custom';
  hours?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface DeviceFormData {
  name: string;
  location: string;
  device_id: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface ChartDataPoint {
  timestamp: string;
  temperature: number;
  humidity: number;
}

export interface LoadingState {
  devices: boolean;
  readings: boolean;
  creating: boolean;
  deleting: boolean;
}

export interface ErrorState {
  devices: string | null;
  readings: string | null;
  creating: string | null;
  deleting: string | null;
}
