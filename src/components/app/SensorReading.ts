export interface SensorReading {
  id: string;
  boxId: string;
  sensorType: string;
  unit: string;
  name: string;
  lowerRange: number;
  upperRange: number;
  longitude: number;
  latitude: number;
  reading: number;
  readingTimestamp: Date;
}
