
import { DeviceData } from '@/types/device';

const devicePrefixes = ['DEV', 'MON', 'HUB', 'POD', 'SEN'];
const healthStatuses = ['Excellent', 'Good', 'Fair', 'Poor'];
const appVersions = ['2.1.0', '2.1.1', '2.1.2', '2.0.9', '2.0.8'];
const firmwareVersions = ['1.4.2', '1.4.1', '1.4.0', '1.3.9', '1.3.8'];

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateDeviceName = (index: number): string => {
  const prefix = getRandomElement(devicePrefixes);
  const number = String(index).padStart(4, '0');
  return `${prefix}-${number}`;
};

export const generateMockData = (
  organisation: string,
  dateFrom: Date,
  dateTo: Date
): DeviceData[] => {
  const deviceCount = getRandomInt(15, 50);
  const devices: DeviceData[] = [];

  for (let i = 1; i <= deviceCount; i++) {
    const device: DeviceData = {
      DeviceName: generateDeviceName(i),
      AppVersion: getRandomElement(appVersions),
      FirmwareVersion: getRandomElement(firmwareVersions),
      DozeeFilesUploaded: getRandomInt(50, 500),
      DozeeFilesInPod: getRandomInt(10, 100),
      DozeeFilesInHub: getRandomInt(5, 50),
      SerialException: getRandomInt(0, 10),
      WifiHours: getRandomInt(18, 24),
      RestartCount: getRandomInt(0, 5),
      DeviceHealth: getRandomElement(healthStatuses),
      SheetConnectionEvents: getRandomInt(5, 50),
      SheetDisconnectionEvents: getRandomInt(0, 10),
      PulseOximeterConnection: getRandomInt(10, 100),
      OxygenSaturationDuration: getRandomInt(60, 480),
      BPMonitorConnections: getRandomInt(5, 30),
      BPRecordedEvents: getRandomInt(10, 100),
      EcgProbeConnection: getRandomInt(20, 80),
      EcgSignalDuration: getRandomInt(30, 360),
      TemperatureConnections: getRandomInt(10, 60),
      TemperatureDuration: getRandomInt(45, 300)
    };

    devices.push(device);
  }

  return devices.sort((a, b) => a.DeviceName.localeCompare(b.DeviceName));
};
