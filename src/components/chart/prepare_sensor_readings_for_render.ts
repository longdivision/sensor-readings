import { SensorReading } from "../app/SensorReading";

export const prepareSensorReadingsForRender = (
  sensorReadings: SensorReading[]
): any[] => {
  const timeToValue: { [key: string]: any } = {};

  sensorReadings.forEach((sensorReading) => {
    const time = sensorReading.readingTimestamp.toLocaleTimeString();
    if (!timeToValue[time]) {
      timeToValue[time] = { name: time };
    }

    timeToValue[time][sensorReading.boxId] = sensorReading.reading;
  });

  return Object.keys(timeToValue).map((key) => timeToValue[key]);
};
