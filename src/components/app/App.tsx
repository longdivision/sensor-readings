import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { Chart } from "../chart/Chart";
import { DataTable } from "../data-table/DataTable";
import { SensorReading } from "./SensorReading";
import { buildCss, darkTheme } from "./styles";
import { Filter } from "../filter/Filter";
import { sortSensorData } from "./sort_sensor_data";
import { downloadSensorReadings } from "./download_sensor_readings";
import { filterSensorData } from "./filter_sensor_data";
import { extractSensorTypes } from "./extract_sensor_types";

export type SortDirection = "asc" | "desc";

const allSensorTypesPlaceholder = "All";

export const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [originalSensorReadings, setOriginalSensorReadings] = useState<
    SensorReading[]
  >([]);
  const [sensorReadings, setSensorReadings] = useState<SensorReading[]>([]);
  const [sensors, setSensors] = useState<string[]>(["All"]);
  const [selectedSensorType, setSelectedSensorType] = useState<string>("All");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [sortProperty, setSortProperty] = useState<keyof SensorReading>(
    "readingTimestamp"
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const classes = buildCss();

  useEffect(() => {
    let filteredSensorData =
      selectedSensorType === allSensorTypesPlaceholder
        ? originalSensorReadings
        : filterSensorData(originalSensorReadings, selectedSensorType);

    const sortedSensorData = sortSensorData(
      filteredSensorData,
      sortProperty,
      sortDirection
    );
    setSensorReadings(sortedSensorData);
    return () => {};
  }, [originalSensorReadings, selectedSensorType, sortProperty, sortDirection]);

  useEffect(() => {
    async function triggerDownload() {
      const sensorReadings = await downloadSensorReadings();
      setOriginalSensorReadings(sensorReadings);
      const sensors = extractSensorTypes(sensorReadings);
      setSensors(sensors);
      setSelectedSensorType(sensors[0]);
      setLoading(false);
      return Promise.resolve();
    }
    triggerDownload().then();
    return () => {};
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6">Sensor Readings</Typography>
          </Toolbar>
        </AppBar>
        <main>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={12} lg={12}>
                <Filter
                  sensorTypes={[allSensorTypesPlaceholder, ...sensors]}
                  selectedSensorType={selectedSensorType}
                  setSelectedSensorType={setSelectedSensorType}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Chart
                  sensorReadings={sensorReadings.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <DataTable
                  sortDirection={sortDirection as SortDirection}
                  sortProperty={sortProperty}
                  setSortDirection={setSortDirection}
                  setSortProperty={setSortProperty}
                  sensorReadings={loading ? [] : sensorReadings}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                />
              </Grid>
            </Grid>
          </Container>
        </main>
      </CssBaseline>
    </ThemeProvider>
  );
};
