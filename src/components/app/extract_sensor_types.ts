import { SensorReading } from "./SensorReading";

export const extractSensorTypes = (
  sensorReadings: SensorReading[]
): string[] => {
  const sensors: { [key: string]: boolean } = {};
  sensorReadings.forEach(
    (sensorReading) => (sensors[sensorReading.sensorType] = true)
  );
  return Object.keys(sensors);
};
