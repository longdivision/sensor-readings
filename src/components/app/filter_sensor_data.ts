import { SensorReading } from "./SensorReading";

export const filterSensorData = (
  sensorData: SensorReading[],
  sensorType: string
): SensorReading[] => {
  return [...sensorData].filter(
    (sensorData) => sensorData.sensorType === sensorType
  );
};
