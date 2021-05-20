import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  CircularProgress,
  Paper,
} from "@material-ui/core";

import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { EnhancedTableHead } from "./ETLTableHead";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    boxShadow: "2px 5px 5px 2px #d4d4d4",
    borderRadius: "0.375rem",
    borderTopWidth: 1,
    "& .MuiTableCell-root": {
      border: " 1px solid rgba(224, 224, 224, 1)",
    },
  },

  paper: {
    width: "100%",

    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({
  bankClientNames,
  selectedClient,
  handleSelectClient,
  tableData,
  tableType,
  isLoading,
}) {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    tableData &&
    tableData.length &&
    rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

  const renderActualTable = useMemo(() => {
    return (
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          tableType={tableType}
          bankClientNames={bankClientNames}
          selectedClient={selectedClient}
          handleSelectClient={handleSelectClient}
          isLoading={isLoading}
        />

        <TableContainer style={{ minHeight: "280px" }}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead tableType={tableType} />
            <TableBody>
              {tableData && tableData.length ? (
                tableData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._key}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {row.client_name}
                        </TableCell>
                        <TableCell align="center">
                          {tableType !== "Subscriptions"
                            ? row.date
                            : row.date_start}
                        </TableCell>
                        <TableCell align="center">
                          {tableType !== "Subscriptions"
                            ? row.txn_id
                            : row.date_end}
                        </TableCell>
                        <TableCell align="center">
                          {row.product_category_name}
                        </TableCell>
                        <TableCell align="center">{row.amount}</TableCell>
                      </TableRow>
                    );
                  })
              ) : isLoading ? (
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    <CircularProgress size={30} />
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    <div
                      style={{
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <Typography
                        className={clsx(classes.content)}
                        variant="h4"
                        align="center"
                      >
                        No Data
                      </Typography>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={tableData && tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }, [
    emptyRows,
    bankClientNames,
    isLoading,
    classes,
    handleSelectClient,
    page,
    rowsPerPage,
    selectedClient,
    tableData,
    tableType,
  ]);
  return (
    <div className={classes.root} style={{ marginTop: "2vh" }}>
      {renderActualTable}
    </div>
  );
}
