import TableCell from "@material-ui/core/TableCell";
import * as React from "react";
import { TableRow } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import { SensorReading } from "../app/SensorReading";
import { Row } from "./Row";
import { createStyles } from "./styles";
import { SortDirection } from "../app/App";

const rowsPerPageOptions = [10, 25, 50];

const getKeyForSensorReading = (sensorReading: SensorReading): string => {
  return `${sensorReading.id}-${sensorReading.readingTimestamp.getTime()}`;
};

interface Props {
  sensorReadings: SensorReading[];
  sortDirection: SortDirection;
  setSortDirection: (direction: SortDirection) => void;
  sortProperty: string;
  setSortProperty: (property: keyof SensorReading) => void;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
}

export const DataTable = ({
  sensorReadings,
  sortProperty,
  sortDirection,
  setSortProperty,
  setSortDirection,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}: Props) => {
  const classes = createStyles();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleSortSelected = (property: keyof SensorReading) => {
    if (property === sortProperty) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortProperty(property);
    }
  };

  return (
    <div>
      <TableContainer component={Paper} className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortProperty === "ReadingTimestamp"}
                  direction={sortDirection}
                  onClick={() => handleSortSelected("readingTimestamp")}
                >
                  Time
                </TableSortLabel>
              </TableCell>
              <TableCell>Box</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortProperty === "SensorType"}
                  direction={sortDirection}
                  onClick={() => handleSortSelected("sensorType")}
                >
                  Sensor Type
                </TableSortLabel>
              </TableCell>
              <TableCell>Median</TableCell>
              <TableCell>Unit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sensorReadings
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((sensorReading) => (
                <Row
                  key={getKeyForSensorReading(sensorReading)}
                  sensorReading={sensorReading}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={sensorReadings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(event: any, newPage: number) => setPage(newPage)}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};
