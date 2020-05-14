import { SensorReading } from "./SensorReading";
import { SortDirection } from "./App";

export const sortSensorData = (
  sensorData: SensorReading[],
  sortProperty: keyof SensorReading,
  sortDirection: SortDirection
): SensorReading[] => {
  const newData = [...sensorData].sort((a, b) => {
    let firstValue: SensorReading = a;
    let secondValue: SensorReading = b;
    if (sortDirection === "asc") {
      firstValue = b;
      secondValue = a;
    }

    switch (sortProperty) {
      case "readingTimestamp":
        return (
          firstValue["readingTimestamp"].getTime() -
          secondValue["readingTimestamp"].getTime()
        );
      case "sensorType":
        return firstValue["sensorType"].localeCompare(
          secondValue["sensorType"]
        );
      default:
        throw Error(`Unhandled sort property ${sortProperty}`);
    }
  });

  return newData;
};
