import { SensorReading } from "./SensorReading";

const sensorDataFileName = "sensor_readings.json";
const lineDelimiter = "\n";

export const downloadSensorReadings = async (): Promise<SensorReading[]> => {
  const response = await fetch(sensorDataFileName);
  const responseText = await response.text();

  const sensorReadings: SensorReading[] = [];

  responseText.split(lineDelimiter).forEach((value) => {
    if (value === "") {
      return;
    }

    const rawSensorReading = JSON.parse(value);

    const sensorData: SensorReading = {
      id: rawSensorReading.id,
      boxId: rawSensorReading.box_id,
      sensorType: rawSensorReading.sensor_type,
      unit: rawSensorReading.unit,
      name: rawSensorReading.name,
      lowerRange: rawSensorReading.range_l,
      upperRange: rawSensorReading.range_u,
      longitude: rawSensorReading.longitude,
      latitude: rawSensorReading.latitude,
      reading: rawSensorReading.reading,
      // Assumed the provided dates are UTC, parse as UTC to avoid being interpreted in Browser time zone
      readingTimestamp: new Date(`${rawSensorReading.reading_ts}.000Z`),
    };

    sensorReadings.push(sensorData);
  });

  return sensorReadings;
};
