import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import * as React from "react";
import { SensorReading } from "../app/SensorReading";
import { prepareSensorReadingsForRender } from "./prepare_sensor_readings_for_render";
import { extractChartLines } from "./extract_chart_lines";

const lineColours = [
  "#ff7300",
  "#82ca9d",
  "#8884d8",
  "#d0ed57",
  "#83a6ed",
  "#ffc658",
];

interface Props {
  sensorReadings: SensorReading[];
}

export const Chart = ({ sensorReadings }: Props) => {
  const dataToRender = prepareSensorReadingsForRender(sensorReadings);
  const linesToRender = extractChartLines(dataToRender);

  return (
    <ResponsiveContainer width="100%" aspect={3.0}>
      <LineChart
        data={prepareSensorReadingsForRender(sensorReadings)}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <Tooltip />
        <CartesianGrid stroke="#4e4e4e" />
        {linesToRender.map((value, i) => (
          <Line
            key={i}
            type="monotone"
            dataKey={value}
            stroke={lineColours[i % lineColours.length]}
            yAxisId={0}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
