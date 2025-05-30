
export interface DeviceData {
  DeviceName: string;
  AppVersion: string;
  FirmwareVersion: string;
  DozeeFilesUploaded: number;
  DozeeFilesInPod: number;
  DozeeFilesInHub: number;
  SerialException: number;
  WifiHours: number;
  RestartCount: number;
  DeviceHealth: string;
  SheetConnectionEvents: number;
  SheetDisconnectionEvents: number;
  PulseOximeterConnection: number;
  OxygenSaturationDuration: number;
  BPMonitorConnections: number;
  BPRecordedEvents: number;
  EcgProbeConnection: number;
  EcgSignalDuration: number;
  TemperatureConnections: number;
  TemperatureDuration: number;
}
