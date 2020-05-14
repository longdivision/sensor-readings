import TableCell from "@material-ui/core/TableCell";
import { TableRow } from "@material-ui/core";
import * as React from "react";
import { SensorReading } from "../app/SensorReading";

interface Props {
  sensorReading: SensorReading;
}

export const Row = ({ sensorReading }: Props) => {
  return (
    <TableRow>
      <TableCell>{sensorReading.readingTimestamp.toDateString()}</TableCell>
      <TableCell component="th" scope="row">
        {sensorReading.id}
      </TableCell>
      <TableCell>{sensorReading.sensorType}</TableCell>
      <TableCell>{sensorReading.reading}</TableCell>
      <TableCell>{sensorReading.unit}</TableCell>
    </TableRow>
  );
};
