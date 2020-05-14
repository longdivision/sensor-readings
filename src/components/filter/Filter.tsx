import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import * as React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

interface Props {
  sensorTypes: string[];
  selectedSensorType: string;
  setSelectedSensorType: (sensor: string) => void;
}

export const Filter = ({
  sensorTypes,
  selectedSensorType,
  setSelectedSensorType,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedSensorType(event.target.value as string);
  };

  return (
    <FormControl variant="outlined">
      <InputLabel id="sensor-label">Sensor</InputLabel>
      <Select
        labelId="sensor-label"
        value={selectedSensorType}
        onChange={handleChange}
        label="Sensor"
      >
        {sensorTypes.map((sensor) => (
          <MenuItem key={sensor} value={sensor}>
            {sensor}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
